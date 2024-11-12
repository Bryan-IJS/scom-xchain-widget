import {
  customModule,
  observable,
  Control,
  Module,
  Styles,
  Modal,
  Label,
  Button,
  Image,
  Input,
  Panel,
  Container,
  application,
  IEventBus,
  HStack,
  VStack,
  ControlElement,
  customElements,
  Tabs
} from '@ijstech/components';
import { BigNumber, Constants, IERC20ApprovalAction, Wallet } from '@ijstech/eth-wallet';
import {
  isWalletConnected,
  getWalletProvider,
  WalletPlugin,
  orderMinOutRate,
  State,
  SupportedERC20Tokens
} from './store/index';
import {
  formatNumber,
  EventId,
  IExtendedNetwork,
  limitDecimals,
  isInvalidInput,
  showResultMessage,
} from './global/index'
import {
  getVaultAssetBalance,
  createBridgeVaultOrder,
  getRoute,
  findVaultGroupByToken,
  Route,
  getBond,
  getVaultGroups,
  getCommissionRate,
} from './crosschain-utils/index';
import { PriceInfo } from './price-info/index';
import ScomCommissionFeeSetup from '@scom/scom-commission-fee-setup';
import ScomTokenInput from '@scom/scom-token-input';
import ScomTxStatusModal from '@scom/scom-tx-status-modal';
import ScomDappContainer from '@scom/scom-dapp-container'
import { tokenStore, assets as tokenAssets, ITokenObject, ChainNativeTokenByChainId } from '@scom/scom-token-list';
import ScomWalletModal, { IWalletPlugin } from '@scom/scom-wallet-modal';
import { ExpertModeSettings } from './expert-mode-settings/index';
import { TransactionSettings } from './transaction-settings/index';
import { BridgeRecord } from './bridge-record/index';
import { getBuilderSchema, getProjectOwnerSchema } from './formSchema';
import { swapStyle, tabStyle } from './index.css';
import configData from './data.json';
import { Block, BlockNoteEditor, BlockNoteSpecs, callbackFnType, executeFnType, getWidgetEmbedUrl, parseUrl } from '@scom/scom-blocknote-sdk';

const Theme = Styles.Theme.ThemeVars;

export enum ApprovalStatus {
  TO_BE_APPROVED,
  APPROVING,
  NONE,
}

interface ICommissionInfo {
  chainId: number;
  walletAddress: string;
}

interface INetworkConfig {
  chainName?: string;
  chainId: number;
}

interface ITokenConfig {
  chainId: number;
  address?: string;
}

const defaultInput = '1';
const ROUNDING_NUMBER = BigNumber.ROUND_DOWN;

interface ScomXchainWidgetElement extends ControlElement {
  campaignId?: number;
  lazyLoad?: boolean;
  tokens?: ITokenConfig[];
  defaultChainId: number;
  networks: INetworkConfig[];
  wallets: IWalletPlugin[];
  showHeader?: boolean;
  commissions?: ICommissionInfo[];
  defaultInputToken?: ITokenConfig;
}

export interface IXchainWidgetData {
  campaignId?: number;
  commissions?: ICommissionInfo[];
  tokens?: ITokenConfig[];
  defaultChainId: number;
  wallets: IWalletPlugin[];
  networks: INetworkConfig[];
  showHeader?: boolean;
  defaultInputToken?: ITokenConfig;
}


declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-xchain-widget']: ScomXchainWidgetElement;
    }
  }
}
declare const window: any;

@customModule
@customElements('i-scom-xchain-widget')
export default class ScomXchainWidget extends Module implements BlockNoteSpecs {
  private tabs: Tabs;
  private swapContainer: Container;
  private pnlBridgeRecord: Panel;
  private receiveContainer: Panel;
  private payBalance: Label;
  private receiveBalance: Label;
  private firstTokenInput: ScomTokenInput;
  private secondTokenInput: ScomTokenInput;
  private payCol: VStack;
  private receiveCol: VStack;
  private swapModal: Modal;
  private priceInfo: PriceInfo;
  private priceInfo2: PriceInfo;
  private priceInfoContainer: Panel;
  private fromTokenImage: Image;
  private fromTokenLabel: Label;
  private fromTokenValue: Label;
  private toTokenImage: Image;
  private toTokenLabel: Label;
  private toTokenValue: Label;
  private payOrReceiveValue: Label;
  private payOrReceiveToken: Label;
  private txStatusModal: ScomTxStatusModal;
  private maxButton: Button;
  private swapBtn: Button;
  private actionSetting: Panel;
  private lbSwitchNetwork: Label;
  private urlParams: URLSearchParams;

  private isFrom: boolean;
  private fromToken?: ITokenObject;
  private toToken?: ITokenObject;
  private fromTokenSymbol: string;
  private toTokenSymbol: string;
  private fromInputValue: BigNumber;
  private toInputValue: BigNumber;
  private timeout: any;
  private isPriceToggled: boolean;
  private record: Route;
  private chainId: number;
  @observable()
  private swapButtonText: string = '';
  private _lastUpdated: number = 0;
  @observable()
  private lastUpdatedText: string = '';
  private timer: any;
  private $eventBus: IEventBus;
  @observable()
  private estimateMsg: string = '';
  @observable()
  private payOrReceiveText: string = '';
  private approvalModelAction: IERC20ApprovalAction;

  // Cross Chain
  private crossChainApprovalStatus: ApprovalStatus = ApprovalStatus.NONE;
  private oldSupportedChainList: IExtendedNetwork[] = [];
  private supportedChainList: IExtendedNetwork[] = [];
  private minSwapHintLabel: Label;
  private srcChain: IExtendedNetwork | undefined;
  private desChain: IExtendedNetwork | undefined;
  private targetChainId: number | undefined;
  private srcChainFirstPanel: Panel;
  private targetChainFirstPanel: Panel;
  private srcChainTokenImage: Image;
  private srcChainTokenLabel: Label;
  private targetChainTokenImage: Image;
  private targetChainTokenLabel: Label;
  private targetChainSecondPanel: Panel;
  private targetChainVaultImage: Image;
  private targetChainVaultLabel: Label;
  private targetVaultTokenImage: Image;
  private targetVaultTokenLabel: Label;
  private targetVaultTokenValue: Label;
  private targetVaultAssetBalanceLabel1: Label;
  private targetVaultBondBalanceLabel1: Label;
  private crossChainSoftCapLabel1: Label;
  private targetVaultAssetBalanceLabel2: Label;
  private targetVaultBondBalanceLabel2: Label;
  private crossChainSoftCapLabel2: Label;
  private swapModalConfirmBtn: Button;
  private crossChainVaultInfoVstack: VStack;
  // private modalViewOrder: Modal;
  private modalFees: Modal;
  private feesInfo: VStack;
  private lbReminderRejected: Label;

  private btnSourceChain: Button;
  private mdSourceChain: Modal;
  private listElmSrcChain: VStack;
  private isSrcOpened: boolean;
  private expertModal: ExpertModeSettings;
  private transactionModal: TransactionSettings;
  private bridgeRecord: BridgeRecord;

  private btnDestinationChain: Button;
  private mdDestinationChain: Modal;
  private listElmDesChain: VStack;
  private isDesOpened: boolean;
  private dappContainer: ScomDappContainer;
  private mdWallet: ScomWalletModal;
  private state: State;
  private isInited: boolean = false;
  private supportedChainIds: number[];

