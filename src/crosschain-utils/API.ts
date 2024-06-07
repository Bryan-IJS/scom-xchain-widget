import {
  VaultGroupList,
  isWalletConnected,
  getNetworksByType,
  forEachNumberIndex,
  VaultGroupStore,
  VaultGroupConstant,
  VaultConstant,
  VaultStore,
  VaultOrderStore,
  forEachNumberIndexAwait,
  VaultOrderStatus,
  CoreContractStore,
  castToVaultOrderStatus,
  determineRealOrderStatus,
  State
} from "../store/index";
import { Wallet, BigNumber, Utils, TransactionReceipt, Contracts, IMulticallContractCall } from "@ijstech/eth-wallet";
import '@ijstech/eth-contract';
import { Contracts as xChainContracts } from "@scom/oswap-cross-chain-bridge-contract"
import { Contracts as OswapContracts } from "@scom/oswap-openswap-contract";
import {
  CreateBridgeVaultOrderParams,
  GetAvailableRouteOptionsParams,
  ICrossChainRouteResult,
} from "./crosschain-utils.types";
import { ChainNativeTokenByChainId, ITokenObject } from "@scom/scom-token-list";

const initCrossChainWallet = (state: State, chainId: number) => {
  const wallet = Wallet.getClientInstance();
  const networkInfo = state.getNetworkInfo(chainId);
  let rpcEndpoint = networkInfo.rpcUrls[0]
  let crossChainWallet = new Wallet(rpcEndpoint, { address: wallet.address })
  return crossChainWallet
}

interface VaultTokenMap { [chainId: string]: { [vaultAddress: string]: string } }

const getVaultTokenMap = () => {
  let vaultTokenMap: VaultTokenMap = {};
  VaultGroupList.forEach((vaultGroup) => {
    for (const [chainId, vault] of Object.entries(vaultGroup.vaults)) {
      vaultTokenMap[chainId] = vaultTokenMap[chainId] || {};
      vaultTokenMap[chainId][vault.vaultAddress.toLowerCase()] = vault.assetToken.address.toLowerCase();
    }
  });
  return vaultTokenMap;
}

//MARK: Bond
async function getBond(state: State, vault: VaultConstant | VaultStore) {
  //FIXME need to minus pending withdraw
  let govToken = new xChainContracts.ERC20(initCrossChainWallet(state, vault.chainId), CoreContractStore[vault.chainId].GOV_TOKEN);
  return (await govToken.balanceOf(vault.vaultRegistryAddress)).shiftedBy(-vault.assetToken.decimals);
}

// Bridge Swap

interface CreateOrderParams {
  vaultAddress: string;
  targetChainId: number;
  tokenIn: ITokenObject;
  tokenOut: ITokenObject;
  amountIn: string;
  minAmountOut: string;
}

async function createBridgeVaultOrder(state: State, params: CreateOrderParams): Promise<{
  receipt: TransactionReceipt | null;
  error: Record<string, string> | null;
}> {
  try {
    const { vaultAddress, targetChainId, tokenIn, tokenOut, amountIn, minAmountOut } = params;
    const wallet = Wallet.getClientInstance();
    const amountInTokenAmount = BigNumber(amountIn).shiftedBy(tokenIn.decimals);
    const minAmountOutTokenAmount = BigNumber(minAmountOut).shiftedBy(tokenOut.decimals).dp(0, 1);
    const vaultContract = new xChainContracts.OSWAP_BridgeVault(wallet, vaultAddress);
    const transactionDeadlineInMinutes = state.getCrossChainTransactionDeadline();
    const transactionDeadline = Math.floor(Date.now() / 1000 + (transactionDeadlineInMinutes * 60));
    let receipt = await vaultContract.newOrder({
      peerChain: targetChainId,
      inAmount: amountInTokenAmount,
      outToken: tokenOut.address,
      minOutAmount: minAmountOutTokenAmount,
      to: wallet.address,
      expire: transactionDeadline
    });
    return { receipt, error: null };
  } catch (error) {
    return { receipt: null, error: error as any };
  }
}

// Return the current vault asset balance by given chainId and address
const getVaultAssetBalance = async (state: State, chainId: number, vaultAddress: string) => {
  let targetChainWallet = initCrossChainWallet(state, chainId);
  const vault = new xChainContracts.OSWAP_BridgeVault(targetChainWallet, vaultAddress);
  const asset = new Contracts.ERC20(targetChainWallet, await vault.asset());
  return (await asset.balanceOf(vault.address));
}

