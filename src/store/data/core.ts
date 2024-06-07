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
  WETH9:string,
  GOV_TOKEN:string,
  OSWAP_ConfigStore:string,
  TrollRegistry:string // FIXME Main or Side ChainTrollRegistry
}

export const MainnetMainChain = 56;
export const TestnetMainChain = 97;

export const Mainnets = [ 56, 43114 ];
export const Testnets = [ 97, 43113 ];

export const CoreContractStore: {[chainId: number]: ContractSet
 } = {
  56: { // Binance Mainnet
    GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
    WETH9: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    OSWAP_ConfigStore: "0xE07526f892af09acb84E9bC5f32Df575750DaE3b",
    TrollRegistry:"0x0C7fA10c627B8A9C50f698cBca6F1C39D30a2Ef6",
  },
  97: { // Binance Test Chain
    GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
    WETH9: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    OSWAP_ConfigStore: "0x3349184B0b3e84094ad78176407D627F0A29bEFC",
    TrollRegistry:"0xE0FA71BF25FADAa0046898003248ba8003A73451",
  },
  43114: { //Avalanche Mainnet C-Chain
    GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
    WETH9: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    OSWAP_ConfigStore: "0x8Ae51f1A62c4Bc0715C367bFe812c53e583aEE2f",
    TrollRegistry:"0x30ab6C6545Ee09caDB78A16489907B50893270D4",
  },
  43113: {//Avalanche FUJI C-Chain
    GOV_TOKEN: "0x27eF998b96c9A66937DBAc38c405Adcd7fa5e7DB",
    WETH9: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
    OSWAP_ConfigStore: "0x258A5309486310398Ee078217729db2f65367a92",
    TrollRegistry:"0xfc159DC934ccaAaB007D19008D2a175652B8b67a",
  },
}