  private _data: IXchainWidgetData = {
    defaultChainId: 0,
    wallets: [],
    tokens: [],
    networks: []
  };
  tag: any = {};
  private _tokens: ITokenObject[] = [];

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.deferReadyCallback = true;
  }

  addBlock(blocknote: any, executeFn: executeFnType, callbackFn?: callbackFnType) {
    const blockType = 'xchain';
    const moduleData = {
      name: "@scom/scom-xchain-widget",
      localPath: "scom-xchain-widget"
    }

    function getData(href: string) {
      const widgetData = parseUrl(href);
      if (widgetData) {
        const { module, properties } = widgetData;
        if (module.localPath === moduleData.localPath) return { ...properties };
      }
      return false;
    }

    const XchainBlock = blocknote.createBlockSpec({
      type: blockType,
      propSchema: {
        ...blocknote.defaultProps,
        tokens: { default: [] },
        defaultChainId: { default: 0 },
        networks: { default: [] },
        wallets: { default: [] },
        commissions: { default: [] },
        defaultInputToken: { default: null },
      },
      content: "none"
    },
    {
      render: (block: Block) => {
        const wrapper = new Panel();
        const props = JSON.parse(JSON.stringify(block.props));
        const customElm = new ScomXchainWidget(wrapper, { ...props });
        if (typeof callbackFn === 'function') callbackFn(customElm, block);
        wrapper.appendChild(customElm);
        return {
          dom: wrapper
        };
      },
      parseFn: () => {
        return [
          {
            tag: `div[data-content-type=${blockType}]`,
            node: blockType
          },
          {
            tag: "a",
            getAttrs: (element: string | HTMLElement) => {
              if (typeof element === "string") {
                return false;
              }
              const href = element.getAttribute('href');
              if (href) return getData(href);
              return false;
            },
            priority: 402,
            node: blockType
          },
          {
            tag: "p",
            getAttrs: (element: string | HTMLElement) => {
              if (typeof element === "string") {
                return false;
              }
              const child = element.firstChild as HTMLElement;
              if (child?.nodeName === 'A' && child.getAttribute('href')) {
                const href = child.getAttribute('href');
                return getData(href);
              }
              return false;
            },
            priority: 403,
            node: blockType
          },
        ]
      },
      toExternalHTML: (block: any, editor: any) => {
        const link = document.createElement("a");
        const url = getWidgetEmbedUrl(
          {
            type: blockType,
            props: { ...(block.props || {}) }
          },
          moduleData
        );
        link.setAttribute("href", url);
        link.textContent = blockType;
        const wrapper = document.createElement("p");
        wrapper.appendChild(link);
        return { dom: wrapper };
      }
    });

    const XchainSlashItem = {
      name: "Xchain",
      execute: (editor: BlockNoteEditor) => {
        const block: any = {
          type: blockType,
          props: configData.defaultBuilderData
        };
        if (typeof executeFn === 'function') {
          executeFn(editor, block);
        }
      },
      aliases: [blockType, "widget"],
      group: "Widget",
      icon: {name: 'exchange-alt'},
      hint: "Insert an xchain widget",
    }

    return {
      block: XchainBlock,
      slashItem: XchainSlashItem,
      moduleData
    }
  }

  removeRpcWalletEvents() {
    const rpcWallet = this.state.getRpcWallet();
    if (rpcWallet) rpcWallet.unregisterAllWalletEvents();
  }

  onHide() {
    this.dappContainer.onHide();
    this.removeRpcWalletEvents();
    this.bridgeRecord?.onHide();
  }

  private get isInsufficientBalance(): boolean {
    if (!this.fromToken && !this.record) return false;
    const balance = this.getBalance(this.fromToken);
    return this.record?.fromAmount && this.record.fromAmount.gt(balance)
  }

  private get lastUpdated(): number {
    return this._lastUpdated
  }

  private set lastUpdated(value: number) {
    this._lastUpdated = value;
    this.lastUpdatedText = `Last updated ${this._lastUpdated}(s) ago`;
  }

  private get isValidToken(): boolean {
    try {
      return !!this.fromToken.symbol && !!this.toToken.symbol;
    } catch {
      return false;
    }
  }

  private get targetTokenMap() {
    const chainId = this.desChain?.chainId || this.targetChainId || this.state.getChainId();
    return tokenStore.getTokenMapByChainId(chainId);
  }

  private get defaultTargetChainId() {
    return this.supportedChainList.find(v => v.chainId !== this.state.getChainId())?.chainId;
  }

  get defaultChainId() {
    return this._data.defaultChainId;
  }

  set defaultChainId(value: number) {
    this._data.defaultChainId = value;
  }

  get wallets() {
    return this._data.wallets ?? [];
  }

  set wallets(value: IWalletPlugin[]) {
    this._data.wallets = value;
  }

  get networks() {
    return this._data.networks ?? [];
  }

  set networks(value: INetworkConfig[]) {
    this._data.networks = value;
  }

  get showHeader() {
    return this._data.showHeader ?? true;
  }

  set showHeader(value: boolean) {
    this._data.showHeader = value;
  }

  set width(value: string | number) {
    this.resizeBridgeRecord(value);
  }

  private determineActionsByTarget(target: 'builder' | 'projectOwner', category?: string) {
    if (target === 'builder') {
      return this.getBuilderActions(category);
    }
    else {
      return this.getProjectOwnerActions();
    }
  }

  private async loadCommissionFee() {
    if (this._data.campaignId && this.state.embedderCommissionFee === undefined) {
      const commissionRate = await getCommissionRate(this.state, this._data.campaignId);
      this.state.embedderCommissionFee = commissionRate;
    }
  }

  private getBuilderActions(category?: string) {
    const formSchema: any = getBuilderSchema();
    const dataSchema = formSchema.dataSchema;
    const uiSchema = formSchema.uiSchema;
    const customControls = formSchema.customControls();
    let self = this;
    const actions: any[] = [
      {
        name: 'Commissions',
        icon: 'dollar-sign',
        command: (builder: any, userInputData: any) => {
          let _oldData: IXchainWidgetData = {
            defaultChainId: 0,
            wallets: [],
            networks: []
          }
          return {
            execute: async () => {
              _oldData = { ...this._data };
              if (userInputData.commissions) this._data.commissions = userInputData.commissions;
              this.refreshUI();
              if (builder?.setData) builder.setData(this._data);
            },
            undo: () => {
              this._data = { ..._oldData };
              this.refreshUI();
              if (builder?.setData) builder.setData(this._data);
            },
            redo: () => { }
          }
        },
        customUI: {
          render: async (data?: any, onConfirm?: (result: boolean, data: any) => void) => {
            const vstack = new VStack();
            await self.loadCommissionFee();
            const config = new ScomCommissionFeeSetup(null, {
              commissions: self._data.commissions || [],
              fee: self.state.embedderCommissionFee,
              networks: self._data.networks
            });
            const hstack = new HStack(null, {
              verticalAlignment: 'center',
            });
            const button = new Button(hstack, {
              caption: 'Confirm',
              width: '100%',
              height: 40,
              font: { color: Theme.colors.primary.contrastText }
            });
            vstack.append(config);
            vstack.append(hstack);
            button.onClick = async () => {
              const commissions = config.commissions;
              if (onConfirm) onConfirm(true, { commissions });
            }
            return vstack;
          }
        }
      }
    ]
    if (category && category !== 'offers') {
      actions.push({
        name: 'Edit',
        icon: 'edit',
        command: (builder: any, userInputData: any) => {
          let oldData: any = {
            defaultChainId: 0,
            wallets: [],
            networks: []
          };
          let oldTag = {};
          return {
            execute: async () => {
              oldData = JSON.parse(JSON.stringify(this._data));
              const {
                networks,
                tokens,
                ...themeSettings
              } = userInputData;

              const generalSettings = {
                networks,
                tokens
              };

              this._data.networks = generalSettings.networks;
              this._data.defaultChainId = this._data.networks[0].chainId;
              this._tokens = this._data.tokens = [];
              if (generalSettings.tokens) {
                this._data.tokens = generalSettings.tokens;
                this._tokens = this.getTokenObjArr(generalSettings.tokens);
              }
              await this.resetRpcWallet();
              this.refreshUI();
              if (builder?.setData) builder.setData(this._data);

              oldTag = JSON.parse(JSON.stringify(this.tag));
              if (builder?.setTag) builder.setTag(themeSettings);
              else this.setTag(themeSettings);
              if (this.dappContainer) this.dappContainer.setTag(themeSettings);
            },
            undo: () => {
              this._data = JSON.parse(JSON.stringify(oldData));
              this.refreshUI();
              if (builder?.setData) builder.setData(this._data);

              this.tag = JSON.parse(JSON.stringify(oldTag));
              if (builder?.setTag) builder.setTag(this.tag);
              else this.setTag(this.tag);
              if (this.dappContainer) this.dappContainer.setTag(this.tag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: dataSchema,
        userInputUISchema: uiSchema,
        customControls: customControls
      });
    }
    return actions
  }

  private getProjectOwnerActions() {
    const formSchema: any = getProjectOwnerSchema();
    if (!formSchema) return [];
    const propertiesDataSchema = formSchema.general.dataSchema;
    const propertiesUISchema = formSchema.general.uiSchema;
    const actions: any[] = [
      {
        name: 'Settings',
        userInputDataSchema: propertiesDataSchema,
        userInputUISchema: propertiesUISchema
      }
    ];
    return actions
  }

  getConfigurators() {
    let self = this;
    return [
      {
        name: 'Project Owner Configurator',
        target: 'Project Owners',
        getActions: (category?: string) => {
          return this.determineActionsByTarget('projectOwner', category);
        },
        getData: this.getData.bind(this),
        setData: async (value: any) => {
          this.setData(value);
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: (category?: string) => {
          return this.determineActionsByTarget('builder', category);
        },
        getData: this.getData.bind(this),
        setData: async (value: any) => {
          const defaultData = configData.defaultBuilderData;
          this.setData({ ...defaultData, ...value });
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Embedder Configurator',
        target: 'Embedders',
        elementName: 'i-scom-commission-fee-setup',
        getLinkParams: () => {
          const commissions = this._data.commissions || [];
          return {
            data: window.btoa(JSON.stringify(commissions))
          }
        },
        bindOnChanged: (element: ScomCommissionFeeSetup, callback: (data: any) => Promise<void>) => {
          element.onChanged = async (data: any) => {
            const commissions: ICommissionInfo[] = data.commissions;
            if (commissions) {
              this.supportedChainIds = commissions.map(v => v.chainId).filter((v, i, a) => a.indexOf(v) === i);
            }
            let resultingData = {
              ...self._data,
              ...data
            };

            await this.setData(resultingData);
            await callback(data);
          }
        },
        getData: async () => {
          await self.loadCommissionFee();
          const fee = this.state.embedderCommissionFee;
          return { ...this._data, fee }
        },
        setData: async (properties: IXchainWidgetData, linkParams?: Record<string, any>) => {
          let resultingData = {
            ...properties
          }
          if (linkParams?.data) {
            const decodedString = window.atob(linkParams.data);
            const commissions = JSON.parse(decodedString);
            resultingData.commissions = commissions;

          }
          await this.setData(resultingData);
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Editor',
        target: 'Editor',
        getActions: (category?: string) => {
          const actions = this.determineActionsByTarget('builder', 'category');
          const editAction = actions.find(action => action.name === 'Edit');
          return editAction ? [editAction] : [];
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  private getData() {
    return this._data;
  }

  private async resetRpcWallet() {
    this.removeRpcWalletEvents();
    const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
    const rpcWallet = this.state.getRpcWallet();
    const chainChangedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.ChainChanged, async (chainId: number) => {
      this.onChainChange();
      if (this.bridgeRecord) this.bridgeRecord.onChainChange();
    });
    const connectedEvent = rpcWallet.registerWalletEvent(this, Constants.RpcWalletEvent.Connected, async (connected: boolean) => {
      if (this.swapBtn) this.swapBtn.visible = true;
      if (this.bridgeRecord) this.bridgeRecord.onWalletConnect();
      await this.initializeWidgetConfig();
    });
    const data: any = {
      defaultChainId: this.defaultChainId,
      wallets: this.wallets,
      networks: this.networks,
      showHeader: this.showHeader,
      rpcWalletId: rpcWallet.instanceId
    }
    if (this.dappContainer?.setData) this.dappContainer.setData(data);
  }

  private async setData(value: IXchainWidgetData) {
    this._data = value;
    this.state.setNetworkConfig(value.networks);
    for (let network of this._data.networks) {
      tokenStore.updateTokenMapData(network.chainId);
    }
    this._tokens = this.getTokenObjArr(this._data.tokens);
    await this.resetRpcWallet();
    await this.refreshUI();
  }

  private async getTag() {
    return this.tag;
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this.tag[type] = this.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop))
        this.tag[type][prop] = value[prop];
    }
  }

  private async setTag(value: any) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark')
          this.updateTag(prop, newValue[prop]);
        else
          this.tag[prop] = newValue[prop];
      }
    }
    if (this.dappContainer)
      this.dappContainer.setTag(this.tag);
    this.updateTheme();
    this.resizeBridgeRecord();
  }

  private updateStyle(name: string, value: any) {
    value ?
      this.style.setProperty(name, value) :
      this.style.removeProperty(name);
  }

  private updateTheme() {
    const themeVar = this.dappContainer?.theme || 'light';
    this.updateStyle('--text-primary', this.tag[themeVar]?.fontColor);
    this.updateStyle('--background-main', this.tag[themeVar]?.backgroundColor);
    this.updateStyle('--input-font_color', this.tag[themeVar]?.inputFontColor);
    this.updateStyle('--input-background', this.tag[themeVar]?.inputBackgroundColor);
    //FIXME: temporary solution
    this.updateStyle('--primary-button-background', this.tag[themeVar]?.primaryButtonBackground || 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box');
    this.updateStyle('--primary-button-hover-background', this.tag[themeVar]?.primaryButtonHoverBackground || 'linear-gradient(255deg,#f15e61,#b52082)');
    this.updateStyle('--primary-button-disabled-background', this.tag[themeVar]?.primaryButtonDisabledBackground || 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box');
    this.updateStyle('--max-button-background', this.tag[themeVar]?.maxButtonBackground || 'transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box');
    this.updateStyle('--max-button-hover-background', this.tag[themeVar]?.maxButtonHoverBackground || 'linear-gradient(255deg,#f15e61,#b52082)');
  }

  private async refreshUI() {
    await this.initData();
    await this.initializeWidgetConfig();
  }

  private async initData() {
    if (!this.isInited) {
      await this.initApprovalModelAction();
      this.isInited = true;
    }
  }

  isEmptyData(value: IXchainWidgetData) {
    return !value || !value.networks || value.networks.length === 0;
  }

  async init() {
    super.init();
    this.state = new State(configData);
    this.fromInputValue = new BigNumber(0);
    this.toInputValue = new BigNumber(0);
    this.$eventBus = application.EventBus;
    this.mdSourceChain.visible = this.mdDestinationChain.visible = true;
    this.chainId = this.state.getChainId();
    this.swapButtonText = this.getSwapButtonText();
    this.mdSourceChain.visible = this.mdDestinationChain.visible = false;
    this.initExpertModal();
    this.initTransactionModal();
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const campaignId = this.getAttribute('campaignId', true);
      const commissions = this.getAttribute('commissions', true, []);
      const defaultChainId = this.getAttribute('defaultChainId', true);
      const defaultInputToken = this.getAttribute('defaultInputToken', true);
      const tokens = this.getAttribute('tokens', true, []);
      const networks = this.getAttribute('networks', true);
      const wallets = this.getAttribute('wallets', true);
      const showHeader = this.getAttribute('showHeader', true);
      let data = {
        campaignId,
        commissions,
        defaultChainId,
        defaultInputToken,
        tokens,
        networks,
        wallets,
        showHeader
      };
      if (!this.isEmptyData(data)) {
        await this.setData(data);
      }
    };

    this.initBridgeRecord();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.bridgeRecord?.resizeLayout(Number(this.tag?.width));
      }, 300);
    });
    this.executeReadyCallback();
  }

  private fixedNumber = (value: BigNumber | string | number) => {
    const val = typeof value === 'object' ? value : new BigNumber(value);
    if (val.isNaN()) return '0';
    let formatted = '';
    if (val.gte(1)) {
      formatted = val.toNumber().toLocaleString('en-US', { maximumFractionDigits: 4 });
    } else {
      formatted = val.toNumber().toLocaleString('en-US', { maximumSignificantDigits: 4 });
    }
    return formatted.replace(/,/g, '');
  }

  private calculateDefaultTokens() {
    let firstDefaultToken: ITokenObject;
    let secondDefaultToken: ITokenObject;
    const currentChainId = this.state.getChainId();
    const targetChainId = this.desChain?.chainId || this.targetChainId || currentChainId;
    const currentChainTokens = this.getSupportedTokens(this._tokens, currentChainId);
    const targetChainTokens = this.getSupportedTokens(this._tokens, targetChainId);
    if (!this._data.defaultInputToken) {
      firstDefaultToken = currentChainTokens[0];
      secondDefaultToken = targetChainTokens[0];
    }
    else {
      if (this._data.defaultInputToken && currentChainId === this._data.defaultInputToken.chainId) {
        let inputTokens = this.getSupportedTokens(this._tokens, this._data.defaultInputToken.chainId);
        firstDefaultToken = inputTokens.find(v => v.chainId === this._data.defaultInputToken.chainId && v.address === this._data.defaultInputToken.address);
      }
      else {
        firstDefaultToken = currentChainTokens[0];
      }
      secondDefaultToken = targetChainTokens[0];
    }
    return {
      firstDefaultToken,
      secondDefaultToken
    }
  }

  private initWallet = async () => {
    try {
      await Wallet.getClientInstance().init();
      const rpcWallet = this.state.getRpcWallet();
      await rpcWallet.init();
    } catch (err) {
      console.log(err);
    }
  }

  private initializeWidgetConfig = async () => {
    setTimeout(async () => {
      await this.initWallet();
      this.calculateDefaultTokens();
      this.chainId = this.state.getChainId();
      this.swapButtonText = this.getSwapButtonText();
      await this.updateBalances();
      await this.renderChainList();

      await getVaultGroups(this.state, true);

      this.initRoutes();
      this.toInputValue = new BigNumber(0);
      if (this.secondTokenInput) {
        this.secondTokenInput.value = '-';
        this.secondTokenInput.inputReadOnly = true;
        this.secondTokenInput.classList.add('cursor-input--default');
      }
      if (this.isEstimated('from')) {
        this.onUpdateEstimatedPosition(false, true);
      }
      this.firstTokenInput.chainId = this.srcChain?.chainId || this.chainId;
      this.secondTokenInput.chainId = this.desChain?.chainId || this.targetChainId;
      this.setDefaultToken();
      this.setGroupToken(true);
      if (this.fromInputValue.isGreaterThanOrEqualTo(0)) {
        this.onUpdateEstimatedPosition(false, true);
        this.firstTokenInput.value = this.fixedNumber(this.fromInputValue);
      } else if (this.toInputValue.isGreaterThanOrEqualTo(0)) {
        this.onUpdateEstimatedPosition(true, true);
        this.secondTokenInput.value = this.fixedNumber(this.toInputValue);
        this.secondTokenInput.inputReadOnly = true;
        this.secondTokenInput.classList.add('cursor-input--default');
      }
      this.firstTokenInput.tokenDataListProp = this.getSupportedTokens(this._tokens, this.fromToken.chainId);
      this.secondTokenInput.tokenDataListProp = this.getSupportedTokens(this._tokens, this.toToken.chainId);
      this.actionSetting?.classList.remove("hidden");

      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.lastUpdated++;
      }, 1000)
      this.lastUpdated = 0;
      if (!this.record)
        this.swapBtn.classList.add('hidden');
      this.onRenderPriceInfo();
      await this.handleAddRoute();
    })
  }

  private onChainChange = async () => {
    this.chainId = this.state.getChainId();
    tokenStore.updateTokenMapData(this.chainId);
    if (this.chainId != null && this.chainId != undefined)
      this.swapBtn.classList.remove('hidden');
    this.initializeWidgetConfig();
    this.swapButtonText = this.getSwapButtonText()
  }

  private async initApprovalModelAction() {
    this.approvalModelAction = await this.state.setApprovalModelAction({
      sender: this,
      payAction: this.onSubmit,
      onToBeApproved: async (token: ITokenObject) => {
        this.crossChainApprovalStatus = ApprovalStatus.TO_BE_APPROVED;
        this.swapBtn.enabled = true;
      },
      onToBePaid: async (token: ITokenObject) => {
        this.crossChainApprovalStatus = ApprovalStatus.NONE;
      },
      onApproving: async (token: ITokenObject, receipt?: string, data?: any) => {
        this.crossChainApprovalStatus = ApprovalStatus.APPROVING;
        showResultMessage(this.txStatusModal, 'success', receipt);
        if (!this.swapBtn.rightIcon.visible)
          this.swapBtn.rightIcon.visible = true;
      },
      onApproved: async (token: ITokenObject, data?: any) => {
        this.crossChainApprovalStatus = ApprovalStatus.NONE;
        if (this.swapBtn.rightIcon.visible)
          this.swapBtn.rightIcon.visible = false;
        await this.handleAddRoute();
      },
      onApprovingError: async (token: ITokenObject, err: Error) => {
        showResultMessage(this.txStatusModal, 'error', err);
        this.crossChainApprovalStatus = ApprovalStatus.TO_BE_APPROVED;
        if (this.swapBtn.rightIcon.visible)
          this.swapBtn.rightIcon.visible = false;
      },
      onPaying: async (receipt?: string, data?: any) => {
        showResultMessage(this.txStatusModal, 'success', receipt);
        this.onSwapConfirming();
      },
      onPaid: async (data?: any) => {
        application.EventBus.dispatch(EventId.Paid);
        this.onSwapConfirmed();
        await this.updateBalances();
      },
      onPayingError: async (err: Error) => {
        showResultMessage(this.txStatusModal, 'error', err);
      }
    })
  }

  private setDefaultToken = () => {
    let lstTokenMap = Object.values(tokenStore.getTokenMapByChainId(this.chainId));
    const supportedTokens = SupportedERC20Tokens[this.chainId] || [];
    lstTokenMap = lstTokenMap.filter(v => supportedTokens.some(token => token.address?.toLowerCase() === v.address?.toLowerCase()));
    const defaultCrossChainToken = lstTokenMap.find((v) => v.address);
    const targetChainId = this.desChain?.chainId || this.targetChainId || this.state.getChainId();
    const supportedTargetTokens = SupportedERC20Tokens[targetChainId] || [];
    let lstTargetTokenMap = Object.values(this.targetTokenMap);
    lstTargetTokenMap = lstTargetTokenMap.filter(v => supportedTargetTokens.some(token => token.address?.toLowerCase() === v.address?.toLowerCase()));
    const oswapIndex = lstTargetTokenMap.findIndex((item) => item.symbol === 'OSWAP');
    if (oswapIndex > 0) {
      [lstTargetTokenMap[0], lstTargetTokenMap[oswapIndex]] = [lstTargetTokenMap[oswapIndex], lstTargetTokenMap[0]];
    }
    if (this.fromTokenSymbol && this.toTokenSymbol) {
      const firstObj = lstTokenMap.find((item) => this.fromTokenSymbol === item.symbol || this.fromTokenSymbol === item.address);
      const secondObj = lstTargetTokenMap.find((item) => this.toTokenSymbol === item.symbol || this.toTokenSymbol === item.address);
      this.fromToken = firstObj || defaultCrossChainToken;
      this.toToken = secondObj || lstTargetTokenMap[0];
      this.onUpdateToken(this.fromToken, true);
      this.onUpdateToken(this.toToken, false);
      this.firstTokenInput.token = this.fromToken;
      this.secondTokenInput.token = this.toToken;
      this.fromInputValue = new BigNumber(this.fromInputValue.toNumber() || defaultInput);
    } else {
      this.fromInputValue = new BigNumber(defaultInput);
      let firstDefaultToken = defaultCrossChainToken;
      let secondDefaultToken = lstTargetTokenMap.find((v) => v.symbol === defaultCrossChainToken.symbol) || lstTokenMap.find((v) => v.symbol === 'USDT' || v.symbol === 'USDT.e');
      if (firstDefaultToken && secondDefaultToken) {
        this.fromInputValue = new BigNumber(defaultInput);
        this.onUpdateToken(firstDefaultToken, true);
        this.onUpdateToken(secondDefaultToken, false);
        this.firstTokenInput.token = this.fromToken;
        this.secondTokenInput.token = this.toToken;
      }
    }
  }

  // TODO Only allow Oswap to be selected in Mainnet Oswap2Oswap Pilot launch, BSC <-> AVAX, should be changed when any2any is ready
  private setGroupToken(isFrom?: boolean) {
    if ([56, 97].includes(this.chainId) && [43113, 43114].includes(this.desChain?.chainId) || [43113, 43114].includes(this.chainId) && [56, 97].includes(this.desChain?.chainId)) {
      const token = isFrom ? this.fromToken : this.toToken;
      const targetToken = isFrom ? this.toToken : this.fromToken;
      const chainId = isFrom ? this.chainId : this.desChain.chainId;
      const targetChainId = isFrom ? this.desChain.chainId : this.chainId;
      const vaultGroups = this.state.getVaultGroups();
      const vaults = vaultGroups.map(v => v.vaults);
      const vault = vaults.find(v => v[chainId]?.assetToken.address.toLowerCase() === token.address.toLowerCase());
      const targetVault = vault ? vault[targetChainId] : null;
      if (targetVault && targetVault.assetToken.address.toLowerCase() !== targetToken.address.toLowerCase()) {
        let listTargetTokenMap = Object.values(isFrom ? this.targetTokenMap : tokenStore.getTokenMapByChainId(targetChainId));
        const token = listTargetTokenMap.find(v => v.address?.toLowerCase() === targetVault.assetToken.address.toLowerCase());
        const tokenSelection = isFrom ? this.secondTokenInput : this.firstTokenInput;
        tokenSelection.token = token;
        this.onUpdateToken(token, !isFrom);
      }
    } else {
      this.firstTokenInput.tokenDataListProp = [];
      this.secondTokenInput.tokenDataListProp = [];
    }
  }

  private setupCrossChainPopup() {
    const arrows = this.swapModal.querySelectorAll('i-icon.arrow-down');
    arrows.forEach((arrow: Element) => {
      arrow.classList.add('arrow-down--chain');
    });
    this.lbReminderRejected?.classList.add('hidden');
    if (this.srcChain && this.desChain) {
      const fromToken = this.record.fromVault.assetToken;
      const toToken = this.record.toVault.assetToken;

      this.srcChainFirstPanel.classList.remove('hidden');
      this.targetChainFirstPanel.classList.remove('hidden');
      this.srcChainTokenImage.url = this.srcChain.image;
      this.srcChainTokenLabel.caption = this.srcChain.chainName;
      this.targetChainTokenImage.url = this.desChain.image;
      this.targetChainTokenLabel.caption = this.desChain.chainName;
      if (this.record && fromToken) {
        let toAmount = this.record.toAmount;
        this.lbReminderRejected?.classList.remove('hidden');
        this.lbReminderRejected.caption = `If the order is not executed in the target chain, the estimated withdrawalble amount is <b class="text-pink">${formatNumber(toAmount)} ${toToken.symbol}</b>`;
      }
      this.targetChainSecondPanel.classList.add('hidden');
      // Show vault info at the end if vaultTokenSymbol same as toToken
      this.crossChainVaultInfoVstack.classList.remove('hidden');
    } else {
      this.srcChainFirstPanel.classList.add('hidden');
      this.targetChainFirstPanel.classList.add('hidden');
      this.targetChainSecondPanel.classList.add('hidden');
      this.crossChainVaultInfoVstack.classList.add('hidden');
    }
  }

  private handleSwapPopup() {
    if (!this.record) return;
    this.setupCrossChainPopup();
    const slippageTolerance = this.state.getSlippageTolerance();
    this.fromTokenImage.url = tokenAssets.tokenPath(this.fromToken, this.chainId);
    this.fromTokenLabel.caption = this.fromToken?.symbol ?? '';
    this.fromTokenValue.caption = formatNumber(this.fromInputValue, 4);
    this.toTokenImage.url = tokenAssets.tokenPath(this.toToken, this.desChain?.chainId);
    this.toTokenLabel.caption = this.toToken?.symbol ?? '';
    this.toTokenValue.caption = formatNumber(this.toInputValue, 4);
    this.payOrReceiveValue.caption = formatNumber(this.getMinReceivedMaxSold());
    this.payOrReceiveToken.caption = this.isFrom ? this.fromTokenLabel.caption : this.toTokenLabel.caption;
    this.estimateMsg = `${this.isFrom ? 'Input' : 'Output'} is estimated. If the price change by more than ${slippageTolerance}%, your transaction will revert`;
    this.payOrReceiveText = this.isFrom ? 'You will pay at most' : 'You will receive at least';
    this.priceInfo2.Items = this.getPriceInfo();

    this.swapModal.visible = true;
  }

  private doSwap() {
    this.approvalModelAction.doPayAction(this.record);
  }

  private getMinReceivedMaxSold = (): number | null => {
    const slippageTolerance = this.state.getSlippageTolerance();
    if (!slippageTolerance || !this.record) return null;
    const amount = new BigNumber(this.isFrom ? this.record.fromAmount : this.record.toAmount);
    if (amount.isZero()) return null;
    const minReceivedMaxSold = amount.dividedBy(1 + slippageTolerance / 100).toNumber();
    return minReceivedMaxSold;
  }

  private onUpdateToken(token: ITokenObject, isFrom: boolean) {
    if (!token) return;
    const balance = this.getBalance(token);
    if (isFrom) {
      this.fromToken = token;
      const enabled = !this.isMaxDisabled();
      this.maxButton.enabled = enabled;
      if (this.fromInputValue.gt(0)) {
        const formattedValue = new BigNumber(this.fromInputValue).dp(token.decimals || 18, ROUNDING_NUMBER).toFixed();
        if (!this.fromInputValue.eq(formattedValue)) {
          if (this.firstTokenInput) {
            this.firstTokenInput.value = formattedValue === '0' ? '' : formattedValue;
          }
          this.fromInputValue = new BigNumber(formattedValue);
        }
      } else if (this.fromInputValue.isZero()) {
        this.onUpdateEstimatedPosition(true);
      }
      this.payBalance.caption = `Balance: ${formatNumber(balance, 4)} ${token.symbol}`;
      this.updateTokenInput(true);
    } else {
      this.toToken = token;
      if (this.toInputValue.gt(0)) {
        const formattedValue = new BigNumber(this.toInputValue).dp(token.decimals || 18, ROUNDING_NUMBER).toFixed();
        if (!this.toInputValue.eq(formattedValue)) {
          if (this.secondTokenInput) {
            this.secondTokenInput.value = formattedValue === '0' ? '' : formattedValue;
          }
          this.toInputValue = new BigNumber(formattedValue);
        }
      } else if (this.toInputValue.isZero()) {
        this.onUpdateEstimatedPosition(false);
      }
      this.receiveBalance.caption = `Balance: ${formatNumber(balance, 4)} ${token.symbol}`;
      this.updateTokenInput(false);
    }
  }

  private async onSelectToken(token: ITokenObject, isFrom: boolean) {
    if (!token) return;
    this.firstTokenInput.enabled = false;
    this.secondTokenInput.enabled = false;
    this.onUpdateToken(token, isFrom);
    this.setGroupToken(isFrom);
    await this.handleAddRoute();
    this.firstTokenInput.enabled = true;
    this.secondTokenInput.enabled = true;
  }

  private setApprovalModalSpenderAddress() {
    const item = this.record;
    this.state.approvalModel.spenderAddress = item.fromVault.vaultAddress;
  }

  private getInputValue(isFrom: boolean) {
    const token = isFrom ? this.fromToken : this.toToken;
    const value = isFrom ? this.fromInputValue : this.toInputValue;
    if (!value || value.isNaN()) return '';
    const newValue = value.dp(token?.decimals || 18, ROUNDING_NUMBER).toFixed();
    return newValue;
  }

  private async updateTokenInput(isFrom: boolean) {
    const inputEl = isFrom ? this.firstTokenInput : this.secondTokenInput;
    if (inputEl) inputEl.value = this.getInputValue(isFrom);
  }

  private async onSelectRouteItem(source: Control, item: Route) {
    if (this.isFrom) {
      if (this.payCol.children) {
        let balanceValue = item?.fromAmount || '';
        this.fromInputValue = typeof balanceValue !== 'object' ? new BigNumber(balanceValue) : balanceValue;
        this.firstTokenInput.value = this.fixedNumber(balanceValue);
      }
    } else {
      if (this.receiveCol.children) {
        let balanceValue = item?.toAmount || '';
        this.toInputValue = typeof balanceValue !== 'object' ? new BigNumber(balanceValue) : balanceValue;
        this.secondTokenInput.value = this.fixedNumber(balanceValue);
        this.secondTokenInput.inputReadOnly = true;
        this.secondTokenInput.classList.add('cursor-input--default');
      }
    }

    this.swapBtn.classList.remove('hidden');
    this.record = item;
    if (this.fromToken && !this.fromToken.isNative && isWalletConnected() && item) {
      try {
        this.setApprovalModalSpenderAddress()
        await this.approvalModelAction.checkAllowance(this.fromToken, this.fromInputValue.toFixed());
      } catch (e) {
        console.log('Cannot check the Approval status (Cross Chain)', e);
      }
    }
    if (!item) {
      this.crossChainApprovalStatus = ApprovalStatus.NONE;
    }
    this.swapButtonText = this.getSwapButtonText();
    const enabled = !this.isSwapButtonDisabled();
    this.swapBtn.enabled = enabled;
    this.swapBtn.rightIcon.visible = false;
    this.priceInfo.Items = this.getPriceInfo();
  }

  private onTokenInputChange(source: Control) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      const fromInput = this.payCol.getElementsByTagName('I-INPUT')?.[0] as Input;
      const toInput = this.receiveCol.getElementsByTagName('I-INPUT')?.[0] as Input;
      const isFrom = source.isSameNode(fromInput);
      const amount = (source as Input).value;
      if (isInvalidInput(amount)) {
        this.resetValuesByInput();
        if (fromInput)
          fromInput.value = '0';
        if (toInput)
          toInput.value = '0';
        return;
      }
      const limit = isFrom ? this.fromToken?.decimals : this.toToken?.decimals;
      const value = new BigNumber(limitDecimals(amount, limit || 18));
      if (!value.gt(0)) {
        this.resetValuesByInput();
        if (isFrom && toInput) {
          toInput.value = '0';
        } else if (!isFrom && fromInput) {
          fromInput.value = '0';
        }
      } else {
        let valueChanged = false;
        const isLastDot = amount.indexOf('.') === amount.length - 1;
        if (isFrom) {
          if (!this.fromInputValue.eq(value)) {
            this.fromInputValue = value;
            this.onUpdateEstimatedPosition(false, true);
            valueChanged = true;
          }
          if (!isLastDot)
            fromInput.value = value.toFixed();
        } else {
          if (!this.toInputValue.eq(value)) {
            this.toInputValue = value;
            this.onUpdateEstimatedPosition(true, true);
            valueChanged = true;
          }
          if (!isLastDot)
            toInput.value = value.toFixed();
        }
        if (valueChanged) await this.handleAddRoute();
      }

    }, 1000);
  }

  private resetValuesByInput() {
    this.initRoutes();
    this.priceInfo.Items = this.getPriceInfo();
    this.fromInputValue = new BigNumber(0);
    this.toInputValue = new BigNumber(0);
  }

  private initRoutes() {
    this.record = null;
    this.isPriceToggled = false;
    this.swapBtn.classList.add('hidden');
  }

  private async handleAddRoute() {
    if (!this.fromToken || !this.toToken || !(this.fromInputValue.gt(0) || this.toInputValue.gt(0))) return;
    this.initRoutes();
    this.disableSelectChain(true);
    this.disableSelectChain(true, true);
    if (!this.srcChain || !this.desChain) return;
    let vaultGroup = await findVaultGroupByToken(this.state, this.srcChain.chainId, this.fromToken.address || this.fromToken.symbol);
    let route = getRoute({
      vaultGroup,
      toChainId: this.desChain.chainId,
      fromChainId: this.srcChain.chainId,
      inAmount: new BigNumber(this.fromInputValue)
    });
    if (route) {
      this.minSwapHintLabel?.classList.add('hidden');
    } else {
      this.minSwapHintLabel?.classList.remove('hidden');
    }
    this.record = route;
    this.swapModalConfirmBtn.caption = 'Confirm Swap';
    this.swapModalConfirmBtn.enabled = true;

    if (this.record) {
      const assetSymbol = this.record.toVault.assetToken.symbol;
      const vaultAddress = this.record.toVault.vaultAddress;
      const softCap = vaultGroup.vaults[this.srcChain.chainId].softCap;
      const bond = await getBond(this.state, route.toVault);
      const vaultAssetBalance = await getVaultAssetBalance(this.state, this.desChain!.chainId, vaultAddress)
      const assetBalance = vaultAssetBalance ?? 0;
      const assetDecimal = this.record.toVault.assetToken.decimals;
      const targetVaultAssetBalance = (new BigNumber(assetBalance)).shiftedBy(-assetDecimal);
      const toAmount = this.record.toAmount;
      //const vaultToUsdPrice = oraclePriceMap[vaultTokenAddress.toLowerCase()]; // This will be the vaultToken -> USD Price
      //const oswapToUsdPrice = oraclePriceMap[bridgeVaultConstantMap['OSWAP'][this.desChain!.chainId].tokenAddress.toLowerCase()];
      //const vaultToOswapPrice = vaultToUsdPrice.div(oswapToUsdPrice); // This will vaultToken -> oswap price;
      this.targetVaultAssetBalanceLabel1.caption = `Vault Asset Balance: ${formatNumber(targetVaultAssetBalance.toNumber(), 4)} ${assetSymbol}`;
      this.targetVaultAssetBalanceLabel2.caption = `Vault Asset Balance: ${formatNumber(targetVaultAssetBalance.toNumber(), 4)} ${assetSymbol}`;

      this.targetVaultBondBalanceLabel1.caption = `Vault Bond Balance: ${formatNumber(bond.toNumber(), 4)} ${assetSymbol}`;
      this.targetVaultBondBalanceLabel2.caption = `Vault Bond Balance: ${formatNumber(bond.toNumber(), 4)} ${assetSymbol}`;
      //TODO Bond
      /* 
      if (!vault.vaultGroup) {
        this.targetVaultBondBalanceLabel1.caption = `Vault Bond Balance: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} ${assetSymbol}`;
        this.targetVaultBondBalanceLabel2.caption = `Vault Bond Balance: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} ${assetSymbol}`;
      } else if (vault.vaultGroup === 'OSWAP') {
        this.targetVaultBondBalanceLabel1.caption = `Vault Bond Balance: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP`;
        this.targetVaultBondBalanceLabel2.caption = `Vault Bond Balance: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP`;
      } else {
        this.targetVaultBondBalanceLabel1.caption = `Vault Bond Balance: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP &#8776; ${formatNumber(targetVaultBondBalance.div(vaultToOswapPrice).toNumber(), 4)} ${assetSymbol}`;
        this.targetVaultBondBalanceLabel2.caption = `Vault Bond Balance: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP &#8776; ${formatNumber(targetVaultBondBalance.div(vaultToOswapPrice).toNumber(), 4)} ${assetSymbol}`;
      }*/
      this.crossChainSoftCapLabel1.caption = softCap ? `Cap: ${formatNumber(softCap)} ${assetSymbol}` : "-";
      this.crossChainSoftCapLabel2.caption = softCap ? `Cap: ${formatNumber(softCap)} ${assetSymbol}` : "-";
      const minValue = BigNumber.min(targetVaultAssetBalance, bond, softCap);
      if (minValue.eq(targetVaultAssetBalance)) {
        this.targetVaultAssetBalanceLabel1.classList.add('text--limit');
        this.targetVaultAssetBalanceLabel2.classList.add('text--limit');
        this.targetVaultBondBalanceLabel1.classList.remove('text--limit');
        this.targetVaultBondBalanceLabel2.classList.remove('text--limit');
        this.crossChainSoftCapLabel1.classList.remove('text--limit');
        this.crossChainSoftCapLabel2.classList.remove('text--limit');
      } else if (minValue.eq(bond)) {
        this.targetVaultAssetBalanceLabel1.classList.remove('text--limit');
        this.targetVaultAssetBalanceLabel2.classList.remove('text--limit');
        this.targetVaultBondBalanceLabel1.classList.add('text--limit');
        this.targetVaultBondBalanceLabel2.classList.add('text--limit');
        this.crossChainSoftCapLabel1.classList.remove('text--limit');
        this.crossChainSoftCapLabel2.classList.remove('text--limit');
      } else {
        this.targetVaultAssetBalanceLabel1.classList.remove('text--limit');
        this.targetVaultAssetBalanceLabel2.classList.remove('text--limit');
        this.targetVaultBondBalanceLabel1.classList.remove('text--limit');
        this.targetVaultBondBalanceLabel2.classList.remove('text--limit');
        this.crossChainSoftCapLabel1.classList.add('text--limit');
        this.crossChainSoftCapLabel2.classList.add('text--limit');
      }
      if (softCap && toAmount.gte(softCap)) {
        this.swapModalConfirmBtn.caption = 'Cap Reached';
        this.swapModalConfirmBtn.enabled = false;
        //} else if (toAmount.gt(targetVaultAssetBalance) || toAmount.multipliedBy(vaultToOswapPrice).gt(bond)) {
        //  this.swapModalConfirmBtn.caption = 'Exceed Vault Asset Balance or Bond Balance';
        //  this.swapModalConfirmBtn.enabled = false;
      } else {
        this.swapModalConfirmBtn.enabled = true;
      }

    }
    this.lastUpdated = 0;
    this.disableSelectChain(false);
    this.disableSelectChain(false, true);
    this.initRoutes();
    this.onSelectRouteItem(undefined, route);

    if (!route) {
      this.priceInfo.Items = this.getPriceInfo();
      if (this.isEstimated('to')) {
        const input = this.secondTokenInput;
        this.toInputValue = new BigNumber(0);
        if (input) {
          input.value = '-';
          input.inputReadOnly = true;
          input.classList.add('cursor-input--default');
        }
      } else {
        const input = this.firstTokenInput;
        this.fromInputValue = new BigNumber(0);
        if (input) input.value = '-';
      }
    }
    if (this.record) this.setApprovalModalSpenderAddress()
  }

  // Price Info
  private onTogglePrice(priceInfo: PriceInfo) {
    this.isPriceToggled = !this.isPriceToggled;
    priceInfo.Items = this.getPriceInfo();
  }

  private getTradeFeeExactAmount() {
    const tradeFee = this.record?.feeAmounts.totalFeeAmount;
    if (tradeFee) {
      return `${formatNumber(tradeFee)} ${this.fromToken?.symbol}`;
    }
    return '-';
  }

  private getFeeDetails() {
    if (this.record) {
      let feeAmounts = this.record.feeAmounts
      let detail = [
        {
          title: "Base Fee",
          description: "This fee is paid to the trolls to cover gas fee on the Target Chain",
          value: feeAmounts.baseFeeAmount,
        },
        {
          title: "Bridge Vault Liquidity Fee",
          description: "This fee is paid to the Bridge Vault Liquidity Provider on Target Chain",
          value: feeAmounts.transactionFeeAmount,
        },
        {
          title: "Protocol Fee",
          description: "This fee is paid to the troll owners on the Cross Chain Network",
          value: feeAmounts.protocolFeeAmount,
        },
        {
          title: "Imbalance Fee",
          description: "This fee is acted as an incentive to balance the vault.",
          value: feeAmounts.imbalanceFeeAmount,
        }
      ]
      return detail;
    }
    return [];
  }

  private getPriceInfo() {
    const tradeFeeExactAmount = this.getTradeFeeExactAmount();

    const fees = this.getFeeDetails();
    const countFees = fees.length;
    let feeTooltip: any;
    if (countFees === 1) {
      const fee = fees[0];
      feeTooltip = `${fee.description}`;
    } else if (countFees > 1) {
      feeTooltip = fees;
    }

    let info = [
      {
        title: "Transaction Fee",
        value: this.isValidToken ? tradeFeeExactAmount : '-',
        tooltip: feeTooltip,
        onClick: countFees > 1 ? () => this.showModalFees() : null
      },
      {
        title: "Estimated Time",
        value: this.isValidToken && this.record ? '30 seconds' : '-',
      },
    ];
    return info.filter((f: any) => !f.isHidden);
  }

  private onUpdateEstimatedPosition = (isFrom: boolean, reverseRouting: boolean = false) => {
    if (this.isFrom != isFrom) {
      this.isFrom = isFrom;
    }
  }

  private isEstimated = (tokenPosition: string, strict = false) => {
    if (tokenPosition === 'from') {
      return strict ? this.isFrom && !this.fromInputValue.isZero() : this.isFrom;
    } else if (tokenPosition === 'to') {
      return strict ? !this.isFrom && !this.toInputValue.isZero() : !this.isFrom;
    } else {
      return false;
    }
  }

  private getBalance(token?: ITokenObject) {
    if (!token) return '0';
    let tokenBalances = tokenStore.getTokenBalancesByChainId(token.chainId);
    if (!tokenBalances) return '0';
    const address = token.address || '';
    let balance = address ? tokenBalances[address.toLowerCase()] ?? '0' : tokenBalances[token.symbol] || '0';
    return balance
  }

  private async updateBalances() {
    const chainIds = [...new Set([this.chainId, this.targetChainId])];
    for (let chainId of chainIds) {
      await tokenStore.updateTokenBalancesByChainId(chainId);
    }
    if (this.fromToken) {
      const balance = this.getBalance(this.fromToken);
      this.payBalance.caption = `Balance: ${formatNumber(balance, 4)} ${this.fromToken.symbol}`;
    }
    if (this.toToken) {
      const balance = this.getBalance(this.toToken);
      this.receiveBalance.caption = `Balance: ${formatNumber(balance, 4)} ${this.toToken.symbol}`;
    }
    const enabled = !this.isMaxDisabled();
    this.maxButton.enabled = enabled;
  }

  private getSwapButtonText() {
    const isApproveButtonShown = this.crossChainApprovalStatus !== ApprovalStatus.NONE;
    if (!isWalletConnected()) {
      return 'Connect Wallet';
    }
    if (!this.state.isRpcWalletConnected()) {
      return 'Switch Network';
    }
    if (isApproveButtonShown) {
      const status = this.crossChainApprovalStatus;
      switch (status) {
        case ApprovalStatus.APPROVING:
          return 'Approving';
        case ApprovalStatus.TO_BE_APPROVED:
          return 'Approve';
      }
      return '';
    }
    if (this.swapBtn.rightIcon.visible) {
      return 'Creating Order';
    }
    if (this.isInsufficientBalance) {
      return `Insufficient ${this.fromToken?.symbol} balance`;
    }
    return 'Create Order';
  }

  private getWarningMessageText() {
    const tokens = [this.fromToken?.symbol, this.toToken?.symbol];
    if (tokens.every(v => v === 'ETH' || v === 'WETH')) {
      return 'Invalid pair';
    }
    if (!this.record) {
      return 'No records';
    }
    if (this.crossChainApprovalStatus === ApprovalStatus.TO_BE_APPROVED) {
      return '';
    }
    let balance = this.getBalance(this.fromToken)
    if (this.record.fromAmount.gt(balance)) {
      return `Insufficient ${this.fromToken?.symbol} balance`;
    }
    return '';
  }

  private onSwapConfirming = () => {
    if (!this.swapBtn.rightIcon.visible)
      this.swapBtn.rightIcon.visible = true;
    this.swapButtonText = this.getSwapButtonText();
  }

  private onSwapConfirmed = async () => {
    if (this.swapBtn.rightIcon.visible)
      this.swapBtn.rightIcon.visible = false;
    this.swapButtonText = this.getSwapButtonText();
    await this.handleAddRoute();
    // this.showViewOrderModal();
  }

  private isSwapButtonDisabled() {
    const warningMessageText = this.getWarningMessageText();
    return (isWalletConnected() && warningMessageText != '');
  }

  private async switchNetworkByWallet() {
    if (this.mdWallet) {
      await application.loadPackage('@scom/scom-wallet-modal', '*');
      this.mdWallet.networks = this.networks;
      this.mdWallet.wallets = this.wallets;
      this.mdWallet.showModal();
    }
  }

  private async onClickSwapButton() {
    if (!isWalletConnected()) {
      this.switchNetworkByWallet();
      return;
    } else if (!this.state.isRpcWalletConnected()) {
      const chainId = this.state.getChainId();
      const clientWallet = Wallet.getClientInstance();
      await clientWallet.switchNetwork(chainId);
      return;
    }
    if (!this.record || this.isSwapButtonDisabled()) return;

    const isApproveButtonShown = this.crossChainApprovalStatus !== ApprovalStatus.NONE;
    if (isApproveButtonShown) {
      this.onApproveRouterMax();
      return;
    }
    this.handleSwapPopup();
  }

  private onSubmit = async () => {
    try {
      this.swapModal.visible = false;
      showResultMessage(this.txStatusModal, 'warning', `Swapping ${formatNumber(this.fromInputValue, 4)} ${this.fromToken?.symbol} to ${formatNumber(this.toInputValue, 4)} ${this.toToken?.symbol}`);
      if (this.toToken && this.fromToken && this.desChain) {
        const { error } = await createBridgeVaultOrder(this.state, {
          vaultAddress: this.record.fromVault.vaultAddress,
          targetChainId: this.desChain.chainId,
          tokenIn: this.fromToken,
          tokenOut: this.toToken,
          amountIn: this.record.fromAmount.toFixed(),
          minAmountOut: this.record.toAmount.dividedBy(new BigNumber("1").plus(orderMinOutRate)).toFixed(),
        })
        if (error) {
          showResultMessage(this.txStatusModal, 'error', error as any);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  private onApproveRouterMax = () => {
    showResultMessage(this.txStatusModal, 'warning', 'Approving');
    this.setApprovalModalSpenderAddress();
    this.approvalModelAction.doApproveAction(this.fromToken, this.fromInputValue.toString(), this.record);
  }

  private onSetMaxBalance = async (value?: number) => {
    if (!this.fromToken?.symbol) return;
    this.isFrom = false;
    const address = this.fromToken?.address || this.fromToken?.symbol;
    let balance = this.getBalance(this.fromToken);
    let inputVal = new BigNumber(balance);
    if (!address) {
      inputVal = new BigNumber(0);
    }

    if (value == 0 || value) {
      inputVal = inputVal.multipliedBy(value).dividedBy(100);
    }
    if (inputVal.eq(this.fromInputValue)) return;
    this.fromInputValue = inputVal;
    this.firstTokenInput.value = this.fromInputValue.toString();
    await this.handleAddRoute();
  }

  private isMaxDisabled = (): boolean => {
    const address = this.fromToken?.address || this.fromToken?.symbol;
    let balance = this.getBalance(this.fromToken);
    return !address || new BigNumber(balance).isLessThanOrEqualTo(0);
  }

  private onRenderPriceInfo() {
    if (!this.priceInfo) {
      this.priceInfo = new PriceInfo();
      this.priceInfo.width = 'auto';
      this.priceInfo.height = 'auto';
      this.swapContainer.appendChild(this.priceInfo);
      this.priceInfo.onTogglePrice = this.onTogglePrice.bind(this);
    }
    this.priceInfo.Items = this.getPriceInfo();

    if (!this.priceInfo2) {
      this.priceInfo2 = new PriceInfo();
      this.priceInfo2.width = 'auto';
      this.priceInfo2.height = 'auto';
      this.priceInfo2.onTogglePrice = this.onTogglePrice.bind(this);
    }
    this.priceInfoContainer.appendChild(this.priceInfo2);
  }

  private onRefresh = async (source: Control) => {
    source.enabled = false;
    await this.handleAddRoute();
    source.enabled = true;
  }

  private onSetting = () => {
    this.transactionModal.showModal();
  }

  private get isMetaMask() {
    return getWalletProvider() === WalletPlugin.MetaMask;
  }

  private getSupportedChainList = (updateList?: boolean) => {
    const list = this.state.getMatchNetworks({ isDisabled: false });
    const testnetSupportedList = list.filter(v => v.isTestnet && this.networks.some(n => n.chainId == v.chainId));
    const mainnetSupportedList = list.filter(v => !v.isTestnet && this.networks.some(n => n.chainId == v.chainId));
    const isMainnet = mainnetSupportedList.some((item: any) => item.chainId == this.chainId);
    const supportList = isMainnet ? mainnetSupportedList : testnetSupportedList;
    if (updateList) this.supportedChainList = supportList;
    return supportList;
  }

  private onShowSourceChain = () => {
    if (this.isSrcOpened) {
      this.mdSourceChain.visible = false;
    } else {
      this.isSrcOpened = true;
      this.mdSourceChain.visible = true;
    }
  }

  private onCloseSourceChain = () => {
    setTimeout(() => {
      this.isSrcOpened = false;
    })
  }

  private onShowDestinationChain = () => {
    if (this.isDesOpened) {
      this.mdDestinationChain.visible = false;
    } else {
      this.isDesOpened = true;
      this.mdDestinationChain.visible = true;
    }
  }

  private onCloseDesChain = () => {
    setTimeout(() => {
      this.isDesOpened = false;
    })
  }

  private disableSelectChain = (disabled: boolean, isDes?: boolean) => {
    const btnChain = isDes ? this.btnDestinationChain : this.btnSourceChain;
    if (btnChain) btnChain.enabled = !disabled;
  }

  private selectSourceChain = async (network: IExtendedNetwork) => {
    const { chainId, isCrossChainSupported } = network;
    if ((this.srcChain && this.srcChain.chainId != chainId) || !this.srcChain) {
      const rpcWallet = this.state.getRpcWallet();
      await rpcWallet.switchNetwork(network.chainId);
      if (!isCrossChainSupported) {
        this.selectDestinationChain(network)
      }
      this.srcChain = network;
      const networkImg = this.btnSourceChain.querySelector('i-image');
      if (networkImg) this.btnSourceChain.removeChild(networkImg);
      this.btnSourceChain.prepend(<i-image width={30} height={30} url={this.srcChain.image} />);
      this.btnSourceChain.caption = `${this.srcChain.chainId} - ${this.srcChain.chainName}`;
    }
  }

  private selectDestinationChain = async (network: IExtendedNetwork) => {
    this.disableSelectChain(true, true);
    const oldDestination = this.desChain;
    try {
      this.desChain = network;
      this.targetChainId = this.desChain.chainId;
      await tokenStore.updateTokenBalancesByChainId(this.targetChainId);
    } catch (err) {
      console.log('err', err)
      if (oldDestination) {
        this.desChain = oldDestination;
      } else {
        this.desChain = this.supportedChainList[0];
      }
    }
    const networkImg = this.btnDestinationChain.querySelector('i-image');
    if (networkImg) this.btnDestinationChain.removeChild(networkImg);
    if (this.desChain) {
      this.targetChainId = this.desChain.chainId;
      this.btnDestinationChain.prepend(<i-image width={30} height={30} url={this.desChain.image} />);
      this.btnDestinationChain.caption = `${this.desChain.chainId} - ${this.desChain.chainName}`;
    } else {
      this.btnDestinationChain.caption = 'Destination Chain';
    }
    this.secondTokenInput.tokenDataListProp = this.getSupportedTokens(this._tokens, this.desChain?.chainId);
    this.disableSelectChain(false, true);
  }

  private getSupportedTokens = (tokens: ITokenObject[], chainId: number) => {
    return tokens.filter(token => token.chainId === chainId) || [];
  }

  private onSourceChainChanged = () => {
    this.getSupportedChainList(true);
    if (!this.chainId)
      this.chainId = this.supportedChainList[0].chainId;
    const currentNetwork = this.supportedChainList.find((f: IExtendedNetwork) => f.chainId == this.chainId);
    this.srcChain = currentNetwork;
    const networkImg = this.btnSourceChain.querySelector('i-image');
    if (networkImg) this.btnSourceChain.removeChild(networkImg);
    if (this.srcChain) {
      this.btnSourceChain.prepend(<i-image width={30} height={30} url={this.srcChain.image} />);
      this.btnSourceChain.caption = `${this.srcChain.chainId} - ${this.srcChain.chainName}`;
    } else {
      this.btnSourceChain.caption = 'Source Chain';
    }
  }

  private onSelectSourceChain = async (obj: IExtendedNetwork) => {
    this.mdSourceChain.visible = false;
    if (obj.chainId === this.srcChain?.chainId) return;
    this.firstTokenInput.chainId = obj.chainId;
    await this.selectSourceChain(obj);
  }

  private onSelectDestinationChain = async (obj: IExtendedNetwork) => {
    this.mdDestinationChain.visible = false;
    if (obj.chainId === this.desChain?.chainId) return;
    this.secondTokenInput.chainId = obj.chainId;
    await this.selectDestinationChain(obj);
    this.initializeWidgetConfig();
  }

  private setDefaultChain = async () => {
    if (this.supportedChainList && this.supportedChainList.length) {
      let obj = this.supportedChainList.find((f: IExtendedNetwork) => f.chainId == this.chainId);
      if (!obj)
        obj = this.supportedChainList[0];
      if (!this.srcChain && obj) {
        await this.selectSourceChain(obj);
      }
      this.onSourceChainChanged();
      const targetId = this.targetChainId === this.chainId ? this.defaultTargetChainId : (this.targetChainId || this.defaultTargetChainId);
      const targetChain = this.supportedChainList.find((f: IExtendedNetwork) => f.chainId == targetId);
      const isSupported = targetChain && targetChain.isCrossChainSupported;
      if ((!this.desChain || this.desChain?.chainId === this.chainId) && isSupported) {
        await this.selectDestinationChain(targetChain);
      } else if (!isSupported && obj) {
        await this.selectDestinationChain(obj);
      } else {
        await tokenStore.updateTokenBalancesByChainId(this.desChain?.chainId || this.targetChainId);
        if (this.toToken) {
          const balance = this.getBalance(this.toToken);
          this.receiveBalance.caption = `Balance: ${formatNumber(balance, 4)} ${this.toToken.symbol}`;
        }
        this.secondTokenInput.tokenDataListProp = this.getSupportedTokens(this._tokens, this.desChain?.chainId || this.targetChainId);
      }
      const networkImg = this.btnDestinationChain.querySelector('i-image');
      if (networkImg) this.btnDestinationChain.removeChild(networkImg);
      if (this.desChain) {
        this.btnDestinationChain.prepend(<i-image width={30} height={30} url={this.desChain.image} />);
        this.btnDestinationChain.caption = `${this.desChain.chainId} - ${this.desChain.chainName}`;
      } else {
        this.btnDestinationChain.caption = 'Destination Chain';
      }
    } else {
      this.secondTokenInput.tokenDataListProp = this.getSupportedTokens(this._tokens, this.desChain?.chainId || this.targetChainId);
    }
  }

  private initChainElm = (network: IExtendedNetwork, isDes?: boolean) => {
    const { image, chainName, chainId } = network;
    const hStack = new HStack(undefined, {
      gap: 8,
      verticalAlignment: 'center',
      cursor: 'pointer'
    })
    const img = new Image(undefined, {
      url: image,
      width: 30,
      height: 30
    });
    const lb = new Label(undefined, {
      caption: `${chainId} - ${chainName}`
    });
    hStack.appendChild(img);
    hStack.appendChild(lb);
    if (isDes) {
      this.listElmDesChain.appendChild(hStack);
      if (network.chainId === this.chainId) {
        hStack.classList.add('disabled');
        hStack.tooltip.content = 'The target chain cannot be the same as the source chain';
      } else {
        hStack.onClick = () => this.onSelectDestinationChain(network);
      }
    } else {
      if (!this.isMetaMask && isWalletConnected()) {
        hStack.tooltip.content = `Xchain dapp supports this network ${chainName} (${chainId}), please switch network in the connected wallet.`;
        hStack.style.cursor = 'default';
      }
      hStack.onClick = () => this.onSelectSourceChain(network);
      this.listElmSrcChain.appendChild(hStack);
    }
  }

  private renderChainList = async () => {
    this.oldSupportedChainList = this.supportedChainList;
    this.getSupportedChainList(true);
    if (this.oldSupportedChainList[0]?.chainId !== this.supportedChainList[0]?.chainId) {
      this.srcChain = undefined;
      this.desChain = undefined;
    };
    this.listElmSrcChain.clearInnerHTML();
    this.listElmDesChain.clearInnerHTML();
    this.supportedChainList.forEach((network: IExtendedNetwork) => {
      this.initChainElm(network);
      if (network.isCrossChainSupported) {
        this.initChainElm(network, true);
      }
    });
    await this.setDefaultChain();
  }

  // private showViewOrderModal = () => {
  //   this.modalViewOrder.visible = true;
  // }

  // private closeViewOrderModal = () => {
  //   this.modalViewOrder.visible = false;
  // }

  // private onViewOrder = () => {
  //   this.modalViewOrder.visible = false;
  // }

  private showModalFees = () => {
    const fees = this.getFeeDetails();
    this.feesInfo.clearInnerHTML();
    fees.forEach((fee) => {
      this.feesInfo.appendChild(
        <i-hstack
          horizontalAlignment="space-between" verticalAlignment="center" margin={{ top: 10 }}
          border={{ bottom: { color: Theme.colors.info.light, width: '2px', style: 'solid' } }}
          padding={{ bottom: 16 }}
        >
          <i-hstack verticalAlignment="center">
            <i-label caption={fee.title} margin={{ right: 4 }} />
            <i-icon
              name="question-circle"
              width={15}
              height={15}
              fill={Theme.text.primary}
              tooltip={{ content: fee.description }}
              data-placement="right"
            />
          </i-hstack>
          <i-label class="ml-auto" caption={`${formatNumber(fee.value)} ${this.fromToken?.symbol}`} />
        </i-hstack>
      )
    })
    this.feesInfo.appendChild(
      <i-hstack horizontalAlignment="space-between" verticalAlignment="center" margin={{ top: 16 }}>
        <i-hstack verticalAlignment="center">
          <i-label caption="Total Transaction Fee" />
        </i-hstack>
        <i-label class="ml-auto" caption={this.getTradeFeeExactAmount()} />
      </i-hstack>
    )
    this.modalFees.visible = true;
  }

  private closeModalFees = () => {
    this.modalFees.visible = false;
  }

  private getTokenObjArr = (tokens: ITokenConfig[]) => {
    let tokenObjArr: ITokenObject[] = [];
    for (let token of tokens) {
      let tokenMap = tokenStore.getTokenMapByChainId(token.chainId);
      const tokenAddress = token.address?.startsWith('0x') ? token.address.toLowerCase() : ChainNativeTokenByChainId[token.chainId].symbol;
      const tokenObj = tokenMap[tokenAddress];
      if (tokenObj) {
        tokenObjArr.push({ ...tokenObj, chainId: token.chainId });
      }
    }
    return tokenObjArr;
  }

  private resizeBridgeRecord(value?: number | string) {
    let interval = setInterval(() => {
      if (this.bridgeRecord) {
        this.bridgeRecord.resizeLayout(Number(value || this.tag?.width));
        clearInterval(interval);
      }
    }, 100);
  }

  private initBridgeRecord() {
    if (this.bridgeRecord) return;
    this.bridgeRecord = new BridgeRecord(this.state);
    this.bridgeRecord.switchNetworkByWallet = () => this.switchNetworkByWallet();
    this.pnlBridgeRecord.appendChild(this.bridgeRecord);
  }

  private initExpertModal() {
    if (this.expertModal) return;
    this.expertModal = new ExpertModeSettings(this.state);
    this.appendChild(this.expertModal);
  }

  private initTransactionModal() {
    if (this.transactionModal) return;
    this.transactionModal = new TransactionSettings(this.state);
    this.transactionModal.showCrossChain = true;
    this.appendChild(this.transactionModal);
  }

  private onChangeTab() {
    if (this.tabs.activeTabIndex === 1) {
      this.resizeBridgeRecord();
    }
  }

  render() {
    return (
      <i-scom-dapp-container id="dappContainer">
        <i-tabs
          id="tabs"
          width="100%"
          height="100%"
          mode="horizontal"
          class={tabStyle}
          onChanged={this.onChangeTab.bind(this)}
        >
          <i-tab caption="Swap">
            <i-panel class={swapStyle}>
              <i-panel id="swapContainer">
                <i-hstack horizontalAlignment="end" verticalAlignment="center">
                  <i-panel id="actionSetting" class="action-setting hidden">
                    <i-label minWidth={160} caption={this.lastUpdatedText}></i-label>
                    <i-icon width={26} height={26} class="rounded-icon" name="sync-alt" fill={Theme.text.primary} onClick={this.onRefresh}></i-icon>
                    <i-icon width={26} height={26} class="rounded-icon" name="cog" fill={Theme.text.primary} onClick={this.onSetting}></i-icon>
                  </i-panel>
                </i-hstack>
                <i-panel class="content-swap">
                  <i-hstack
                    gap={4}
                    margin={{ top: 8, bottom: 8 }}
                    verticalAlignment="center"
                    horizontalAlignment="space-between"
                    wrap="wrap"
                  >
                    <i-label caption="You Pay" font={{ size: '1.125rem', color: Theme.text.primary }} />
                  </i-hstack>
                  <i-panel class="btn-dropdown" width="auto" margin={{ bottom: 4 }}>
                    <i-button
                      id="btnSourceChain"
                      class="btn-chain--selection"
                      rightIcon={{ name: 'angle-down', cursor: 'pointer' }}
                      caption="Source Chain"
                      width="calc(100% - 1px)"
                      onClick={this.onShowSourceChain}
                    />
                    <i-modal
                      id="mdSourceChain"
                      class="md--chain-selection"
                      showBackdrop={false}
                      onClose={this.onCloseSourceChain}
                      width="100%"
                      height="auto"
                      popupPlacement="bottom"
                    >
                      <i-vstack id="listElmSrcChain" gap={2} />
                    </i-modal>
                  </i-panel>
                  <i-panel class="token-box">
                    <i-vstack id="payContainer" class="input--token-container" >
                      <i-hstack class="balance-info" horizontalAlignment="space-between" verticalAlignment="center" width="100%" margin={{ bottom: '0.5rem' }}>
                        <i-label id="payBalance" class="text--grey ml-auto" caption="Balance: 0"></i-label>
                        <i-button id="maxButton" class="btn-max" caption="Max" enabled={false} onClick={() => this.onSetMaxBalance()}></i-button>
                      </i-hstack>
                      <i-panel
                        id="payCol"
                        class="bg-box-radius"
                        background={{ color: Theme.input.background }}
                        width="100%"
                        margin={{ top: 'auto' }}
                        border={{ radius: '1rem', width: '1px', style: 'solid', color: Theme.background.main }}
                      >
                        <i-scom-token-input
                          id="firstTokenInput"
                          placeholder='0.0'
                          value='-'
                          tokenReadOnly={false}
                          isBalanceShown={false}
                          isBtnMaxShown={false}
                          isCommonShown={true}
                          background={{ color: Theme.input.background }}
                          border={{ radius: '1rem' }}
                          height={'auto'} width={'100%'}
                          display='flex'
                          font={{ size: '1.25rem' }}
                          padding={{ left: '0.75rem', right: '0.75rem' }}
                          tokenButtonStyles={{
                            background: { color: Theme.background.main },
                            padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
                            border: { radius: 8 },
                            font: { size: '1rem', weight: 700, color: Theme.input.fontColor },
                            lineHeight: 1.5,
                            opacity: 1
                          }}
                          onInputAmountChanged={this.onTokenInputChange}
                          onSelectToken={(token: ITokenObject) => this.onSelectToken(token, true)}
                        ></i-scom-token-input>
                      </i-panel>
                    </i-vstack>
                  </i-panel>
                  <i-hstack id="minSwapHintLabel" gap={4} verticalAlignment="start" opacity={0.9}>
                    <i-icon name="star" fill={Theme.colors.primary.main} width={13} height={13} />
                    <i-label caption="No crosschain routes are found. You may try updating the input amount or selecting another token." font={{ size: '0.8rem', color: Theme.colors.primary.main }} />
                  </i-hstack>
                  <i-panel class="token-box">
                    <i-vstack id="receiveContainer" class="input--token-container" >
                      <i-vstack class="balance-info" width="100%" margin={{ left: 'auto' }}>
                        <i-hstack
                          gap={4}
                          margin={{ top: 8, bottom: 8 }}
                          verticalAlignment="center"
                          horizontalAlignment="space-between"
                          wrap="wrap"
                        >
                          <i-label caption="You Receive" font={{ size: '1.125rem', color: Theme.text.primary }} />
                        </i-hstack>
                        <i-panel class="btn-dropdown" width="auto" margin={{ bottom: 8 }}>
                          <i-button
                            id="btnDestinationChain"
                            class="btn-chain--selection"
                            rightIcon={{ name: 'angle-down', cursor: 'pointer' }}
                            caption="Destionation Chain"
                            width="calc(100% - 1px)"
                            onClick={this.onShowDestinationChain}
                          />
                          <i-modal
                            id="mdDestinationChain"
                            class="md--chain-selection"
                            showBackdrop={false}
                            onClose={this.onCloseDesChain}
                            width="100%"
                            height="auto"
                            popupPlacement="bottom"
                          >
                            <i-vstack id="listElmDesChain" gap={2} />
                          </i-modal>
                        </i-panel>
                        <i-vstack class="text-right" width="100%">
                          <i-label id="receiveBalance" class="text--grey ml-auto" caption="Balance: 0"></i-label>
                        </i-vstack>
                      </i-vstack>
                      <i-panel
                        id="receiveCol"
                        background={{ color: Theme.input.background }}
                        width="100%"
                        margin={{ top: 'auto' }}
                        border={{ radius: '1rem', width: '1px', style: 'solid', color: Theme.background.main }}
                      >
                        <i-scom-token-input
                          id="secondTokenInput"
                          value='-'
                          placeholder='0.0'
                          inputReadOnly={true}
                          tokenReadOnly={false}
                          isBalanceShown={false}
                          isBtnMaxShown={false}
                          isCommonShown={true}
                          background={{ color: Theme.input.background }}
                          border={{ radius: '1rem' }}
                          height={'auto'} width={'100%'}
                          display='flex'
                          font={{ size: '1.25rem' }}
                          padding={{ left: '0.75rem', right: '0.75rem' }}
                          tokenButtonStyles={{
                            background: { color: Theme.background.main },
                            padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
                            border: { radius: 8 },
                            font: { size: '1rem', weight: 700, color: Theme.input.fontColor },
                            lineHeight: 1.5,
                            opacity: 1
                          }}
                          onInputAmountChanged={this.onTokenInputChange}
                          onSelectToken={(token: ITokenObject) => this.onSelectToken(token, false)}
                        ></i-scom-token-input>
                      </i-panel>
                    </i-vstack>
                  </i-panel>
                </i-panel>
                <i-panel class="swap-btn-container" width="100%">
                  <i-button
                    id="swapBtn" class="btn-swap btn-os hidden" height={67} caption={this.swapButtonText}
                    rightIcon={{ spin: true, visible: false }}
                    onClick={this.onClickSwapButton.bind(this)}
                  ></i-button>
                </i-panel>
              </i-panel>

              <i-modal id="swapModal" class="custom-modal" title="Confirm Swap" closeIcon={{ name: 'times' }}>
                <i-hstack verticalAlignment="center" horizontalAlignment="start">
                  <i-panel id="srcChainFirstPanel" class="row-chain">
                    <i-image id="srcChainTokenImage" width="30px" height="30px" url="#" />
                    <i-label id="srcChainTokenLabel" class="token-name" caption="" />
                    <i-icon name="minus" fill={Theme.input.fontColor} width={28} height={10} />
                  </i-panel>
                  <i-panel class="row-chain">
                    <i-image id="fromTokenImage" fallbackUrl={tokenAssets.fallbackUrl} width="30px" height="30px" url="#" />
                    <i-label id="fromTokenLabel" class="token-name" caption=""></i-label>
                  </i-panel>
                  <i-label id="fromTokenValue" class="token-value" caption=" - "></i-label>
                </i-hstack>
                <i-icon name="arrow-down" class="arrow-down" fill={Theme.input.fontColor} width={28} height={28} />
                <i-panel id="targetChainSecondPanel">
                  <i-hstack verticalAlignment="center" horizontalAlignment="start">
                    <i-panel class="row-chain">
                      <i-image id="targetChainVaultImage" width="30px" height="30px" url="#" />
                      <i-label id="targetChainVaultLabel" class="token-name" caption="" />
                      <i-icon name="minus" fill={Theme.input.fontColor} width={28} height={10} />
                    </i-panel>
                    <i-panel class="row-chain">
                      <i-image id="targetVaultTokenImage" fallbackUrl={tokenAssets.fallbackUrl} width="30px" height="30px" url="#" />
                      <i-label id="targetVaultTokenLabel" class="token-name" caption="" />
                    </i-panel>
                    <i-label id="targetVaultTokenValue" class="token-value" caption="-" />
                  </i-hstack>
                  <i-vstack class="text-right">
                    <i-label id="crossChainSoftCapLabel1" class="text--grey ml-auto"></i-label>
                    <i-label id="targetVaultAssetBalanceLabel1" class="text--grey ml-auto" caption="Vault Asset Balance: 0"></i-label>
                    <i-label id="targetVaultBondBalanceLabel1" class="text--grey ml-auto" caption="Vault Bond Balance: 0"></i-label>
                  </i-vstack>
                  <i-icon name="arrow-down" class="arrow-down" fill={Theme.input.fontColor} width={28} height={28} />
                </i-panel>
                <i-hstack class="mb-1" verticalAlignment="center" horizontalAlignment="start">
                  <i-panel id="targetChainFirstPanel" class="row-chain">
                    <i-image id="targetChainTokenImage" fallbackUrl={tokenAssets.fallbackUrl} width="30px" height="30px" url="#" />
                    <i-label id="targetChainTokenLabel" class="token-name" caption="" />
                    <i-icon name="minus" fill={Theme.input.fontColor} width={28} height={10} />
                  </i-panel>
                  <i-panel class="row-chain">
                    <i-image id="toTokenImage" fallbackUrl={tokenAssets.fallbackUrl} width="30px" height="30px" url="#" />
                    <i-label id="toTokenLabel" class="token-name" caption=""></i-label>
                  </i-panel>
                  <i-label id="toTokenValue" class="token-value text-primary bold" caption=" - "></i-label>
                </i-hstack>
                <i-vstack id="crossChainVaultInfoVstack" class="text-right">
                  <i-label id="crossChainSoftCapLabel2" class="text--grey ml-auto"></i-label>
                  <i-label id="targetVaultAssetBalanceLabel2" class="text--grey ml-auto" caption="Vault Asset Balance: 0"></i-label>
                  <i-label id="targetVaultBondBalanceLabel2" class="text--grey ml-auto" caption="Vault Bond Balance: 0"></i-label>
                </i-vstack>
                <i-panel class="mb-1">
                  <i-label caption={this.estimateMsg}></i-label>
                </i-panel>
                <i-panel class="mb-1">
                  <i-label caption={this.payOrReceiveText}></i-label>
                  <i-label id="payOrReceiveValue" class="text-primary bold" caption=""></i-label>
                  <i-label id="payOrReceiveToken" caption=""></i-label>
                </i-panel>
                <i-panel id="priceInfoContainer" background={{ color: Theme.background.modal }} class="bg-box mt-1 mb-1" width="100%">
                </i-panel>
                <i-label id="lbReminderRejected" class="flex" margin={{ top: 8, bottom: 16 }} />
                <i-panel class="swap-btn-container" width="100%">
                  <i-button id="swapModalConfirmBtn" class="btn-swap btn-os" height="auto" caption="Confirm Swap" onClick={this.doSwap}></i-button>
                </i-panel>
              </i-modal>

              {/* <i-modal
                id="modalViewOrder"
                class="bg-modal custom-modal custom-md--view"
                title="Cross Chain"
                closeIcon={{ name: 'times' }}
              >
                <i-panel class="i-modal_content">
                  <i-panel class="mt-1">
                    <i-hstack verticalAlignment="center" horizontalAlignment="center" class="mb-1">
                      <i-image width={50} height={50} url={Assets.fullPath('img/success-icon.svg')} />
                    </i-hstack>
                    <i-vstack verticalAlignment="center" horizontalAlignment="center">
                      <i-label caption="The order was created successfully!" />
                      <i-label caption="Do you want to view the record?" />
                    </i-vstack>
                    <i-hstack verticalAlignment="center" horizontalAlignment="center" class="mt-1">
                      <i-button
                        caption="Cancel"
                        class="btn-os btn-cancel"
                        onClick={() => this.closeViewOrderModal()}
                      />
                      <i-button
                        caption="View Order"
                        class="btn-os btn-submit"
                        onClick={() => this.onViewOrder()}
                      />
                    </i-hstack>
                  </i-panel>
                </i-panel>
              </i-modal> */}

              <i-modal
                id="modalFees"
                class="bg-modal custom-modal"
                title="Transaction Fee Details"
                closeIcon={{ name: 'times' }}
              >
                <i-panel class="i-modal_content">
                  <i-panel>
                    <i-vstack id="feesInfo" />
                    <i-hstack verticalAlignment="center" horizontalAlignment="center" margin={{ top: 16, bottom: 8 }}>
                      <i-button
                        caption="Close"
                        class="btn-os btn-submit"
                        onClick={() => this.closeModalFees()}
                      />
                    </i-hstack>
                  </i-panel>
                </i-panel>
              </i-modal>
              <i-scom-tx-status-modal id="txStatusModal" />
            </i-panel>
          </i-tab>
          <i-tab caption="Bridge Record">
            <i-panel id="pnlBridgeRecord" />
          </i-tab>
        </i-tabs>
        <i-scom-wallet-modal id="mdWallet" wallets={[]} />
      </i-scom-dapp-container>
    )
  }
}