const getChainNativeToken = (state: State): ITokenObject => {
  return ChainNativeTokenByChainId[state.getChainId()]
};

interface SwapData {
  fromAmount: BigNumber;
  toAmount: BigNumber;
}

//For testing only
const setERC20AllowanceToZero = async (token: ITokenObject, spenderAddress: string) => {
  let wallet = Wallet.getClientInstance();
  let erc20 = new Contracts.ERC20(wallet, token.address);
  let receipt = await erc20.approve({
    spender: spenderAddress,
    amount: 0
  });
  return receipt;
}

// CrossChain

function getFeeAmounts(vault: VaultStore, amountIn: BigNumber) {
  
  let deci = vault.assetToken.decimals;
  let weiAmountIn = amountIn.shiftedBy(deci);
  let baseFeeAmount = new BigNumber(vault.baseFee).shiftedBy(-deci);
  let protocolFeeAmount = new BigNumber(weiAmountIn).times(vault.protocolFee).dp(0, BigNumber.ROUND_DOWN).shiftedBy(-deci);
  let transactionFeeAmount = new BigNumber(weiAmountIn).times(vault.transactionFee).dp(0, BigNumber.ROUND_DOWN).shiftedBy(-deci);
  let imbalance = new BigNumber(vault.imbalance).minus(weiAmountIn);
  let imbalanceFeeAmount = imbalance.lt(0) ? imbalance.times(-vault.imbalanceFee).dp(0, BigNumber.ROUND_DOWN).shiftedBy(-deci) : new BigNumber("0");
  
  return {
    totalFeeAmount: baseFeeAmount.plus(protocolFeeAmount).plus(transactionFeeAmount).plus(imbalanceFeeAmount),
    baseFeeAmount,
    protocolFeeAmount,
    transactionFeeAmount,
    imbalanceFeeAmount,
  }
}
interface Route {
  fromVault: VaultStore;
  fromAmount: BigNumber;
  toVault: VaultStore;
  toAmount: BigNumber;
  feeAmounts: {
    totalFeeAmount: BigNumber;
    baseFeeAmount: BigNumber;
    protocolFeeAmount: BigNumber;
    transactionFeeAmount: BigNumber;
    imbalanceFeeAmount: BigNumber;
  }
}
function getRoute(swapInfo: SwapInfo): Route {
  
  let fromVault = findVault(swapInfo.vaultGroup, swapInfo.fromChainId);
  let toVault = findVault(swapInfo.vaultGroup, swapInfo.toChainId);
  if (!fromVault || !toVault) return null;
  let feeAmounts = getFeeAmounts(fromVault, swapInfo.inAmount);

  return {
    fromVault,
    fromAmount: swapInfo.inAmount,
    toVault,
    toAmount: swapInfo.inAmount.minus(feeAmounts.totalFeeAmount),
    feeAmounts,
  }
}

interface NewOrderParams {
  vaultAddress: string,
  targetChainId: number,
  tokenIn: ITokenObject,
  tokenOut: ITokenObject,
  amountIn: string,
  minAmountOut: string,
  sourceRouteInfo?: {
    amountOut: string,
    pairs: string[]
  }
}

//============================

interface SwapInfo {
  vaultGroup: VaultGroupStore
  toChainId: number
  fromChainId: number
  inAmount: BigNumber
}

async function findVaultGroupByToken(state: State, chainId: number, tokenAddress: string) {
  return (await getVaultGroups(state)).find(group => group.vaults[chainId]?.assetToken.address.toLowerCase() == tokenAddress.toLowerCase());
}

function findVault(vaultGroup: VaultGroupStore, chainId: number) {
  try {
    return vaultGroup.vaults[chainId];
  } catch (error) {
    return undefined;
  }
}

async function findToVault(state: State, fromChainId: number, tokenAddress: string, toChainId: number) {
  let group = await findVaultGroupByToken(state, fromChainId, tokenAddress)
  if (!group || !group.vaults) throw new Error(`No such token ${tokenAddress} recorded in chain ${fromChainId}`);
  return findVault(group, toChainId);
}

