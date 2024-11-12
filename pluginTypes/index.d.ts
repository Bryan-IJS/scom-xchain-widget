/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-commission-proxy-contract/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-dapp-container/@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@ijstech/eth-contract/index.d.ts" />
/// <amd-module name="@scom/scom-xchain-widget/store/data/core.ts" />
declare module "@scom/scom-xchain-widget/store/data/core.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    export interface TokenConstant {
        address: string;
        name: string;
        decimals: number;
        symbol: string;
    }
    export interface TokenStore {
        address: string;
        name: string;
        decimals: number;
        symbol: string;
        userBalance: BigNumber;
    }
    export interface ContractSet {
        WETH9: string;
        GOV_TOKEN: string;
        OSWAP_ConfigStore: string;
        TrollRegistry: string;
    }
    export const MainnetMainChain = 56;
    export const TestnetMainChain = 97;
    export const Mainnets: number[];
    export const Testnets: number[];
    export const CoreContractStore: {
        [chainId: number]: ContractSet;
    };
    export const crossChainNativeTokenList: {
        [chainId: number]: {
            address: string;
            decimals: number;
            symbol: string;
            name: string;
            isNative: boolean;
            wethAddress: string;
        };
    };
    export const orderMinOutRate = "0.005";
    export enum VaultType {
        Project = "Project",
        Exchange = "Exchange"
    }
    export interface VaultConstant {
        chainId: number;
        assetToken: TokenConstant;
        vaultRegistryAddress: string;
        vaultAddress: string;
        vaultDecimals?: number;
        softCap: number;
        baseFee: string;
        protocolFee: string;
        transactionFee: string;
        imbalanceFee: string;
    }
    export interface VaultGroupConstant {
        assetName: string;
        vaultType: VaultType;
        vaults: {
            [chainId: number]: VaultConstant;
        };
        deprecated?: boolean;
    }
    export const VaultGroupList: VaultGroupConstant[];
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/mainnet/avalanche.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/mainnet/avalanche.ts" {
    export const Tokens_Avalanche: {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
    }[];
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/mainnet/bsc.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/mainnet/bsc.ts" {
    export const Tokens_BSC: {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
    }[];
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/mainnet/index.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/mainnet/index.ts" {
    export { Tokens_Avalanche } from "@scom/scom-xchain-widget/store/data/tokens/mainnet/avalanche.ts";
    export { Tokens_BSC } from "@scom/scom-xchain-widget/store/data/tokens/mainnet/bsc.ts";
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/testnet/bsc-testnet.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/testnet/bsc-testnet.ts" {
    export const Tokens_BSC_Testnet: {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
    }[];
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/testnet/fuji.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/testnet/fuji.ts" {
    export const Tokens_Fuji: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/testnet/index.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/testnet/index.ts" {
    export { Tokens_BSC_Testnet } from "@scom/scom-xchain-widget/store/data/tokens/testnet/bsc-testnet.ts";
    export { Tokens_Fuji } from "@scom/scom-xchain-widget/store/data/tokens/testnet/fuji.ts";
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/tokens/index.ts" />
declare module "@scom/scom-xchain-widget/store/data/tokens/index.ts" {
    import { ITokenObject } from "@scom/scom-token-list";
    const SupportedERC20Tokens: {
        [chainId: number]: ITokenObject[];
    };
    export { SupportedERC20Tokens };
}
/// <amd-module name="@scom/scom-xchain-widget/store/data/index.ts" />
declare module "@scom/scom-xchain-widget/store/data/index.ts" {
    export * from "@scom/scom-xchain-widget/store/data/core.ts";
    export { SupportedERC20Tokens } from "@scom/scom-xchain-widget/store/data/tokens/index.ts";
}
/// <amd-module name="@scom/scom-xchain-widget/global/helper.ts" />
declare module "@scom/scom-xchain-widget/global/helper.ts" {
    export enum SITE_ENV {
        DEV = "dev",
        TESTNET = "testnet",
        MAINNET = "mainnet"
    }
    export const DefaultDateTimeFormat = "DD/MM/YYYY HH:mm:ss";
    export const DefaultDateFormat = "DD/MM/YYYY";
    export const formatDate: (date: any, customType?: string, showTimezone?: boolean) => string;
    export const formatNumber: (value: any, decimals?: number, options?: {
        min?: number;
        sign?: string;
    }) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const isInvalidInput: (val: any) => boolean;
    export const limitInputNumber: (input: any, decimals: number) => void;
    export const limitDecimals: (value: any, decimals: number) => any;
    export function getAPI(url: string, paramsObj?: any): Promise<any>;
    export const showResultMessage: (result: any, status: 'warning' | 'success' | 'error', content?: string | Error) => void;
}
/// <amd-module name="@scom/scom-xchain-widget/global/common.ts" />
declare module "@scom/scom-xchain-widget/global/common.ts" {
    import { ISendTxEventsOptions } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export type TokenMapType = {
        [token: string]: ITokenObject;
    };
    export const registerSendTxEvents: (sendTxEventHandlers: ISendTxEventsOptions) => void;
}
/// <amd-module name="@scom/scom-xchain-widget/global/index.ts" />
declare module "@scom/scom-xchain-widget/global/index.ts" {
    import { INetwork } from '@ijstech/eth-wallet';
    export interface IExtendedNetwork extends INetwork {
        shortName?: string;
        isDisabled?: boolean;
        isMainChain?: boolean;
        isCrossChainSupported?: boolean;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isTestnet?: boolean;
    }
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        IsWalletDisconnected = "IsWalletDisconnected",
        Paid = "Paid",
        chainChanged = "chainChanged",
        ShowExpertModal = "showExpertModal",
        ShowTransactionModal = "showTransactionModal",
        SlippageToleranceChanged = "slippageToleranceChanged",
        ExpertModeChanged = "expertModeChanged"
    }
    export { getAPI, formatNumber, formatNumberWithSeparators, DefaultDateTimeFormat, DefaultDateFormat, formatDate, limitDecimals, limitInputNumber, isInvalidInput, SITE_ENV, showResultMessage } from "@scom/scom-xchain-widget/global/helper.ts";
    export { registerSendTxEvents, TokenMapType } from "@scom/scom-xchain-widget/global/common.ts";
}
/// <amd-module name="@scom/scom-xchain-widget/data.json.ts" />
declare module "@scom/scom-xchain-widget/data.json.ts" {
    const _default: {
        infuraId: string;
        defaultBuilderData: {
            tokens: {
                address: string;
                chainId: number;
            }[];
            defaultChainId: number;
            networks: {
                chainId: number;
            }[];
            wallets: {
                name: string;
            }[];
            showHeader: boolean;
            showFooter: boolean;
        };
        supportedNetworks: ({
            chainId: number;
            isMainChain: boolean;
            isCrossChainSupported: boolean;
            isTestnet?: undefined;
        } | {
            chainId: number;
            isMainChain: boolean;
            isCrossChainSupported: boolean;
            isTestnet: boolean;
        } | {
            chainId: number;
            isCrossChainSupported: boolean;
            isTestnet: boolean;
            isMainChain?: undefined;
        } | {
            chainId: number;
            isCrossChainSupported: boolean;
            isMainChain?: undefined;
            isTestnet?: undefined;
        })[];
    };
    export default _default;
}
/// <amd-module name="@scom/scom-xchain-widget/store/utils.ts" />
declare module "@scom/scom-xchain-widget/store/utils.ts" {
    import { BigNumber, ERC20ApprovalModel, IERC20ApprovalEventOptions } from '@ijstech/eth-wallet';
    import { IExtendedNetwork, TokenMapType } from "@scom/scom-xchain-widget/global/index.ts";
    import { VaultConstant, VaultGroupConstant, VaultType, TokenConstant } from "@scom/scom-xchain-widget/store/data/core.ts";
    import { ITokenObject } from '@scom/scom-token-list';
    import { INetworkConfig } from '@scom/scom-network-picker';
    export interface IWalletConnectMetadata {
        name: string;
        description: string;
        url: string;
        icons: string[];
    }
    export interface IWalletConnectConfig {
        projectId: string;
        metadata: IWalletConnectMetadata;
    }
    export enum WalletPlugin {
        MetaMask = "metamask",
        Coin98 = "coin98",
        TrustWallet = "trustwallet",
        BinanceChainWallet = "binancechainwallet",
        ONTOWallet = "onto",
        WalletConnect = "walletconnect",
        BitKeepWallet = "bitkeepwallet",
        FrontierWallet = "frontierwallet"
    }
    export enum NetworkType {
        Mainnet = 0,
        Testnet = 1,
        NotSupported = 2
    }
    export function getNetworkType(chainId: number): NetworkType;
    export function getNetworksByType(chainId: number): number[];
    export function forEachNumberIndexAwait<T>(list: {
        [index: number]: T;
    }, callbackFn: (item: T, index: number) => Promise<void>): Promise<void>;
    export function forEachNumberIndex<T>(list: {
        [index: number]: T;
    }, callbackFn: (item: T, index: number) => void): void;
    export function forEachStringIndexAwait<T>(list: {
        [index: string]: T;
    }, callbackFn: (item: T, index: string) => Promise<void>): Promise<void>;
    export function forEachStringIndex<T>(list: {
        [index: string]: T;
    }, callbackFn: (item: T, index: string) => void): void;
    export function filterNumberIndexedList<T>(list: {
        [index: number]: T;
    }, filterFn: (item: T, index: number) => boolean): {
        [index: number]: T;
    };
    export function filterVaultInsideGroup(vgs: VaultGroupConstant[], filterFn: (vault: VaultConstant, chainId: number) => boolean): {
        assetName: string;
        vaultType: VaultType;
        vaults: {
            [index: number]: VaultConstant;
        };
    }[];
    export interface VaultGroupStore {
        assetName: string;
        vaultType: VaultType;
        vaults: {
            [chainId: number]: VaultStore;
        };
        deprecated?: boolean;
    }
    export interface VaultStore extends VaultConstant {
        tokenBalance: BigNumber;
        imbalance: BigNumber;
        ordersLength: number;
        userTokenAmount: BigNumber;
        userOrders: VaultOrderStore[];
    }
    export interface VaultOrderStore {
        id: number;
        status: VaultOrderStatus;
        expire: BigNumber;
        fromOwner: string;
        fromChain: number;
        fromToken: TokenConstant;
        fromAmount: BigNumber;
        toOwner: string;
        toChain: number;
        toToken: TokenConstant;
        toAmount: BigNumber;
        toAmountMin: BigNumber;
        protocolFee: string;
    }
    export enum VaultOrderStatus {
        NotSpecified = 0,
        Pending = 1,
        Executed = 2,
        RequestCancel = 3,
        RefundApproved = 4,
        Cancelled = 5,
        RequestAmend = 6,
        Expired = 7
    }
    export interface VaultOrderItem {
        assetName: string;
        fromVaultAddress: string;
        toVaultAddress: string;
        orderId: number;
        expire: BigNumber;
        fromNetwork: IExtendedNetwork;
        toNetwork: IExtendedNetwork;
        price: string;
        protocolFee: BigNumber;
        fromAmount: string;
        fromToken: TokenConstant;
        toToken: TokenConstant;
        toAmount: string;
        minOutAmount: string;
        sourceVaultToken: TokenConstant;
        sourceVaultInAmount: string;
        statusCode: VaultOrderStatus;
        status: string;
        sender: string;
    }
    interface Logo {
        default: string;
        mobile: string;
        footer: string;
    }
    interface FooterPageInfo {
        caption: string;
        link: string;
    }
    interface SocialMediaInfo {
        img: string;
        link: string;
    }
    interface TokenInfo {
        symbol: string;
        img: string;
    }
    export interface ProjectInfo {
        logo: Logo;
        versionText: string;
    }
    export interface IParams {
        projectInfo: ProjectInfo;
        footerPagesInfo: FooterPageInfo[];
        socialMediaInfo: SocialMediaInfo[];
        tokenInfo: TokenInfo;
    }
    export type ProxyAddresses = {
        [key: number]: string;
    };
    export class State {
        defaultChainId: number;
        isExpertMode: boolean;
        slippageTolerance: string;
        crossChainTransactionDeadline: number;
        proxyAddresses: ProxyAddresses;
        infuraId: string;
        rpcWalletId: string;
        networkMap: {
            [key: number]: IExtendedNetwork;
        };
        networkConfig: INetworkConfig[];
        vaultGroups: VaultGroupStore[];
        embedderCommissionFee: string;
        approvalModel: ERC20ApprovalModel;
        constructor(options: any);
        initRpcWallet(defaultChainId: number): string;
        getRpcWallet(): import("@ijstech/eth-wallet").IRpcWallet;
        isRpcWalletConnected(): boolean;
        getProxyAddress(chainId?: number): string;
        getNetworkInfo: (chainId: number) => IExtendedNetwork;
        getFilteredNetworks: (filter: (value: IExtendedNetwork, index: number, array: IExtendedNetwork[]) => boolean) => IExtendedNetwork[];
        getSiteSupportedNetworks: () => IExtendedNetwork[];
        getMatchNetworks: (conditions: NetworkConditions) => IExtendedNetwork[];
        getNetworkExplorerName: (chainId: number) => string;
        viewOnExplorerByTxHash: (chainId: number, txHash: string) => void;
        viewOnExplorerByAddress: (chainId: number, address: string) => void;
        getChainId(): number;
        toggleExpertMode(): void;
        getSlippageTolerance: () => number;
        setSlippageTolerance: (value: number) => void;
        getCrossChainTransactionDeadline: () => number;
        setCrossChainTransactionDeadline: (value: number) => void;
        setVaultGroups: (vaultGroups: VaultGroupStore[]) => void;
        getVaultGroups: () => VaultGroupStore[];
        setNetworkConfig: (networks: INetworkConfig[]) => void;
        getNetworkConfig: () => INetworkConfig[];
        private initData;
        setApprovalModelAction(options: IERC20ApprovalEventOptions): Promise<import("@ijstech/eth-wallet").IERC20ApprovalAction>;
    }
    export function castToVaultOrderStatus(n: number): VaultOrderStatus;
    export function determineRealOrderStatus(expire: number | BigNumber, fromChainStatus: VaultOrderStatus, toChainStatus: VaultOrderStatus): VaultOrderStatus;
    interface NetworkConditions {
        isDisabled?: boolean;
        isTestnet?: boolean;
        isCrossChainSupported?: boolean;
        isMainChain?: boolean;
    }
    export const getTokensDataList: (tokenMapData: TokenMapType, tokenBalances: any) => Promise<any[]>;
    export function getWalletProvider(): string;
    export function isWalletConnected(): boolean;
    export const truncateAddress: (address: string) => string;
    export function getAddresses(chainId: number): import("@scom/scom-xchain-widget/store/data/core.ts").ContractSet;
    export const getChainNativeToken: (chainId: number) => ITokenObject;
    export const getGovToken: (chainId: number) => ITokenObject;
}
/// <amd-module name="@scom/scom-xchain-widget/store/index.ts" />
declare module "@scom/scom-xchain-widget/store/index.ts" {
    import { VaultConstant, VaultGroupConstant } from "@scom/scom-xchain-widget/store/data/index.ts";
    import { State } from "@scom/scom-xchain-widget/store/utils.ts";
    export * from "@scom/scom-xchain-widget/store/data/index.ts";
    export const nullAddress = "0x0000000000000000000000000000000000000000";
    export const getTokenIcon: (address: string, chainId: number) => string;
    export const getNetworkImg: (state: State, chainId: number) => string;
    export function findConstantTokenByVault(chainId: number, vaultAddress: string): import("@scom/scom-xchain-widget/store/data/core.ts").TokenConstant;
    export function findConstantVaultGroupByToken(chainId: number, tokenAddress: string): VaultGroupConstant;
    export function findConstantVault(vaultGroup: VaultGroupConstant, chainId: number): VaultConstant;
    export function findConstantToVault(fromChainId: number, tokenAddress: string, toChainId: number): VaultConstant;
    export function findConstantAllAsset(fromChainId: number): VaultConstant[];
    export * from "@scom/scom-xchain-widget/store/utils.ts";
}
/// <amd-module name="@scom/scom-xchain-widget/crosschain-utils/crosschain-utils.types.ts" />
declare module "@scom/scom-xchain-widget/crosschain-utils/crosschain-utils.types.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-list";
    export interface IBridgeVaultBond {
        vaultTrollRegistry: string;
        chainId: number;
        trollId: string;
        shareHolder: string;
        bond: string;
        shares: string;
        sharesPendingWithdrawal: string;
        sharesApprovedWithdrawal: string;
        version: string;
    }
    export interface IBridgeVault {
        chainId: number;
        address: string;
        asset: string;
        configStore: string;
        baseFee: string;
        protocolFee: string;
        transactionFee: string;
        imbalanceFee: string;
        lpAssetBalance: string;
        imbalance: string;
        vaultType: string;
        vaultGroup: string;
        version: string;
    }
    export interface CreateBridgeVaultOrderParams {
        vaultAddress: string;
        targetChainId: number;
        tokenIn: ITokenObject;
        tokenOut: ITokenObject;
        amountIn: string;
        minAmountOut: string;
        transactionSetting: {
            transactionDeadlineInMinutes: number;
            slippageTolerance: number;
        };
        sourceRouteInfo?: {
            amountOut: string;
            pairs: string[];
        };
    }
    export interface Order {
        peerChain: number | BigNumber;
        inAmount: number | BigNumber;
        outToken: string;
        minOutAmount: number | BigNumber;
        to: string;
        expire: number | BigNumber;
    }
    export interface SwapExactETHForTokensParams {
        pair: string[];
        vault: string;
        deadline: number | BigNumber;
        order: Order;
    }
    export interface SwapExactTokensForTokensParams {
        pair: string[];
        vault: string;
        amountIn: number | BigNumber;
        deadline: number | BigNumber;
        order: Order;
    }
    export interface GetAvailableRouteOptionsParams {
        fromChainId: number;
        toChainId: number;
        tokenIn: ITokenObject;
        tokenOut: ITokenObject;
        amountIn: number | BigNumber;
    }
    export interface IBridgeFees {
        baseFee: BigNumber | number;
        protocolFee: BigNumber | number;
        transactionFee: BigNumber | number;
        imbalanceFee: BigNumber | number;
        sourceRouteLiquidityFee?: BigNumber | number;
        targetRouteLiquidityFee?: BigNumber | number;
    }
    export interface ICrossChainRouteResult {
        contractAddress: string;
        vaultAddress: string;
        fromAmount: BigNumber;
        toAmount: BigNumber;
        fees: IBridgeFees;
        price: number;
        priceSwap: number;
        priceImpact: number;
        sourceRouteObj?: IRoutesResult | null;
        sourceVaultToken?: ITokenObject | null;
        targetRouteObj: IRoutesResult;
        targetVaultToken: ITokenObject;
        vaultTokenToTargetChain: string;
        vaultTokenFromSourceChain: BigNumber;
        isApproveButtonShown?: boolean;
        tardeFee: number;
    }
    export interface IRoutesResult {
        amountOut: BigNumber;
        bestRoutes: ITokenObject[];
        bestSmartRoute: IBestSmartRoute[];
        key: string;
        market: number[];
        pairs: string[];
        price: number;
        priceImpact: number;
        provider: string;
        queueType: number;
        tradeFee: string;
    }
    export interface IBestSmartRoute {
        caption: string;
        fromToken: ITokenObject;
        toToken: ITokenObject;
        isRegistered: boolean;
        pairAddress: string;
        provider: string;
    }
    export interface ICrossChainRouteFromAPI {
        vault: string;
        sourceRoute: IRoutesAPI;
        targetRoute: IRoutesAPI;
        fees: IBridgeFees;
    }
    export interface IRoutesAPI {
        amountOut: string;
        dexId: number;
        queueType?: number;
        isDirectRoute: boolean;
        route: IRouteAPI[];
        tokens: {
            address: string;
            decimals: number;
            name: string;
            symbol: string;
        }[];
        tradeFees: {
            fee: string;
            base: string;
        }[];
    }
    export interface IRouteAPI {
        address: string;
        dexId: number;
        isRegistered: boolean;
        reserves: {
            reserve0: string;
            reserve1: string;
        };
        boostReserves?: {
            boostReserveIn: string;
            boostReserveOut: string;
        };
        queueType?: number;
        orderIds?: string[];
    }
}
/// <amd-module name="@scom/scom-xchain-widget/crosschain-utils/API.ts" />
declare module "@scom/scom-xchain-widget/crosschain-utils/API.ts" {
    import { VaultGroupStore, VaultConstant, VaultStore, State } from "@scom/scom-xchain-widget/store/index.ts";
    import { Wallet, BigNumber, TransactionReceipt } from "@ijstech/eth-wallet";
    import '@ijstech/eth-contract';
    import { CreateBridgeVaultOrderParams, GetAvailableRouteOptionsParams, ICrossChainRouteResult } from "@scom/scom-xchain-widget/crosschain-utils/crosschain-utils.types.ts";
    import { ITokenObject } from "@scom/scom-token-list";
    const initCrossChainWallet: (state: State, chainId: number) => Wallet;
    interface VaultTokenMap {
        [chainId: string]: {
            [vaultAddress: string]: string;
        };
    }
    const getVaultTokenMap: () => VaultTokenMap;
    function getBond(state: State, vault: VaultConstant | VaultStore): Promise<BigNumber>;
    interface CreateOrderParams {
        vaultAddress: string;
        targetChainId: number;
        tokenIn: ITokenObject;
        tokenOut: ITokenObject;
        amountIn: string;
        minAmountOut: string;
    }
    function createBridgeVaultOrder(state: State, params: CreateOrderParams): Promise<{
        receipt: TransactionReceipt | null;
        error: Record<string, string> | null;
    }>;
    const getVaultAssetBalance: (state: State, chainId: number, vaultAddress: string) => Promise<BigNumber>;
    const getChainNativeToken: (state: State) => ITokenObject;
    interface SwapData {
        fromAmount: BigNumber;
        toAmount: BigNumber;
    }
    const setERC20AllowanceToZero: (token: ITokenObject, spenderAddress: string) => Promise<import("@ijstech/eth-contract").TransactionReceipt>;
    function getFeeAmounts(vault: VaultStore, amountIn: BigNumber): {
        totalFeeAmount: BigNumber;
        baseFeeAmount: BigNumber;
        protocolFeeAmount: BigNumber;
        transactionFeeAmount: BigNumber;
        imbalanceFeeAmount: BigNumber;
    };
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
        };
    }
    function getRoute(swapInfo: SwapInfo): Route;
    interface NewOrderParams {
        vaultAddress: string;
        targetChainId: number;
        tokenIn: ITokenObject;
        tokenOut: ITokenObject;
        amountIn: string;
        minAmountOut: string;
        sourceRouteInfo?: {
            amountOut: string;
            pairs: string[];
        };
    }
    interface SwapInfo {
        vaultGroup: VaultGroupStore;
        toChainId: number;
        fromChainId: number;
        inAmount: BigNumber;
    }
    function findVaultGroupByToken(state: State, chainId: number, tokenAddress: string): Promise<VaultGroupStore>;
    function findToVault(state: State, fromChainId: number, tokenAddress: string, toChainId: number): Promise<VaultStore>;
    function findAllAsset(state: State, fromChainId: number): Promise<VaultConstant[]>;
    function getVaultGroups2(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]>;
    function getVaultGroups(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]>;
    function getVaultGroupsUpdateOrders(state: State, isUpdate?: boolean): Promise<VaultGroupStore[]>;
    export { getFeeAmounts, getVaultGroups2, getVaultGroups, getVaultGroupsUpdateOrders, VaultTokenMap, getVaultTokenMap, getBond, initCrossChainWallet, CreateOrderParams, CreateBridgeVaultOrderParams, createBridgeVaultOrder, GetAvailableRouteOptionsParams, Route, getRoute, ICrossChainRouteResult, getVaultAssetBalance, findAllAsset, findToVault, findVaultGroupByToken, SwapData, getChainNativeToken, setERC20AllowanceToZero, NewOrderParams, };
}
/// <amd-module name="@scom/scom-xchain-widget/crosschain-utils/index.ts" />
declare module "@scom/scom-xchain-widget/crosschain-utils/index.ts" {
    import { State } from "@scom/scom-xchain-widget/store/index.ts";
    export const getCommissionRate: (state: State, campaignId: number) => Promise<string>;
    export * from "@scom/scom-xchain-widget/crosschain-utils/API.ts";
}
/// <amd-module name="@scom/scom-xchain-widget/price-info/index.css.ts" />
declare module "@scom/scom-xchain-widget/price-info/index.css.ts" { }
/// <amd-module name="@scom/scom-xchain-widget/assets.ts" />
declare module "@scom/scom-xchain-widget/assets.ts" {
    function fullPath(path: string): string;
    const _default_1: {
        fullPath: typeof fullPath;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-xchain-widget/price-info/index.tsx" />
declare module "@scom/scom-xchain-widget/price-info/index.tsx" {
    import { Module, Control, ControlElement, Image, Icon, Container } from '@ijstech/components';
    import "@scom/scom-xchain-widget/price-info/index.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['price-info']: ControlElement;
            }
        }
    }
    export class PriceInfo extends Module {
        private priceContent;
        private _items;
        onTogglePrice: any;
        constructor(parent?: Container, options?: any);
        get Items(): any[];
        set Items(value: any[]);
        renderItems: () => Promise<void>;
        onRenderToggleBtn: (parent: Control) => Image;
        renderIconTooltip: (parent: Control, item: any) => Promise<Icon>;
        updateItems: () => Promise<void>;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-xchain-widget/expert-mode-settings/index.css.ts" />
declare module "@scom/scom-xchain-widget/expert-mode-settings/index.css.ts" {
    const _default_2: string;
    export default _default_2;
}
/// <amd-module name="@scom/scom-xchain-widget/expert-mode-settings/index.tsx" />
declare module "@scom/scom-xchain-widget/expert-mode-settings/index.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { State } from "@scom/scom-xchain-widget/store/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['xchain-expert-mode-settings']: ControlElement;
            }
        }
    }
    export class ExpertModeSettings extends Module {
        private expertModal;
        private $eventBus;
        private state;
        constructor(state: State, parent?: Container, options?: any);
        init(): Promise<void>;
        closeModal(): void;
        showModal(): void;
        onToggle(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-xchain-widget/transaction-settings-layout/index.css.ts" />
declare module "@scom/scom-xchain-widget/transaction-settings-layout/index.css.ts" {
    const _default_3: string;
    export default _default_3;
}
/// <amd-module name="@scom/scom-xchain-widget/transaction-settings-layout/index.tsx" />
declare module "@scom/scom-xchain-widget/transaction-settings-layout/index.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { State } from "@scom/scom-xchain-widget/store/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['xchain-transaction-settings-layout']: ControlElement;
            }
        }
    }
    export class TransactionSettingsLayout extends Module {
        private slippageGroup;
        private slippageInput;
        private warningIcon;
        private switchBox;
        private slippageRow;
        private switchBoxRow;
        private crossChainDeadlineInput;
        private crossChainDeadlineGroup;
        private crossChainDeadlineMessage;
        private crossChainDeadlineRow;
        private crossChainDeadlineInputRow;
        private _showSlippageOnly;
        private _showCrossChain;
        private state;
        private $eventBus;
        private slippageToleranceMessage;
        constructor(state: State, parent?: Container, options?: any);
        get showSlippageOnly(): boolean;
        set showSlippageOnly(value: boolean);
        get showCrossChain(): boolean;
        set showCrossChain(value: boolean);
        init(): Promise<void>;
        private registerEvent;
        private onRenderSlippage;
        private onRenderWarningElm;
        private onActiveItem;
        private onSelectSlippage;
        private inputSlippageTolerance;
        private blurSlippageTolerance;
        private setSlippageToleranceMessage;
        private inputCrossChainDeadline;
        private blurCrossChainTransactionDeadline;
        private handleProcessExpertMode;
        private setDefaultTransactionSettings;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-xchain-widget/transaction-settings/index.css.ts" />
declare module "@scom/scom-xchain-widget/transaction-settings/index.css.ts" {
    const _default_4: string;
    export default _default_4;
}
/// <amd-module name="@scom/scom-xchain-widget/transaction-settings/index.tsx" />
declare module "@scom/scom-xchain-widget/transaction-settings/index.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { State } from "@scom/scom-xchain-widget/store/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['xchain-transaction-settings']: ControlElement;
            }
        }
    }
    export class TransactionSettings extends Module {
        private transactionModal;
        private transactionLayout;
        private mainContent;
        private state;
        private _showCrossChain;
        get showCrossChain(): boolean;
        set showCrossChain(value: boolean);
        constructor(state: State, parent?: Container, options?: any);
        init(): Promise<void>;
        closeModal(): void;
        showModal(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-xchain-widget/bridge-record/bridgeRecordColumn.ts" />
declare module "@scom/scom-xchain-widget/bridge-record/bridgeRecordColumn.ts" {
    import { State, VaultOrderItem } from "@scom/scom-xchain-widget/store/index.ts";
    import { Icon, VStack } from '@ijstech/components';
    const truncateAddress: (address: string, length: number, separator?: string) => string;
    const toTokenIcon: (data: any) => string;
    const viewTransaction: (state: State, chainId: number, txHash: string) => void;
    const bridgeRecordColumns: ({
        title: string;
        fieldName: string;
        onRenderCell: (source: any, data: number, row: VaultOrderItem) => string;
        type?: undefined;
    } | {
        title: string;
        fieldName: string;
        onRenderCell: (source: any, data: any, row: VaultOrderItem) => VStack;
        type?: undefined;
    } | {
        title: string;
        fieldName: string;
        type: string;
        onRenderCell: (source: any, data: any, row: VaultOrderItem) => Promise<Icon>;
    })[];
    export { bridgeRecordColumns, toTokenIcon, viewTransaction, truncateAddress };
}
/// <amd-module name="@scom/scom-xchain-widget/bridge-record/bridgeRecord.css.ts" />
declare module "@scom/scom-xchain-widget/bridge-record/bridgeRecord.css.ts" {
    export const bridgeStyle: string;
}
/// <amd-module name="@scom/scom-xchain-widget/bridge-record/bridgeRecordAPI.ts" />
declare module "@scom/scom-xchain-widget/bridge-record/bridgeRecordAPI.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { State, VaultOrderItem } from "@scom/scom-xchain-widget/store/index.ts";
    import { ITokenObject } from "@scom/scom-token-list";
    const getAllUserOrders: (state: State) => Promise<{
        orders: VaultOrderItem[];
        total: number;
    }>;
    interface IRequestCancelOrderParams {
        vaultAddress: string;
        sourceChainId: number;
        orderId: number;
    }
    const requestCancelOrder: (params: IRequestCancelOrderParams) => Promise<import("@ijstech/eth-contract").TransactionReceipt>;
    interface IWithdrawUnexecutedOrderParams {
        vaultAddress: string;
        orderId: number;
    }
    const withdrawUnexecutedOrder: (params: IWithdrawUnexecutedOrderParams) => Promise<import("@ijstech/eth-contract").TransactionReceipt>;
    interface IRequestAmendOrderParams {
        vaultAddress: string;
        orderId: number;
        tokenOut: ITokenObject;
        minAmountOut: number | BigNumber;
    }
    const requestAmendOrder: (state: State, params: IRequestAmendOrderParams, callbackFn?: (err: Error, receipt?: string) => Promise<void>) => Promise<false | import("@ijstech/eth-contract").TransactionReceipt>;
    export { getAllUserOrders, IRequestCancelOrderParams, requestCancelOrder, IWithdrawUnexecutedOrderParams, withdrawUnexecutedOrder, IRequestAmendOrderParams, requestAmendOrder };
}
/// <amd-module name="@scom/scom-xchain-widget/bridge-record/index.tsx" />
declare module "@scom/scom-xchain-widget/bridge-record/index.tsx" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import { IExtendedNetwork } from "@scom/scom-xchain-widget/global/index.ts";
    import { VaultOrderItem, State } from "@scom/scom-xchain-widget/store/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['xchain-bridge-record']: ControlElement;
            }
        }
    }
    export class BridgeRecord extends Module {
        private bridgeRecordTable;
        private mobilePanel;
        private hStackPagination;
        private largeLoading;
        private requestCancelModal;
        private txStatusModal;
        private titleModalLabel;
        private confirmNetwork;
        private switchNetworkPnl;
        private networkNameLabel;
        private networkNameVal;
        private withdrawAmount;
        private noteCancelOrWithdraw;
        private noteNetwork;
        private resubmitOrderModal;
        private tokenReceiveSelection;
        private resubmitConfirmNetwork;
        private resubmitConfirmPnl;
        private resubmitExpectedReceive;
        private switchChainId;
        private resubmitToken;
        private isCancel;
        private sortByDate;
        private chainId;
        private _lastUpdated;
        private lastUpdatedText;
        private paging;
        private iconRefresh;
        private timer;
        private $eventBus;
        private currentHash;
        private selectedItem;
        private isPageKept;
        private filter;
        private orders;
        private oldSource;
        private oldDestination;
        private searchSourceBtn;
        private searchDestinationBtn;
        private sortDateBtn;
        private searchTokenGroupBtn;
        private searchSourceModal;
        private searchDestinationModal;
        private sortDateModal;
        private searchTokenGroupModal;
        private assetName;
        private sourceChain;
        private destinationChain;
        private emptyMsg;
        private btnElm;
        private newMinAmountOut;
        private targetTokenBalances;
        private targetTokenMap;
        private bridgeRecordMobile;
        private listPagination;
        private itemStart;
        private itemEnd;
        private currentAction;
        private initializedState;
        private state;
        private clientEvents;
        switchNetworkByWallet: Function;
        constructor(state: State, parent?: Container, options?: any);
        onHide(): void;
        private registerEvent;
        onChainChange: () => Promise<void>;
        onWalletConnect: () => Promise<void>;
        private onUpdateReceiveVal;
        get lastUpdated(): number;
        set lastUpdated(value: number);
        get networkList(): IExtendedNetwork[];
        get dataListFiltered(): VaultOrderItem[];
        private getFilteredData;
        private onSelectIndex;
        private refreshData;
        private refreshUI;
        private renderEmpty;
        private onChangeSorting;
        private onChangeSource;
        private onChangeDestination;
        private onChangeTokenGroup;
        private generateData;
        private resetData;
        private expandRecord;
        private updateRecords;
        private renderRecords;
        private setVaultOrderMap;
        private setVisibleMd;
        resizeLayout(width: number | string): void;
        init(): Promise<void>;
        private onConfirm;
        private removeCurrentValues;
        private onSwitchNetwork;
        private updateSwitchButton;
        private showCancelOrWithdrawModal;
        private showResubmitModal;
        private get targetTokenList();
        closeModal: () => void;
        private closeResubmitModal;
        private resetReceiveVal;
        private updateReceiveVal;
        private getTargetInfoObj;
        private onRefresh;
        private renderFilterButton;
        private onRenderDataMobile;
        private onExpandedRowRender;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-xchain-widget/formSchema.ts" />
declare module "@scom/scom-xchain-widget/formSchema.ts" {
    import ScomNetworkPicker from '@scom/scom-network-picker';
    import ScomTokenInput from '@scom/scom-token-input';
    export function getBuilderSchema(): {
        dataSchema: {
            type: string;
            properties: {
                networks: {
                    type: string;
                    required: boolean;
                    items: {
                        type: string;
                        maxItems: number;
                        properties: {
                            chainId: {
                                type: string;
                                enum: number[];
                                required: boolean;
                            };
                        };
                    };
                };
                tokens: {
                    type: string;
                    required: boolean;
                    items: {
                        type: string;
                        properties: {
                            chainId: {
                                type: string;
                                enum: number[];
                                required: boolean;
                            };
                            address: {
                                type: string;
                            };
                        };
                    };
                };
                dark: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
                            type: string;
                            format: string;
                        };
                        maxButtonBackground: {
                            type: string;
                            format: string;
                        };
                        maxButtonHoverBackground: {
                            type: string;
                            format: string;
                        };
                        primaryButtonBackground: {
                            type: string;
                            format: string;
                        };
                        primaryButtonHoverBackground: {
                            type: string;
                            format: string;
                        };
                        primaryButtonDisabledBackground: {
                            type: string;
                            format: string;
                        };
                    };
                };
                light: {
                    type: string;
                    properties: {
                        backgroundColor: {
                            type: string;
                            format: string;
                        };
                        fontColor: {
                            type: string;
                            format: string;
                        };
                        inputBackgroundColor: {
                            type: string;
                            format: string;
                        };
                        inputFontColor: {
                            type: string;
                            format: string;
                        };
                        maxButtonBackground: {
                            type: string;
                            format: string;
                        };
                        maxButtonHoverBackground: {
                            type: string;
                            format: string;
                        };
                        primaryButtonBackground: {
                            type: string;
                            format: string;
                        };
                        primaryButtonHoverBackground: {
                            type: string;
                            format: string;
                        };
                        primaryButtonDisabledBackground: {
                            type: string;
                            format: string;
                        };
                    };
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    }[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        elements: ({
                            type: string;
                            label: string;
                            elements: {
                                type: string;
                                scope: string;
                                options: {
                                    detail: {
                                        type: string;
                                    };
                                };
                            }[];
                        } | {
                            type: string;
                            label: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        })[];
                    }[];
                }[];
            })[];
        };
        customControls(): {
            '#/properties/networks/properties/chainId': {
                render: () => ScomNetworkPicker;
                getData: (control: ScomNetworkPicker) => number;
                setData: (control: ScomNetworkPicker, value: number) => Promise<void>;
            };
            '#/properties/tokens/properties/chainId': {
                render: () => ScomNetworkPicker;
                getData: (control: ScomNetworkPicker) => number;
                setData: (control: ScomNetworkPicker, value: number) => Promise<void>;
            };
            '#/properties/tokens/properties/address': {
                render: () => ScomTokenInput;
                getData: (control: ScomTokenInput) => string;
                setData: (control: ScomTokenInput, value: string, rowData: any) => void;
            };
        };
    };
    export function getProjectOwnerSchema(): any;
}
/// <amd-module name="@scom/scom-xchain-widget/index.css.ts" />
declare module "@scom/scom-xchain-widget/index.css.ts" {
    export const swapStyle: string;
    export const tabStyle: string;
}
/// <amd-module name="@scom/scom-xchain-widget" />
declare module "@scom/scom-xchain-widget" {
    import { Module, Container, ControlElement } from '@ijstech/components';
    import ScomCommissionFeeSetup from '@scom/scom-commission-fee-setup';
    import { IWalletPlugin } from '@scom/scom-wallet-modal';
    import { BlockNoteEditor, BlockNoteSpecs, callbackFnType, executeFnType } from '@scom/scom-blocknote-sdk';
    export enum ApprovalStatus {
        TO_BE_APPROVED = 0,
        APPROVING = 1,
        NONE = 2
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
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-xchain-widget']: ScomXchainWidgetElement;
            }
        }
    }
    export default class ScomXchainWidget extends Module implements BlockNoteSpecs {
        private tabs;
        private swapContainer;
        private pnlBridgeRecord;
        private receiveContainer;
        private payBalance;
        private receiveBalance;
        private firstTokenInput;
        private secondTokenInput;
        private payCol;
        private receiveCol;
        private swapModal;
        private priceInfo;
        private priceInfo2;
        private priceInfoContainer;
        private fromTokenImage;
        private fromTokenLabel;
        private fromTokenValue;
        private toTokenImage;
        private toTokenLabel;
        private toTokenValue;
        private payOrReceiveValue;
        private payOrReceiveToken;
        private txStatusModal;
        private maxButton;
        private swapBtn;
        private actionSetting;
        private lbSwitchNetwork;
        private urlParams;
        private isFrom;
        private fromToken?;
        private toToken?;
        private fromTokenSymbol;
        private toTokenSymbol;
        private fromInputValue;
        private toInputValue;
        private timeout;
        private isPriceToggled;
        private record;
        private chainId;
        private swapButtonText;
        private _lastUpdated;
        private lastUpdatedText;
        private timer;
        private $eventBus;
        private estimateMsg;
        private payOrReceiveText;
        private approvalModelAction;
        private crossChainApprovalStatus;
        private oldSupportedChainList;
        private supportedChainList;
        private minSwapHintLabel;
        private srcChain;
        private desChain;
        private targetChainId;
        private srcChainFirstPanel;
        private targetChainFirstPanel;
        private srcChainTokenImage;
        private srcChainTokenLabel;
        private targetChainTokenImage;
        private targetChainTokenLabel;
        private targetChainSecondPanel;
        private targetChainVaultImage;
        private targetChainVaultLabel;
        private targetVaultTokenImage;
        private targetVaultTokenLabel;
        private targetVaultTokenValue;
        private targetVaultAssetBalanceLabel1;
        private targetVaultBondBalanceLabel1;
        private crossChainSoftCapLabel1;
        private targetVaultAssetBalanceLabel2;
        private targetVaultBondBalanceLabel2;
        private crossChainSoftCapLabel2;
        private swapModalConfirmBtn;
        private crossChainVaultInfoVstack;
        private modalFees;
        private feesInfo;
        private lbReminderRejected;
        private btnSourceChain;
        private mdSourceChain;
        private listElmSrcChain;
        private isSrcOpened;
        private expertModal;
        private transactionModal;
        private bridgeRecord;
        private btnDestinationChain;
        private mdDestinationChain;
        private listElmDesChain;
        private isDesOpened;
        private dappContainer;
        private mdWallet;
        private state;
        private isInited;
        private supportedChainIds;
        private _data;
        tag: any;
        private _tokens;
        constructor(parent?: Container, options?: any);
        addBlock(blocknote: any, executeFn: executeFnType, callbackFn?: callbackFnType): {
            block: any;
            slashItem: {
                name: string;
                execute: (editor: BlockNoteEditor) => void;
                aliases: string[];
                group: string;
                icon: {
                    name: string;
                };
                hint: string;
            };
            moduleData: {
                name: string;
                localPath: string;
            };
        };
        removeRpcWalletEvents(): void;
        onHide(): void;
        private get isInsufficientBalance();
        private get lastUpdated();
        private set lastUpdated(value);
        private get isValidToken();
        private get targetTokenMap();
        private get defaultTargetChainId();
        get defaultChainId(): number;
        set defaultChainId(value: number);
        get wallets(): IWalletPlugin[];
        set wallets(value: IWalletPlugin[]);
        get networks(): INetworkConfig[];
        set networks(value: INetworkConfig[]);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        set width(value: string | number);
        private determineActionsByTarget;
        private loadCommissionFee;
        private getBuilderActions;
        private getProjectOwnerActions;
        getConfigurators(): ({
            name: string;
            target: string;
            elementName: string;
            getLinkParams: () => {
                data: any;
            };
            bindOnChanged: (element: ScomCommissionFeeSetup, callback: (data: any) => Promise<void>) => void;
            getData: () => Promise<{
                fee: string;
                campaignId?: number;
                commissions?: ICommissionInfo[];
                tokens?: ITokenConfig[];
                defaultChainId: number;
                wallets: IWalletPlugin[];
                networks: INetworkConfig[];
                showHeader?: boolean;
                defaultInputToken?: ITokenConfig;
            }>;
            setData: (properties: IXchainWidgetData, linkParams?: Record<string, any>) => Promise<void>;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        } | {
            name: string;
            target: string;
            getActions: (category?: string) => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            elementName?: undefined;
            getLinkParams?: undefined;
            bindOnChanged?: undefined;
        })[];
        private getData;
        private resetRpcWallet;
        private setData;
        private getTag;
        private updateTag;
        private setTag;
        private updateStyle;
        private updateTheme;
        private refreshUI;
        private initData;
        isEmptyData(value: IXchainWidgetData): boolean;
        init(): Promise<void>;
        private fixedNumber;
        private calculateDefaultTokens;
        private initWallet;
        private initializeWidgetConfig;
        private onChainChange;
        private initApprovalModelAction;
        private setDefaultToken;
        private setGroupToken;
        private setupCrossChainPopup;
        private handleSwapPopup;
        private doSwap;
        private getMinReceivedMaxSold;
        private onUpdateToken;
        private onSelectToken;
        private setApprovalModalSpenderAddress;
        private getInputValue;
        private updateTokenInput;
        private onSelectRouteItem;
        private onTokenInputChange;
        private resetValuesByInput;
        private initRoutes;
        private handleAddRoute;
        private onTogglePrice;
        private getTradeFeeExactAmount;
        private getFeeDetails;
        private getPriceInfo;
        private onUpdateEstimatedPosition;
        private isEstimated;
        private getBalance;
        private updateBalances;
        private getSwapButtonText;
        private getWarningMessageText;
        private onSwapConfirming;
        private onSwapConfirmed;
        private isSwapButtonDisabled;
        private switchNetworkByWallet;
        private onClickSwapButton;
        private onSubmit;
        private onApproveRouterMax;
        private onSetMaxBalance;
        private isMaxDisabled;
        private onRenderPriceInfo;
        private onRefresh;
        private onSetting;
        private get isMetaMask();
        private getSupportedChainList;
        private onShowSourceChain;
        private onCloseSourceChain;
        private onShowDestinationChain;
        private onCloseDesChain;
        private disableSelectChain;
        private selectSourceChain;
        private selectDestinationChain;
        private getSupportedTokens;
        private onSourceChainChanged;
        private onSelectSourceChain;
        private onSelectDestinationChain;
        private setDefaultChain;
        private initChainElm;
        private renderChainList;
        private showModalFees;
        private closeModalFees;
        private getTokenObjArr;
        private resizeBridgeRecord;
        private initBridgeRecord;
        private initExpertModal;
        private initTransactionModal;
        private onChangeTab;
        render(): any;
    }
}
