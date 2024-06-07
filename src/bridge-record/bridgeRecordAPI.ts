import { Wallet, BigNumber, Utils } from "@ijstech/eth-wallet";
import {
  getVaultGroupsUpdateOrders
} from "../crosschain-utils/index"
import {
  VaultOrderStatus,
  nullAddress,
  forEachNumberIndex,
  VaultOrderStore,
  State,
  findConstantVaultGroupByToken,
  VaultOrderItem,
} from "../store/index";
import { Contracts as CrossChainContracts } from "@scom/oswap-cross-chain-bridge-contract"
import { ITokenObject } from "@scom/scom-token-list";

// Bridge Record - Read

const getVaultOrderStatusLabel = (status: VaultOrderStatus) => {
  let label = '';
  switch (status) {
    case VaultOrderStatus.Pending:
      label = 'Pending';
      break;
    case VaultOrderStatus.RequestCancel:
      label = 'Cancel Requested';
      break;
    case VaultOrderStatus.Cancelled:
      label = 'Canceled';
      break;
    case VaultOrderStatus.RefundApproved:
      label = 'Cancel Approved';
      break;
    case VaultOrderStatus.Executed:
      label = 'Executed';
      break;
    case VaultOrderStatus.Expired:
      label = 'Expired';
      break;
  }
  return label;
}

const getAllUserOrders = async (state: State) => {
  console.log("getAllUserOrders");

  let vgs = await getVaultGroupsUpdateOrders(state, true);
  let orders: VaultOrderStore[] = [];
  vgs.forEach(vg => {
    forEachNumberIndex(vg.vaults, vault => {
      orders = orders.concat(vault.userOrders);
    })
  });
  const networkList = state.networkMap;

  const decodeOrderData = (order: VaultOrderStore): VaultOrderItem => {
    let fromNetwork = networkList[order.fromChain];
    let toNetwork = networkList[order.toChain];
    let vg = findConstantVaultGroupByToken(order.toChain, order.toToken.address);
    if (!vg) return null;
    let fromVault = vg.vaults[order.fromChain];
    let toVault = vg.vaults[order.toChain];
    if (!fromVault || !toVault) return null;

    let fromVaultAddress = fromVault.vaultAddress;
    let fromToken = order.fromToken;
    let fromAmount = new BigNumber(order.fromAmount).shiftedBy(-fromToken.decimals).toFixed();
    let toToken = order.toToken;
    let minOutAmount = new BigNumber(order.toAmountMin).shiftedBy(-toToken.decimals).toFixed();
    let toAmount = minOutAmount; //TODO #xchain order check find a way to grab the real toAmount.
    //sourceVaultToken must be fromToken. targetVaultAsset must be toToken.
    //let sourceVaultToken = findConstantTokenByVault(order.chainId, address);
    //let targetVaultAsset = vaultTokenMap[order.targetChainId][order.targetVaultAddress.toLowerCase()] || "";

    let price = new BigNumber(minOutAmount).div(fromAmount).toFixed();

    let protocolFee = new BigNumber(fromAmount).times(order.protocolFee).dp(0, BigNumber.ROUND_DOWN)

    let statusCode = order.status;

    //TODO #xchain order check
    //if (order.swapTxId) statusCode = VaultOrderStatus.Executed
    if (order.status == VaultOrderStatus.Pending && new Date().getTime() > order.expire.shiftedBy(3).toNumber())
      statusCode = VaultOrderStatus.Expired;

    return {
      assetName: vg.assetName,
      fromVaultAddress,
      toVaultAddress: toVault.vaultAddress,
      orderId: order.id,
      //orderHash: order.,
      //date: order.timeCreated ? order.timeCreated * 1000 : 0,
      expire: order.expire,
      fromNetwork,
      toNetwork,
      price,
      protocolFee,
      fromAmount,
      fromToken,
      toToken,
      toAmount,
      minOutAmount,
      sourceVaultToken: fromToken,
      sourceVaultInAmount: minOutAmount, //TODO #xchain order check
      statusCode,
      status: getVaultOrderStatusLabel(statusCode),
      sender: order.toOwner, //FIXME find sender
      //newOrderTxId: order.newOrderTxId,
      //swapTxId: order.swapTxId,
      //withdrawTxId: order.withdrawTxId,
      //amendTxId: order.amendTxId
    }
  }
  let decodedOrders = orders.map(order => decodeOrderData(order)).filter(v => !!v);
  return {
    orders: decodedOrders,
    total: decodedOrders.length
  };
}

//Bridge Record - Write

interface IRequestCancelOrderParams {
  vaultAddress: string,
  sourceChainId: number,
  orderId: number
}

const requestCancelOrder = async (params: IRequestCancelOrderParams) => {
  let { vaultAddress, sourceChainId, orderId } = params
  const wallet = Wallet.getClientInstance();
  let vaultContract = new CrossChainContracts.OSWAP_BridgeVault(wallet, vaultAddress)
  let receipt = vaultContract.requestCancelOrder({ sourceChainId, orderId })
  return receipt;
}

interface IWithdrawUnexecutedOrderParams {
  vaultAddress: string,
  orderId: number
}

const withdrawUnexecutedOrder = async (params: IWithdrawUnexecutedOrderParams) => {
  let { vaultAddress, orderId } = params
  const wallet = Wallet.getClientInstance();
  let vaultContract = new CrossChainContracts.OSWAP_BridgeVault(wallet, vaultAddress)
  let receipt = vaultContract.withdrawUnexecutedOrder(orderId)
  return receipt;
}

interface IRequestAmendOrderParams {
  vaultAddress: string,
  orderId: number,
  tokenOut: ITokenObject,
  minAmountOut: number | BigNumber
}

const requestAmendOrder = async (state: State, params: IRequestAmendOrderParams, callbackFn?: (err: Error, receipt?: string) => Promise<void>) => {
  try {
    let { vaultAddress, orderId, tokenOut, minAmountOut } = params
    const wallet = Wallet.getClientInstance();
    let vaultContract = new CrossChainContracts.OSWAP_BridgeVault(wallet, vaultAddress)
    let order = await vaultContract.orders(orderId);

    let minAmountOutTokenAmount = Utils.toDecimals(minAmountOut, tokenOut.decimals);
    if (tokenOut.isNative) {
      tokenOut.address = nullAddress
    }

    const transactionDeadlineInMinutes = state.getCrossChainTransactionDeadline();
    let transactionDeadline = Math.floor(Date.now() / 1000 + (transactionDeadlineInMinutes * 60));

    let editOrder = {
      peerChain: order.peerChain,
      inAmount: order.inAmount,
      outToken: tokenOut.address || "",
      minOutAmount: minAmountOutTokenAmount,
      to: order.to,
      expire: transactionDeadline
    }

    let receipt = await vaultContract.requestAmendOrder({ orderId, order: editOrder })
    return receipt;
  } catch (error) {
    if (callbackFn) {
      callbackFn(error)
    }
    return false
  }
}

export {
  getAllUserOrders,
  IRequestCancelOrderParams,
  requestCancelOrder,
  IWithdrawUnexecutedOrderParams,
  withdrawUnexecutedOrder,
  IRequestAmendOrderParams,
  requestAmendOrder
}