async function findAllAsset(state: State, fromChainId: number): Promise<VaultConstant[]> {
  let out: VaultConstant[] = [];
  let vgs = await getVaultGroups(state);
  vgs.forEach(group => {
    const vaults = findVault(group, fromChainId);
    if (vaults) out.push(vaults);
  });
  return out;
}

async function getVaultGroups2(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]> {
  let walletChainId = Wallet.getClientInstance().chainId;
  let networks = getNetworksByType(walletChainId);
  let vaultGroupsStore = state.getVaultGroups();

  if (!isUpdate) return vaultGroupsStore;

  //only update DYNAMIC items in VaultGroupList
  for (let i = 0; i < vaultGroupsStore.length; i++) {
    const group = vaultGroupsStore[i];
    await forEachNumberIndexAwait(group.vaults, async (vault, chainId) => {

      if (networks.every(n => n !== chainId)) return;
      let wallet = initCrossChainWallet(state, chainId);
      let vaultContract = new xChainContracts.OSWAP_BridgeVault(wallet, vault.vaultAddress);
      //let tokenContract = new xChainContracts.ERC20(wallet, vault.assetToken.address);

      vaultGroupsStore[i].vaults[chainId].tokenBalance = await vaultContract.lpAssetBalance();
      vaultGroupsStore[i].vaults[chainId].imbalance = await vaultContract.imbalance();
      //vaultGroupsStore[i].vaults[chainId].userTokenAmount = await tokenContract.balanceOf(wallet.address);
    });
  }

  state.setVaultGroups(vaultGroupsStore);
  return vaultGroupsStore;
}

async function getVaultGroups(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]> {

  return getVaultGroups2(state, isUpdate);


  console.log("getVaultGroups", isUpdate)
  let walletChainId = Wallet.getClientInstance().chainId;
  let networks = getNetworksByType(walletChainId);
  let vaultGroupsStore = state.getVaultGroups();

  if (!vaultGroupsStore || vaultGroupsStore.length < 1) {
    //vaultGroupsStore = VaultGroupList.map(g => castToVaultGroupStore(g));
    state.setVaultGroups(vaultGroupsStore);
  }
  if (!isUpdate) return vaultGroupsStore;

  let chainTask: {
    [chainId: number]: {
      assetNames: string[],
      wallet: Wallet,
      calls: IMulticallContractCall[],
    }
  } = {};
  //only update DYNAMIC items in VaultGroupList
  for (let i = 0; i < vaultGroupsStore.length; i++) {
    const group = vaultGroupsStore[i];
    console.log(networks);
    await forEachNumberIndexAwait(group.vaults, async (vault, chainId) => {
      console.log("group", group.assetName, chainId,);
      if (networks.every(n => n !== chainId)) return;
      if (!chainTask[chainId]) {
        chainTask[chainId] = {
          assetNames: [],
          wallet: initCrossChainWallet(state, Number(chainId)),
          calls: [],
        };
      }
      let vaultContract = new xChainContracts.OSWAP_BridgeVault(chainTask[chainId].wallet, vault.vaultAddress);
      let tokenContract = new xChainContracts.ERC20(chainTask[chainId].wallet, vault.assetToken.address);
      chainTask[chainId].assetNames.push(group.assetName);
      chainTask[chainId].calls.push({
        to: vault.vaultAddress,
        contract: vaultContract,
        methodName: "lpAssetBalance",
        params: []
      }, {
        to: vault.vaultAddress,
        contract: vaultContract,
        methodName: "imbalance",
        params: []
      }, {
        to: vault.vaultAddress,
        contract: vaultContract,
        methodName: "ordersLength",
        params: []
      }, {
        to: vault.assetToken.address,
        contract: tokenContract,
        methodName: "balanceOf",
        params: [chainTask[chainId].wallet.address]
      });
    });
  }
  console.log("tasks", chainTask)
  forEachNumberIndexAwait(chainTask, async (x, chainId) => {
    try {
      let res = await x.wallet.doMulticall(x.calls);
      vaultGroupsStore.forEach((group, gIndex) => {
        let callIndex = x.assetNames.findIndex(asset => asset === group.assetName);
        console.log("callIndex", callIndex);

        if (callIndex < 0) return;
        console.log("----test----");
        console.log(group.vaults[chainId].tokenBalance);
        console.log(res[callIndex * 4]);


        group.vaults[chainId].tokenBalance = res[callIndex * 4]; //TODO decimal offset
        group.vaults[chainId].imbalance = res[callIndex * 4 + 1]; //TODO decimal offset
        group.vaults[chainId].ordersLength = res[callIndex * 4 + 2];
        group.vaults[chainId].userTokenAmount = res[callIndex * 4 + 3]; //TODO decimal offset
      });
    } catch (error) {
      console.log(`Error on getVaultGroups chainId ${chainId}.`, error);
    }
  })
  state.setVaultGroups(vaultGroupsStore);
  return vaultGroupsStore;
}

