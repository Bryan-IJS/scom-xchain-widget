import {
  customModule,
  Control,
  Module,
  Modal,
  Table,
  application,
  IEventBus,
  Panel,
  observable,
  Styles,
  Label,
  Icon,
  Button,
  Pagination,
  Container,
  VStack,
  ControlElement,
  customElements,
  HStack
} from '@ijstech/components';
import { bridgeRecordColumns, toTokenIcon, truncateAddress } from './bridgeRecordColumn';
import Assets from '../assets';
import { tokenStore } from '@scom/scom-token-list';
import { bridgeStyle } from './bridgeRecord.css';

import { requestCancelOrder, requestAmendOrder, withdrawUnexecutedOrder, getAllUserOrders } from "./bridgeRecordAPI";
import { EventId, IExtendedNetwork, formatNumber, registerSendTxEvents, showResultMessage, TokenMapType } from '../global/index';

import {
  isWalletConnected,
  getNetworkImg,
  findConstantToVault,
  VaultOrderItem,
  State,
  getTokenIcon,
  VaultGroupList,
  VaultGroupConstant,
} from '../store/index';
import { findVaultGroupByToken, getRoute } from '../crosschain-utils/index';
import { Wallet, BigNumber } from '@ijstech/eth-wallet';
import ScomTokenInput from '@scom/scom-token-input';
import { ITokenObject } from '@scom/scom-token-list';
import ScomTxStatusModal from '@scom/scom-tx-status-modal';
import { bridgeRecordJson } from '../languages/index';
const Theme = Styles.Theme.ThemeVars;

const enum DateOptions {
  LATEST = 'Latest',
  OLDEST = 'Oldest',
}

const enum ActionType {
  Cancel,
  Resubmit,
  Withdraw
}

interface IVaultOrderRecordFilter {
  sort?: DateOptions;
  sourceChain?: number | string;
  targetChain?: number | string;
  assetName?: string;
}

interface IPagination {
  position: string,
  pageSize: number,
  currentPage: number,
  totalPage?: number
}

interface INetworkFilter extends IExtendedNetwork {
  url?: string
}

const pageSize = 5;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['xchain-bridge-record']: ControlElement;
    }
  }
};

@customModule
@customElements('xchain-bridge-record')
export class BridgeRecord extends Module {
  private bridgeRecordTable: Table;
  private mobilePanel: Panel;
  private hStackPagination: HStack;
  private largeLoading: Panel;
  private requestCancelModal: Modal;
  private txStatusModal: ScomTxStatusModal;
  private titleModalLabel: Label;
  private confirmNetwork: Panel;
  private switchNetworkPnl: Panel;
  private networkNameLabel: Label;
  private networkNameVal: Label;
  private withdrawAmount: Label;
  private noteCancelOrWithdraw: Label;
  private noteNetwork: Label;
  private resubmitOrderModal: Modal;
  private tokenReceiveSelection: ScomTokenInput;
  // private transactionSettingsLayout: TransactionSettingsLayout;
  private resubmitConfirmNetwork: Panel;
  private resubmitConfirmPnl: Panel;
  private resubmitExpectedReceive: Label;
  // private resubmitMinimumReceive: Label;
  private switchChainId: number;
  private resubmitToken: ITokenObject;
  private isCancel: boolean | undefined;
  private sortByDate: DateOptions;
  private chainId: number;
  private _lastUpdated: number = 0;
  @observable()
  private lastUpdatedText: string = '$data_last_updated_0_seconds_ago';
  @observable()
  private paging: IPagination = {
    position: 'bottomRight',
    pageSize,
    currentPage: 1
  }
  private iconRefresh: Icon;
  private timer: any;
  private $eventBus: IEventBus;
  private currentHash: string;
  private selectedItem: VaultOrderItem;
  private isPageKept: boolean = false;
  private filter: IVaultOrderRecordFilter = {};
  private orders: VaultOrderItem[] = [];
  private oldSource: INetworkFilter;
  private oldDestination: INetworkFilter;
  private searchSourceBtn: Button;
  private searchDestinationBtn: Button;
  private sortDateBtn: Button;
  private searchTokenGroupBtn: Button;
  private searchSourceModal: Modal;
  private searchDestinationModal: Modal;
  private sortDateModal: Modal;
  private searchTokenGroupModal: Modal;
  private assetName: string;
  private sourceChain: INetworkFilter;
  private destinationChain: INetworkFilter;
  private emptyMsg: Label;
  private btnElm: Button;
  private newMinAmountOut: string;
  private targetTokenBalances: any;
  private targetTokenMap: TokenMapType;

  private bridgeRecordMobile: VStack;
  private listPagination: Pagination;
  private itemStart = 0;
  private itemEnd = pageSize;
  private currentAction: ActionType;
  private initializedState: { chainId: number, connected: boolean, loading: boolean };
  private state: State;
  private clientEvents: any[] = [];
  switchNetworkByWallet: Function;

  constructor(state: State, parent?: Container, options?: any) {
    super(parent, options);
    this.state = state;
    this.$eventBus = application.EventBus;
    this.registerEvent();
  }

  onHide() {
    for (let event of this.clientEvents) {
      event.unregister();
    }
    this.clientEvents = [];
  }

  private registerEvent() {
    this.clientEvents.push(this.$eventBus.register(this, EventId.SlippageToleranceChanged, this.onUpdateReceiveVal));
  }

  onChainChange = async () => {
    const chainId = this.state.getChainId();
    if (this.orders.length && this.networkList.some(v => v.chainId === chainId)) {
      this.chainId = chainId;
      this.updateSwitchButton();
      return;
    }
    this.chainId = chainId;
    this.renderFilterButton();
    await this.refreshData();
    this.updateSwitchButton();
  }

  onWalletConnect = async () => {
    this.renderFilterButton();
    this.refreshData();
  }

  private onUpdateReceiveVal = () => {
    this.updateReceiveVal();
  }

  get lastUpdated(): number {
    return this._lastUpdated;
  }