export const crossChainNativeTokenList:{[chainId: number]:{address:string,decimals:number,symbol:string,name:string,isNative:boolean,wethAddress:string}} = {
  56: { address:"BNB", decimals:18, symbol:"BNB", name: 'BNB', isNative: true, wethAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"},
  97: { address: "BNB", decimals: 18, symbol: "BNB", name: 'BNB', isNative: true, wethAddress: "0xae13d989dac2f0debff460ac112a837c89baa7cd" },
  43113: { address: "AVAX", decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true, wethAddress: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c" },
  43114: { address: "AVAX", decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true, wethAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" },
}

export const orderMinOutRate = "0.005";

export enum VaultType { // not used
  Project = 'Project',
  Exchange = 'Exchange',
};

export interface VaultConstant {
  //STATIC
  //basic
  chainId:number,
  assetToken:TokenConstant,
  vaultRegistryAddress: string,
  vaultAddress: string,
  vaultDecimals?: number,
  softCap: number,
  //fee, may changed by trolls
  baseFee: string,//fixed amount
  protocolFee: string,//linear proportional with amount in
  transactionFee: string,//linear proportional with amount in
  imbalanceFee: string,//linear proportional with amount in
}

export interface VaultGroupConstant {
  assetName: string,//must be unique
  vaultType: VaultType,
  vaults: { [chainId: number]: VaultConstant },
  deprecated?: boolean,
}

export const VaultGroupList: VaultGroupConstant[] = [
  {
    assetName: "USDT",
    vaultType: VaultType.Exchange,
    vaults: {
      56:{
        chainId:56,
        assetToken: {
          address: "0x55d398326f99059fF775485246999027B3197955", 
          name: "Binance Pegged USDT",
          symbol: "USDT",
          decimals: 18,
        },
        vaultRegistryAddress: "0x1026deABF37C452F8aF8672cC9B9181fab709154",
        vaultAddress: "0xE9CAAFD124831562423FE129b02e938Cc33B45E2",
        vaultDecimals:18,
        softCap: 100000,
      
        baseFee: "0",
        protocolFee: "0.001",
        transactionFee: "0.001",
        imbalanceFee: "0",
      },
      97: {
        chainId:97,
        assetToken: {
          address: "0x29386B60e0A9A1a30e1488ADA47256577ca2C385", 
          name: "USDT",
          symbol: "USDT",
          decimals: 6,
        },
        vaultRegistryAddress: "0xABEe7701A960D4ab10456b33D3fCd606335A09B3",
        vaultAddress: "0x0574C45032FcCFB91a652D2800Fa5219343b4991",
        softCap: 100000,
      
        baseFee: "1000000",
        protocolFee: "0.002",
        transactionFee: "0.001",
        imbalanceFee: "0.001",
      },
      43113: {
        chainId:43113,
        assetToken: {
          address: "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
          name: "Tether USD",
          symbol: "USDT.e",
          decimals: 6,
        },
        vaultRegistryAddress: "0xD12E87F7474442a7a6611f92E14C7F2303f97d6d",
        vaultAddress: "0xa9d579E1a07C44889daBd537cdb6C70840594e9B",
        softCap: 100000,
        
        baseFee: "1000000",
        protocolFee: "0.002",
        transactionFee: "0.001",
        imbalanceFee: "0.001",
      },
      43114: {
        chainId:43114,
        assetToken: {
          address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118", 
          name: "Tether USD",
          symbol: "USDT.e",
          decimals: 6,
        },
        vaultRegistryAddress: "0x2e102E6E9546433aB9c2a32ddd6eAFDfE987910B",
        vaultAddress: "0x55570d7EcAeFF86a6425815def25447A8b14A222",
        vaultDecimals:18,
        softCap: 100000,
      
        baseFee: "0",
        protocolFee: "0.001",
        transactionFee: "0.001",
        imbalanceFee: "0",
      },
    }
  },
  {
    assetName: "OSWAP",
    vaultType: VaultType.Project,
    vaults: {
      56: {
        chainId:56,
        assetToken: {
          name: "OpenSwap",
          symbol: "OSWAP",
          address: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
          decimals: 18,
        },
        vaultRegistryAddress: "0xd8f7a9E2cE096670A27238487a62e1e000334F81",
        vaultAddress: "0x65d6d677e102C2758224a797f7fb2b60DBeA8635",
        softCap: 30000,
        vaultDecimals:18,
      
        baseFee: "0",
        protocolFee: "0.001",
        transactionFee: "0.001",
        imbalanceFee: "0",
      },
      97: {
        chainId:97,
        assetToken: {
          name: "OpenSwap",
          symbol: "OSWAP",
          address: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
          decimals: 18,
        },
        vaultRegistryAddress: "0xEdA5F1946b0524d60EaB3DB0CC40575CeEBCa749",
        vaultAddress: "0xa27D23fAe232eb0d0965299A9C41Ef3d1156020D",
        softCap: 30000,      
        baseFee: "0",
        protocolFee: "0.002",
        transactionFee: "0.001",
        imbalanceFee: "0.001",
      },
      43113: {
        chainId:43113,
        assetToken: {
          name: "OpenSwap",
          symbol: "OSWAP",
          address: "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
          decimals: 18,
        },
        vaultRegistryAddress: "0x04dbb0174381a007A3EAbA8C4D52283dA20A8B8c",
        vaultAddress: "0x1b6196C1d2b5bfc9b89d914990d2bD4a07E92a26",
        softCap: 30000,      
        baseFee: "0",
        protocolFee: "0.002",
        transactionFee: "0.001",
        imbalanceFee: "0.001",
      },
      43114: {
        chainId:43114,
        assetToken: {
          name: "OpenSwap",
          symbol: "OSWAP",
          address: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
          decimals: 18,
        },
        vaultRegistryAddress: "0x39dfbdF2a8b4719D009F3CEE1d000899FeD8B00a",
        vaultAddress: "0x8Af3e8596acE65D9c1EDE6d5356a34eAb46a46f5",
        vaultDecimals:18,
        softCap: 30000,
      
        baseFee: "0",
        protocolFee: "0.001",
        transactionFee: "0.001",
        imbalanceFee: "0",
      },
    }
  },
  {
    assetName: "ABC",
    vaultType: VaultType.Project,
    vaults: {
      97: {
        chainId:97,
        assetToken: {
          name: "ABC",
          symbol: "ABC",
          address: "0xE36d2875B3C02ACFeFB8F20F2FeFCD727222B73F",
          decimals: 18,
        },
        vaultRegistryAddress: "0x1b2Fec181de44F295B8F3470F4bbE3fB115C042B",
        vaultAddress: "0xC6555042F9a62F7f5aE27194373813e4FED084fa",
        softCap: 30000,
      
        baseFee: "0",
        protocolFee: "0.002",
        transactionFee: "0.001",
        imbalanceFee: "0.001",
      },
      43113: {
        chainId:43113,
        assetToken: {
          name: "ABC",
          symbol: "ABC",
          address: "0x34eCa87583F451eaA4672ce3E1F921C7fD3F5D03",
          decimals: 18,
        },
        vaultRegistryAddress: "0x33e72f43D946154882D2A1b75d4eFc3A71673BE4",
        vaultAddress: "0x6e30d851B1cAE420E39F1fc088b8dF0Ea1e98698",
        softCap: 30000,
      
        baseFee: "0",
        protocolFee: "0.002",
        transactionFee: "0.001",
        imbalanceFee: "0.001",
      },
    }
  },
]