async function getVaultGroupsUpdateOrders(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]> {
  return getVaultGroupsUpdateOrders2(state, isUpdate);
  console.log("getVaultGroupsUpdateOrders", isUpdate);
  let wallet = Wallet.getClientInstance();
  let walletAddress = wallet.address;
  let walletChainId = wallet.chainId;
  let networks = getNetworksByType(walletChainId);
  let vaultGroupsStore = await getVaultGroups(state, isUpdate);
  if (!isUpdate) return vaultGroupsStore;

  let chainTask: {
    [chainId: number]: {
      assetNames: string[],
      wallet: Wallet,
      calls: IMulticallContractCall[],
    }
  } = {};
  //MARK: ordersLength
  vaultGroupsStore.forEach(group => {
    forEachNumberIndex(group.vaults, (vault, chainId) => {
      if (networks.every(n => n !== chainId)) return;
      if (!chainTask[chainId]) {
        chainTask[chainId] = {
          assetNames: [],
          wallet: initCrossChainWallet(state, Number(chainId)),
          calls: [],
        };
      }
      let vaultContract = new xChainContracts.OSWAP_BridgeVault(chainTask[chainId].wallet, vault.vaultAddress);
      chainTask[chainId].assetNames.push(group.assetName);
      chainTask[chainId].calls.push({
        to: vault.vaultAddress,
        contract: vaultContract,
        methodName: "ordersLength",
        params: []
      });
    });
  });
  forEachNumberIndexAwait(chainTask, async (x, chainId) => {
    try {
      let res = await x.wallet.doMulticall(x.calls);
      vaultGroupsStore.forEach((group, gIndex) => {
        let callIndex = x.assetNames.findIndex(asset => asset === group.assetName);
        if (callIndex < 0) return;
        vaultGroupsStore[gIndex].vaults[chainId].ordersLength = res[callIndex];
      });
    } catch (error) {
      console.log(`Error on getVaultGroups chainId ${chainId}.`, error);
    }
  });
  //MARK: orders
  const size = 100;
  let rawOrders: {
    peerChain: BigNumber;
    inAmount: BigNumber;
    outToken: string;
    minOutAmount: BigNumber;
    to: string;
    expire: BigNumber;
  }[] = [];
  vaultGroupsStore.forEach(group => {
    forEachNumberIndexAwait(group.vaults, async (vault, chainId) => {
      if (networks.every(n => n !== chainId)) return;
      let vaultContract = new xChainContracts.OSWAP_BridgeVault(chainTask[chainId].wallet, vault.vaultAddress);
      for (let i = 0; i < vault.ordersLength; i += size) {
        let orderBatch = await vaultContract.getOrders({ start: i, length: size });
        rawOrders = rawOrders.concat(orderBatch);
      }
      let orders: VaultOrderStore[] = rawOrders.map((o, i) => {
        let toChain = o.peerChain.toNumber();
        return {
          id: i,
          status: VaultOrderStatus.NotSpecified,//TODO call OSWAP_BridgeVault.orderStatus
          expire: o.expire,
          fromOwner: o.to,//TODO call OSWAP_BridgeVault.orderOwner
          fromChain: chainId,
          fromToken: vault.assetToken,
          fromAmount: new BigNumber(o.inAmount),//TODO decimal offset
          toOwner: o.to,
          toChain,
          toToken: group.vaults[toChain].assetToken,
          toAmount: new BigNumber(o.minOutAmount),//actual toAmount only exist in event, TODO decimal offset
          toAmountMin: new BigNumber(o.minOutAmount),//TODO decimal offset
          protocolFee: vault.protocolFee
        }
      }).filter(o => o.toOwner === walletAddress);
      vault.userOrders = orders;
    });
  });
  console.log("end",vaultGroupsStore);
  
  state.setVaultGroups(vaultGroupsStore);
  return vaultGroupsStore;
}