  set lastUpdated(value: number) {
    this._lastUpdated = value;
    this.lastUpdatedText = this.i18n.get('$data_last_updated_seconds_ago', {value: `${this._lastUpdated}`});
  }

  get networkList(): IExtendedNetwork[] {
    const list = this.state.getMatchNetworks({ isDisabled: false });
    const networks = this.state.getNetworkConfig();
    const testnetSupportedList = list.filter(v => v.isTestnet && networks.some(n => n.chainId == v.chainId));
    const mainnetSupportedList = list.filter(v => !v.isTestnet && networks.some(n => n.chainId == v.chainId));
    const isMainnet = mainnetSupportedList.some((item: IExtendedNetwork) => item.chainId == this.chainId);
    const supportList = isMainnet ? mainnetSupportedList : testnetSupportedList;
    return supportList;
  }

  get dataListFiltered() {
    let list = this.orders;
    if (!Object.keys(this.filter).length) return list;
    const { sourceChain, targetChain, sort, assetName } = this.filter;
    if (sourceChain) {
      list = list.filter((order) => order.fromNetwork.chainId == sourceChain);
    }
    if (targetChain) {
      list = list.filter((order) => order.toNetwork.chainId == targetChain);
    }
    if (assetName) {
      list = list.filter((order) => order.assetName === assetName)
    }
    if (sort) {
      list = list.sort((a, b) => sort === DateOptions.LATEST ? b.orderId - a.orderId : a.orderId - b.orderId);
    }
    return list;
  }

  private getFilteredData = () => {
    return this.dataListFiltered.slice(this.itemStart, this.itemEnd);
  }

  private onSelectIndex = () => {
    this.removeCurrentValues();
    this.itemStart = (this.listPagination.currentPage - 1) * pageSize;
    this.itemEnd = this.itemStart + pageSize;
    this.paging.currentPage = this.listPagination.currentPage;
    this.renderRecords();
  }

  private refreshData = async () => {
    const currentChainId = this.state.getChainId();
    const isConnected = isWalletConnected();
    const { chainId, connected, loading } = this.initializedState;
    if (chainId === currentChainId && connected === isConnected && loading === true) return;
    this.initializedState = {
      chainId: currentChainId,
      connected: isConnected,
      loading: true
    }
    await this.refreshUI(isConnected);
    this.initializedState.loading = false;
  }