async function getVaultGroupsUpdateOrders2(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]> {  
  let wallet = Wallet.getClientInstance();
  let networks = getNetworksByType(wallet.chainId);
  let vaultGroupsStore = state.getVaultGroups();

  if (!isUpdate) return vaultGroupsStore;

  //only update DYNAMIC items in VaultGroupList
  const size = 100;
  for (let i = 0; i < vaultGroupsStore.length; i++) {
    const group = Object.assign({}, vaultGroupsStore[i]);
    networks.forEach(chainId => {
      // clear user orders before updating
      if (vaultGroupsStore[i].vaults && vaultGroupsStore[i].vaults[chainId]?.userOrders) {
        vaultGroupsStore[i].vaults[chainId].userOrders = [];
      }
    })
    await forEachNumberIndexAwait(group.vaults, async (vault, chainId) => {

      if (networks.every(n => n !== chainId)) return;
      let wallet = initCrossChainWallet(state, chainId);
      let vaultContract = new xChainContracts.OSWAP_BridgeVault(wallet, vault.vaultAddress);
      let ordersLength = await vaultContract.ordersLength();
      vaultGroupsStore[i].vaults[chainId].ordersLength = ordersLength.toNumber();
      if (ordersLength.lte(0)) return;
      let rawOrders: {
        peerChain: BigNumber;
        inAmount: BigNumber;
        outToken: string;
        minOutAmount: BigNumber;
        to: string;
        expire: BigNumber;
      }[] = [];
      for (let j = 0; j < vault.ordersLength; j += size) {
        let orderBatch = await vaultContract.getOrders({ start: j, length: size });
        rawOrders = rawOrders.concat(orderBatch);
      }
      for (let k = 0; k < rawOrders.length; k++) {
        const o = rawOrders[k];
        if (o.to !== wallet.address) continue;
        let toChain = o.peerChain.toNumber();
        let toVault = findVault(group,toChain);
        if (!toVault) continue;
        let orderStatus = await vaultContract.orderStatus(k);
        let fromChainStatus = castToVaultOrderStatus(orderStatus.toNumber());
        
        let toVaultContract = new xChainContracts.OSWAP_BridgeVault(initCrossChainWallet(state, toChain), toVault.vaultAddress);
        let toOrderStatus = await toVaultContract.swapOrderStatus(await toVaultContract.hashOrder({
          owner: wallet.address,
          sourceChainId: chainId,
          orderId: k
        }));
        let toChainStatus = castToVaultOrderStatus(toOrderStatus.toNumber());
        let status = determineRealOrderStatus(o.expire,fromChainStatus,toChainStatus)
        //console.log(`#${k} ${new BigNumber(o.inAmount)} real${status} from${orderStatus} to${toOrderStatus.toNumber()}`);

        vaultGroupsStore[i].vaults[chainId].userOrders.push({
          id: k,
          status,
          expire: o.expire,
          fromOwner: o.to,//TODO call OSWAP_BridgeVault.orderOwner
          fromChain: chainId,
          fromToken: vault.assetToken,
          fromAmount: new BigNumber(o.inAmount),//TODO decimal offset
          toOwner: o.to,
          toChain,
          toToken: group.vaults[toChain].assetToken,
          toAmount: new BigNumber(o.minOutAmount),//actual toAmount only exist in event, TODO decimal offset
          toAmountMin: new BigNumber(o.minOutAmount),//TODO decimal offset
          protocolFee: vault.protocolFee
        });
      }
    });
  }

  state.setVaultGroups(vaultGroupsStore);
  return vaultGroupsStore;
}

export {
  getFeeAmounts,
  getVaultGroups2,
  getVaultGroups,
  getVaultGroupsUpdateOrders,
  VaultTokenMap,
  getVaultTokenMap,
  getBond,
  initCrossChainWallet,
  CreateOrderParams,
  CreateBridgeVaultOrderParams,
  createBridgeVaultOrder,
  GetAvailableRouteOptionsParams,
  Route,
  getRoute,
  ICrossChainRouteResult,
  getVaultAssetBalance,
  findAllAsset,
  findToVault,
  findVaultGroupByToken,
  SwapData,
  getChainNativeToken,
  setERC20AllowanceToZero,
  NewOrderParams,
}