  private refreshUI = async (connected: boolean) => {
    this.isPageKept = false;
    this.paging.currentPage = 1;
    this.sortByDate = DateOptions.LATEST;
    this.sortDateBtn.caption = '$latest_swap';
    this.filter = {};
    this.oldSource = Object.assign({}, this.sourceChain);
    this.oldDestination = Object.assign({}, this.destinationChain);
    this.iconRefresh.enabled = false;
    if (connected) {
      this.emptyMsg.caption = '$no_data';
      try {
        await this.generateData();
      } catch (err) {
        this.resetData();
      }
    } else {
      this.resetData();
      this.emptyMsg.caption = '$please_connect_with_your_wallet';
    }
    this.iconRefresh.enabled = true;
    this.lastUpdated = 0;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.lastUpdated++;
    }, 1000)
  }

  private renderEmpty(source: Control) {
    const emptyElm = <i-panel class="queue-header">
      <i-image url={Assets.fullPath('img/icon-advice.svg')} />
      <i-panel>
        <i-label
          caption="$no_data"
          font={{ size: '1rem', color: Theme.text.primary, bold: true }}
          margin={{ left: 10 }}
        />
      </i-panel>
    </i-panel>
    const td = source.querySelector('td');
    td && td.appendChild(emptyElm);
  }

  private onChangeSorting = async (value: DateOptions) => {
    this.sortDateModal.visible = false;
    if (this.sortByDate === value) return;
    this.sortByDate = value;
    this.sortDateBtn.caption = value === DateOptions.LATEST ? '$latest_swap' : '$oldest_swap';
    await this.updateRecords();
  }

  private onChangeSource = async (network?: INetworkFilter) => {
    if (network && network.chainId == this.sourceChain?.chainId) return;
    this.searchSourceModal.visible = false;
    const networkImg = this.searchSourceBtn.querySelector('i-image.network-img');
    if (networkImg && this.searchSourceBtn) {
      this.searchSourceBtn.removeChild(networkImg);
    }
    if (network) {
      if (network.chainId == this.destinationChain?.chainId) {
        this.destinationChain = this.oldSource ? Object.assign({}, this.sourceChain) : null;
        this.oldDestination = Object.assign({}, this.destinationChain);
        const _networkImg = this.searchDestinationBtn.querySelector('i-image.network-img');
        if (_networkImg && this.searchDestinationBtn) {
          this.searchDestinationBtn.removeChild(_networkImg);
        }
        if (this.destinationChain?.chainId) {
          this.searchDestinationBtn.caption = this.destinationChain.chainName;
          const _url = this.destinationChain.url;
          this.searchDestinationBtn.prepend(<i-image class="network-img" url={_url} />);
        } else {
          this.searchDestinationBtn.caption = '$destination_chain';
        }
      }
      this.sourceChain = network;
      this.searchSourceBtn.caption = network.chainName;
      const url = network.url;
      this.searchSourceBtn.prepend(<i-image class="network-img" url={url} />);
    } else {
      this.sourceChain = null;
      this.searchSourceBtn.caption = '$source_chain';
    }
    this.oldSource = Object.assign({}, this.sourceChain);
    await this.updateRecords();
  }

  private onChangeDestination = async (network?: INetworkFilter) => {
    if (network && network.chainId == this.destinationChain?.chainId) return;
    this.searchDestinationModal.visible = false;
    const networkImg = this.searchDestinationBtn.querySelector('i-image.network-img');
    if (networkImg && this.searchDestinationBtn) {
      this.searchDestinationBtn.removeChild(networkImg);
    }
    if (network) {
      if (network.chainId == this.sourceChain?.chainId) {
        this.sourceChain = this.oldDestination ? Object.assign({}, this.oldDestination) : null;
        this.oldSource = Object.assign({}, this.sourceChain);
        const _networkImg = this.searchSourceBtn.querySelector('i-image.network-img');
        if (_networkImg && this.searchSourceBtn) {
          this.searchSourceBtn.removeChild(_networkImg);
        }
        if (this.sourceChain?.chainId) {
          this.searchSourceBtn.caption = this.sourceChain.chainName;
          const _url = this.sourceChain.url;
          this.searchSourceBtn.prepend(<i-image class="network-img" url={_url} />);
        } else {
          this.searchSourceBtn.caption = '$source_chain';
        }
      }
      this.destinationChain = network;
      this.searchDestinationBtn.caption = network.chainName;
      const url = network.url;
      this.searchDestinationBtn.prepend(<i-image class="network-img" url={url} />);
    } else {
      this.destinationChain = null;
      this.searchDestinationBtn.caption = '$destination_chain';
    }
    this.oldDestination = Object.assign({}, this.destinationChain);
    await this.updateRecords();
  }

  private async onChangeTokenGroup(value?: string) {
    this.searchTokenGroupModal.visible = false;
    if (this.assetName === value) return;
    this.assetName = value;
    this.searchTokenGroupBtn.caption = value || '$token_group';
    await this.updateRecords();
  }

  private async generateData() {
    let pageNumber = this.isPageKept ? this.paging.currentPage : 1;
    await this.updateRecords(pageNumber);
  }

  private resetData() {
    this.paging.totalPage = 0;
    if (this.paging.currentPage !== 1) {
      this.paging.currentPage = 1;
    }
    this.itemStart = 0;
    this.itemEnd = this.itemStart + pageSize;
    this.bridgeRecordTable.data = [];
  }

  private expandRecord = () => {
    if (this.currentHash) {
      setTimeout(() => {
        const currentRecord = this.bridgeRecordTable.querySelector(`[order-hash="${this.currentHash}"]`);
        if (currentRecord) {
          (currentRecord as Icon).click();
        }
        const currentRecordMobile = this.bridgeRecordMobile.querySelector(`[order-hash="${this.currentHash}"]`);
        if (currentRecordMobile) {
          (currentRecordMobile as Icon).click();
        }
      }, 500);
    }
  }

  private updateRecords = async (page?: number) => {
    if (this.isPageKept) {
      this.isPageKept = false;
    } else if (this.largeLoading) {
      this.largeLoading.visible = true;
    }
    this.paging.currentPage = page || 1;
    let params: IVaultOrderRecordFilter = {
      sort: this.sortByDate
    }
    if (this.sourceChain) {
      params.sourceChain = this.sourceChain.chainId;
    }
    if (this.destinationChain) {
      params.targetChain = this.destinationChain.chainId;
    }
    if (this.assetName) {
      params.assetName = this.assetName;
    }
    this.filter = params;
    if (page) {
      await this.setVaultOrderMap();
      this.lastUpdated = 0;
    }
    this.renderRecords();
  }

  private renderRecords = () => {
    this.itemStart = (this.listPagination.currentPage - 1) * pageSize;
    this.itemEnd = this.itemStart + pageSize;
    this.paging.totalPage = Math.ceil(this.dataListFiltered.length / pageSize);
    this.listPagination.visible = this.paging.totalPage > 1;
    this.onRenderDataMobile();
    if (this.largeLoading) {
      this.largeLoading.visible = false;
    }
    this.bridgeRecordTable.data = this.getFilteredData();
    this.expandRecord();
  }

  private setVaultOrderMap = async () => {
    try {
      let vaultOrders = await getAllUserOrders(this.state);
      this.orders = vaultOrders.orders;
    } catch { };
  }

  private setVisibleMd = (value: boolean) => {
    this.sortDateModal.visible = this.searchSourceModal.visible = this.searchDestinationModal.visible = this.searchTokenGroupModal.visible = value;
  }

  resizeLayout(width: number | string) {
    if (!this.bridgeRecordTable) return;
    const tagWidth = Number(width);
    if ((this.offsetWidth !== 0 && this.offsetWidth < 768) || (window as any).innerWidth < 768 || (!isNaN(tagWidth) && tagWidth !== 0 && tagWidth < 768)) {
      this.hStackPagination.classList.add('pagination-mobile');
      this.bridgeRecordTable.visible = false;
      this.mobilePanel.visible = true;
    } else {
      this.hStackPagination.classList.remove('pagination-mobile');
      this.bridgeRecordTable.visible = true;
      this.mobilePanel.visible = false;
    }
  }

  async init() {
    this.i18n.init({...bridgeRecordJson});
    await super.init();
    this.chainId = this.state.getChainId();
    this.renderFilterButton();
    this.setVisibleMd(true);
    this.sortDateBtn.onClick = () => this.sortDateModal.visible = !this.sortDateModal.visible;
    this.searchSourceBtn.onClick = () => this.searchSourceModal.visible = !this.searchSourceModal.visible;
    this.searchDestinationBtn.onClick = () => this.searchDestinationModal.visible = !this.searchDestinationModal.visible;
    this.searchTokenGroupBtn.onClick = () => this.searchTokenGroupModal.visible = !this.searchTokenGroupModal.visible;
    this.setVisibleMd(false);

    const isConnected = isWalletConnected();
    this.initializedState = {
      chainId: this.state.getChainId(),
      connected: isConnected,
      loading: true
    }
    await this.refreshUI(isConnected);
    this.initializedState.loading = false;
  }

  private onConfirm = async (actionType?: ActionType) => {
    if (!this.state.isRpcWalletConnected()) {
      const chainId = this.state.getChainId();
      const clientWallet = Wallet.getClientInstance();
      await clientWallet.switchNetwork(chainId);
      return;
    }
    showResultMessage(this.txStatusModal, 'warning', this.i18n.get('$confirming'));
    let btnElement = this.btnElm;

    const callback = async (err: Error, receipt?: string) => {
      if (err) {
        showResultMessage(this.txStatusModal, 'error', err);
      } else if (receipt) {
        showResultMessage(this.txStatusModal, 'success', receipt);
        if (btnElement) {
          btnElement.rightIcon.spin = true;
          btnElement.rightIcon.visible = true;
        }
      }
    };

    const confirmationCallback = async () => {
      if (btnElement) {
        btnElement.rightIcon.visible = false;
      }
      this.isPageKept = true;
      await this.updateRecords(this.paging.currentPage);
    };

    registerSendTxEvents({
      transactionHash: callback,
      confirmation: confirmationCallback
    });

    const { fromVaultAddress, toVaultAddress, fromNetwork, orderId } = this.selectedItem;

    if (!actionType) actionType = this.isCancel ? ActionType.Cancel : ActionType.Withdraw
    switch (actionType) {
      case ActionType.Cancel:
        this.requestCancelModal.visible = false;
        requestCancelOrder({ vaultAddress: toVaultAddress, sourceChainId: fromNetwork.chainId, orderId });
        break;
      case ActionType.Resubmit:
        this.resubmitOrderModal.visible = false;
        const tokenOut = Object.assign({}, this.resubmitToken);
        requestAmendOrder(this.state, { vaultAddress: fromVaultAddress, orderId, tokenOut, minAmountOut: new BigNumber(this.newMinAmountOut) }, callback);
        break;
      case ActionType.Withdraw:
        this.requestCancelModal.visible = false;
        withdrawUnexecutedOrder({ vaultAddress: fromVaultAddress, orderId });
        break;
      default:
        break;
    }
  }

  private removeCurrentValues = () => {
    this.isPageKept = false;
    this.currentHash = '';
  }

  private onSwitchNetwork = async (action: ActionType) => {
    try {
      if (action === ActionType.Resubmit) {
        this.resubmitOrderModal.visible = false;
      } else {
        this.requestCancelModal.visible = false;
      }
      this.isPageKept = true;
      this.currentAction = action;
      const { orderId, fromNetwork, toNetwork } = this.selectedItem;
      this.currentHash = `${orderId}-${fromNetwork.chainId}-${toNetwork.chainId}`;
      if (!isWalletConnected()) {
        this.switchNetworkByWallet();
      } else {
        const rpcWallet = this.state.getRpcWallet();
        if (rpcWallet.chainId != this.switchChainId) {
          await rpcWallet.switchNetwork(this.switchChainId);
        }
        const clientWallet = Wallet.getClientInstance();
        await clientWallet.switchNetwork(this.switchChainId);
      }
    } catch {
      this.removeCurrentValues();
    }
  }

  private updateSwitchButton = () => {
    if (this.selectedItem) {
      const { fromNetwork, toNetwork } = this.selectedItem;
      if (this.currentAction === ActionType.Resubmit) {
        this.resubmitOrderModal.visible = true;
        if (fromNetwork.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
          this.resubmitConfirmPnl.visible = false;
          this.resubmitConfirmNetwork.visible = true;
        } else {
          this.resubmitConfirmPnl.visible = true;
          this.resubmitConfirmNetwork.visible = false;
        }
      } else if (this.currentAction === ActionType.Cancel) {
        this.requestCancelModal.visible = true;
        const network = this.isCancel ? toNetwork : fromNetwork;
        if (network.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
          this.switchNetworkPnl.visible = true;
          this.confirmNetwork.visible = false;
        } else {
          this.switchNetworkPnl.visible = false;
          this.confirmNetwork.visible = true;
        }
      }
    }
  }

  private showCancelOrWithdrawModal = (elm: Button, record: VaultOrderItem, isCancel?: boolean) => {
    this.btnElm = elm;
    this.selectedItem = record;
    this.isCancel = isCancel;
    const { fromNetwork, toNetwork, protocolFee } = record;
    const network = isCancel ? toNetwork : fromNetwork;
    this.switchChainId = network.chainId;
    if (network.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
      this.switchNetworkPnl.visible = true;
      this.confirmNetwork.visible = false;
    } else {
      this.switchNetworkPnl.visible = false;
      this.confirmNetwork.visible = true;
    }
    this.titleModalLabel.caption = isCancel ? '$request_cancel' : '$withdraw';
    this.networkNameLabel.caption = isCancel ? '$destination_chain' : '$source_chain';
    this.networkNameVal.caption = network.chainName;
    const amount = record.sourceVaultInAmount || null;
    const symbol = record.sourceVaultToken?.symbol || '';
    this.withdrawAmount.caption = amount === null ? '-' : `${formatNumber(new BigNumber(amount).multipliedBy(new BigNumber(1).minus(protocolFee)))} ${symbol}`;
    this.noteCancelOrWithdraw.caption = isCancel ?
      this.i18n.get('$you_can_withdraw_the_tokens_after_the_cancellation_is_approved_by_the_bridge_trolls._the_cancellation_is_subjected_to_a_cancellation_fee', {fee: `${new BigNumber(protocolFee).multipliedBy(100).toFixed(2)}%`}) :
      '$the_token_will_be_returned_to_your_wallet_after_withdrawal';
    this.noteNetwork.caption = isCancel ?
      '$the_request_must_be_submitted_from_the_destination_chain,_please_switch_your_network_as_instructed' :
      '$the_request_must_be_submitted_from_the_source_chain,_please_switch_your_network_as_instructed';
    this.requestCancelModal.visible = true;
  }

  private showResubmitModal = async (elm: Button, record: VaultOrderItem) => {
    this.btnElm = elm;
    this.selectedItem = record;
    const { fromNetwork, toToken, toNetwork } = record;
    if (fromNetwork.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
      this.resubmitConfirmPnl.visible = false;
      this.resubmitConfirmNetwork.visible = true;
    } else {
      this.resubmitConfirmPnl.visible = true;
      this.resubmitConfirmNetwork.visible = false;
    }

    if (!this.tokenReceiveSelection.onSelectToken) {
      this.tokenReceiveSelection.onSelectToken = async (token: ITokenObject) => {
        this.tokenReceiveSelection.tokenReadOnly = true;
        this.resubmitToken = token;
        await this.updateReceiveVal();
        this.tokenReceiveSelection.tokenReadOnly = false;
      }
    }
    if (this.tokenReceiveSelection.isBtnMaxShown) {
      this.tokenReceiveSelection.isBtnMaxShown = false;
    }
    this.switchChainId = fromNetwork.chainId;
    this.resubmitExpectedReceive.caption = '-';
    // this.resubmitMinimumReceive.caption = '-';
    this.newMinAmountOut = record.minOutAmount;
    this.resubmitOrderModal.visible = true;
    if (this.tokenReceiveSelection.chainId != toNetwork.chainId) {
      this.tokenReceiveSelection.tokenReadOnly = true;
      this.tokenReceiveSelection.chainId = toNetwork.chainId;
      this.tokenReceiveSelection.token = { chainId: toNetwork.chainId, ...toToken };
      await this.getTargetInfoObj(toNetwork.chainId);
      this.tokenReceiveSelection.tokenDataListProp = this.targetTokenList;
      this.tokenReceiveSelection.tokenReadOnly = false;
    } else {
      this.tokenReceiveSelection.token = { chainId: toNetwork.chainId, ...toToken };
    }
    this.resubmitToken = { chainId: toNetwork.chainId, ...toToken };
    this.tokenReceiveSelection.tokenReadOnly = true; // No choosing token for pilot launch
    await this.updateReceiveVal();
  }

  private get targetTokenList() {
    let dataList: ITokenObject[] = [];
    if (this.targetTokenMap) {
      for (const key of Object.keys(this.targetTokenMap)) {
        const tokenAddress = key;
        const tokenObject = this.targetTokenMap[tokenAddress];
        if (this.targetTokenBalances) {
          dataList.push({
            ...tokenObject,
            status: false,
            balance: this.targetTokenBalances[tokenAddress] || 0,
          });
        } else {
          dataList.push({
            ...tokenObject,
            status: null,
          });
        }
      }
    }
    return dataList;
  }

  closeModal = () => {
    this.requestCancelModal.visible = false;
    this.removeCurrentValues();
  }

  private closeResubmitModal = () => {
    this.resubmitOrderModal.visible = false;
    this.removeCurrentValues();
  }

  private resetReceiveVal = () => {
    this.resubmitExpectedReceive.caption = '-';
    this.newMinAmountOut = '0';
  }

  private updateReceiveVal = async () => {
    try {
      const params = { ...this.selectedItem, toToken: { ...this.resubmitToken } };
      let vaultGroup = await findVaultGroupByToken(this.state, params.fromNetwork.chainId, params.sourceVaultToken.address);
      let route = getRoute({
        vaultGroup,
        toChainId: params.toNetwork.chainId,
        fromChainId: params.fromNetwork.chainId,
        inAmount: new BigNumber(params.sourceVaultInAmount)
      });

      //there will be only one route
      let vaultInfo = findConstantToVault(
        this.selectedItem.fromNetwork.chainId,
        this.selectedItem.sourceVaultToken.address,
        this.selectedItem.toNetwork.chainId);
      if (vaultInfo) {
        const { toAmount } = route;
        const minReceivedMaxSold = toAmount.times(1 - this.state.getSlippageTolerance() / 100).toFixed();
        this.newMinAmountOut = minReceivedMaxSold;
        this.resubmitExpectedReceive.caption = formatNumber(toAmount);
        // this.resubmitMinimumReceive.caption = formatNumber(this.newMinAmountOut);
      } else {
        this.resetReceiveVal();
      }
    } catch {
      this.resetReceiveVal();
    }
  }

  private getTargetInfoObj = async (targetChainId: number) => {
    let tokenBalances = tokenStore.getTokenBalancesByChainId(targetChainId);
    if (!tokenBalances || !Object.keys(tokenBalances).length) {
      await tokenStore.updateTokenBalancesByChainId(targetChainId);
    }
    const tokenMap = tokenStore.getTokenMapByChainId(targetChainId);
    tokenBalances = tokenStore.getTokenBalancesByChainId[targetChainId];
    this.targetTokenBalances = tokenBalances;
    this.targetTokenMap = Object.keys(tokenMap || {})
      .reduce((obj: TokenMapType, key: string) => {
        obj[key] = (tokenMap || {})[key];
        return obj;
      }, {});
  }

  private onRefresh = async () => {
    var self = this;
    this.iconRefresh.enabled = false;
    await this.updateRecords(1);
    setTimeout(function () {
      self.lastUpdated = 0;
      self.iconRefresh.enabled = true;
    }, 1000)
  }

  private renderFilterButton() {
    const dropdownSource = this.searchSourceModal.querySelector('.modal');
    const dropdownDestination = this.searchDestinationModal.querySelector('.modal');
    const dropdownTokenGroup = this.searchTokenGroupModal.querySelector('.modal');
    if (this.chainId) {
      if (dropdownSource && dropdownDestination) {
        dropdownSource.innerHTML = '';
        dropdownDestination.innerHTML = '';
        dropdownSource.appendChild(
          <i-button
            caption='$source_chain'
            onClick={() => this.onChangeSource()}
          />
        );
        dropdownDestination.appendChild(
          <i-button
            caption='$destination_chain'
            onClick={() => this.onChangeDestination()}
          />
        );
        this.networkList.forEach((item: IExtendedNetwork) => {
          const url = item.image;
          dropdownSource.appendChild(
            <i-button
              icon={{margin: {right: '0.25rem'}, image: {url, width: 16, height: 16}}}
              caption={item.chainName}
              onClick={() => this.onChangeSource({ ...item, url })}
            />
          );
          dropdownDestination.appendChild(
            <i-button
              icon={{margin: {right: '0.25rem'}, image: {url, width: 16, height: 16}}}
              caption={item.chainName}
              onClick={() => this.onChangeDestination({ ...item, url })}
            />
          );
        });
      }

      if (dropdownTokenGroup) {
        dropdownTokenGroup.innerHTML = '';
        dropdownTokenGroup.appendChild(
          <i-button
            caption="$token_group"
            onClick={() => this.onChangeTokenGroup()}
          />
        );
        VaultGroupList.forEach((item: VaultGroupConstant) => {
          dropdownTokenGroup.appendChild(
            <i-button
              caption={item.assetName}
              onClick={() => this.onChangeTokenGroup(item.assetName)}
            />
          );
        });
      }
    } else {
      if (dropdownSource && dropdownSource && dropdownDestination) {
        dropdownSource.innerHTML = '';
        dropdownDestination.innerHTML = '';
        dropdownTokenGroup.innerHTML = '';
        dropdownTokenGroup.appendChild(
          <i-button
            caption="$token_group"
            onClick={() => this.onChangeTokenGroup()}
          />
        );
        dropdownSource.appendChild(
          <i-button
            caption='$source_chain'
            onClick={() => this.onChangeSource()}
          />
        );
        dropdownDestination.appendChild(
          <i-button
            caption='$destination_chain'
            onClick={() => this.onChangeDestination()}
          />
        );
      }
    }
  }

  private onRenderDataMobile = async () => {
    const list = this.getFilteredData();
    this.bridgeRecordMobile.innerHTML = '';
    if (!list.length) {
      this.bridgeRecordMobile.appendChild(
        <i-panel class="queue-header">
          <i-image url={Assets.fullPath('img/icon-advice.svg')} />
          <i-panel>
            <i-label
              id="emptyMsg"
              caption="$no_data"
              font={{ size: '1rem', color: Theme.text.primary, bold: true }}
              margin={{ left: 10 }}
            />
          </i-panel>
        </i-panel>
      );
      return;
    }

    for (const record of list) {
      const { orderId, fromToken, toToken, fromNetwork, toNetwork } = record;
      // const date = formatDate(record.date, DefaultDateTimeFormat);
      const fromSymbol = fromToken.symbol;
      const toSymbol = toToken.symbol;
      const fromTokenImg = getTokenIcon(fromToken.address, fromNetwork.chainId);
      const toTokenImg = getTokenIcon(toToken.address, toNetwork.chainId);
      const color = record.status == 'Executed' ? 'green' : 'red';
      const expandPanel = await Panel.create();
      expandPanel.visible = false;
      expandPanel.appendChild(this.onExpandedRowRender(record, true));
      this.bridgeRecordMobile.appendChild(
        <i-panel class="bg-item">
          <i-hstack class="row-item">
            <i-vstack class="header-item">
              <i-hstack gap="4px" verticalAlignment="center">
                <i-label caption={fromSymbol} font={{bold: true}} />
                <i-label caption={'to'} />
                <i-label caption={toSymbol} font={{bold: true}} />
                <i-label caption={`#${orderId}`} />
              </i-hstack>
              {/* <i-label class="text-grey text-small" caption={date} /> */}
            </i-vstack>
            <i-vstack class="ml-auto">
              <i-icon class="pointer" margin={{ top: 4 }} name="ellipsis-v" order-hash={`${orderId}-${fromNetwork.chainId}-${toNetwork.chainId}`} fill="#fff" width={15} height={15} onClick={() => { expandPanel.visible = !expandPanel.visible }} />
            </i-vstack>
          </i-hstack>
          <i-hstack margin={{ bottom: 4 }} class="row-item" verticalAlignment="center">
            <i-image margin={{ right: 4 }} width="20px" class="inline-block" url={fromTokenImg} />
            <i-label caption={`${formatNumber(record.fromAmount)} ${fromSymbol}`} />
          </i-hstack>
          <i-hstack class="row-item" verticalAlignment="center">
            <i-image margin={{ right: 4 }} width="20px" class="inline-block" url={getNetworkImg(this.state, fromNetwork.chainId)} />
            <i-label class="text-opacity" caption={fromNetwork.chainName} />
          </i-hstack>
          <i-icon name="angle-down" fill="#fff" margin={{ left: 40, bottom: 8 }} width={16} height={16} />
          <i-hstack margin={{ bottom: 4 }} class="row-item" verticalAlignment="center">
            <i-image margin={{ right: 4 }} width="20px" class="inline-block" url={toTokenImg} />
            <i-label caption={`${formatNumber(record.toAmount)} ${toSymbol}`} />
          </i-hstack>
          <i-hstack class="row-item" verticalAlignment="center">
            <i-image margin={{ right: 4 }} width="20px" class="inline-block" url={getNetworkImg(this.state, toNetwork.chainId)} />
            <i-label class="text-opacity" caption={toNetwork.chainName} />
          </i-hstack>
          <i-hstack class="row-status">
            <i-label class={`${color} text-small`} caption={record.status} />
          </i-hstack>
          {expandPanel}
        </i-panel>
      )
    };
  }

  private onExpandedRowRender = (record: VaultOrderItem, isMobile?: boolean) => {
    let color = record.status == 'Executed' ? "green" : "red"
    let btn = [];
    if (['Pending', 'Expired'].includes(record.status)) {
      btn = (
        <i-panel class="group-btn" margin={{ bottom: 20 }}>
          <i-button caption="$amend_order" height="35" class="btn-request btn-os" onClick={(e: Button) => this.showResubmitModal(e, record)} />
          <i-button caption="$request_cancel" height="35" class="btn-request btn-cancel btn-os" onClick={(e: Button) => this.showCancelOrWithdrawModal(e, record, true)} />
        </i-panel>
      );
    } else if (record.status === 'Cancel Approved') {
      btn = (
        <i-vstack margin={{ bottom: 20 }} horizontalAlignment="center">
          <i-button caption="$withdraw" height="35" class="btn-request btn-os" onClick={(e: Button) => this.showCancelOrWithdrawModal(e, record)} />
        </i-vstack>
      );
    }
    return (
      <i-panel class={`expanded-item flex ${isMobile ? 'expanded-item-mobile' : ''}`}>
        <i-vstack class="col-50">
          <i-hstack class="row-table">
            <i-vstack class="custom-col"><i-label class="text-grey" caption="Minimum Receive" /></i-vstack>
            <i-hstack verticalAlignment="center">
              <i-image width="20px" class="inline-block" margin={{ right: 8 }} url={toTokenIcon(record)}></i-image>
              <i-label caption={`${formatNumber(record.minOutAmount)} ${record.toToken.symbol}`} />
            </i-hstack>
          </i-hstack>
          <i-hstack class="row-table">
            <i-vstack class="custom-col"><i-label class="text-grey" caption="Status" /></i-vstack>
            <i-vstack><i-label class={color} caption={record.status} /></i-vstack>
          </i-hstack>
          <i-hstack class="row-table">
            <i-vstack class="custom-col"><i-label class="text-grey" caption="Sender Address" /></i-vstack>
            <i-hstack>
              <i-label margin={{ right: 8 }} caption={truncateAddress(record.sender, 13)} />
              <i-icon
                name="copy"
                width="14px"
                height="14px"
                fill={Theme.text.primary}
                tooltip={{ content: '$the_address_has_been_copied', trigger: 'click' }}
                onClick={() => application.copyToClipboard(record.sender || '')}
                class="inline-flex pointer"
              ></i-icon>
            </i-hstack>
          </i-hstack>
        </i-vstack>
        <i-vstack class="col-50">
          {/* <i-hstack class="row-table">
            <i-vstack class="custom-col"><i-label class="text-grey" caption="Creation Transaction" /></i-vstack>
            <i-hstack visible={!!record.newOrderTxId}>
              <i-label margin={{ right: 8 }} caption={truncateAddress(record.amendTxId ? record.amendTxId : record.newOrderTxId, 13)} />
              <i-icon name="external-link-alt" fill="#fff" width="15px" height="15px" onClick={() => viewTransaction(record.fromNetwork.chainId, record.amendTxId ? record.amendTxId : record.newOrderTxId)} />
            </i-hstack>
          </i-hstack>
          <i-hstack class="row-table" visible={!record.withdrawTxId}>
            <i-vstack class="custom-col"><i-label class="text-grey" caption="Execution Transaction" /></i-vstack>
            <i-hstack visible={!!record.swapTxId}>
              <i-label margin={{ right: 8 }} caption={truncateAddress(record.swapTxId, 13)} />
              <i-icon name="external-link-alt" fill="#fff" width="15px" height="15px" onClick={() => viewTransaction(record.toNetwork.chainId, record.swapTxId)} />
            </i-hstack>
          </i-hstack>
          <i-hstack class="row-table" visible={!!record.withdrawTxId}>
            <i-vstack class="custom-col"><i-label class="text-grey" caption="Withdrawal Transaction" /></i-vstack>
            <i-hstack >
              <i-label margin={{ right: 8 }} caption={truncateAddress(record.withdrawTxId, 13)} />
              <i-icon name="external-link-alt" fill="#fff" width="15px" height="15px" onClick={() => viewTransaction(record.fromNetwork.chainId, record.withdrawTxId)} />
            </i-hstack>
          </i-hstack> */}
          {btn}
        </i-vstack>
      </i-panel>
    );
  }

  render() {
    return (
      <i-panel class={`${bridgeStyle} template-layout`}>
        <i-panel id="bridge-container">
          {/* <i-panel margin={{ top: 40, bottom: 20 }}>
            <i-label caption='Bridge Record' font={{ color: Theme.colors.secondary.main, size: '2.5rem', bold: true }}></i-label>
          </i-panel> */}
          <i-hstack wrap="wrap-reverse" justifyContent="space-between" margin={{ bottom: 20 }}>
            <i-hstack minWidth={255} margin={{ top: 4 }} verticalAlignment="center">
              <i-label caption={this.lastUpdatedText} margin={{ right: 5 }}></i-label>
              <i-icon id="iconRefresh" width={15} height={15} class="rounded-icon" name="sync-alt" fill={Theme.text.primary} onClick={this.onRefresh}></i-icon>
            </i-hstack>
            <i-panel class="group-filter">
              <i-panel class="btn-dropdown" width='165px'>
                <i-button
                  id="sortDateBtn"
                  caption="$latest_swap"
                  rightIcon={{ name: "angle-down" }}
                  width="calc(100% - 1px)"
                  font={{ size: '1rem' }}
                ></i-button>
                <i-modal
                  id="sortDateModal"
                  showBackdrop={false}
                  width="100%" height='auto'
                  popupPlacement='bottom'
                >
                  <i-panel>
                    <i-button caption="$latest_swap" onClick={() => this.onChangeSorting(DateOptions.LATEST)} />
                    <i-button caption="$oldest_swap" onClick={() => this.onChangeSorting(DateOptions.OLDEST)} />
                  </i-panel>
                </i-modal>
              </i-panel>

              <i-panel class="btn-dropdown" width='165px'>
                <i-button
                  id="searchTokenGroupBtn"
                  rightIcon={{ name: "angle-down" }}
                  caption="$token_group"
                  width="calc(100% - 1px)"
                  font={{ size: '1rem' }}
                ></i-button>
                <i-modal
                  id="searchTokenGroupModal"
                  showBackdrop={false}
                  width='100%' height='auto'
                  popupPlacement='bottom'
                ></i-modal>
              </i-panel>

              <i-panel class="btn-dropdown" width='165px'>
                <i-button
                  id="searchSourceBtn"
                  rightIcon={{ name: "angle-down" }}
                  caption="$source_chain"
                  width="calc(100% - 1px)"
                  font={{ size: '1rem' }}
                ></i-button>
                <i-modal
                  id="searchSourceModal"
                  showBackdrop={false}
                  width='100%' height='auto'
                  popupPlacement='bottom'
                ></i-modal>
              </i-panel>

              <i-panel class="btn-dropdown" width='165px'>
                <i-button
                  id="searchDestinationBtn"
                  rightIcon={{ name: "angle-down" }}
                  caption="$destination_chain"
                  width="calc(100% - 1px)"
                  font={{ size: '1rem' }}
                ></i-button>
                <i-modal
                  id="searchDestinationModal"
                  showBackdrop={false}
                  width='100%' height='auto'
                  popupPlacement='bottom'
                ></i-modal>
              </i-panel>
            </i-panel>
          </i-hstack>
          <i-panel>
            <i-vstack id="largeLoading" class="i-loading-overlay">
              <i-vstack class="i-loading-spinner" horizontalAlignment="center" verticalAlignment="center">
                <i-icon
                  class="i-loading-spinner_icon"
                  cursor="default"
                  image={{ url: Assets.fullPath('img/loading.svg'), width: 36, height: 36 }}
                ></i-icon>
                <i-label
                  caption="$loading" font={{ color: '#FD4A4C', size: '1.5em' }}
                  class="i-loading-spinner_text"
                ></i-label>
              </i-vstack>
            </i-vstack>
            <i-panel id="mobilePanel" minHeight={100} visible={false}>
              <i-hstack horizontalAlignment="center">
                <i-vstack id="bridgeRecordMobile" />
              </i-hstack>
            </i-panel>

            <i-table
              id="bridgeRecordTable"
              class="os-table"
              margin={{ bottom: 30 }}
              columns={bridgeRecordColumns}
              data={this.getFilteredData()}
              expandable={{
                onRenderExpandedRow: this.onExpandedRowRender,
                rowExpandable: true
              }}
              onRenderEmptyTable={this.renderEmpty.bind(this)}
            ></i-table>
            <i-hstack id="hStackPagination" margin={{ top: 16, bottom: 20 }} class="record-pagination">
              <i-pagination
                id="listPagination"
                width="auto"
                totalPages={this.paging.totalPage}
                currentPage={this.paging.currentPage}
                onPageChanged={this.onSelectIndex.bind(this)}
              />
            </i-hstack>
          </i-panel>
          <i-modal id="requestCancelModal" class="custom-modal_header" width={400} maxWidth="95%">
            <i-hstack class="header" horizontalAlignment="space-between">
              <i-label id="titleModalLabel" caption="$request_cancel" />
              <i-icon width={20} height={20} class="cursor-pointer" name="times" fill={Theme.colors.primary.main} onClick={() => this.closeModal()} />
            </i-hstack>
            <i-panel background={{ color: Theme.divider }} height={2} width='100%' margin={{ top: 10, bottom: 20 }} />
            <i-hstack horizontalAlignment="space-between" margin={{ bottom: 20 }}>
              <i-label id="networkNameLabel" />
              <i-label id="networkNameVal" />
            </i-hstack>
            <i-hstack horizontalAlignment="space-between" margin={{ bottom: 20 }}>
              <i-label caption="$withdraw_amount" />
              <i-label id="withdrawAmount" />
            </i-hstack>
            <i-panel width="100%" margin={{ bottom: 30 }}>
              <i-label id="noteCancelOrWithdraw" class="inline" />
            </i-panel>
            <i-panel id="switchNetworkPnl">
              <i-panel width="100%" margin={{ bottom: 30 }}>
                <i-label id="noteNetwork" class="inline" font={{ color: 'yellow' }} />
              </i-panel>
              <i-hstack margin={{ top: 20, bottom: 20 }} horizontalAlignment="center">
                <i-button height='auto' width={150} maxWidth='50%' class="btn-bridge btn-os" caption='$switch_network' onClick={() => this.onSwitchNetwork(ActionType.Cancel)} />
              </i-hstack>
            </i-panel>
            <i-panel id="confirmNetwork" visible={false}>
              <i-hstack margin={{ top: 20, bottom: 20 }} horizontalAlignment="center">
                <i-button height='auto' width={150} maxWidth='50%' class="btn-bridge btn-os" caption='$confirm' onClick={() => this.onConfirm()} />
              </i-hstack>
            </i-panel>
          </i-modal>

          <i-modal id="resubmitOrderModal" class="custom-modal_header" width={400} maxWidth="95%">
            <i-hstack class="header" horizontalAlignment="space-between">
              <i-label caption="$amend_order" />
              <i-icon width={20} height={20} class="cursor-pointer" name="times" fill={Theme.colors.primary.main} onClick={() => this.closeResubmitModal()} />
            </i-hstack>
            <i-panel background={{ color: Theme.divider }} height={2} width="100%" margin={{ top: 10, bottom: 20 }} />
            <i-hstack horizontalAlignment="space-between" verticalAlignment="center" margin={{ bottom: 20 }}>
              <i-label caption="$token_receive" />
              <i-scom-token-input id="tokenReceiveSelection" class="custom-token-input" isInputShown={false} isBtnMaxShown={false} isBalanceShown={false} isCommonShown={false} isSortBalanceShown={false} width="auto" />
            </i-hstack>
            <i-hstack horizontalAlignment="space-between" margin={{ bottom: 20 }}>
              <i-label caption="$expected_receive" />
              <i-label id="resubmitExpectedReceive" />
            </i-hstack>
            <i-panel id="resubmitConfirmNetwork">
              <i-hstack margin={{ top: 20, bottom: 20 }} horizontalAlignment="center">
                <i-button height="auto" width={150} maxWidth="50%" class="btn-bridge btn-os" caption="$switch_network" onClick={() => this.onSwitchNetwork(ActionType.Resubmit)} />
              </i-hstack>
            </i-panel>
            <i-panel id="resubmitConfirmPnl" visible={false}>
              <i-hstack margin={{ top: 20, bottom: 20 }} horizontalAlignment="center">
                <i-button height='auto' width={150} maxWidth='50%' class="btn-bridge btn-os" caption="$confirm" onClick={() => this.onConfirm(ActionType.Resubmit)} />
              </i-hstack>
            </i-panel>
          </i-modal>

          <i-scom-tx-status-modal id="txStatusModal" />
        </i-panel>
      </i-panel>
    )
  }
}