var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-xchain-widget/store/data/core.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VaultGroupList = exports.VaultType = exports.orderMinOutRate = exports.crossChainNativeTokenList = exports.CoreContractStore = exports.Testnets = exports.Mainnets = exports.TestnetMainChain = exports.MainnetMainChain = void 0;
    exports.MainnetMainChain = 56;
    exports.TestnetMainChain = 97;
    exports.Mainnets = [56, 43114];
    exports.Testnets = [97, 43113];
    exports.CoreContractStore = {
        56: {
            GOV_TOKEN: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
            WETH9: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            OSWAP_ConfigStore: "0xE07526f892af09acb84E9bC5f32Df575750DaE3b",
            TrollRegistry: "0x0C7fA10c627B8A9C50f698cBca6F1C39D30a2Ef6",
        },
        97: {
            GOV_TOKEN: "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
            WETH9: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
            OSWAP_ConfigStore: "0x3349184B0b3e84094ad78176407D627F0A29bEFC",
            TrollRegistry: "0xE0FA71BF25FADAa0046898003248ba8003A73451",
        },
        43114: {
            GOV_TOKEN: "0x29E65d6f3e7a609E0138a1331D42D23159124B8E",
            WETH9: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            OSWAP_ConfigStore: "0x8Ae51f1A62c4Bc0715C367bFe812c53e583aEE2f",
            TrollRegistry: "0x30ab6C6545Ee09caDB78A16489907B50893270D4",
        },
        43113: {
            GOV_TOKEN: "0x27eF998b96c9A66937DBAc38c405Adcd7fa5e7DB",
            WETH9: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c",
            OSWAP_ConfigStore: "0x258A5309486310398Ee078217729db2f65367a92",
            TrollRegistry: "0xfc159DC934ccaAaB007D19008D2a175652B8b67a",
        },
    };
    exports.crossChainNativeTokenList = {
        56: { address: "BNB", decimals: 18, symbol: "BNB", name: 'BNB', isNative: true, wethAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
        97: { address: "BNB", decimals: 18, symbol: "BNB", name: 'BNB', isNative: true, wethAddress: "0xae13d989dac2f0debff460ac112a837c89baa7cd" },
        43113: { address: "AVAX", decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true, wethAddress: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c" },
        43114: { address: "AVAX", decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true, wethAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" },
    };
    exports.orderMinOutRate = "0.005";
    var VaultType;
    (function (VaultType) {
        VaultType["Project"] = "Project";
        VaultType["Exchange"] = "Exchange";
    })(VaultType = exports.VaultType || (exports.VaultType = {}));
    ;
    exports.VaultGroupList = [
        {
            assetName: "USDT",
            vaultType: VaultType.Exchange,
            vaults: {
                56: {
                    chainId: 56,
                    assetToken: {
                        address: "0x55d398326f99059fF775485246999027B3197955",
                        name: "Binance Pegged USDT",
                        symbol: "USDT",
                        decimals: 18,
                    },
                    vaultRegistryAddress: "0x1026deABF37C452F8aF8672cC9B9181fab709154",
                    vaultAddress: "0xE9CAAFD124831562423FE129b02e938Cc33B45E2",
                    vaultDecimals: 18,
                    softCap: 100000,
                    baseFee: "0",
                    protocolFee: "0.001",
                    transactionFee: "0.001",
                    imbalanceFee: "0",
                },
                97: {
                    chainId: 97,
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
                    chainId: 43113,
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
                    chainId: 43114,
                    assetToken: {
                        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
                        name: "Tether USD",
                        symbol: "USDT.e",
                        decimals: 6,
                    },
                    vaultRegistryAddress: "0x2e102E6E9546433aB9c2a32ddd6eAFDfE987910B",
                    vaultAddress: "0x55570d7EcAeFF86a6425815def25447A8b14A222",
                    vaultDecimals: 18,
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
                    chainId: 56,
                    assetToken: {
                        name: "OpenSwap",
                        symbol: "OSWAP",
                        address: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
                        decimals: 18,
                    },
                    vaultRegistryAddress: "0xd8f7a9E2cE096670A27238487a62e1e000334F81",
                    vaultAddress: "0x65d6d677e102C2758224a797f7fb2b60DBeA8635",
                    softCap: 30000,
                    vaultDecimals: 18,
                    baseFee: "0",
                    protocolFee: "0.001",
                    transactionFee: "0.001",
                    imbalanceFee: "0",
                },
                97: {
                    chainId: 97,
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
                    chainId: 43113,
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
                    chainId: 43114,
                    assetToken: {
                        name: "OpenSwap",
                        symbol: "OSWAP",
                        address: "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
                        decimals: 18,
                    },
                    vaultRegistryAddress: "0x39dfbdF2a8b4719D009F3CEE1d000899FeD8B00a",
                    vaultAddress: "0x8Af3e8596acE65D9c1EDE6d5356a34eAb46a46f5",
                    vaultDecimals: 18,
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
                    chainId: 97,
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
                    chainId: 43113,
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
    ];
});
define("@scom/scom-xchain-widget/store/data/tokens/mainnet/avalanche.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokens_Avalanche = void 0;
    ///<amd-module name='@scom/scom-xchain-widget/store/data/tokens/mainnet/avalanche.ts'/> 
    exports.Tokens_Avalanche = [
        {
            "name": "OpenSwap",
            "symbol": "OSWAP",
            "address": "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
            "decimals": 18,
            "isCommon": true
        },
        { "address": "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
            "name": "Tether USD",
            "symbol": "USDT.e",
            "decimals": 6,
            "isCommon": true
        },
    ];
});
define("@scom/scom-xchain-widget/store/data/tokens/mainnet/bsc.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokens_BSC = void 0;
    ///<amd-module name='@scom/scom-xchain-widget/store/data/tokens/mainnet/bsc.ts'/> 
    exports.Tokens_BSC = [
        {
            "name": "OpenSwap",
            "symbol": "OSWAP",
            "address": "0xb32aC3C79A94aC1eb258f3C830bBDbc676483c93",
            "decimals": 18,
            "isCommon": true
        },
        {
            "name": "Binance Pegged USDT",
            "symbol": "USDT",
            "address": "0x55d398326f99059fF775485246999027B3197955",
            "decimals": 18,
            "isCommon": true
        }
    ];
});
define("@scom/scom-xchain-widget/store/data/tokens/mainnet/index.ts", ["require", "exports", "@scom/scom-xchain-widget/store/data/tokens/mainnet/avalanche.ts", "@scom/scom-xchain-widget/store/data/tokens/mainnet/bsc.ts"], function (require, exports, avalanche_1, bsc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokens_BSC = exports.Tokens_Avalanche = void 0;
    Object.defineProperty(exports, "Tokens_Avalanche", { enumerable: true, get: function () { return avalanche_1.Tokens_Avalanche; } });
    Object.defineProperty(exports, "Tokens_BSC", { enumerable: true, get: function () { return bsc_1.Tokens_BSC; } });
});
define("@scom/scom-xchain-widget/store/data/tokens/testnet/bsc-testnet.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokens_BSC_Testnet = void 0;
    ///<amd-module name='@scom/scom-xchain-widget/store/data/tokens/testnet/bsc-testnet.ts'/> 
    exports.Tokens_BSC_Testnet = [
        {
            "name": "USDT",
            "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
            "symbol": "USDT",
            "decimals": 6,
            "isCommon": true
        },
        {
            "name": "OpenSwap",
            "address": "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
            "symbol": "OSWAP",
            "decimals": 18,
            "isCommon": true
        },
        {
            name: "ABC",
            symbol: "ABC",
            address: "0xE36d2875B3C02ACFeFB8F20F2FeFCD727222B73F",
            decimals: 18,
            isCommon: true
        }
    ];
});
define("@scom/scom-xchain-widget/store/data/tokens/testnet/fuji.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokens_Fuji = void 0;
    ///<amd-module name='@scom/scom-xchain-widget/store/data/tokens/testnet/fuji.ts'/> 
    exports.Tokens_Fuji = [
        {
            "name": "OpenSwap",
            "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
            "symbol": "OSWAP",
            "decimals": 18,
            "isCommon": true
        },
        {
            "name": "Tether USD",
            "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
            "symbol": "USDT.e",
            "decimals": 6
        },
        {
            name: "ABC",
            symbol: "ABC",
            address: "0x34eCa87583F451eaA4672ce3E1F921C7fD3F5D03",
            decimals: 18,
            isCommon: true
        }
    ];
});
define("@scom/scom-xchain-widget/store/data/tokens/testnet/index.ts", ["require", "exports", "@scom/scom-xchain-widget/store/data/tokens/testnet/bsc-testnet.ts", "@scom/scom-xchain-widget/store/data/tokens/testnet/fuji.ts"], function (require, exports, bsc_testnet_1, fuji_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tokens_Fuji = exports.Tokens_BSC_Testnet = void 0;
    Object.defineProperty(exports, "Tokens_BSC_Testnet", { enumerable: true, get: function () { return bsc_testnet_1.Tokens_BSC_Testnet; } });
    Object.defineProperty(exports, "Tokens_Fuji", { enumerable: true, get: function () { return fuji_1.Tokens_Fuji; } });
});
define("@scom/scom-xchain-widget/store/data/tokens/index.ts", ["require", "exports", "@scom/scom-xchain-widget/store/data/tokens/mainnet/index.ts", "@scom/scom-xchain-widget/store/data/tokens/testnet/index.ts"], function (require, exports, index_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SupportedERC20Tokens = void 0;
    const SupportedERC20Tokens = {
        56: index_1.Tokens_BSC.map(v => { return { ...v, chainId: 56 }; }),
        97: index_2.Tokens_BSC_Testnet.map(v => { return { ...v, chainId: 97 }; }),
        43113: index_2.Tokens_Fuji.map(v => { return { ...v, chainId: 43113 }; }),
        43114: index_1.Tokens_Avalanche.map(v => { return { ...v, chainId: 43114 }; }),
    };
    exports.SupportedERC20Tokens = SupportedERC20Tokens;
});
define("@scom/scom-xchain-widget/store/data/index.ts", ["require", "exports", "@scom/scom-xchain-widget/store/data/core.ts", "@scom/scom-xchain-widget/store/data/tokens/index.ts"], function (require, exports, core_1, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SupportedERC20Tokens = void 0;
    ///<amd-module name='@scom/scom-xchain-widget/store/data/index.ts'/> 
    __exportStar(core_1, exports);
    Object.defineProperty(exports, "SupportedERC20Tokens", { enumerable: true, get: function () { return index_3.SupportedERC20Tokens; } });
});
define("@scom/scom-xchain-widget/global/helper.ts", ["require", "exports", "@ijstech/eth-wallet", "@ijstech/components"], function (require, exports, eth_wallet_1, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showResultMessage = exports.getAPI = exports.limitDecimals = exports.limitInputNumber = exports.isInvalidInput = exports.formatNumberWithSeparators = exports.formatNumber = exports.formatDate = exports.DefaultDateFormat = exports.DefaultDateTimeFormat = exports.SITE_ENV = void 0;
    var SITE_ENV;
    (function (SITE_ENV) {
        SITE_ENV["DEV"] = "dev";
        SITE_ENV["TESTNET"] = "testnet";
        SITE_ENV["MAINNET"] = "mainnet";
    })(SITE_ENV = exports.SITE_ENV || (exports.SITE_ENV = {}));
    exports.DefaultDateTimeFormat = 'DD/MM/YYYY HH:mm:ss';
    exports.DefaultDateFormat = 'DD/MM/YYYY';
    const formatDate = (date, customType, showTimezone) => {
        const formatType = customType || exports.DefaultDateFormat;
        const formatted = (0, components_1.moment)(date).format(formatType);
        if (showTimezone) {
            let offsetHour = (0, components_1.moment)().utcOffset() / 60;
            //will look like UTC-2 UTC+2 UTC+0
            return `${formatted} (UTC${offsetHour >= 0 ? "+" : ""}${offsetHour})`;
        }
        return formatted;
    };
    exports.formatDate = formatDate;
    const formatNumber = (value, decimals, options) => {
        let val = value;
        const { min = '0.0000001', sign = '' } = options || {};
        const minValue = min;
        if (typeof value === 'string') {
            val = new eth_wallet_1.BigNumber(value).toNumber();
        }
        else if (typeof value === 'object') {
            val = value.toNumber();
        }
        if (val != 0 && new eth_wallet_1.BigNumber(val).lt(minValue)) {
            return `< ${sign}${minValue}`;
        }
        return `${sign}${(0, exports.formatNumberWithSeparators)(val, decimals || 4)}`;
    };
    exports.formatNumber = formatNumber;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision) {
            let outputStr = '';
            if (value >= 1) {
                const unit = Math.pow(10, precision);
                const rounded = Math.floor(value * unit) / unit;
                outputStr = rounded.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            if (outputStr.length > 18) {
                outputStr = outputStr.substring(0, 18) + '...';
            }
            return outputStr;
        }
        return value.toLocaleString('en-US');
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const isInvalidInput = (val) => {
        const value = new eth_wallet_1.BigNumber(val);
        if (value.lt(0))
            return true;
        return (val || '').toString().substring(0, 2) === '00' || val === '-';
    };
    exports.isInvalidInput = isInvalidInput;
    const limitInputNumber = (input, decimals) => {
        const amount = input.value;
        if ((0, exports.isInvalidInput)(amount)) {
            input.value = '0';
            return;
        }
        if (!new eth_wallet_1.BigNumber(amount).isNaN()) {
            input.value = (0, exports.limitDecimals)(amount, decimals || 18);
        }
    };
    exports.limitInputNumber = limitInputNumber;
    const limitDecimals = (value, decimals) => {
        let val = value;
        if (typeof value !== 'string') {
            val = val.toString();
        }
        let chart;
        if (val.includes('.')) {
            chart = '.';
        }
        else if (val.includes(',')) {
            chart = ',';
        }
        else {
            return value;
        }
        const parts = val.split(chart);
        let decimalsPart = parts[1];
        if (decimalsPart && decimalsPart.length > decimals) {
            parts[1] = decimalsPart.substr(0, decimals);
        }
        return parts.join(chart);
    };
    exports.limitDecimals = limitDecimals;
    async function getAPI(url, paramsObj) {
        let queries = '';
        if (paramsObj) {
            try {
                queries = new URLSearchParams(paramsObj).toString();
            }
            catch (err) {
                console.log('err', err);
            }
        }
        let fullURL = url + (queries ? `?${queries}` : '');
        const response = await fetch(fullURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return response.json();
    }
    exports.getAPI = getAPI;
    const showResultMessage = (result, status, content) => {
        if (!result)
            return;
        let params = { status };
        if (status === 'success') {
            params.txtHash = content;
        }
        else {
            params.content = content;
        }
        result.message = { ...params };
        result.showModal();
    };
    exports.showResultMessage = showResultMessage;
});
define("@scom/scom-xchain-widget/global/common.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = void 0;
    const registerSendTxEvents = (sendTxEventHandlers) => {
        const wallet = eth_wallet_2.Wallet.getClientInstance();
        wallet.registerSendTxEvents({
            transactionHash: (error, receipt) => {
                if (sendTxEventHandlers.transactionHash) {
                    sendTxEventHandlers.transactionHash(error, receipt);
                }
            },
            confirmation: (receipt) => {
                if (sendTxEventHandlers.confirmation) {
                    sendTxEventHandlers.confirmation(receipt);
                }
            },
        });
    };
    exports.registerSendTxEvents = registerSendTxEvents;
});
define("@scom/scom-xchain-widget/global/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-xchain-widget/global/index.ts", ["require", "exports", "@scom/scom-xchain-widget/global/helper.ts", "@scom/scom-xchain-widget/global/common.ts", "@scom/scom-xchain-widget/global/interface.ts"], function (require, exports, helper_1, common_1, interface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerSendTxEvents = exports.showResultMessage = exports.SITE_ENV = exports.isInvalidInput = exports.limitInputNumber = exports.limitDecimals = exports.formatDate = exports.DefaultDateFormat = exports.DefaultDateTimeFormat = exports.formatNumberWithSeparators = exports.formatNumber = exports.getAPI = void 0;
    ;
    Object.defineProperty(exports, "getAPI", { enumerable: true, get: function () { return helper_1.getAPI; } });
    Object.defineProperty(exports, "formatNumber", { enumerable: true, get: function () { return helper_1.formatNumber; } });
    Object.defineProperty(exports, "formatNumberWithSeparators", { enumerable: true, get: function () { return helper_1.formatNumberWithSeparators; } });
    Object.defineProperty(exports, "DefaultDateTimeFormat", { enumerable: true, get: function () { return helper_1.DefaultDateTimeFormat; } });
    Object.defineProperty(exports, "DefaultDateFormat", { enumerable: true, get: function () { return helper_1.DefaultDateFormat; } });
    Object.defineProperty(exports, "formatDate", { enumerable: true, get: function () { return helper_1.formatDate; } });
    Object.defineProperty(exports, "limitDecimals", { enumerable: true, get: function () { return helper_1.limitDecimals; } });
    Object.defineProperty(exports, "limitInputNumber", { enumerable: true, get: function () { return helper_1.limitInputNumber; } });
    Object.defineProperty(exports, "isInvalidInput", { enumerable: true, get: function () { return helper_1.isInvalidInput; } });
    Object.defineProperty(exports, "SITE_ENV", { enumerable: true, get: function () { return helper_1.SITE_ENV; } });
    Object.defineProperty(exports, "showResultMessage", { enumerable: true, get: function () { return helper_1.showResultMessage; } });
    Object.defineProperty(exports, "registerSendTxEvents", { enumerable: true, get: function () { return common_1.registerSendTxEvents; } });
    __exportStar(interface_1, exports);
});
define("@scom/scom-xchain-widget/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-xchain-widget/data.json.ts'/> 
    const InfuraId = "adc596bf88b648e2a8902bc9093930c5";
    exports.default = {
        "infuraId": InfuraId,
        "defaultBuilderData": {
            "tokens": [
                {
                    "address": "0x29386B60e0A9A1a30e1488ADA47256577ca2C385",
                    "chainId": 97
                },
                {
                    "address": "0x45eee762aaeA4e5ce317471BDa8782724972Ee19",
                    "chainId": 97
                },
                {
                    "address": "0xb9C31Ea1D475c25E58a1bE1a46221db55E5A7C6e",
                    "chainId": 43113
                },
                {
                    "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                    "chainId": 43113
                }
            ],
            "defaultChainId": 43113,
            "networks": [
                {
                    "chainId": 43113
                },
                {
                    "chainId": 97
                }
            ],
            "wallets": [
                {
                    "name": "metamask"
                }
            ],
            "showHeader": true,
            "showFooter": true
        },
        "supportedNetworks": [
            {
                "chainId": 56,
                "isMainChain": true,
                "isCrossChainSupported": true
            },
            {
                "chainId": 97,
                "isMainChain": true,
                "isCrossChainSupported": true,
                "isTestnet": true
            },
            {
                "chainId": 43113,
                "isCrossChainSupported": true,
                "isTestnet": true
            },
            {
                "chainId": 43114,
                "isCrossChainSupported": true
            }
        ]
    };
});
define("@scom/scom-xchain-widget/store/utils.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list", "@scom/scom-xchain-widget/store/data/index.ts", "@scom/scom-xchain-widget/data.json.ts", "@scom/scom-xchain-widget/store/data/core.ts", "@scom/scom-token-list"], function (require, exports, components_2, eth_wallet_3, scom_network_list_1, index_4, data_json_1, core_2, scom_token_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGovToken = exports.getChainNativeToken = exports.getAddresses = exports.truncateAddress = exports.isWalletConnected = exports.getWalletProvider = exports.getTokensDataList = exports.determineRealOrderStatus = exports.castToVaultOrderStatus = exports.State = exports.VaultOrderStatus = exports.filterVaultInsideGroup = exports.filterNumberIndexedList = exports.forEachStringIndex = exports.forEachStringIndexAwait = exports.forEachNumberIndex = exports.forEachNumberIndexAwait = exports.getNetworksByType = exports.getNetworkType = exports.NetworkType = exports.WalletPlugin = void 0;
    var WalletPlugin;
    (function (WalletPlugin) {
        WalletPlugin["MetaMask"] = "metamask";
        WalletPlugin["Coin98"] = "coin98";
        WalletPlugin["TrustWallet"] = "trustwallet";
        WalletPlugin["BinanceChainWallet"] = "binancechainwallet";
        WalletPlugin["ONTOWallet"] = "onto";
        WalletPlugin["WalletConnect"] = "walletconnect";
        WalletPlugin["BitKeepWallet"] = "bitkeepwallet";
        WalletPlugin["FrontierWallet"] = "frontierwallet";
    })(WalletPlugin = exports.WalletPlugin || (exports.WalletPlugin = {}));
    var NetworkType;
    (function (NetworkType) {
        NetworkType[NetworkType["Mainnet"] = 0] = "Mainnet";
        NetworkType[NetworkType["Testnet"] = 1] = "Testnet";
        NetworkType[NetworkType["NotSupported"] = 2] = "NotSupported";
    })(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
    function getNetworkType(chainId) {
        if (core_2.Mainnets.some(network => network === chainId)) {
            return NetworkType.Mainnet;
        }
        if (core_2.Testnets.some(network => network === chainId)) {
            return NetworkType.Testnet;
        }
        return NetworkType.NotSupported;
    }
    exports.getNetworkType = getNetworkType;
    function getNetworksByType(chainId) {
        switch (getNetworkType(chainId)) {
            case NetworkType.Mainnet:
                return core_2.Mainnets;
            case NetworkType.Testnet:
                return core_2.Testnets;
        }
        return [];
    }
    exports.getNetworksByType = getNetworksByType;
    async function forEachNumberIndexAwait(list, callbackFn) {
        for (const chainId in list) {
            if (Object.prototype.hasOwnProperty.call(list, chainId)
                && new eth_wallet_3.BigNumber(chainId).isInteger())
                await callbackFn(list[chainId], Number(chainId));
        }
    }
    exports.forEachNumberIndexAwait = forEachNumberIndexAwait;
    function forEachNumberIndex(list, callbackFn) {
        for (const chainId in list) {
            if (Object.prototype.hasOwnProperty.call(list, chainId)
                && new eth_wallet_3.BigNumber(chainId).isInteger())
                callbackFn(list[chainId], Number(chainId));
        }
    }
    exports.forEachNumberIndex = forEachNumberIndex;
    async function forEachStringIndexAwait(list, callbackFn) {
        for (const index in list) {
            if (Object.prototype.hasOwnProperty.call(list, index)) {
                await callbackFn(list[index], index);
            }
        }
    }
    exports.forEachStringIndexAwait = forEachStringIndexAwait;
    function forEachStringIndex(list, callbackFn) {
        for (const index in list) {
            if (Object.prototype.hasOwnProperty.call(list, index)) {
                callbackFn(list[index], index);
            }
        }
    }
    exports.forEachStringIndex = forEachStringIndex;
    function filterNumberIndexedList(list, filterFn) {
        let out = {};
        for (const index in list) {
            let indexBN = new eth_wallet_3.BigNumber(index);
            let indexN = indexBN.toNumber();
            if (Object.prototype.hasOwnProperty.call(list, index)
                && indexBN.isInteger()
                && filterFn(list[indexN], indexN))
                out[indexN] = list[indexN];
        }
        return out;
    }
    exports.filterNumberIndexedList = filterNumberIndexedList;
    function filterVaultInsideGroup(vgs, filterFn) {
        return vgs.map(group => {
            return {
                assetName: group.assetName,
                vaultType: group.vaultType,
                vaults: filterNumberIndexedList(group.vaults, filterFn),
            };
        });
    }
    exports.filterVaultInsideGroup = filterVaultInsideGroup;
    var VaultOrderStatus;
    (function (VaultOrderStatus) {
        //copied from contract interface IOSWAP_BridgeVault, 
        //must not be changed
        VaultOrderStatus[VaultOrderStatus["NotSpecified"] = 0] = "NotSpecified";
        VaultOrderStatus[VaultOrderStatus["Pending"] = 1] = "Pending";
        VaultOrderStatus[VaultOrderStatus["Executed"] = 2] = "Executed";
        VaultOrderStatus[VaultOrderStatus["RequestCancel"] = 3] = "RequestCancel";
        VaultOrderStatus[VaultOrderStatus["RefundApproved"] = 4] = "RefundApproved";
        VaultOrderStatus[VaultOrderStatus["Cancelled"] = 5] = "Cancelled";
        VaultOrderStatus[VaultOrderStatus["RequestAmend"] = 6] = "RequestAmend";
        VaultOrderStatus[VaultOrderStatus["Expired"] = 7] = "Expired";
    })(VaultOrderStatus = exports.VaultOrderStatus || (exports.VaultOrderStatus = {}));
    class State {
        constructor(options) {
            this.defaultChainId = 0;
            this.isExpertMode = false;
            this.slippageTolerance = new eth_wallet_3.BigNumber(core_2.orderMinOutRate).shiftedBy(2).toFixed();
            this.crossChainTransactionDeadline = 72 * 60; //72 hours
            this.proxyAddresses = {};
            this.infuraId = "";
            this.rpcWalletId = "";
            this.networkMap = {};
            this.networkConfig = [];
            this.vaultGroups = initVaultGroupsStore(core_2.VaultGroupList);
            this.getNetworkInfo = (chainId) => {
                return this.networkMap[chainId];
            };
            this.getFilteredNetworks = (filter) => {
                let networkFullList = Object.values(this.networkMap);
                return networkFullList.filter(filter);
            };
            this.getSiteSupportedNetworks = () => {
                let networkFullList = Object.values(this.networkMap);
                let list = networkFullList.filter(network => !this.getNetworkInfo(network.chainId)?.isDisabled);
                return list;
            };
            this.getMatchNetworks = (conditions) => {
                let networkFullList = Object.values(this.networkMap);
                let out = matchFilter(networkFullList, conditions);
                return out;
            };
            this.getNetworkExplorerName = (chainId) => {
                if (this.getNetworkInfo(chainId)) {
                    return this.getNetworkInfo(chainId).explorerName;
                }
                return 'Unknown';
            };
            this.viewOnExplorerByTxHash = (chainId, txHash) => {
                let network = this.getNetworkInfo(chainId);
                if (network && network.explorerTxUrl) {
                    let url = `${network.explorerTxUrl}${txHash}`;
                    window.open(url);
                }
            };
            this.viewOnExplorerByAddress = (chainId, address) => {
                let network = this.getNetworkInfo(chainId);
                if (network && network.explorerAddressUrl) {
                    let url = `${network.explorerAddressUrl}${address}`;
                    window.open(url);
                }
            };
            this.getSlippageTolerance = () => {
                return Number(this.slippageTolerance) || 0;
            };
            this.setSlippageTolerance = (value) => {
                this.slippageTolerance = new eth_wallet_3.BigNumber(value).toFixed();
            };
            this.getCrossChainTransactionDeadline = () => {
                return this.crossChainTransactionDeadline;
            };
            this.setCrossChainTransactionDeadline = (value) => {
                this.crossChainTransactionDeadline = value;
            };
            this.setVaultGroups = (vaultGroups) => {
                this.vaultGroups = vaultGroups;
            };
            this.getVaultGroups = () => {
                return this.vaultGroups;
            };
            this.setNetworkConfig = (networks) => {
                this.networkConfig = networks;
            };
            this.getNetworkConfig = () => {
                return this.networkConfig;
            };
            this.initData(options);
        }
        initRpcWallet(defaultChainId) {
            this.defaultChainId = defaultChainId;
            if (this.rpcWalletId) {
                return this.rpcWalletId;
            }
            const clientWallet = eth_wallet_3.Wallet.getClientInstance();
            const networkList = Object.values(components_2.application.store?.networkMap || []);
            const instanceId = clientWallet.initRpcWallet({
                networks: networkList,
                defaultChainId,
                infuraId: components_2.application.store?.infuraId,
                multicalls: components_2.application.store?.multicalls
            });
            this.rpcWalletId = instanceId;
            if (clientWallet.address) {
                const rpcWallet = eth_wallet_3.Wallet.getRpcWalletInstance(instanceId);
                rpcWallet.address = clientWallet.address;
            }
            const defaultNetworkList = (0, scom_network_list_1.default)();
            const defaultNetworkMap = defaultNetworkList.reduce((acc, cur) => {
                acc[cur.chainId] = cur;
                return acc;
            }, {});
            const supportedNetworks = data_json_1.default.supportedNetworks || [];
            for (let network of networkList) {
                const networkInfo = defaultNetworkMap[network.chainId];
                const supportedNetwork = supportedNetworks.find(v => v.chainId == network.chainId);
                if (!networkInfo || !supportedNetwork)
                    continue;
                if (this.infuraId && network.rpcUrls && network.rpcUrls.length > 0) {
                    for (let i = 0; i < network.rpcUrls.length; i++) {
                        network.rpcUrls[i] = network.rpcUrls[i].replace(/{InfuraId}/g, this.infuraId);
                    }
                }
                this.networkMap[network.chainId] = {
                    ...networkInfo,
                    ...network,
                    isCrossChainSupported: supportedNetwork.isCrossChainSupported,
                    isTestnet: supportedNetwork.isTestnet
                };
            }
            return instanceId;
        }
        getRpcWallet() {
            return this.rpcWalletId ? eth_wallet_3.Wallet.getRpcWalletInstance(this.rpcWalletId) : null;
        }
        isRpcWalletConnected() {
            const wallet = this.getRpcWallet();
            return wallet?.isConnected;
        }
        getProxyAddress(chainId) {
            const _chainId = chainId || eth_wallet_3.Wallet.getInstance().chainId;
            const proxyAddresses = this.proxyAddresses;
            if (proxyAddresses) {
                return proxyAddresses[_chainId];
            }
            return null;
        }
        getChainId() {
            const rpcWallet = this.getRpcWallet();
            return rpcWallet?.chainId;
        }
        toggleExpertMode() {
            this.isExpertMode = !this.isExpertMode;
        }
        initData(options) {
            if (options.infuraId) {
                this.infuraId = options.infuraId;
            }
            if (options.proxyAddresses) {
                this.proxyAddresses = options.proxyAddresses;
            }
        }
        async setApprovalModelAction(options) {
            const approvalOptions = {
                ...options,
                spenderAddress: ''
            };
            let wallet = this.getRpcWallet();
            this.approvalModel = new eth_wallet_3.ERC20ApprovalModel(wallet, approvalOptions);
            let approvalModelAction = this.approvalModel.getAction();
            return approvalModelAction;
        }
    }
    exports.State = State;
    function castToVaultOrderStatus(n) {
        switch (n) {
            case 0:
                return VaultOrderStatus.NotSpecified;
            case 1:
                return VaultOrderStatus.Pending;
            case 2:
                return VaultOrderStatus.Executed;
            case 3:
                return VaultOrderStatus.RequestCancel;
            case 4:
                return VaultOrderStatus.RefundApproved;
            case 5:
                return VaultOrderStatus.Cancelled;
            case 6:
                return VaultOrderStatus.RequestAmend;
            case 7:
                return VaultOrderStatus.Expired;
        }
        return VaultOrderStatus.Expired;
    }
    exports.castToVaultOrderStatus = castToVaultOrderStatus;
    function determineRealOrderStatus(expire, fromChainStatus, toChainStatus) {
        switch (toChainStatus) {
            case VaultOrderStatus.Pending: //1
            case VaultOrderStatus.NotSpecified: //0
                if (fromChainStatus == VaultOrderStatus.Pending && new eth_wallet_3.BigNumber(new Date().getTime()).shiftedBy(-3).gte(expire)) {
                    return VaultOrderStatus.Expired;
                }
                else {
                    return toChainStatus;
                }
            case VaultOrderStatus.RequestCancel:
                if (fromChainStatus == VaultOrderStatus.Cancelled)
                    return VaultOrderStatus.Cancelled;
            default:
                return toChainStatus;
        }
    }
    exports.determineRealOrderStatus = determineRealOrderStatus;
    function castToVaultStore(vc) {
        return {
            ...vc,
            tokenBalance: new eth_wallet_3.BigNumber("0"),
            imbalance: new eth_wallet_3.BigNumber("0"),
            userTokenAmount: new eth_wallet_3.BigNumber("0"),
            userOrders: [],
            ordersLength: 0
        };
    }
    function castToVaultGroupStore(vgc) {
        let vaults = {};
        forEachNumberIndex(vgc.vaults, (v, chainId) => vaults[chainId] = castToVaultStore(v));
        return {
            ...vgc,
            vaults,
        };
    }
    function initVaultGroupsStore(vgcs) {
        return vgcs.map(g => castToVaultGroupStore(g));
    }
    function matchFilter(list, filter) {
        let filters = Object.keys(filter);
        return list.filter(item => filters.every(f => {
            switch (typeof filter[f]) {
                case 'boolean':
                    if (filter[f] === false) {
                        return !item[f];
                    }
                // also case for filter[f] === true 
                case 'string':
                case 'number':
                    return filter[f] === item[f];
                case 'object': // have not implemented yet
                default:
                    console.log(`matchFilter do not support ${typeof filter[f]} yet!`);
                    return false;
            }
        }));
    }
    const getTokensDataList = async (tokenMapData, tokenBalances) => {
        let dataList = [];
        for (let i = 0; i < Object.keys(tokenMapData).length; i++) {
            let tokenAddress = Object.keys(tokenMapData)[i];
            let tokenObject = tokenMapData[tokenAddress];
            if (tokenBalances) {
                dataList.push({
                    ...tokenObject,
                    status: false,
                    value: tokenBalances[tokenAddress] ? tokenBalances[tokenAddress] : 0,
                });
            }
            else {
                dataList.push({
                    ...tokenObject,
                    status: null,
                });
            }
        }
        return dataList;
    };
    exports.getTokensDataList = getTokensDataList;
    // wallet
    function getWalletProvider() {
        return localStorage.getItem('walletProvider') || '';
    }
    exports.getWalletProvider = getWalletProvider;
    function isWalletConnected() {
        const wallet = eth_wallet_3.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isWalletConnected = isWalletConnected;
    const truncateAddress = (address) => {
        if (address === undefined || address === null)
            return '';
        return address.substr(0, 6) + '...' + address.substr(-4);
    };
    exports.truncateAddress = truncateAddress;
    function getAddresses(chainId) {
        return index_4.CoreContractStore[chainId];
    }
    exports.getAddresses = getAddresses;
    ;
    const getChainNativeToken = (chainId) => {
        return scom_token_list_1.ChainNativeTokenByChainId[chainId];
    };
    exports.getChainNativeToken = getChainNativeToken;
    const getGovToken = (chainId) => {
        let govToken;
        let Address = getAddresses(chainId);
        if (!Address)
            return govToken;
        if (chainId == 43113 || chainId == 43114) {
            govToken = { chainId, address: Address.GOV_TOKEN, decimals: 18, symbol: "veOSWAP", name: 'Vote-escrowed OSWAP' };
        }
        else {
            govToken = { chainId, address: Address.GOV_TOKEN, decimals: 18, symbol: "OSWAP", name: 'OpenSwap' };
        }
        return govToken;
    };
    exports.getGovToken = getGovToken;
});
define("@scom/scom-xchain-widget/store/index.ts", ["require", "exports", "@scom/scom-xchain-widget/store/data/index.ts", "@scom/scom-token-list", "@scom/scom-xchain-widget/store/utils.ts", "@scom/scom-xchain-widget/store/data/index.ts", "@scom/scom-xchain-widget/store/utils.ts"], function (require, exports, index_5, scom_token_list_2, utils_1, index_6, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findConstantAllAsset = exports.findConstantToVault = exports.findConstantVault = exports.findConstantVaultGroupByToken = exports.findConstantTokenByVault = exports.getNetworkImg = exports.getTokenIcon = exports.nullAddress = void 0;
    __exportStar(index_6, exports);
    exports.nullAddress = "0x0000000000000000000000000000000000000000";
    const getTokenIcon = (address, chainId) => {
        if (!address)
            return '';
        const tokenMap = scom_token_list_2.tokenStore.getTokenMapByChainId(chainId);
        let ChainNativeToken;
        let tokenObject;
        if ((0, utils_1.isWalletConnected)()) {
            ChainNativeToken = (0, utils_1.getChainNativeToken)(chainId);
            tokenObject = address == ChainNativeToken.symbol ? ChainNativeToken : tokenMap[address.toLowerCase()];
        }
        else {
            tokenObject = tokenMap[address.toLowerCase()];
        }
        return scom_token_list_2.assets.tokenPath(tokenObject, chainId);
    };
    exports.getTokenIcon = getTokenIcon;
    const getNetworkImg = (state, chainId) => {
        try {
            const network = state.getNetworkInfo(chainId);
            if (network) {
                return network.image;
            }
        }
        catch { }
        return scom_token_list_2.assets.fallbackUrl;
    };
    exports.getNetworkImg = getNetworkImg;
    function findConstantTokenByVault(chainId, vaultAddress) {
        let x = index_5.VaultGroupList.find(group => group.vaults[chainId].vaultAddress.toLowerCase() == vaultAddress.toLowerCase());
        if (!x)
            return;
        return x.vaults[chainId].assetToken;
    }
    exports.findConstantTokenByVault = findConstantTokenByVault;
    function findConstantVaultGroupByToken(chainId, tokenAddress) {
        return index_5.VaultGroupList.find(group => group.vaults[chainId].assetToken.address.toLowerCase() == tokenAddress.toLowerCase());
    }
    exports.findConstantVaultGroupByToken = findConstantVaultGroupByToken;
    function findConstantVault(vaultGroup, chainId) {
        try {
            return vaultGroup.vaults[chainId];
        }
        catch (error) {
            return undefined;
        }
    }
    exports.findConstantVault = findConstantVault;
    function findConstantToVault(fromChainId, tokenAddress, toChainId) {
        let group = findConstantVaultGroupByToken(fromChainId, tokenAddress);
        if (!group || !group.vaults)
            throw new Error(`No such token ${tokenAddress} recorded in chain ${fromChainId}`);
        return findConstantVault(group, toChainId);
    }
    exports.findConstantToVault = findConstantToVault;
    function findConstantAllAsset(fromChainId) {
        let out = [];
        index_5.VaultGroupList.forEach(group => {
            const vaults = findConstantVault(group, fromChainId);
            if (vaults)
                out.push(vaults);
        });
        return out;
    }
    exports.findConstantAllAsset = findConstantAllAsset;
    __exportStar(utils_2, exports);
});
define("@scom/scom-xchain-widget/crosschain-utils/crosschain-utils.types.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-xchain-widget/crosschain-utils/API.ts", ["require", "exports", "@scom/scom-xchain-widget/store/index.ts", "@ijstech/eth-wallet", "@scom/oswap-cross-chain-bridge-contract", "@scom/scom-token-list", "@ijstech/eth-contract"], function (require, exports, index_7, eth_wallet_4, oswap_cross_chain_bridge_contract_1, scom_token_list_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setERC20AllowanceToZero = exports.getChainNativeToken = exports.findVaultGroupByToken = exports.findToVault = exports.findAllAsset = exports.getVaultAssetBalance = exports.getRoute = exports.createBridgeVaultOrder = exports.initCrossChainWallet = exports.getBond = exports.getVaultTokenMap = exports.getVaultGroupsUpdateOrders = exports.getVaultGroups = exports.getVaultGroups2 = exports.getFeeAmounts = void 0;
    const initCrossChainWallet = (state, chainId) => {
        const wallet = eth_wallet_4.Wallet.getClientInstance();
        const networkInfo = state.getNetworkInfo(chainId);
        let rpcEndpoint = networkInfo.rpcUrls[0];
        let crossChainWallet = new eth_wallet_4.Wallet(rpcEndpoint, { address: wallet.address });
        return crossChainWallet;
    };
    exports.initCrossChainWallet = initCrossChainWallet;
    const getVaultTokenMap = () => {
        let vaultTokenMap = {};
        index_7.VaultGroupList.forEach((vaultGroup) => {
            for (const [chainId, vault] of Object.entries(vaultGroup.vaults)) {
                vaultTokenMap[chainId] = vaultTokenMap[chainId] || {};
                vaultTokenMap[chainId][vault.vaultAddress.toLowerCase()] = vault.assetToken.address.toLowerCase();
            }
        });
        return vaultTokenMap;
    };
    exports.getVaultTokenMap = getVaultTokenMap;
    //MARK: Bond
    async function getBond(state, vault) {
        //FIXME need to minus pending withdraw
        let govToken = new oswap_cross_chain_bridge_contract_1.Contracts.ERC20(initCrossChainWallet(state, vault.chainId), index_7.CoreContractStore[vault.chainId].GOV_TOKEN);
        return (await govToken.balanceOf(vault.vaultRegistryAddress)).shiftedBy(-vault.assetToken.decimals);
    }
    exports.getBond = getBond;
    async function createBridgeVaultOrder(state, params) {
        try {
            const { vaultAddress, targetChainId, tokenIn, tokenOut, amountIn, minAmountOut } = params;
            const wallet = eth_wallet_4.Wallet.getClientInstance();
            const amountInTokenAmount = (0, eth_wallet_4.BigNumber)(amountIn).shiftedBy(tokenIn.decimals);
            const minAmountOutTokenAmount = (0, eth_wallet_4.BigNumber)(minAmountOut).shiftedBy(tokenOut.decimals).dp(0, 1);
            const vaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(wallet, vaultAddress);
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
        }
        catch (error) {
            return { receipt: null, error: error };
        }
    }
    exports.createBridgeVaultOrder = createBridgeVaultOrder;
    // Return the current vault asset balance by given chainId and address
    const getVaultAssetBalance = async (state, chainId, vaultAddress) => {
        let targetChainWallet = initCrossChainWallet(state, chainId);
        const vault = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(targetChainWallet, vaultAddress);
        const asset = new eth_wallet_4.Contracts.ERC20(targetChainWallet, await vault.asset());
        return (await asset.balanceOf(vault.address));
    };
    exports.getVaultAssetBalance = getVaultAssetBalance;
    const getChainNativeToken = (state) => {
        return scom_token_list_3.ChainNativeTokenByChainId[state.getChainId()];
    };
    exports.getChainNativeToken = getChainNativeToken;
    //For testing only
    const setERC20AllowanceToZero = async (token, spenderAddress) => {
        let wallet = eth_wallet_4.Wallet.getClientInstance();
        let erc20 = new eth_wallet_4.Contracts.ERC20(wallet, token.address);
        let receipt = await erc20.approve({
            spender: spenderAddress,
            amount: 0
        });
        return receipt;
    };
    exports.setERC20AllowanceToZero = setERC20AllowanceToZero;
    // CrossChain
    function getFeeAmounts(vault, amountIn) {
        let deci = vault.assetToken.decimals;
        let weiAmountIn = amountIn.shiftedBy(deci);
        let baseFeeAmount = new eth_wallet_4.BigNumber(vault.baseFee).shiftedBy(-deci);
        let protocolFeeAmount = new eth_wallet_4.BigNumber(weiAmountIn).times(vault.protocolFee).dp(0, eth_wallet_4.BigNumber.ROUND_DOWN).shiftedBy(-deci);
        let transactionFeeAmount = new eth_wallet_4.BigNumber(weiAmountIn).times(vault.transactionFee).dp(0, eth_wallet_4.BigNumber.ROUND_DOWN).shiftedBy(-deci);
        let imbalance = new eth_wallet_4.BigNumber(vault.imbalance).minus(weiAmountIn);
        let imbalanceFeeAmount = imbalance.lt(0) ? imbalance.times(-vault.imbalanceFee).dp(0, eth_wallet_4.BigNumber.ROUND_DOWN).shiftedBy(-deci) : new eth_wallet_4.BigNumber("0");
        return {
            totalFeeAmount: baseFeeAmount.plus(protocolFeeAmount).plus(transactionFeeAmount).plus(imbalanceFeeAmount),
            baseFeeAmount,
            protocolFeeAmount,
            transactionFeeAmount,
            imbalanceFeeAmount,
        };
    }
    exports.getFeeAmounts = getFeeAmounts;
    function getRoute(swapInfo) {
        let fromVault = findVault(swapInfo.vaultGroup, swapInfo.fromChainId);
        let toVault = findVault(swapInfo.vaultGroup, swapInfo.toChainId);
        if (!fromVault || !toVault)
            return null;
        let feeAmounts = getFeeAmounts(fromVault, swapInfo.inAmount);
        return {
            fromVault,
            fromAmount: swapInfo.inAmount,
            toVault,
            toAmount: swapInfo.inAmount.minus(feeAmounts.totalFeeAmount),
            feeAmounts,
        };
    }
    exports.getRoute = getRoute;
    async function findVaultGroupByToken(state, chainId, tokenAddress) {
        return (await getVaultGroups(state)).find(group => group.vaults[chainId]?.assetToken.address.toLowerCase() == tokenAddress.toLowerCase());
    }
    exports.findVaultGroupByToken = findVaultGroupByToken;
    function findVault(vaultGroup, chainId) {
        try {
            return vaultGroup.vaults[chainId];
        }
        catch (error) {
            return undefined;
        }
    }
    async function findToVault(state, fromChainId, tokenAddress, toChainId) {
        let group = await findVaultGroupByToken(state, fromChainId, tokenAddress);
        if (!group || !group.vaults)
            throw new Error(`No such token ${tokenAddress} recorded in chain ${fromChainId}`);
        return findVault(group, toChainId);
    }
    exports.findToVault = findToVault;
    async function findAllAsset(state, fromChainId) {
        let out = [];
        let vgs = await getVaultGroups(state);
        vgs.forEach(group => {
            const vaults = findVault(group, fromChainId);
            if (vaults)
                out.push(vaults);
        });
        return out;
    }
    exports.findAllAsset = findAllAsset;
    async function getVaultGroups2(state, isUpdate) {
        let walletChainId = eth_wallet_4.Wallet.getClientInstance().chainId;
        let networks = (0, index_7.getNetworksByType)(walletChainId);
        let vaultGroupsStore = state.getVaultGroups();
        if (!isUpdate)
            return vaultGroupsStore;
        //only update DYNAMIC items in VaultGroupList
        for (let i = 0; i < vaultGroupsStore.length; i++) {
            const group = vaultGroupsStore[i];
            await (0, index_7.forEachNumberIndexAwait)(group.vaults, async (vault, chainId) => {
                if (networks.every(n => n !== chainId))
                    return;
                let wallet = initCrossChainWallet(state, chainId);
                let vaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(wallet, vault.vaultAddress);
                //let tokenContract = new xChainContracts.ERC20(wallet, vault.assetToken.address);
                vaultGroupsStore[i].vaults[chainId].tokenBalance = await vaultContract.lpAssetBalance();
                vaultGroupsStore[i].vaults[chainId].imbalance = await vaultContract.imbalance();
                //vaultGroupsStore[i].vaults[chainId].userTokenAmount = await tokenContract.balanceOf(wallet.address);
            });
        }
        state.setVaultGroups(vaultGroupsStore);
        return vaultGroupsStore;
    }
    exports.getVaultGroups2 = getVaultGroups2;
    async function getVaultGroups(state, isUpdate) {
        return getVaultGroups2(state, isUpdate);
        console.log("getVaultGroups", isUpdate);
        let walletChainId = eth_wallet_4.Wallet.getClientInstance().chainId;
        let networks = (0, index_7.getNetworksByType)(walletChainId);
        let vaultGroupsStore = state.getVaultGroups();
        if (!vaultGroupsStore || vaultGroupsStore.length < 1) {
            //vaultGroupsStore = VaultGroupList.map(g => castToVaultGroupStore(g));
            state.setVaultGroups(vaultGroupsStore);
        }
        if (!isUpdate)
            return vaultGroupsStore;
        let chainTask = {};
        //only update DYNAMIC items in VaultGroupList
        for (let i = 0; i < vaultGroupsStore.length; i++) {
            const group = vaultGroupsStore[i];
            console.log(networks);
            await (0, index_7.forEachNumberIndexAwait)(group.vaults, async (vault, chainId) => {
                console.log("group", group.assetName, chainId);
                if (networks.every(n => n !== chainId))
                    return;
                if (!chainTask[chainId]) {
                    chainTask[chainId] = {
                        assetNames: [],
                        wallet: initCrossChainWallet(state, Number(chainId)),
                        calls: [],
                    };
                }
                let vaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(chainTask[chainId].wallet, vault.vaultAddress);
                let tokenContract = new oswap_cross_chain_bridge_contract_1.Contracts.ERC20(chainTask[chainId].wallet, vault.assetToken.address);
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
        console.log("tasks", chainTask);
        (0, index_7.forEachNumberIndexAwait)(chainTask, async (x, chainId) => {
            try {
                let res = await x.wallet.doMulticall(x.calls);
                vaultGroupsStore.forEach((group, gIndex) => {
                    let callIndex = x.assetNames.findIndex(asset => asset === group.assetName);
                    console.log("callIndex", callIndex);
                    if (callIndex < 0)
                        return;
                    console.log("----test----");
                    console.log(group.vaults[chainId].tokenBalance);
                    console.log(res[callIndex * 4]);
                    group.vaults[chainId].tokenBalance = res[callIndex * 4]; //TODO decimal offset
                    group.vaults[chainId].imbalance = res[callIndex * 4 + 1]; //TODO decimal offset
                    group.vaults[chainId].ordersLength = res[callIndex * 4 + 2];
                    group.vaults[chainId].userTokenAmount = res[callIndex * 4 + 3]; //TODO decimal offset
                });
            }
            catch (error) {
                console.log(`Error on getVaultGroups chainId ${chainId}.`, error);
            }
        });
        state.setVaultGroups(vaultGroupsStore);
        return vaultGroupsStore;
    }
    exports.getVaultGroups = getVaultGroups;
    async function getVaultGroupsUpdateOrders(state, isUpdate) {
        return getVaultGroupsUpdateOrders2(state, isUpdate);
        console.log("getVaultGroupsUpdateOrders", isUpdate);
        let wallet = eth_wallet_4.Wallet.getClientInstance();
        let walletAddress = wallet.address;
        let walletChainId = wallet.chainId;
        let networks = (0, index_7.getNetworksByType)(walletChainId);
        let vaultGroupsStore = await getVaultGroups(state, isUpdate);
        if (!isUpdate)
            return vaultGroupsStore;
        let chainTask = {};
        //MARK: ordersLength
        vaultGroupsStore.forEach(group => {
            (0, index_7.forEachNumberIndex)(group.vaults, (vault, chainId) => {
                if (networks.every(n => n !== chainId))
                    return;
                if (!chainTask[chainId]) {
                    chainTask[chainId] = {
                        assetNames: [],
                        wallet: initCrossChainWallet(state, Number(chainId)),
                        calls: [],
                    };
                }
                let vaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(chainTask[chainId].wallet, vault.vaultAddress);
                chainTask[chainId].assetNames.push(group.assetName);
                chainTask[chainId].calls.push({
                    to: vault.vaultAddress,
                    contract: vaultContract,
                    methodName: "ordersLength",
                    params: []
                });
            });
        });
        (0, index_7.forEachNumberIndexAwait)(chainTask, async (x, chainId) => {
            try {
                let res = await x.wallet.doMulticall(x.calls);
                vaultGroupsStore.forEach((group, gIndex) => {
                    let callIndex = x.assetNames.findIndex(asset => asset === group.assetName);
                    if (callIndex < 0)
                        return;
                    vaultGroupsStore[gIndex].vaults[chainId].ordersLength = res[callIndex];
                });
            }
            catch (error) {
                console.log(`Error on getVaultGroups chainId ${chainId}.`, error);
            }
        });
        //MARK: orders
        const size = 100;
        let rawOrders = [];
        vaultGroupsStore.forEach(group => {
            (0, index_7.forEachNumberIndexAwait)(group.vaults, async (vault, chainId) => {
                if (networks.every(n => n !== chainId))
                    return;
                let vaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(chainTask[chainId].wallet, vault.vaultAddress);
                for (let i = 0; i < vault.ordersLength; i += size) {
                    let orderBatch = await vaultContract.getOrders({ start: i, length: size });
                    rawOrders = rawOrders.concat(orderBatch);
                }
                let orders = rawOrders.map((o, i) => {
                    let toChain = o.peerChain.toNumber();
                    return {
                        id: i,
                        status: index_7.VaultOrderStatus.NotSpecified,
                        expire: o.expire,
                        fromOwner: o.to,
                        fromChain: chainId,
                        fromToken: vault.assetToken,
                        fromAmount: new eth_wallet_4.BigNumber(o.inAmount),
                        toOwner: o.to,
                        toChain,
                        toToken: group.vaults[toChain].assetToken,
                        toAmount: new eth_wallet_4.BigNumber(o.minOutAmount),
                        toAmountMin: new eth_wallet_4.BigNumber(o.minOutAmount),
                        protocolFee: vault.protocolFee
                    };
                }).filter(o => o.toOwner === walletAddress);
                vault.userOrders = orders;
            });
        });
        console.log("end", vaultGroupsStore);
        state.setVaultGroups(vaultGroupsStore);
        return vaultGroupsStore;
    }
    exports.getVaultGroupsUpdateOrders = getVaultGroupsUpdateOrders;
    async function getVaultGroupsUpdateOrders2(state, isUpdate) {
        let wallet = eth_wallet_4.Wallet.getClientInstance();
        let networks = (0, index_7.getNetworksByType)(wallet.chainId);
        let vaultGroupsStore = state.getVaultGroups();
        if (!isUpdate)
            return vaultGroupsStore;
        //only update DYNAMIC items in VaultGroupList
        const size = 100;
        for (let i = 0; i < vaultGroupsStore.length; i++) {
            const group = Object.assign({}, vaultGroupsStore[i]);
            networks.forEach(chainId => {
                // clear user orders before updating
                if (vaultGroupsStore[i].vaults && vaultGroupsStore[i].vaults[chainId]?.userOrders) {
                    vaultGroupsStore[i].vaults[chainId].userOrders = [];
                }
            });
            await (0, index_7.forEachNumberIndexAwait)(group.vaults, async (vault, chainId) => {
                if (networks.every(n => n !== chainId))
                    return;
                let wallet = initCrossChainWallet(state, chainId);
                let vaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(wallet, vault.vaultAddress);
                let ordersLength = await vaultContract.ordersLength();
                vaultGroupsStore[i].vaults[chainId].ordersLength = ordersLength.toNumber();
                if (ordersLength.lte(0))
                    return;
                let rawOrders = [];
                for (let j = 0; j < vault.ordersLength; j += size) {
                    let orderBatch = await vaultContract.getOrders({ start: j, length: size });
                    rawOrders = rawOrders.concat(orderBatch);
                }
                for (let k = 0; k < rawOrders.length; k++) {
                    const o = rawOrders[k];
                    if (o.to !== wallet.address)
                        continue;
                    let toChain = o.peerChain.toNumber();
                    let toVault = findVault(group, toChain);
                    if (!toVault)
                        continue;
                    let orderStatus = await vaultContract.orderStatus(k);
                    let fromChainStatus = (0, index_7.castToVaultOrderStatus)(orderStatus.toNumber());
                    let toVaultContract = new oswap_cross_chain_bridge_contract_1.Contracts.OSWAP_BridgeVault(initCrossChainWallet(state, toChain), toVault.vaultAddress);
                    let toOrderStatus = await toVaultContract.swapOrderStatus(await toVaultContract.hashOrder({
                        owner: wallet.address,
                        sourceChainId: chainId,
                        orderId: k
                    }));
                    let toChainStatus = (0, index_7.castToVaultOrderStatus)(toOrderStatus.toNumber());
                    let status = (0, index_7.determineRealOrderStatus)(o.expire, fromChainStatus, toChainStatus);
                    //console.log(`#${k} ${new BigNumber(o.inAmount)} real${status} from${orderStatus} to${toOrderStatus.toNumber()}`);
                    vaultGroupsStore[i].vaults[chainId].userOrders.push({
                        id: k,
                        status,
                        expire: o.expire,
                        fromOwner: o.to,
                        fromChain: chainId,
                        fromToken: vault.assetToken,
                        fromAmount: new eth_wallet_4.BigNumber(o.inAmount),
                        toOwner: o.to,
                        toChain,
                        toToken: group.vaults[toChain].assetToken,
                        toAmount: new eth_wallet_4.BigNumber(o.minOutAmount),
                        toAmountMin: new eth_wallet_4.BigNumber(o.minOutAmount),
                        protocolFee: vault.protocolFee
                    });
                }
            });
        }
        state.setVaultGroups(vaultGroupsStore);
        return vaultGroupsStore;
    }
});
define("@scom/scom-xchain-widget/crosschain-utils/index.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-commission-proxy-contract", "@scom/scom-xchain-widget/crosschain-utils/API.ts"], function (require, exports, eth_wallet_5, scom_commission_proxy_contract_1, API_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCommissionRate = void 0;
    const getCommissionRate = async (state, campaignId) => {
        const rpcWallet = state.getRpcWallet();
        const proxyAddress = state.getProxyAddress();
        await rpcWallet.init();
        let commissionRate = await scom_commission_proxy_contract_1.ContractUtils.getCommissionRate(rpcWallet, proxyAddress, campaignId);
        return eth_wallet_5.Utils.fromDecimals(commissionRate, 6).toFixed();
    };
    exports.getCommissionRate = getCommissionRate;
    __exportStar(API_1, exports);
});
define("@scom/scom-xchain-widget/price-info/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    components_3.Styles.cssRule('.price-info', {
        display: 'flex',
        flexDirection: 'column',
        opacity: 0.75,
        $nest: {
            'i-hstack > i-label:first-child': {
                marginRight: '0.5rem'
            },
            '.rounded-icon': {
                display: 'inline-flex',
                padding: 0,
                marginLeft: 'auto'
            }
        }
    });
});
define("@scom/scom-xchain-widget/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moduleDir = components_4.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    exports.default = {
        fullPath
    };
});
define("@scom/scom-xchain-widget/languages/main.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-xchain-widget/languages/main.json.ts'/> 
    exports.default = {
        "en": {
            "last_updated_(s)_ago": "Last updated {{value}}(s) ago",
            "confirm_swap": "Confirm Swap",
            "transaction_fee_details": "Transaction Fee Details",
            "close": "Close",
            "vault_bond_balance": "Vault Bond Balance",
            "vault_asset_balance": "Vault Asset Balance",
            "vault_bond_balance:_0": "Vault Bond Balance: 0",
            "vault_asset_balance:_0": "Vault Asset Balance: 0",
            "balance:_0": "Balance: 0",
            "swapping_from_to:": "Swapping {{from}} to {{to}}",
            "no_crosschain_routes_are_found_you_may_try_updating_the_input_amount_or_selecting_another_token": "No crosschain routes are found. You may try updating the input amount or selecting another token.",
            "no_routing": "No routing",
            "balance": "Balance",
            "you_receive": "You Receive",
            "you_pay": "You Pay",
            "destination_chain": "Destination Chain",
            "source_chain": "Source Chain",
            "you_swap": "You Swap",
            "total_transaction_fee": "Total Transaction Fee",
            "exceed_vault_asset_balance_or_bond_balance": "Exceed Vault Asset Balance or Bond Balance",
            "cap_reached": "Cap Reached",
            "cap": "Cap",
            "you_will_pay_at_most": "You will pay at most",
            "you_will_receive_at_least": "You will receive at least",
            "input_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert": "Input is estimated. If the price changes unfavorably by more than {{value}}% your transaction will revert.",
            "output_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert": "Output is estimated. If the price changes unfavorably by more than {{value}}% your transaction will revert.",
            "if_the_order_is_not_executed_in_the_target_chain_the_estimated_withdrawalble_amount_is": "If the order is not executed in the target chain, the estimated withdrawalble amount is",
            "swapping": "Swapping",
            "approving": "Approving",
            "max": "Max",
            "xchain_dapp_supports_this_network_please_switch_network_in_the_connected_wallet": "Xchain dapp supports this network {{chainName}} ({{chainId}}), please switch network in the connected wallet.",
            "connect_wallet": "Connect Wallet",
            "switch_network": "Switch Network",
            "approve": "Approve",
            "swap": "Swap",
            "create_order": "Create Order",
            "turn_on_expert_mode": "Turn On Expert Mode",
            "insufficient_balance": "Insufficient {{symbol}} balance",
            "invalid_pair": "Invalid pair",
            "circuit_breaker_triggered": "Circuit breaker triggered",
            "base_fee": "Base Fee",
            "this_fee_is_paid_to_the_trolls_to_cover_gas_fee_on_the_target_chain": "This fee is paid to the trolls to cover gas fee on the Target Chain",
            "bridge_vault_liquidity_fee": "Bridge Vault Liquidity Fee",
            "this_fee_is_paid_to_the_bridge_vault_liquidity_provider_on_target_chain": "This fee is paid to the Bridge Vault Liquidity Provider on Target Chain",
            "protocol_fee": "Protocol Fee",
            "this_fee_is_paid_to_the_troll_owners_on_the_cross_chain_network": "This fee is paid to the troll owners on the Cross Chain Network",
            "imbalance_fee": "Imbalance Fee",
            "this_fee_is_acted_as_an_incentive_to_balance_the_vault": "This fee is acted as an incentive to balance the vault",
            "bridge_record": "Bridge Record",
        },
        "zh-hant": {
            "last_updated_(s)_ago": "上次更新 {{value}} 秒前",
            "approve": "批准",
            "approving": "批准中",
            "balance": "餘額",
            "cap_reached": "達到上限",
            "cap": "上限",
            "circuit_breaker_triggered": "觸發斷路器",
            "close": "關閉",
            "confirm_swap": "確認交換",
            "connect_wallet": "連接錢包",
            "create_order": "創建訂單",
            "destination_chain": "目標鏈",
            "exceed_vault_asset_balance_or_bond_balance": "超過保險庫資產餘額或債券餘額",
            "if_the_order_is_not_executed_in_the_target_chain_the_estimated_withdrawalble_amount_is": "如果訂單未在目標鏈上執行，預計可提取的金額為",
            "input_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert": "輸入是估計的。如果價格變動超過{{value}}%，您的交易將被撤銷。",
            "insufficient_balance": "不足的{{symbol}}餘額",
            "invalid_pair": "無效的配對",
            "max": "最大",
            "no_crosschain_routes_are_found_you_may_try_updating_the_input_amount_or_selecting_another_token": "未找到跨鏈路徑。您可以嘗試更新輸入金額或選擇其他代幣。",
            "no_routing": "無路由",
            "output_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert": "輸出是估計的。如果價格變動超過{{value}}%，您的交易將被撤銷。",
            "source_chain": "源鏈",
            "swap_supports_this_network_please_switch_network_in_the_connected_wallet": "交換支持此網絡{{chainName}} ({{chainId}})，請在連接的錢包中切換網絡。",
            "swap": "交換",
            "swapping": "交換中",
            "switch_network": "切換網絡",
            "total_transaction_fee": "總交易費",
            "transaction_fee_details": "交易費詳情",
            "turn_on_expert_mode": "開啟專家模式",
            "vault_asset_balance": "保險庫資產餘額",
            "vault_bond_balance": "保險庫債券餘額",
            "you_pay": "您支付",
            "you_receive": "您收到",
            "you_swap": "您交換",
            "you_will_pay_at_most": "您最多將支付",
            "you_will_receive_at_least": "您至少將收到",
            "vault_bond_balance:_0": "保險庫債券餘額: 0",
            "vault_asset_balance:_0": "保險庫資產餘額: 0",
            "balance:_0": "餘額: 0",
            "swapping_from_to:": "交換中 {{from}} 至 {{to}}",
            "base_fee": "基本費用",
            "bridge_vault_liquidity_fee": "橋樑保險庫流動性費用",
            "protocol_fee": "協議費用",
            "imbalance_fee": "不平衡費用",
            "this_fee_is_acted_as_an_incentive_to_balance_the_vault": "此費用作為平衡保險庫的激勵。",
            "this_fee_is_paid_to_the_bridge_vault_liquidity_provider_on_target_chain": "此費用支付給目標鏈上的橋樑保險庫流動性提供者。",
            "this_fee_is_paid_to_the_troll_owners_on_the_cross_chain_network": "此費用支付給跨鏈網絡上的troll擁有者。",
            "this_fee_is_paid_to_the_trolls_to_cover_gas_fee_on_the_target_chain": "此費用支付給troll以覆蓋目標鏈上的燃氣費。",
            "bridge_record": "Bridge Record"
        },
        "vi": {
            "last_updated_(s)_ago": "Lần cập nhật cuối cách đây {{value}}(giây)",
            "confirm_swap": "Xác nhận Hoán đổi",
            "transaction_fee_details": "Chi tiết Phí Giao dịch",
            "close": "Đóng",
            "vault_bond_balance": "Dư nợ trái phiếu",
            "vault_asset_balance": "Tổng tài sản",
            "vault_bond_balance:_0": "Dư nợ trái phiếu: 0",
            "vault_asset_balance:_0": "Tổng tài sản: 0",
            "balance:_0": "Số dư: 0",
            "swapping_from_to:": "Đang hoán đổi từ {{from}} đến {{to}}",
            "no_crosschain_routes_are_found_you_may_try_updating_the_input_amount_or_selecting_another_token": "Không tìm thấy tuyến đường crosschain. Bạn có thể thử cập nhật số tiền đã nhập hoặc chọn token khác.",
            "no_routing": "Không có định tuyến",
            "balance": "Số dư",
            "you_receive": "Bạn Nhận",
            "you_pay": "Bạn Trả",
            "destination_chain": "Chuỗi Đích",
            "source_chain": "Chuỗi Nguồn",
            "you_swap": "Bạn Hoán đổi",
            "total_transaction_fee": "Tổng Phí Giao dịch",
            "exceed_vault_asset_balance_or_bond_balance": "Vượt quá Tổng tài sản hoặc Dư nợ trái phiếu",
            "cap_reached": "Đã đạt Giới hạn",
            "cap": "Giới hạn",
            "you_will_pay_at_most": "Bạn sẽ trả tối đa",
            "you_will_receive_at_least": "Bạn sẽ nhận ít nhất",
            "input_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert": "Số tiền nhập là ước tính. Nếu giá thay đổi không thuận lợi nhiều hơn {{value}}%, giao dịch của bạn sẽ bị hoàn tác.",
            "output_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert": "Số tiền đầu ra là ước tính. Nếu giá thay đổi không thuận lợi nhiều hơn {{value}}%, giao dịch của bạn sẽ bị hoàn tác.",
            "if_the_order_is_not_executed_in_the_target_chain_the_estimated_withdrawalble_amount_is": "Nếu đơn hàng không được thực hiện trong chuỗi đích, số tiền có thể rút ước tính là",
            "swapping": "Đang Hoán đổi",
            "approving": "Đang Chấp thuận",
            "max": "Tối đa",
            "xchain_dapp_supports_this_network_please_switch_network_in_the_connected_wallet": "Xchain dapp hỗ trợ mạng lưới {{chainName}} ({{chainId}}), vui lòng chuyển mạng trong ví đã kết nối.",
            "price_impact_too_high_if_you_want_to_bypass_this_check_please_turn_on_expert_mode": "Tác động giá quá cao. Nếu bạn muốn bỏ qua kiểm tra này, hãy bật chế độ Chuyên gia.",
            "connect_wallet": "Kết nối Ví",
            "switch_network": "Chuyển Mạng",
            "approve": "Phê duyệt",
            "swap": "Hoán đổi",
            "create_order": "Tạo Đơn hàng",
            "turn_on_expert_mode": "Bật Chế độ Chuyên gia",
            "insufficient_balance": "Số dư {{symbol}} không đủ",
            "invalid_pair": "Cặp này không hợp lệ",
            "circuit_breaker_triggered": "Cầu dao đã kích hoạt",
            "base_fee": "Phí Cơ bản",
            "this_fee_is_paid_to_the_trolls_to_cover_gas_fee_on_the_target_chain": "Phí này được trả cho các trolls để trang trải phí gas trên Chuỗi Đích.",
            "imbalance_fee": "Phí Mất Cân bằng",
            "this_fee_is_acted_as_an_incentive_to_balance_the_vault": "Phí này hoạt động như một động lực để cân bằng kho tiền.",
            "bridge_vault_liquidity_fee": "Phí Thanh khoản Kho Vault Cầu Nối",
            "this_fee_is_paid_to_the_bridge_vault_liquidity_provider_on_target_chain": "Phí này được trả cho Nhà cung cấp Thanh khoản Kho Vault Cầu Nối trên Chuỗi Đích.",
            "protocol_fee": "Phí Giao thức",
            "this_fee_is_paid_to_the_troll_owners_on_the_cross_chain_network": "Phí này được trả cho chủ sở hữu trolls trên Mạng Lưới Chuỗi Chéo.",
            "bridge_record": "Dữ liệu cầu nối",
        }
    };
});
define("@scom/scom-xchain-widget/languages/bridgeRecord.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-xchain-widget/languages/bridgeRecord.json.ts'/> 
    exports.default = {
        "en": {
            "data_last_updated_0_seconds_ago": "Data last updated 0 seconds ago",
            "data_last_updated_seconds_ago": "Data last updated {{value}} seconds ago",
            "latest_swap": "Latest Swap",
            "no_data": "No Data",
            "please_connect_with_your_wallet": "Please connect with your wallet",
            "oldest_swap": "Oldest Swap",
            "destination_chain": "Destination Chain",
            "source_chain": "Source Chain",
            "token_group": "Token Group",
            "confirming": "Confirming",
            "request_cancel": "Request Cancel",
            "withdraw": "Withdraw",
            "you_can_withdraw_the_tokens_after_the_cancellation_is_approved_by_the_bridge_trolls._the_cancellation_is_subjected_to_a_cancellation_fee": "You can withdraw the tokens after the cancellation is approved by the bridge trolls. The cancellation is subjected to a <span class=\"highlight-text\">{{fee}}%</span> cancellation fee.",
            "the_token_will_be_returned_to_your_wallet_after_withdrawal": "The token will be returned to your wallet after withdrawal.",
            "the_request_must_be_submitted_from_the_destination_chain,_please_switch_your_network_as_instructed": "The request must be submitted from the destination chain, please switch your network as instructed.",
            "the_request_must_be_submitted_from_the_source_chain,_please_switch_your_network_as_instructed": "The request must be submitted from the source chain, please switch your network as instructed.",
            "amend_order": "Amend Order",
            "minimum_receive": "Minimum Receive",
            "the_address_has_been_copied": "The address has been copied",
            "loading": "Loading...",
            "withdraw_amount": "Withdraw Amount",
            "switch_network": "Switch Network",
            "token_receive": "Token Receive",
            "expected_receive": "Expected Receive",
            "confirm": "Confirm",
            "token_swap": "Token Swap",
            "from": "From",
            "to": "To",
            "status": "Status"
        },
        "zh-hant": {},
        "vi": {
            "data_last_updated_0_seconds_ago": "Dữ liệu được cập nhật lần cuối cách đây 0 giây",
            "data_last_updated_seconds_ago": "Dữ liệu được cập nhật lần cuối cách đây {{value}} giây",
            "latest_swap": "Hoán đổi mới nhất",
            "no_data": "Không có dữ liệu",
            "please_connect_with_your_wallet": "Vui lòng kết nối với ví của bạn",
            "oldest_swap": "Hoán đổi cũ nhất",
            "destination_chain": "Chuỗi đích",
            "source_chain": "Chuỗi nguồn",
            "token_group": "Nhóm token",
            "confirming": "Đang xác nhận",
            "request_cancel": "Yêu cầu hủy",
            "withdraw": "Rút tiền",
            "you_can_withdraw_the_tokens_after_the_cancellation_is_approved_by_the_bridge_trolls._the_cancellation_is_subjected_to_a_cancellation_fee": "Bạn có thể rút token sau khi việc hủy được duyệt bởi các bridge troll. Việc hủy sẽ phải chịu một khoản phí hủy là <span class=\"highlight-text\">{{fee}}%</span>.",
            "the_token_will_be_returned_to_your_wallet_after_withdrawal": "Token sẽ được trả lại ví của bạn sau khi rút tiền.",
            "the_request_must_be_submitted_from_the_destination_chain,_please_switch_your_network_as_instructed": "Yêu cầu phải được gửi từ chuỗi đích, vui lòng chuyển mạng của bạn theo hướng dẫn.",
            "the_request_must_be_submitted_from_the_source_chain,_please_switch_your_network_as_instructed": "Yêu cầu phải được gửi từ chuỗi nguồn, vui lòng chuyển mạng của bạn theo hướng dẫn.",
            "amend_order": "Sửa đổi lệnh",
            "minimum_receive": "Nhận tối thiểu",
            "the_address_has_been_copied": "Địa chỉ đã được sao chép",
            "loading": "Đang tải...",
            "withdraw_amount": "Số tiền rút",
            "switch_network": "Chuyển mạng",
            "token_receive": "Token nhận được",
            "expected_receive": "Dự kiến nhận",
            "confirm": "Xác nhận",
            "token_swap": "Hoán đổi Token",
            "from": "Từ",
            "to": "Đến",
            "status": "Trạng thái",
        }
    };
});
define("@scom/scom-xchain-widget/languages/expertMode.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-xchain-widget/languages/expertMode.json.ts'/> 
    exports.default = {
        "en": {
            "expert_mode_allows_high_slippage_trades_that_often_result_in_bad_rates_and_lost_funds": "Expert mode allows high slippage trades that often result in bad rates and lost funds.",
            "only_use_this_mode_if_you_know_what_you_are_doing": "Only use this mode if you know what you are doing.",
            "turn_on_expert_mode": "Turn On Expert Mode"
        },
        "zh-hant": {},
        "vi": {
            "expert_mode_allows_high_slippage_trades_that_often_result_in_bad_rates_and_lost_funds": "Chế độ chuyên gia cho phép giao dịch với độ trượt giá cao, thường dẫn đến tỷ giá không tốt và mất tiền.",
            "only_use_this_mode_if_you_know_what_you_are_doing": "Chỉ sử dụng chế độ này nếu bạn biết rõ mình đang làm gì.",
            "turn_on_expert_mode": "Bật chế độ chuyên gia"
        }
    };
});
define("@scom/scom-xchain-widget/languages/priceInfo.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-xchain-widget/languages/priceInfo.json.ts'/> 
    exports.default = {
        "en": {
            "price_info": "Price Info",
            "click_to_view_details": "Click to view details",
            "transaction_fee": "Transaction Fee",
            "estimated_time": "Estimated Time",
            "30_seconds": "30 seconds",
        },
        "zh-hant": {
            "click_to_view_details": "點擊查看詳情",
            "transaction_fee": "交易費用",
            "estimated_time": "預計時間",
            "30_seconds": "30秒",
        },
        "vi": {
            "price_info": "Thông tin giá",
            "click_to_view_details": "Nhấp để xem chi tiết",
            "transaction_fee": "Phí giao dịch",
            "estimated_time": "Thời gian ước tính",
            "30_seconds": "30 giây",
        }
    };
});
define("@scom/scom-xchain-widget/languages/transactions.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-xchain-widget/languages/transactions.json.ts'/> 
    exports.default = {
        "en": {
            "transaction_settings": "Transaction Settings",
            "please_enter_a_valid_transaction_deadline": "Please enter a valid transaction deadline",
            "please_enter_a_valid_slippage_percentage": "Please enter a valid slippage percentage",
            "your_transaction_may_fail": "Your transaction may fail",
            "your_transaction_may_be_frontrun": "Your transaction may be frontrun",
            "toggle_expert_mode": "Toggle Expert Mode",
            "your_transaction_will_revert_if_the_price_changes_unfavorably_by_more_than_this_percentage": "Your transaction will revert if the price changes unfavorably by more than this percentage.",
            "slippage_tolerance": "Slippage Tolerance",
            "cross_chain_transaction_deadline": "Cross chain transaction deadline",
            "your_transaction_will_revert_if_it_is_pending_for_more_than_this_long": "Your transaction will revert if it is pending for more than this long.",
            "off": "Off",
            "on": "On",
            "hours": "hours"
        },
        "zh-hant": {},
        "vi": {
            "transaction_settings": "Cài đặt giao dịch",
            "please_enter_a_valid_transaction_deadline": "Vui lòng nhập thời hạn giao dịch hợp lệ",
            "please_enter_a_valid_slippage_percentage": "Vui lòng nhập tỷ lệ trượt giá hợp lệ",
            "your_transaction_may_fail": "Giao dịch của bạn có thể thất bại",
            "your_transaction_may_be_frontrun": "Giao dịch của bạn có thể bị chạy trước",
            "toggle_expert_mode": "Chuyển đổi chế độ chuyên gia",
            "your_transaction_will_revert_if_the_price_changes_unfavorably_by_more_than_this_percentage": "Giao dịch của bạn sẽ bị hoàn lại nếu giá thay đổi bất lợi quá mức tỷ lệ này.",
            "slippage_tolerance": "Độ trượt giá cho phép",
            "cross_chain_transaction_deadline": "Thời hạn giao dịch chuỗi chéo",
            "your_transaction_will_revert_if_it_is_pending_for_more_than_this_long": "Giao dịch của bạn sẽ bị hoàn lại nếu chờ quá thời gian này.",
            "off": "Tắt",
            "on": "Bật",
            "hours": "giờ"
        }
    };
});
define("@scom/scom-xchain-widget/languages/index.ts", ["require", "exports", "@scom/scom-xchain-widget/languages/main.json.ts", "@scom/scom-xchain-widget/languages/bridgeRecord.json.ts", "@scom/scom-xchain-widget/languages/expertMode.json.ts", "@scom/scom-xchain-widget/languages/priceInfo.json.ts", "@scom/scom-xchain-widget/languages/transactions.json.ts"], function (require, exports, main_json_1, bridgeRecord_json_1, expertMode_json_1, priceInfo_json_1, transactions_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transactionsJson = exports.priceInfoJson = exports.expertModeJson = exports.bridgeRecordJson = exports.mainJson = void 0;
    exports.mainJson = main_json_1.default;
    exports.bridgeRecordJson = bridgeRecord_json_1.default;
    exports.expertModeJson = expertMode_json_1.default;
    exports.priceInfoJson = priceInfo_json_1.default;
    exports.transactionsJson = transactions_json_1.default;
});
define("@scom/scom-xchain-widget/price-info/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-xchain-widget/assets.ts", "@scom/scom-xchain-widget/languages/index.ts", "@scom/scom-xchain-widget/price-info/index.css.ts"], function (require, exports, components_5, assets_1, index_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PriceInfo = void 0;
    ;
    let PriceInfo = class PriceInfo extends components_5.Module {
        constructor(parent, options) {
            super(parent, options);
            this.renderItems = async () => {
                if (this.Items.length && this.priceContent?.children?.length === this.Items.length) {
                    this.updateItems();
                    return;
                }
                this.priceContent.innerHTML = '';
                for (let i = 0; i < this.Items.length; i++) {
                    const item = this.Items[i];
                    const row = new components_5.HStack(undefined, {
                        gap: 2,
                        wrap: 'wrap',
                        verticalAlignment: 'center',
                        horizontalAlignment: 'space-between',
                        padding: { top: '0.25rem', bottom: '0.25rem', left: 0, right: 0 }
                    });
                    if (item.isHidden) {
                        row.classList.add('hidden');
                    }
                    const titleLabel = new components_5.Label(row, { caption: item.title });
                    row.appendChild(titleLabel);
                    if (item.tooltip) {
                        const iconTooltip = this.renderIconTooltip(row, item);
                        row.appendChild(await iconTooltip);
                    }
                    const hStack = new components_5.HStack(row, {
                        verticalAlignment: 'center',
                        margin: { left: 'auto' }
                    });
                    if (item.width) {
                        hStack.width = item.width;
                    }
                    const valueLabel = new components_5.Label(hStack, { caption: item.value });
                    valueLabel.classList.add('ml-auto', 'text-right');
                    if (item.isToggleShown) {
                        this.onRenderToggleBtn(hStack);
                    }
                    this.priceContent.appendChild(row);
                }
            };
            this.onRenderToggleBtn = (parent) => {
                const image = new components_5.Image(parent, {
                    width: 24,
                    height: 24,
                    url: assets_1.default.fullPath("img/swap/icon-swap.png"),
                    margin: { left: 5 },
                    display: 'flex'
                });
                image.classList.add("rounded-icon");
                image.style.transform = "rotate(90deg)";
                image.onClick = (source, event) => {
                    event.stopPropagation();
                    if (this.onTogglePrice)
                        this.onTogglePrice(this);
                };
                return image;
            };
            this.renderIconTooltip = async (parent, item) => {
                const iconTooltip = await components_5.Icon.create();
                iconTooltip.classList.add('icon-tooltip');
                iconTooltip.name = 'question-circle';
                iconTooltip.width = 15;
                iconTooltip.height = 15;
                iconTooltip.fill = '#fff';
                if (item.onClick) {
                    iconTooltip.cursor = 'pointer';
                    iconTooltip.tooltip.content = '$click_to_view_details';
                    iconTooltip.tooltip.placement = 'right';
                    iconTooltip.tooltip.maxWidth = '270px';
                    iconTooltip.onClick = item.onClick;
                }
                else {
                    iconTooltip.tooltip.content = item.tooltip;
                    iconTooltip.tooltip.placement = 'right';
                    iconTooltip.tooltip.maxWidth = '270px';
                }
                return iconTooltip;
            };
            this.updateItems = async () => {
                for (let i = 0; i < this.Items.length; i++) {
                    const item = this.Items[i];
                    const row = this.priceContent.children[i];
                    const iconTooltip = row.querySelector('.icon-tooltip');
                    const titleLabel = row.firstChild;
                    const hStack = row.children[iconTooltip ? 2 : 1];
                    const valueLabel = hStack.firstChild;
                    if (titleLabel?.caption && item.title != titleLabel.caption) {
                        titleLabel.caption = item.title;
                    }
                    if (valueLabel?.caption && item.value != valueLabel.caption) {
                        valueLabel.caption = item.value;
                    }
                    if (iconTooltip) {
                        row.removeChild(iconTooltip);
                    }
                    if (item.tooltip) {
                        const _iconTooltip = this.renderIconTooltip(row, item);
                        row.insertBefore(await _iconTooltip, row.children[1]);
                    }
                    if (item.isToggleShown && hStack.children.length <= 1) {
                        this.onRenderToggleBtn(hStack);
                    }
                    else if (!item.isToggleShown && hStack.children.length > 1 && !item.tooltip) {
                        hStack.removeChild(hStack.children[1]);
                    }
                    setTimeout(function () {
                        const iconTooltips = row.querySelectorAll(".icon-tooltip");
                        if (iconTooltips && iconTooltips.length > 1) {
                            row.removeChild(iconTooltips[1]);
                        }
                    }, 2000);
                }
            };
        }
        get Items() {
            return this._items;
        }
        set Items(value) {
            this._items = value;
            this.renderItems();
        }
        init() {
            this.i18n.init({ ...index_8.priceInfoJson });
            super.init();
        }
        render() {
            return (this.$render("i-panel", { class: "price-info", width: "auto" },
                this.$render("i-label", { class: "header", caption: "$price_info", padding: { bottom: '0.5rem' }, font: { size: '1.125rem' } }),
                this.$render("i-panel", { id: "priceContent" })));
        }
    };
    PriceInfo = __decorate([
        (0, components_5.customElements)('price-info')
    ], PriceInfo);
    exports.PriceInfo = PriceInfo;
});
define("@scom/scom-xchain-widget/expert-mode-settings/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_6.Styles.Theme.ThemeVars;
    exports.default = components_6.Styles.style({
        textAlign: 'center',
        $nest: {
            '.modal': {
                borderRadius: '1rem',
                padding: '1rem',
                width: 327
            },
            '.i-modal_header': {
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: `2px solid ${Theme.background.default}`,
                $nest: {
                    '&> span': {
                        margin: 'auto',
                        padding: '0 2rem',
                        color: Theme.colors.primary.main,
                        fontWeight: 700,
                    }
                }
            },
            '.i-modal-close': {
                fill: `${Theme.colors.primary.main} !important`,
            },
            '.expert-content': {
                fontWeight: 'bold',
                $nest: {
                    '.warning-box': {
                        padding: '0.75rem 1rem',
                        marginBottom: '1.25rem',
                        background: 'linear-gradient(90deg,#df5869 -19.25%,#bc4c7b 116.5%)',
                        border: `1px solid ${Theme.colors.primary.main}`,
                        borderRadius: '0.5rem',
                    },
                    '.warning-box i-label *': {
                        color: Theme.text.primary,
                        fontSize: '1rem',
                    },
                    'i-label.warning-text *': {
                        color: Theme.colors.secondary.main,
                        fontSize: '1.05rem',
                    },
                    'i-button': {
                        padding: '0.75rem',
                        margin: '1.25rem 0 0.5rem',
                        background: 'transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box',
                    }
                }
            }
        }
    });
});
define("@scom/scom-xchain-widget/expert-mode-settings/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-xchain-widget/expert-mode-settings/index.css.ts", "@scom/scom-xchain-widget/languages/index.ts"], function (require, exports, components_7, index_css_1, index_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExpertModeSettings = void 0;
    ;
    let ExpertModeSettings = class ExpertModeSettings extends components_7.Module {
        constructor(state, parent, options) {
            super(parent, options);
            this.state = state;
            this.$eventBus = components_7.application.EventBus;
        }
        ;
        async init() {
            this.i18n.init({ ...index_9.expertModeJson });
            this.classList.add(index_css_1.default);
            super.init();
            this.onToggle = this.onToggle.bind(this);
        }
        closeModal() {
            this.expertModal.visible = false;
        }
        showModal() {
            this.expertModal.visible = true;
        }
        onToggle() {
            this.state.toggleExpertMode();
            this.closeModal();
            this.$eventBus.dispatch("expertModeChanged" /* EventId.ExpertModeChanged */);
        }
        render() {
            return (this.$render("i-modal", { id: "expertModal", class: 'dark-modal', title: "Expert Mode", closeIcon: { name: 'times' } },
                this.$render("i-panel", { class: "expert-content" },
                    this.$render("i-panel", { class: "warning-box" },
                        this.$render("i-label", { caption: "$expert_mode_allows_high_slippage_trades_that_often_result_in_bad_rates_and_lost_funds" })),
                    this.$render("i-label", { class: "warning-text", caption: "$only_use_this_mode_if_you_know_what_you_are_doing" }),
                    this.$render("i-button", { width: "100%", height: "auto", caption: "$turn_on_expert_mode", onClick: this.onToggle }))));
        }
    };
    ExpertModeSettings = __decorate([
        components_7.customModule,
        (0, components_7.customElements)('xchain-expert-mode-settings')
    ], ExpertModeSettings);
    exports.ExpertModeSettings = ExpertModeSettings;
    ;
});
///<amd-module name='@scom/scom-xchain-widget/transaction-settings-layout/index.css.ts'/> 
define("@scom/scom-xchain-widget/transaction-settings-layout/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_8.Styles.Theme.ThemeVars;
    exports.default = components_8.Styles.style({
        textAlign: 'center',
        $nest: {
            '.settings-content i-icon': {
                marginLeft: '4px'
            },
            '#slippageGroup': {
                marginTop: '0.75rem',
                gap: 12,
                $nest: {
                    '.transaction-input > input': {
                        paddingRight: '1.35rem',
                        textAlign: 'right',
                    }
                }
            },
            '.pill-slippage': {
                background: Theme.input.background,
                lineHeight: '2.25rem',
                borderRadius: '0.75rem',
                border: '2px solid transparent',
                $nest: {
                    '&:not(.disabled):hover': {
                        borderColor: '#a7a9ac',
                        background: Theme.background.default
                    },
                }
            },
            'i-label *': {
                fontSize: '1rem'
            },
            '.trans-title': {
                marginTop: '1.5rem',
                marginBottom: '0.5rem'
            },
            '.slippage-input__warning': {
                position: 'absolute',
                top: 'calc(50% - 1px)',
                left: '10px',
                transform: 'translateY(-50%)'
            },
            '.transaction-input': {
                position: 'relative',
                minWidth: '5rem',
                maxWidth: '5.5rem',
                width: '100%',
                background: Theme.input.background,
                borderRadius: '0.75rem',
                $nest: {
                    '&> input': {
                        width: 'inherit',
                        background: 'transparent',
                        border: '2px solid transparent',
                        borderRadius: '0.75rem',
                        color: '#fff',
                        textAlign: 'center',
                        padding: 0
                    },
                    '&> i-label': {
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '8px',
                    }
                }
            },
            '.transaction-input__error input': {
                color: Theme.colors.error.main,
                borderColor: Theme.colors.error.main,
            },
            '.transaction-input__error input:focus': {
                borderColor: `${Theme.colors.error.main} !important`
            },
            '.transaction-input input:hover, .transaction-input input:focus': {
                borderColor: '#a7a9ac'
            },
            '.pill-slippage.active, .transaction-input.active>input': {
                borderColor: `${Theme.colors.info.main} !important`
            },
            '.slippage-message': {
                paddingTop: '7px',
                $nest: {
                    '*': {
                        color: Theme.colors.primary.dark,
                        fontSize: '14px',
                    }
                }
            },
            'i-switch': {
                $nest: {
                    '.wrapper': {
                        display: 'flex',
                        position: 'relative',
                        width: '88.625px',
                        height: '40px',
                        borderRadius: '12px',
                        background: Theme.input.background,
                        outline: 'none',
                        padding: 0,
                    },
                    '.thumb': {
                        margin: '3px',
                        borderRadius: '50%',
                        background: 'linear-gradient(255deg,#f15e61,#b52082)',
                        color: '#565a69',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'all .3s ease-in-out',
                        width: '2rem',
                        height: '2rem',
                        padding: 0
                    },
                    '.switch-base.checked': {
                        transform: 'translateX(48px)',
                    },
                    '.track': {
                        color: Theme.text.primary,
                        $nest: {
                            "&::before, &::after": {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                top: 'auto',
                                transform: 'none',
                                fontSize: 'inherit',
                                color: Theme.text.primary,
                                opacity: '1 !important'
                            },
                            "&::before": {
                                width: '50%',
                                left: 'auto',
                            },
                            "&::after": {
                                right: 0,
                                left: '50%',
                            }
                        }
                    }
                }
            },
        }
    });
});
define("@scom/scom-xchain-widget/transaction-settings-layout/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-xchain-widget/transaction-settings-layout/index.css.ts", "@scom/scom-xchain-widget/languages/index.ts"], function (require, exports, components_9, index_css_2, index_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionSettingsLayout = void 0;
    const Theme = components_9.Styles.Theme.ThemeVars;
    ;
    const listSlippage = [0.1, 0.5, 1];
    let TransactionSettingsLayout = class TransactionSettingsLayout extends components_9.Module {
        constructor(state, parent, options) {
            super(parent, options);
            this.onActiveItem = (source) => {
                const activeItem = this.slippageGroup.querySelector('.active');
                if (activeItem) {
                    if (source.isSameNode(activeItem))
                        return;
                    activeItem.classList.remove('active');
                }
                source.classList.add('active');
            };
            this.onSelectSlippage = (source, val) => {
                this.inputSlippageTolerance(source, val);
                if (listSlippage.includes(val)) {
                    this.slippageInput.value = '';
                }
            };
            this.inputSlippageTolerance = (source, val) => {
                if (val) {
                    const value = Number(+val);
                    const hasWarningIcon = this.slippageInput.contains(this.warningIcon);
                    if (!source.isSameNode(this.slippageInput)) {
                        this.slippageInput.value = value;
                    }
                    this.slippageInput.placeholder = isNaN(value) ? '0.00' : value.toFixed(2);
                    if (value < 50) {
                        this.state.setSlippageTolerance(value);
                        this.$eventBus.dispatch("slippageToleranceChanged" /* EventId.SlippageToleranceChanged */);
                        this.setSlippageToleranceMessage();
                        this.slippageInput.classList.remove('transaction-input__error');
                        if (value > 5) {
                            if (!hasWarningIcon)
                                this.slippageInput.prepend(this.warningIcon);
                        }
                        else if (hasWarningIcon)
                            this.slippageInput.removeChild(this.warningIcon);
                    }
                    else {
                        this.slippageToleranceMessage = '$please_enter_a_valid_slippage_percentage';
                        this.slippageInput.classList.add('transaction-input__error');
                        if (hasWarningIcon)
                            this.slippageInput.removeChild(this.warningIcon);
                    }
                }
                const index = listSlippage.concat().reverse().indexOf(Number(+val));
                if (index >= 0 && source.isSameNode(this.slippageInput)) {
                    const buttons = this.slippageGroup.querySelectorAll('i-button.pill-slippage');
                    this.onActiveItem(buttons[index]);
                }
                else {
                    this.onActiveItem(source);
                }
            };
            this.blurSlippageTolerance = (source) => {
                const val = source.value;
                if (val && val >= 50) {
                    this.inputSlippageTolerance(source, 0.5);
                }
                else if (!this.slippageInput.value) {
                    this.inputSlippageTolerance(source, this.state.getSlippageTolerance());
                }
            };
            this.setSlippageToleranceMessage = () => {
                const slippageTolerance = this.state.getSlippageTolerance();
                if (slippageTolerance < 0.5) {
                    return (this.slippageToleranceMessage = '$your_transaction_may_fail');
                }
                else if (slippageTolerance >= 0.5 && slippageTolerance <= 5) {
                    return (this.slippageToleranceMessage = '');
                }
                else if (slippageTolerance > 5 && slippageTolerance < 50) {
                    return (this.slippageToleranceMessage = '$your_transaction_may_be_frontrun');
                }
                else {
                    return (this.slippageToleranceMessage = '$please_enter_a_valid_slippage_percentage');
                }
            };
            this.inputCrossChainDeadline = (source, event) => {
                const val = source.value;
                this.state.setCrossChainTransactionDeadline(val * 60);
                const hasMessage = this.crossChainDeadlineGroup.contains(this.crossChainDeadlineMessage);
                if (val > 168) {
                    this.crossChainDeadlineInput.classList.add('transaction-input__error');
                    if (!hasMessage)
                        this.crossChainDeadlineGroup.appendChild(this.crossChainDeadlineMessage);
                }
                else {
                    this.crossChainDeadlineInput.classList.remove('transaction-input__error');
                    if (hasMessage)
                        this.crossChainDeadlineGroup.removeChild(this.crossChainDeadlineMessage);
                }
            };
            this.blurCrossChainTransactionDeadline = (source) => {
                const val = source.value;
                const newVal = val > 168 || val < 1 ? 72 : parseFloat(val);
                source.value = newVal;
                this.state.setCrossChainTransactionDeadline(newVal * 60);
                if (val > 168 && this.crossChainDeadlineGroup.contains(this.crossChainDeadlineMessage)) {
                    this.crossChainDeadlineGroup.removeChild(this.crossChainDeadlineMessage);
                }
                this.crossChainDeadlineInput.classList.remove('transaction-input__error');
            };
            this.handleProcessExpertMode = () => {
                if (this.state.isExpertMode) {
                    this.state.toggleExpertMode();
                    this.$eventBus.dispatch("expertModeChanged" /* EventId.ExpertModeChanged */);
                    return;
                }
                this.$eventBus.dispatch("showExpertModal" /* EventId.ShowExpertModal */);
            };
            this.state = state;
            this.$eventBus = components_9.application.EventBus;
            this.registerEvent();
        }
        ;
        get showSlippageOnly() {
            return this._showSlippageOnly;
        }
        set showSlippageOnly(value) {
            this._showSlippageOnly = value;
            if (value) {
                this.slippageRow.visible = false;
                this.crossChainDeadlineRow.visible = false;
                this.crossChainDeadlineInputRow.visible = false;
                this.switchBoxRow.visible = false;
            }
            else {
                this.slippageRow.visible = true;
                this.crossChainDeadlineRow.visible = this.showCrossChain;
                this.crossChainDeadlineInputRow.visible = this.showCrossChain;
                this.switchBoxRow.visible = true;
            }
        }
        get showCrossChain() {
            return this._showCrossChain;
        }
        set showCrossChain(value) {
            if (!this.crossChainDeadlineRow)
                return;
            this.crossChainDeadlineRow.visible = value && !this.showSlippageOnly;
            this.crossChainDeadlineInputRow.visible = value && !this.showSlippageOnly;
        }
        async init() {
            this.i18n.init({ ...index_10.transactionsJson });
            this.classList.add(index_css_2.default);
            super.init();
            this.switchBox.checked = this.state.isExpertMode;
            this.crossChainDeadlineRow.visible = this.showCrossChain && !this.showSlippageOnly;
            this.crossChainDeadlineInputRow.visible = this.showCrossChain && !this.showSlippageOnly;
            await this.onRenderSlippage();
            await this.onRenderWarningElm();
            this.setDefaultTransactionSettings();
        }
        registerEvent() {
            this.$eventBus.register(this, "expertModeChanged" /* EventId.ExpertModeChanged */, () => {
                if (this.switchBox)
                    this.switchBox.checked = this.state.isExpertMode;
            });
        }
        async onRenderSlippage() {
            listSlippage.map(async (value) => {
                const button = await components_9.Button.create({
                    height: 'auto',
                    width: '4rem',
                    caption: `${value}%`
                });
                button.classList.add('pill-slippage');
                button.onClick = (source) => this.onSelectSlippage(source, value);
                this.slippageGroup.prepend(button);
            });
            const label = await components_9.Label.create();
            label.caption = '%';
            this.slippageInput.appendChild(label);
        }
        async onRenderWarningElm() {
            this.crossChainDeadlineMessage = await components_9.Label.create();
            this.crossChainDeadlineMessage.caption = '$please_enter_a_valid_transaction_deadline';
            this.crossChainDeadlineMessage.classList.add('slippage-message');
            this.warningIcon = await components_9.Icon.create({
                name: 'exclamation-triangle',
                fill: Theme.colors.primary.dark,
                width: 15.75,
                height: 14,
            });
            this.warningIcon.classList.add('slippage-input__warning');
        }
        setDefaultTransactionSettings() {
            const slippageTolerance = this.state.getSlippageTolerance();
            const index = listSlippage.indexOf(slippageTolerance);
            if (index >= 0) {
                const buttons = this.slippageGroup.querySelectorAll('i-button.pill-slippage');
                this.onActiveItem(buttons[index]);
                this.slippageInput.value = '';
            }
            else {
                this.slippageInput.value = slippageTolerance;
                this.onActiveItem(this.slippageInput);
            }
            this.slippageInput.placeholder = slippageTolerance.toFixed(2);
            const crossChainTransactionDeadline = this.state.getCrossChainTransactionDeadline();
            this.crossChainDeadlineInput.value = crossChainTransactionDeadline / 60;
        }
        render() {
            return (this.$render("i-panel", { class: "settings-content" },
                this.$render("i-hstack", { id: "slippageRow", verticalAlignment: 'center' },
                    this.$render("i-label", { caption: "$slippage_tolerance" }),
                    this.$render("i-icon", { width: 16, height: 16, name: "question-circle", fill: "rgba(255,255,255,0.55)", tooltip: {
                            content: '$your_transaction_will_revert_if_the_price_changes_unfavorably_by_more_than_this_percentage'
                        } })),
                this.$render("i-hstack", { id: "slippageGroup", gap: "0.5rem" },
                    this.$render("i-input", { id: "slippageInput", height: 40, width: "100%", inputType: "number", class: 'transaction-input', onChanged: (source, event) => this.inputSlippageTolerance(source, source.value), onBlur: this.blurSlippageTolerance })),
                this.$render("i-hstack", null,
                    this.$render("i-label", { class: "slippage-message", caption: this.slippageToleranceMessage })),
                this.$render("i-hstack", { id: "crossChainDeadlineRow", visible: false, verticalAlignment: 'center', class: "trans-title" },
                    this.$render("i-label", { caption: "$cross_chain_transaction_deadline" }),
                    this.$render("i-icon", { width: 16, height: 16, name: "question-circle", fill: "rgba(255,255,255,0.55)", tooltip: {
                            content: '$your_transaction_will_revert_if_it_is_pending_for_more_than_this_long'
                        } })),
                this.$render("i-hstack", { id: "crossChainDeadlineInputRow", visible: false, verticalAlignment: 'center' },
                    this.$render("i-input", { id: "crossChainDeadlineInput", height: 40, width: "100%", class: "transaction-input", inputType: "number", onChanged: this.inputCrossChainDeadline, onBlur: this.blurCrossChainTransactionDeadline }),
                    this.$render("i-label", { class: "ml-1", caption: "$hours" }),
                    this.$render("i-hstack", { id: "crossChainDeadlineGroup" })),
                this.$render("i-hstack", { id: "switchBoxRow", visible: false, horizontalAlignment: 'space-between', verticalAlignment: 'center', class: "mt-1" },
                    this.$render("i-label", { class: "toggle-text", caption: "$toggle_expert_mode" }),
                    this.$render("i-switch", { id: "switchBox", checkedTrackColor: "transparent", uncheckedTrackColor: "transparent", checkedThumbText: "$off", uncheckedThumbText: "$on", checkedText: "$off", uncheckedText: "$on", checked: this.state?.isExpertMode, onClick: this.handleProcessExpertMode }))));
        }
    };
    __decorate([
        (0, components_9.observable)()
    ], TransactionSettingsLayout.prototype, "slippageToleranceMessage", void 0);
    TransactionSettingsLayout = __decorate([
        (0, components_9.customElements)('xchain-transaction-settings-layout')
    ], TransactionSettingsLayout);
    exports.TransactionSettingsLayout = TransactionSettingsLayout;
    ;
});
define("@scom/scom-xchain-widget/transaction-settings/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_10.Styles.Theme.ThemeVars;
    exports.default = components_10.Styles.style({
        textAlign: 'center',
        $nest: {
            '.modal': {
                borderRadius: '1rem',
                padding: '1rem',
                width: 405
            },
            '.i-modal_header': {
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${Theme.background.default}`,
                $nest: {
                    '&> span': {
                        paddingRight: '2rem',
                        color: Theme.colors.primary.main,
                        fontWeight: 700,
                    }
                }
            },
            '.i-modal-close': {
                fill: `${Theme.colors.primary.main} !important`,
            },
        }
    });
});
define("@scom/scom-xchain-widget/transaction-settings/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-xchain-widget/transaction-settings-layout/index.tsx", "@scom/scom-xchain-widget/transaction-settings/index.css.ts", "@scom/scom-xchain-widget/languages/index.ts"], function (require, exports, components_11, index_11, index_css_3, index_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TransactionSettings = void 0;
    ;
    let TransactionSettings = class TransactionSettings extends components_11.Module {
        get showCrossChain() {
            return this._showCrossChain;
        }
        set showCrossChain(value) {
            this._showCrossChain = value;
            if (this.transactionLayout) {
                this.transactionLayout.showCrossChain = value;
            }
        }
        constructor(state, parent, options) {
            super(parent, options);
            this.state = state;
        }
        async init() {
            this.i18n.init({ ...index_12.transactionsJson });
            this.classList.add(index_css_3.default);
            super.init();
            this.transactionLayout = new index_11.TransactionSettingsLayout(this.state);
            this.mainContent.appendChild(this.transactionLayout);
            this.transactionLayout.showCrossChain = this.showCrossChain;
        }
        closeModal() {
            this.transactionModal.visible = false;
        }
        showModal() {
            this.transactionModal.visible = true;
        }
        render() {
            return (this.$render("i-modal", { id: "transactionModal", class: 'dark-modal', title: "$transaction_settings", closeIcon: { name: 'times' } },
                this.$render("i-panel", { id: "mainContent" })));
        }
    };
    TransactionSettings = __decorate([
        components_11.customModule,
        (0, components_11.customElements)('xchain-transaction-settings')
    ], TransactionSettings);
    exports.TransactionSettings = TransactionSettings;
    ;
});
define("@scom/scom-xchain-widget/bridge-record/bridgeRecordColumn.ts", ["require", "exports", "@scom/scom-xchain-widget/global/index.ts", "@scom/scom-token-list", "@ijstech/components"], function (require, exports, index_13, scom_token_list_4, components_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.truncateAddress = exports.viewTransaction = exports.toTokenIcon = exports.bridgeRecordColumns = void 0;
    const Theme = components_12.Styles.Theme.ThemeVars;
    const truncateAddress = (address, length, separator) => {
        if (!address || address.length <= length)
            return address;
        separator = separator || '...';
        const sepLen = separator.length;
        const charsToShow = length - sepLen;
        const frontChars = Math.ceil(charsToShow / 2);
        const backChars = Math.floor(charsToShow / 2);
        return address.substr(0, frontChars) + separator + address.substr(address.length - backChars);
    };
    exports.truncateAddress = truncateAddress;
    const fromTokenIcon = (data) => {
        return scom_token_list_4.assets.tokenPath(data.fromToken, data.fromNetwork.chainId);
    };
    const toTokenIcon = (data) => {
        return scom_token_list_4.assets.tokenPath(data.toToken, data.toNetwork.chainId);
    };
    exports.toTokenIcon = toTokenIcon;
    const viewTransaction = (state, chainId, txHash) => {
        state.viewOnExplorerByTxHash(chainId, txHash);
    };
    exports.viewTransaction = viewTransaction;
    const getBridgeRecordColumns = () => {
        return [
            {
                title: 'ID',
                fieldName: 'orderId',
                onRenderCell: function (source, data, row) {
                    return `#${data}`;
                }
            },
            {
                title: '$token_swap',
                fieldName: 'token_swap',
                onRenderCell: function (source, data, row) {
                    return renderFromToToken(row);
                }
            },
            {
                title: '$from',
                fieldName: 'from',
                onRenderCell: function (source, data, row) {
                    return renderTokenFrom(row);
                }
            },
            {
                title: '$to',
                fieldName: 'to',
                onRenderCell: function (source, data, row) {
                    return renderTokenTo(row);
                }
            },
            {
                title: '$status',
                fieldName: 'status',
                onRenderCell: function (source, data, row) {
                    return renderStatus(row.status);
                }
            },
            {
                title: '',
                fieldName: '',
                type: 'actions',
                onRenderCell: async function (source, data, row) {
                    const { orderId, fromNetwork, toNetwork } = row;
                    const orderHash = `${orderId}-${fromNetwork.chainId}-${toNetwork.chainId}`;
                    const icon = await components_12.Icon.create();
                    icon.id = 'detail';
                    icon.name = 'ellipsis-v';
                    icon.fill = Theme.text.primary;
                    icon.width = '15px';
                    icon.height = '15px';
                    icon.setAttribute('order-hash', orderHash);
                    icon.style.float = 'right';
                    return icon;
                }
            },
        ];
    };
    const bridgeRecordColumns = getBridgeRecordColumns();
    exports.bridgeRecordColumns = bridgeRecordColumns;
    const renderFromToToken = (row, justify = 'start') => {
        // const date = moment(row.date).format(DefaultDateTimeFormat);
        const vstack = new components_12.VStack();
        const hstack = new components_12.HStack(vstack, {
            gap: '5px',
            verticalAlignment: 'center'
        });
        const fromLb = new components_12.Label(hstack, {
            caption: row.fromToken.symbol,
            font: { bold: true }
        });
        const to = new components_12.Label(hstack, {
            caption: 'to',
        });
        const toLb = new components_12.Label(hstack, {
            caption: row.toToken.symbol,
            font: { bold: true }
        });
        hstack.append(fromLb, to, toLb);
        // const dateLb = new Label(vstack, {
        //   caption: date,
        //   font: { size: '0.875rem', color: 'hsla(0, 0%, 100%, 0.55)' },
        //   margin: { right: '0.5rem' }
        // })
        // vstack.append(hstack, dateLb);
        return vstack;
    };
    const renderTokenFrom = (row) => {
        const wrapper = new components_12.HStack(undefined, {
            gap: 4,
            verticalAlignment: 'center'
        });
        new components_12.Image(wrapper, {
            url: fromTokenIcon(row),
            width: 20
        });
        new components_12.Label(wrapper, {
            caption: `${(0, index_13.formatNumber)(row.fromAmount)} ${row.fromToken.symbol}`,
        });
        return wrapper;
    };
    const renderTokenTo = (row) => {
        const wrapper = new components_12.Panel();
        const hstack = new components_12.HStack(wrapper, {
            gap: '4px',
            verticalAlignment: 'center'
        });
        new components_12.Image(hstack, {
            url: toTokenIcon(row),
            width: 20
        });
        new components_12.Label(hstack, {
            caption: `${(0, index_13.formatNumber)(row.toAmount)} ${row.toToken.symbol}`
        });
        new components_12.Label(wrapper, {
            caption: row.toNetwork.chainName,
            class: 'text-opacity'
        });
        return wrapper;
    };
    const renderStatus = (status) => {
        let color = status == 'Executed' ? "green" : "red";
        return new components_12.Label(new components_12.VStack(), {
            caption: status,
            class: color
        });
    };
});
define("@scom/scom-xchain-widget/bridge-record/bridgeRecord.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bridgeStyle = void 0;
    const Theme = components_13.Styles.Theme.ThemeVars;
    exports.bridgeStyle = components_13.Styles.style({
        width: '90%',
        margin: '0 auto',
        minHeight: 'calc(100vh - 14rem)',
        $nest: {
            '.modal': {
                width: '480px',
                borderRadius: '12px',
                padding: '20px',
                // transform: 'scale(1)',
            },
            '.btn-bridge, .btn-request': {
                padding: '5px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
            },
            '.btn-request': {
                marginBottom: '0.25rem',
                minWidth: '150px',
                paddingInline: '0.25rem',
                $nest: {
                    'i-icon': {
                        marginRight: 0,
                    },
                },
            },
            '.btn-cancel': {
                marginLeft: '0.5rem',
            },
            '.green > *': {
                color: 'green'
            },
            '.red > *': {
                color: 'red'
            },
            '.highlight-text': {
                color: Theme.colors.primary.dark,
            },
            '.row-table': {
                marginBottom: '15px'
            },
            '.question-icon, i-icon': {
                display: 'inline-block',
                cursor: 'pointer'
            },
            '.custom-ml': {
                marginLeft: '2.3rem'
            },
            '.red-color': {
                color: '#BD4F5A'
            },
            '.green-color': {
                color: '#77D394'
            },
            '.queue-wrap': {
                marginTop: '2.375rem'
            },
            '.queue-header': {
                display: 'flex',
                alignItems: 'center',
                width: '100%'
            },
            '#slippageGroup': {
                justifyContent: 'end',
            },
            '#btnToken': {
                cursor: 'default',
                $nest: {
                    '&:hover': {
                        boxShadow: 'none',
                    },
                    'i-icon': {
                        marginLeft: '0.25rem',
                    },
                },
            },
            '.group-filter': {
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: 'auto',
                marginTop: '.25rem',
            },
            '.btn-dropdown': {
                marginLeft: '.25rem',
                marginBlock: '.25rem',
                $nest: {
                    '> i-button': {
                        background: Theme.background.modal,
                        opacity: 0.9,
                        boxShadow: 'none',
                        border: 'none',
                        borderRadius: 0,
                        height: '2.5rem',
                        padding: '1rem 0.5rem',
                        justifyContent: 'space-between',
                        minWidth: '9.3rem',
                        $nest: {
                            '&:hover': {
                                background: `${Theme.background.modal} !important`,
                                opacity: 1
                            }
                        }
                    },
                    'i-modal': {
                        width: '100%'
                    },
                    '.modal': {
                        padding: '0.25rem 0',
                        marginTop: 0,
                        border: `2px solid ${Theme.action.focusBackground}`,
                        background: Theme.background.modal,
                        borderRadius: 4,
                        minWidth: 0,
                        maxHeight: '50vh',
                        overflow: 'auto',
                        $nest: {
                            '&::-webkit-scrollbar': {
                                width: '3px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '5px',
                            },
                            'i-button': {
                                display: 'block',
                                padding: '0.35rem 0.5rem',
                                background: Theme.background.modal,
                                borderRadius: '0',
                                border: 'none',
                                boxShadow: 'none',
                                fontSize: '0.875rem',
                                height: 'auto',
                                $nest: {
                                    '&:hover': {
                                        background: Theme.action.focusBackground,
                                    },
                                    'i-image': {
                                        display: 'flex',
                                        flexDirection: 'row-reverse',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                    },
                                    // 'img': {
                                    //   minWidth: '24px',
                                    //   height: '24px',
                                    //   marginRight: '0.25rem',
                                    //   width: 'auto'
                                    // },
                                },
                            },
                            'i-button:last-child': {
                                marginBottom: 0
                            }
                        }
                    },
                    '.caption': {
                        background: Theme.text.primary,
                    },
                    '.icon': {
                        // background: Theme.background.paper,
                        border: 'none',
                        borderRadius: 'inherit',
                        height: 'auto',
                        width: '18px',
                        paddingRight: '10px',
                    },
                    '.network-img': {
                        width: '24px',
                        minWidth: '24px',
                        height: '24px',
                        display: 'flex',
                        marginRight: '0.2rem',
                    },
                },
            },
            '.ml-auto': {
                marginLeft: 'auto',
            },
            '.text-grey *': {
                opacity: 0.75,
            },
            '.text-opacity *': {
                opacity: '0.75',
            },
            '.text-small *': {
                fontSize: '0.875rem',
            },
            '.custom-modal_header': {
                $nest: {
                    '.i-modal_header': {
                        display: 'none',
                    },
                    '.header': {
                        display: 'flex',
                        justifyContent: 'space-between',
                    },
                    '.header > i-label *': {
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: Theme.colors.primary.main,
                    },
                    '.header > i-icon': {
                        fill: Theme.colors.primary.main,
                    },
                    '#tokenSelectionModal .i-modal_header': {
                        display: 'flex',
                    },
                    '#tokenSelectionModal > div': {
                        overflow: 'hidden',
                        height: 'auto',
                    },
                },
            },
            '.col-50': {
                width: '50%',
            },
            '.custom-col': {
                width: '40%',
            },
            '.group-btn': {
                display: 'flex',
                alignItems: 'center',
            },
            '.custom-token-input': {
                $nest: {
                    '#gridTokenInput': {
                        background: 'transparent'
                    },
                    'i-button.disabled': {
                        opacity: 1,
                        $nest: {
                            'i-label': {
                                color: Theme.colors.primary.dark,
                                fontWeight: 'bold'
                            }
                        }
                    }
                }
            },
            '#bridgeRecordTable': {
                background: Theme.background.modal,
                $nest: {
                    '&.os-table table': {
                        minWidth: '100%',
                        $nest: {
                            '.i-table-cell': {
                                borderRight: 'none',
                                borderTop: `1px solid ${Theme.divider}`
                            },
                            'thead th': {
                                fontWeight: 'bold',
                                padding: '1rem',
                                textTransform: 'capitalize'
                            },
                            '.i-table-header > tr > th': {
                                border: 'none',
                                borderBottom: `1px solid ${Theme.divider}`,
                                background: Theme.background.modal
                            },
                            '.i-table-body .i-table-cell': {
                                padding: '1rem 0.5rem',
                                border: 'none',
                                borderTop: '1px solid #ffffff8c',
                                verticalAlign: 'inherit'
                            },
                            '.i-table-body .is--expanded td': {
                                background: Theme.action.focusBackground
                            },
                            '.i-table-body .i-table-row--child > td': {
                                background: Theme.action.focusBackground,
                                paddingTop: '1rem',
                                border: 'none'
                            },
                        },
                    },
                    '.expanded-item': {
                        paddingInline: '1rem',
                    }
                },
            },
            '.record-pagination': {
                justifyContent: 'flex-end'
            },
            'i-pagination': {
                $nest: {
                    '.pagination-main': {
                        display: 'flex',
                        flexWrap: 'wrap',
                    },
                    '.paginate_button': {
                        backgroundColor: 'rgb(12, 18, 52)',
                        border: `1px solid ${Theme.colors.primary.main}`,
                        color: Theme.text.third,
                        padding: '4px 16px',
                        $nest: {
                            '&.active': {
                                backgroundColor: '#d05271',
                                border: '1px solid #d05271',
                                color: '#fff',
                            }
                        }
                    }
                }
            },
            '#mobilePanel': {
                marginInline: 'auto',
            },
            '#bridgeRecordMobile': {
                width: '420px',
                maxWidth: '100%',
                marginInline: 'auto',
            },
            '.bg-item': {
                background: Theme.background.modal,
                marginBottom: '1rem',
                padding: '1rem',
                position: 'relative',
                width: '100%',
            },
            '.row-status': {
                position: 'absolute',
                top: '3.75rem',
                right: '1.25rem',
            },
            '.row-item': {
                marginBottom: '0.5rem',
            },
            '.expanded-item-mobile': {
                $nest: {
                    '&.expanded-item': {
                        flexDirection: 'column',
                        display: 'flex',
                        marginTop: '1rem',
                        $nest: {
                            '.col-50': {
                                width: '100% !important',
                            },
                            '.custom-col': {
                                maxWidth: '60%',
                                width: '10rem',
                            },
                        },
                    },
                    '.row-table': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '.group-btn': {
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    },
                    '.group-btn .btn-request': {
                        marginInline: '0.25rem',
                    },
                    '.btn-cancel': {
                        marginLeft: 0,
                    },
                }
            },
            '.pagination-mobile': {
                $nest: {
                    '&.record-pagination': {
                        justifyContent: 'center'
                    },
                    'i-pagination': {
                        $nest: {
                            '.paginate_button': {
                                $nest: {
                                    '&.previous, &.next': {
                                        display: 'none',
                                    },
                                },
                            },
                        },
                    },
                }
            }
        }
    });
});
define("@scom/scom-xchain-widget/bridge-record/bridgeRecordAPI.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-xchain-widget/crosschain-utils/index.ts", "@scom/scom-xchain-widget/store/index.ts", "@scom/oswap-cross-chain-bridge-contract"], function (require, exports, eth_wallet_6, index_14, index_15, oswap_cross_chain_bridge_contract_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requestAmendOrder = exports.withdrawUnexecutedOrder = exports.requestCancelOrder = exports.getAllUserOrders = void 0;
    // Bridge Record - Read
    const getVaultOrderStatusLabel = (status) => {
        let label = '';
        switch (status) {
            case index_15.VaultOrderStatus.Pending:
                label = 'Pending';
                break;
            case index_15.VaultOrderStatus.RequestCancel:
                label = 'Cancel Requested';
                break;
            case index_15.VaultOrderStatus.Cancelled:
                label = 'Canceled';
                break;
            case index_15.VaultOrderStatus.RefundApproved:
                label = 'Cancel Approved';
                break;
            case index_15.VaultOrderStatus.Executed:
                label = 'Executed';
                break;
            case index_15.VaultOrderStatus.Expired:
                label = 'Expired';
                break;
        }
        return label;
    };
    const getAllUserOrders = async (state) => {
        let vgs = await (0, index_14.getVaultGroupsUpdateOrders)(state, true);
        let orders = [];
        vgs.forEach(vg => {
            (0, index_15.forEachNumberIndex)(vg.vaults, vault => {
                orders = orders.concat(vault.userOrders);
            });
        });
        const networkList = state.networkMap;
        const decodeOrderData = (order) => {
            let fromNetwork = networkList[order.fromChain];
            let toNetwork = networkList[order.toChain];
            let vg = (0, index_15.findConstantVaultGroupByToken)(order.toChain, order.toToken.address);
            if (!vg)
                return null;
            let fromVault = vg.vaults[order.fromChain];
            let toVault = vg.vaults[order.toChain];
            if (!fromVault || !toVault)
                return null;
            let fromVaultAddress = fromVault.vaultAddress;
            let fromToken = order.fromToken;
            let fromAmount = new eth_wallet_6.BigNumber(order.fromAmount).shiftedBy(-fromToken.decimals).toFixed();
            let toToken = order.toToken;
            let minOutAmount = new eth_wallet_6.BigNumber(order.toAmountMin).shiftedBy(-toToken.decimals).toFixed();
            let toAmount = minOutAmount; //TODO #xchain order check find a way to grab the real toAmount.
            //sourceVaultToken must be fromToken. targetVaultAsset must be toToken.
            //let sourceVaultToken = findConstantTokenByVault(order.chainId, address);
            //let targetVaultAsset = vaultTokenMap[order.targetChainId][order.targetVaultAddress.toLowerCase()] || "";
            let price = new eth_wallet_6.BigNumber(minOutAmount).div(fromAmount).toFixed();
            let protocolFee = new eth_wallet_6.BigNumber(fromAmount).times(order.protocolFee).dp(0, eth_wallet_6.BigNumber.ROUND_DOWN);
            let statusCode = order.status;
            //TODO #xchain order check
            //if (order.swapTxId) statusCode = VaultOrderStatus.Executed
            if (order.status == index_15.VaultOrderStatus.Pending && new Date().getTime() > order.expire.shiftedBy(3).toNumber())
                statusCode = index_15.VaultOrderStatus.Expired;
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
                sourceVaultInAmount: minOutAmount,
                statusCode,
                status: getVaultOrderStatusLabel(statusCode),
                sender: order.toOwner, //FIXME find sender
                //newOrderTxId: order.newOrderTxId,
                //swapTxId: order.swapTxId,
                //withdrawTxId: order.withdrawTxId,
                //amendTxId: order.amendTxId
            };
        };
        let decodedOrders = orders.map(order => decodeOrderData(order)).filter(v => !!v);
        return {
            orders: decodedOrders,
            total: decodedOrders.length
        };
    };
    exports.getAllUserOrders = getAllUserOrders;
    const requestCancelOrder = async (params) => {
        let { vaultAddress, sourceChainId, orderId } = params;
        const wallet = eth_wallet_6.Wallet.getClientInstance();
        let vaultContract = new oswap_cross_chain_bridge_contract_2.Contracts.OSWAP_BridgeVault(wallet, vaultAddress);
        let receipt = vaultContract.requestCancelOrder({ sourceChainId, orderId });
        return receipt;
    };
    exports.requestCancelOrder = requestCancelOrder;
    const withdrawUnexecutedOrder = async (params) => {
        let { vaultAddress, orderId } = params;
        const wallet = eth_wallet_6.Wallet.getClientInstance();
        let vaultContract = new oswap_cross_chain_bridge_contract_2.Contracts.OSWAP_BridgeVault(wallet, vaultAddress);
        let receipt = vaultContract.withdrawUnexecutedOrder(orderId);
        return receipt;
    };
    exports.withdrawUnexecutedOrder = withdrawUnexecutedOrder;
    const requestAmendOrder = async (state, params, callbackFn) => {
        try {
            let { vaultAddress, orderId, tokenOut, minAmountOut } = params;
            const wallet = eth_wallet_6.Wallet.getClientInstance();
            let vaultContract = new oswap_cross_chain_bridge_contract_2.Contracts.OSWAP_BridgeVault(wallet, vaultAddress);
            let order = await vaultContract.orders(orderId);
            let minAmountOutTokenAmount = eth_wallet_6.Utils.toDecimals(minAmountOut, tokenOut.decimals);
            if (tokenOut.isNative) {
                tokenOut.address = index_15.nullAddress;
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
            };
            let receipt = await vaultContract.requestAmendOrder({ orderId, order: editOrder });
            return receipt;
        }
        catch (error) {
            if (callbackFn) {
                callbackFn(error);
            }
            return false;
        }
    };
    exports.requestAmendOrder = requestAmendOrder;
});
define("@scom/scom-xchain-widget/bridge-record/index.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-xchain-widget/bridge-record/bridgeRecordColumn.ts", "@scom/scom-xchain-widget/assets.ts", "@scom/scom-token-list", "@scom/scom-xchain-widget/bridge-record/bridgeRecord.css.ts", "@scom/scom-xchain-widget/bridge-record/bridgeRecordAPI.ts", "@scom/scom-xchain-widget/global/index.ts", "@scom/scom-xchain-widget/store/index.ts", "@scom/scom-xchain-widget/crosschain-utils/index.ts", "@ijstech/eth-wallet", "@scom/scom-xchain-widget/languages/index.ts"], function (require, exports, components_14, bridgeRecordColumn_1, assets_2, scom_token_list_5, bridgeRecord_css_1, bridgeRecordAPI_1, index_16, index_17, index_18, eth_wallet_7, index_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BridgeRecord = void 0;
    const Theme = components_14.Styles.Theme.ThemeVars;
    const pageSize = 5;
    ;
    let BridgeRecord = class BridgeRecord extends components_14.Module {
        constructor(state, parent, options) {
            super(parent, options);
            this._lastUpdated = 0;
            this.lastUpdatedText = '$data_last_updated_0_seconds_ago';
            this.paging = {
                position: 'bottomRight',
                pageSize,
                currentPage: 1
            };
            this.isPageKept = false;
            this.filter = {};
            this.orders = [];
            this.itemStart = 0;
            this.itemEnd = pageSize;
            this.clientEvents = [];
            this.onChainChange = async () => {
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
            };
            this.onWalletConnect = async () => {
                this.renderFilterButton();
                this.refreshData();
            };
            this.onUpdateReceiveVal = () => {
                this.updateReceiveVal();
            };
            this.getFilteredData = () => {
                return this.dataListFiltered.slice(this.itemStart, this.itemEnd);
            };
            this.onSelectIndex = () => {
                this.removeCurrentValues();
                this.itemStart = (this.listPagination.currentPage - 1) * pageSize;
                this.itemEnd = this.itemStart + pageSize;
                this.paging.currentPage = this.listPagination.currentPage;
                this.renderRecords();
            };
            this.refreshData = async () => {
                const currentChainId = this.state.getChainId();
                const isConnected = (0, index_17.isWalletConnected)();
                const { chainId, connected, loading } = this.initializedState;
                if (chainId === currentChainId && connected === isConnected && loading === true)
                    return;
                this.initializedState = {
                    chainId: currentChainId,
                    connected: isConnected,
                    loading: true
                };
                await this.refreshUI(isConnected);
                this.initializedState.loading = false;
            };
            this.refreshUI = async (connected) => {
                this.isPageKept = false;
                this.paging.currentPage = 1;
                this.sortByDate = "Latest" /* DateOptions.LATEST */;
                this.sortDateBtn.caption = '$latest_swap';
                this.filter = {};
                this.oldSource = Object.assign({}, this.sourceChain);
                this.oldDestination = Object.assign({}, this.destinationChain);
                this.iconRefresh.enabled = false;
                if (connected) {
                    this.emptyMsg.caption = '$no_data';
                    try {
                        await this.generateData();
                    }
                    catch (err) {
                        this.resetData();
                    }
                }
                else {
                    this.resetData();
                    this.emptyMsg.caption = '$please_connect_with_your_wallet';
                }
                this.iconRefresh.enabled = true;
                this.lastUpdated = 0;
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.lastUpdated++;
                }, 1000);
            };
            this.onChangeSorting = async (value) => {
                this.sortDateModal.visible = false;
                if (this.sortByDate === value)
                    return;
                this.sortByDate = value;
                this.sortDateBtn.caption = value === "Latest" /* DateOptions.LATEST */ ? '$latest_swap' : '$oldest_swap';
                await this.updateRecords();
            };
            this.onChangeSource = async (network) => {
                if (network && network.chainId == this.sourceChain?.chainId)
                    return;
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
                            this.searchDestinationBtn.prepend(this.$render("i-image", { class: "network-img", url: _url }));
                        }
                        else {
                            this.searchDestinationBtn.caption = '$destination_chain';
                        }
                    }
                    this.sourceChain = network;
                    this.searchSourceBtn.caption = network.chainName;
                    const url = network.url;
                    this.searchSourceBtn.prepend(this.$render("i-image", { class: "network-img", url: url }));
                }
                else {
                    this.sourceChain = null;
                    this.searchSourceBtn.caption = '$source_chain';
                }
                this.oldSource = Object.assign({}, this.sourceChain);
                await this.updateRecords();
            };
            this.onChangeDestination = async (network) => {
                if (network && network.chainId == this.destinationChain?.chainId)
                    return;
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
                            this.searchSourceBtn.prepend(this.$render("i-image", { class: "network-img", url: _url }));
                        }
                        else {
                            this.searchSourceBtn.caption = '$source_chain';
                        }
                    }
                    this.destinationChain = network;
                    this.searchDestinationBtn.caption = network.chainName;
                    const url = network.url;
                    this.searchDestinationBtn.prepend(this.$render("i-image", { class: "network-img", url: url }));
                }
                else {
                    this.destinationChain = null;
                    this.searchDestinationBtn.caption = '$destination_chain';
                }
                this.oldDestination = Object.assign({}, this.destinationChain);
                await this.updateRecords();
            };
            this.expandRecord = () => {
                if (this.currentHash) {
                    setTimeout(() => {
                        const currentRecord = this.bridgeRecordTable.querySelector(`[order-hash="${this.currentHash}"]`);
                        if (currentRecord) {
                            currentRecord.click();
                        }
                        const currentRecordMobile = this.bridgeRecordMobile.querySelector(`[order-hash="${this.currentHash}"]`);
                        if (currentRecordMobile) {
                            currentRecordMobile.click();
                        }
                    }, 500);
                }
            };
            this.updateRecords = async (page) => {
                if (this.isPageKept) {
                    this.isPageKept = false;
                }
                else if (this.largeLoading) {
                    this.largeLoading.visible = true;
                }
                this.paging.currentPage = page || 1;
                let params = {
                    sort: this.sortByDate
                };
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
            };
            this.renderRecords = () => {
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
            };
            this.setVaultOrderMap = async () => {
                try {
                    let vaultOrders = await (0, bridgeRecordAPI_1.getAllUserOrders)(this.state);
                    this.orders = vaultOrders.orders;
                }
                catch { }
                ;
            };
            this.setVisibleMd = (value) => {
                this.sortDateModal.visible = this.searchSourceModal.visible = this.searchDestinationModal.visible = this.searchTokenGroupModal.visible = value;
            };
            this.onConfirm = async (actionType) => {
                if (!this.state.isRpcWalletConnected()) {
                    const chainId = this.state.getChainId();
                    const clientWallet = eth_wallet_7.Wallet.getClientInstance();
                    await clientWallet.switchNetwork(chainId);
                    return;
                }
                (0, index_16.showResultMessage)(this.txStatusModal, 'warning', this.i18n.get('$confirming'));
                let btnElement = this.btnElm;
                const callback = async (err, receipt) => {
                    if (err) {
                        (0, index_16.showResultMessage)(this.txStatusModal, 'error', err);
                    }
                    else if (receipt) {
                        (0, index_16.showResultMessage)(this.txStatusModal, 'success', receipt);
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
                (0, index_16.registerSendTxEvents)({
                    transactionHash: callback,
                    confirmation: confirmationCallback
                });
                const { fromVaultAddress, toVaultAddress, fromNetwork, orderId } = this.selectedItem;
                if (!actionType)
                    actionType = this.isCancel ? 0 /* ActionType.Cancel */ : 2 /* ActionType.Withdraw */;
                switch (actionType) {
                    case 0 /* ActionType.Cancel */:
                        this.requestCancelModal.visible = false;
                        (0, bridgeRecordAPI_1.requestCancelOrder)({ vaultAddress: toVaultAddress, sourceChainId: fromNetwork.chainId, orderId });
                        break;
                    case 1 /* ActionType.Resubmit */:
                        this.resubmitOrderModal.visible = false;
                        const tokenOut = Object.assign({}, this.resubmitToken);
                        (0, bridgeRecordAPI_1.requestAmendOrder)(this.state, { vaultAddress: fromVaultAddress, orderId, tokenOut, minAmountOut: new eth_wallet_7.BigNumber(this.newMinAmountOut) }, callback);
                        break;
                    case 2 /* ActionType.Withdraw */:
                        this.requestCancelModal.visible = false;
                        (0, bridgeRecordAPI_1.withdrawUnexecutedOrder)({ vaultAddress: fromVaultAddress, orderId });
                        break;
                    default:
                        break;
                }
            };
            this.removeCurrentValues = () => {
                this.isPageKept = false;
                this.currentHash = '';
            };
            this.onSwitchNetwork = async (action) => {
                try {
                    if (action === 1 /* ActionType.Resubmit */) {
                        this.resubmitOrderModal.visible = false;
                    }
                    else {
                        this.requestCancelModal.visible = false;
                    }
                    this.isPageKept = true;
                    this.currentAction = action;
                    const { orderId, fromNetwork, toNetwork } = this.selectedItem;
                    this.currentHash = `${orderId}-${fromNetwork.chainId}-${toNetwork.chainId}`;
                    if (!(0, index_17.isWalletConnected)()) {
                        this.switchNetworkByWallet();
                    }
                    else {
                        const rpcWallet = this.state.getRpcWallet();
                        if (rpcWallet.chainId != this.switchChainId) {
                            await rpcWallet.switchNetwork(this.switchChainId);
                        }
                        const clientWallet = eth_wallet_7.Wallet.getClientInstance();
                        await clientWallet.switchNetwork(this.switchChainId);
                    }
                }
                catch {
                    this.removeCurrentValues();
                }
            };
            this.updateSwitchButton = () => {
                if (this.selectedItem) {
                    const { fromNetwork, toNetwork } = this.selectedItem;
                    if (this.currentAction === 1 /* ActionType.Resubmit */) {
                        this.resubmitOrderModal.visible = true;
                        if (fromNetwork.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
                            this.resubmitConfirmPnl.visible = false;
                            this.resubmitConfirmNetwork.visible = true;
                        }
                        else {
                            this.resubmitConfirmPnl.visible = true;
                            this.resubmitConfirmNetwork.visible = false;
                        }
                    }
                    else if (this.currentAction === 0 /* ActionType.Cancel */) {
                        this.requestCancelModal.visible = true;
                        const network = this.isCancel ? toNetwork : fromNetwork;
                        if (network.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
                            this.switchNetworkPnl.visible = true;
                            this.confirmNetwork.visible = false;
                        }
                        else {
                            this.switchNetworkPnl.visible = false;
                            this.confirmNetwork.visible = true;
                        }
                    }
                }
            };
            this.showCancelOrWithdrawModal = (elm, record, isCancel) => {
                this.btnElm = elm;
                this.selectedItem = record;
                this.isCancel = isCancel;
                const { fromNetwork, toNetwork, protocolFee } = record;
                const network = isCancel ? toNetwork : fromNetwork;
                this.switchChainId = network.chainId;
                if (network.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
                    this.switchNetworkPnl.visible = true;
                    this.confirmNetwork.visible = false;
                }
                else {
                    this.switchNetworkPnl.visible = false;
                    this.confirmNetwork.visible = true;
                }
                this.titleModalLabel.caption = isCancel ? '$request_cancel' : '$withdraw';
                this.networkNameLabel.caption = isCancel ? '$destination_chain' : '$source_chain';
                this.networkNameVal.caption = network.chainName;
                const amount = record.sourceVaultInAmount || null;
                const symbol = record.sourceVaultToken?.symbol || '';
                this.withdrawAmount.caption = amount === null ? '-' : `${(0, index_16.formatNumber)(new eth_wallet_7.BigNumber(amount).multipliedBy(new eth_wallet_7.BigNumber(1).minus(protocolFee)))} ${symbol}`;
                this.noteCancelOrWithdraw.caption = isCancel ?
                    this.i18n.get('$you_can_withdraw_the_tokens_after_the_cancellation_is_approved_by_the_bridge_trolls._the_cancellation_is_subjected_to_a_cancellation_fee', { fee: `${new eth_wallet_7.BigNumber(protocolFee).multipliedBy(100).toFixed(2)}%` }) :
                    '$the_token_will_be_returned_to_your_wallet_after_withdrawal';
                this.noteNetwork.caption = isCancel ?
                    '$the_request_must_be_submitted_from_the_destination_chain,_please_switch_your_network_as_instructed' :
                    '$the_request_must_be_submitted_from_the_source_chain,_please_switch_your_network_as_instructed';
                this.requestCancelModal.visible = true;
            };
            this.showResubmitModal = async (elm, record) => {
                this.btnElm = elm;
                this.selectedItem = record;
                const { fromNetwork, toToken, toNetwork } = record;
                if (fromNetwork.chainId != this.chainId || !this.state.isRpcWalletConnected()) {
                    this.resubmitConfirmPnl.visible = false;
                    this.resubmitConfirmNetwork.visible = true;
                }
                else {
                    this.resubmitConfirmPnl.visible = true;
                    this.resubmitConfirmNetwork.visible = false;
                }
                if (!this.tokenReceiveSelection.onSelectToken) {
                    this.tokenReceiveSelection.onSelectToken = async (token) => {
                        this.tokenReceiveSelection.tokenReadOnly = true;
                        this.resubmitToken = token;
                        await this.updateReceiveVal();
                        this.tokenReceiveSelection.tokenReadOnly = false;
                    };
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
                }
                else {
                    this.tokenReceiveSelection.token = { chainId: toNetwork.chainId, ...toToken };
                }
                this.resubmitToken = { chainId: toNetwork.chainId, ...toToken };
                this.tokenReceiveSelection.tokenReadOnly = true; // No choosing token for pilot launch
                await this.updateReceiveVal();
            };
            this.closeModal = () => {
                this.requestCancelModal.visible = false;
                this.removeCurrentValues();
            };
            this.closeResubmitModal = () => {
                this.resubmitOrderModal.visible = false;
                this.removeCurrentValues();
            };
            this.resetReceiveVal = () => {
                this.resubmitExpectedReceive.caption = '-';
                this.newMinAmountOut = '0';
            };
            this.updateReceiveVal = async () => {
                try {
                    const params = { ...this.selectedItem, toToken: { ...this.resubmitToken } };
                    let vaultGroup = await (0, index_18.findVaultGroupByToken)(this.state, params.fromNetwork.chainId, params.sourceVaultToken.address);
                    let route = (0, index_18.getRoute)({
                        vaultGroup,
                        toChainId: params.toNetwork.chainId,
                        fromChainId: params.fromNetwork.chainId,
                        inAmount: new eth_wallet_7.BigNumber(params.sourceVaultInAmount)
                    });
                    //there will be only one route
                    let vaultInfo = (0, index_17.findConstantToVault)(this.selectedItem.fromNetwork.chainId, this.selectedItem.sourceVaultToken.address, this.selectedItem.toNetwork.chainId);
                    if (vaultInfo) {
                        const { toAmount } = route;
                        const minReceivedMaxSold = toAmount.times(1 - this.state.getSlippageTolerance() / 100).toFixed();
                        this.newMinAmountOut = minReceivedMaxSold;
                        this.resubmitExpectedReceive.caption = (0, index_16.formatNumber)(toAmount);
                        // this.resubmitMinimumReceive.caption = formatNumber(this.newMinAmountOut);
                    }
                    else {
                        this.resetReceiveVal();
                    }
                }
                catch {
                    this.resetReceiveVal();
                }
            };
            this.getTargetInfoObj = async (targetChainId) => {
                let tokenBalances = scom_token_list_5.tokenStore.getTokenBalancesByChainId(targetChainId);
                if (!tokenBalances || !Object.keys(tokenBalances).length) {
                    await scom_token_list_5.tokenStore.updateTokenBalancesByChainId(targetChainId);
                }
                const tokenMap = scom_token_list_5.tokenStore.getTokenMapByChainId(targetChainId);
                tokenBalances = scom_token_list_5.tokenStore.getTokenBalancesByChainId[targetChainId];
                this.targetTokenBalances = tokenBalances;
                this.targetTokenMap = Object.keys(tokenMap || {})
                    .reduce((obj, key) => {
                    obj[key] = (tokenMap || {})[key];
                    return obj;
                }, {});
            };
            this.onRefresh = async () => {
                var self = this;
                this.iconRefresh.enabled = false;
                await this.updateRecords(1);
                setTimeout(function () {
                    self.lastUpdated = 0;
                    self.iconRefresh.enabled = true;
                }, 1000);
            };
            this.onRenderDataMobile = async () => {
                const list = this.getFilteredData();
                this.bridgeRecordMobile.innerHTML = '';
                if (!list.length) {
                    this.bridgeRecordMobile.appendChild(this.$render("i-panel", { class: "queue-header" },
                        this.$render("i-image", { url: assets_2.default.fullPath('img/icon-advice.svg') }),
                        this.$render("i-panel", null,
                            this.$render("i-label", { id: "emptyMsg", caption: "$no_data", font: { size: '1rem', color: Theme.text.primary, bold: true }, margin: { left: 10 } }))));
                    return;
                }
                for (const record of list) {
                    const { orderId, fromToken, toToken, fromNetwork, toNetwork } = record;
                    // const date = formatDate(record.date, DefaultDateTimeFormat);
                    const fromSymbol = fromToken.symbol;
                    const toSymbol = toToken.symbol;
                    const fromTokenImg = (0, index_17.getTokenIcon)(fromToken.address, fromNetwork.chainId);
                    const toTokenImg = (0, index_17.getTokenIcon)(toToken.address, toNetwork.chainId);
                    const color = record.status == 'Executed' ? 'green' : 'red';
                    const expandPanel = await components_14.Panel.create();
                    expandPanel.visible = false;
                    expandPanel.appendChild(this.onExpandedRowRender(record, true));
                    this.bridgeRecordMobile.appendChild(this.$render("i-panel", { class: "bg-item" },
                        this.$render("i-hstack", { class: "row-item" },
                            this.$render("i-vstack", { class: "header-item" },
                                this.$render("i-hstack", { gap: "4px", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: fromSymbol, font: { bold: true } }),
                                    this.$render("i-label", { caption: 'to' }),
                                    this.$render("i-label", { caption: toSymbol, font: { bold: true } }),
                                    this.$render("i-label", { caption: `#${orderId}` }))),
                            this.$render("i-vstack", { class: "ml-auto" },
                                this.$render("i-icon", { class: "pointer", margin: { top: 4 }, name: "ellipsis-v", "order-hash": `${orderId}-${fromNetwork.chainId}-${toNetwork.chainId}`, fill: "#fff", width: 15, height: 15, onClick: () => { expandPanel.visible = !expandPanel.visible; } }))),
                        this.$render("i-hstack", { margin: { bottom: 4 }, class: "row-item", verticalAlignment: "center" },
                            this.$render("i-image", { margin: { right: 4 }, width: "20px", class: "inline-block", url: fromTokenImg }),
                            this.$render("i-label", { caption: `${(0, index_16.formatNumber)(record.fromAmount)} ${fromSymbol}` })),
                        this.$render("i-hstack", { class: "row-item", verticalAlignment: "center" },
                            this.$render("i-image", { margin: { right: 4 }, width: "20px", class: "inline-block", url: (0, index_17.getNetworkImg)(this.state, fromNetwork.chainId) }),
                            this.$render("i-label", { class: "text-opacity", caption: fromNetwork.chainName })),
                        this.$render("i-icon", { name: "angle-down", fill: "#fff", margin: { left: 40, bottom: 8 }, width: 16, height: 16 }),
                        this.$render("i-hstack", { margin: { bottom: 4 }, class: "row-item", verticalAlignment: "center" },
                            this.$render("i-image", { margin: { right: 4 }, width: "20px", class: "inline-block", url: toTokenImg }),
                            this.$render("i-label", { caption: `${(0, index_16.formatNumber)(record.toAmount)} ${toSymbol}` })),
                        this.$render("i-hstack", { class: "row-item", verticalAlignment: "center" },
                            this.$render("i-image", { margin: { right: 4 }, width: "20px", class: "inline-block", url: (0, index_17.getNetworkImg)(this.state, toNetwork.chainId) }),
                            this.$render("i-label", { class: "text-opacity", caption: toNetwork.chainName })),
                        this.$render("i-hstack", { class: "row-status" },
                            this.$render("i-label", { class: `${color} text-small`, caption: record.status })),
                        expandPanel));
                }
                ;
            };
            this.onExpandedRowRender = (record, isMobile) => {
                let color = record.status == 'Executed' ? "green" : "red";
                let btn = [];
                if (['Pending', 'Expired'].includes(record.status)) {
                    btn = (this.$render("i-panel", { class: "group-btn", margin: { bottom: 20 } },
                        this.$render("i-button", { caption: "$amend_order", height: "35", class: "btn-request btn-os", onClick: (e) => this.showResubmitModal(e, record) }),
                        this.$render("i-button", { caption: "$request_cancel", height: "35", class: "btn-request btn-cancel btn-os", onClick: (e) => this.showCancelOrWithdrawModal(e, record, true) })));
                }
                else if (record.status === 'Cancel Approved') {
                    btn = (this.$render("i-vstack", { margin: { bottom: 20 }, horizontalAlignment: "center" },
                        this.$render("i-button", { caption: "$withdraw", height: "35", class: "btn-request btn-os", onClick: (e) => this.showCancelOrWithdrawModal(e, record) })));
                }
                return (this.$render("i-panel", { class: `expanded-item flex ${isMobile ? 'expanded-item-mobile' : ''}` },
                    this.$render("i-vstack", { class: "col-50" },
                        this.$render("i-hstack", { class: "row-table" },
                            this.$render("i-vstack", { class: "custom-col" },
                                this.$render("i-label", { class: "text-grey", caption: "Minimum Receive" })),
                            this.$render("i-hstack", { verticalAlignment: "center" },
                                this.$render("i-image", { width: "20px", class: "inline-block", margin: { right: 8 }, url: (0, bridgeRecordColumn_1.toTokenIcon)(record) }),
                                this.$render("i-label", { caption: `${(0, index_16.formatNumber)(record.minOutAmount)} ${record.toToken.symbol}` }))),
                        this.$render("i-hstack", { class: "row-table" },
                            this.$render("i-vstack", { class: "custom-col" },
                                this.$render("i-label", { class: "text-grey", caption: "Status" })),
                            this.$render("i-vstack", null,
                                this.$render("i-label", { class: color, caption: record.status }))),
                        this.$render("i-hstack", { class: "row-table" },
                            this.$render("i-vstack", { class: "custom-col" },
                                this.$render("i-label", { class: "text-grey", caption: "Sender Address" })),
                            this.$render("i-hstack", null,
                                this.$render("i-label", { margin: { right: 8 }, caption: (0, bridgeRecordColumn_1.truncateAddress)(record.sender, 13) }),
                                this.$render("i-icon", { name: "copy", width: "14px", height: "14px", fill: Theme.text.primary, tooltip: { content: '$the_address_has_been_copied', trigger: 'click' }, onClick: () => components_14.application.copyToClipboard(record.sender || ''), class: "inline-flex pointer" })))),
                    this.$render("i-vstack", { class: "col-50" }, btn)));
            };
            this.state = state;
            this.$eventBus = components_14.application.EventBus;
            this.registerEvent();
        }
        onHide() {
            for (let event of this.clientEvents) {
                event.unregister();
            }
            this.clientEvents = [];
        }
        registerEvent() {
            this.clientEvents.push(this.$eventBus.register(this, "slippageToleranceChanged" /* EventId.SlippageToleranceChanged */, this.onUpdateReceiveVal));
        }
        get lastUpdated() {
            return this._lastUpdated;
        }
        set lastUpdated(value) {
            this._lastUpdated = value;
            this.lastUpdatedText = this.i18n.get('$data_last_updated_seconds_ago', { value: `${this._lastUpdated}` });
        }
        get networkList() {
            const list = this.state.getMatchNetworks({ isDisabled: false });
            const networks = this.state.getNetworkConfig();
            const testnetSupportedList = list.filter(v => v.isTestnet && networks.some(n => n.chainId == v.chainId));
            const mainnetSupportedList = list.filter(v => !v.isTestnet && networks.some(n => n.chainId == v.chainId));
            const isMainnet = mainnetSupportedList.some((item) => item.chainId == this.chainId);
            const supportList = isMainnet ? mainnetSupportedList : testnetSupportedList;
            return supportList;
        }
        get dataListFiltered() {
            let list = this.orders;
            if (!Object.keys(this.filter).length)
                return list;
            const { sourceChain, targetChain, sort, assetName } = this.filter;
            if (sourceChain) {
                list = list.filter((order) => order.fromNetwork.chainId == sourceChain);
            }
            if (targetChain) {
                list = list.filter((order) => order.toNetwork.chainId == targetChain);
            }
            if (assetName) {
                list = list.filter((order) => order.assetName === assetName);
            }
            if (sort) {
                list = list.sort((a, b) => sort === "Latest" /* DateOptions.LATEST */ ? b.orderId - a.orderId : a.orderId - b.orderId);
            }
            return list;
        }
        renderEmpty(source) {
            const emptyElm = this.$render("i-panel", { class: "queue-header" },
                this.$render("i-image", { url: assets_2.default.fullPath('img/icon-advice.svg') }),
                this.$render("i-panel", null,
                    this.$render("i-label", { caption: "$no_data", font: { size: '1rem', color: Theme.text.primary, bold: true }, margin: { left: 10 } })));
            const td = source.querySelector('td');
            td && td.appendChild(emptyElm);
        }
        async onChangeTokenGroup(value) {
            this.searchTokenGroupModal.visible = false;
            if (this.assetName === value)
                return;
            this.assetName = value;
            this.searchTokenGroupBtn.caption = value || '$token_group';
            await this.updateRecords();
        }
        async generateData() {
            let pageNumber = this.isPageKept ? this.paging.currentPage : 1;
            await this.updateRecords(pageNumber);
        }
        resetData() {
            this.paging.totalPage = 0;
            if (this.paging.currentPage !== 1) {
                this.paging.currentPage = 1;
            }
            this.itemStart = 0;
            this.itemEnd = this.itemStart + pageSize;
            this.bridgeRecordTable.data = [];
        }
        resizeLayout(width) {
            if (!this.bridgeRecordTable)
                return;
            const tagWidth = Number(width);
            if ((this.offsetWidth !== 0 && this.offsetWidth < 768) || window.innerWidth < 768 || (!isNaN(tagWidth) && tagWidth !== 0 && tagWidth < 768)) {
                this.hStackPagination.classList.add('pagination-mobile');
                this.bridgeRecordTable.visible = false;
                this.mobilePanel.visible = true;
            }
            else {
                this.hStackPagination.classList.remove('pagination-mobile');
                this.bridgeRecordTable.visible = true;
                this.mobilePanel.visible = false;
            }
        }
        async init() {
            this.i18n.init({ ...index_19.bridgeRecordJson });
            await super.init();
            this.chainId = this.state.getChainId();
            this.renderFilterButton();
            this.setVisibleMd(true);
            this.sortDateBtn.onClick = () => this.sortDateModal.visible = !this.sortDateModal.visible;
            this.searchSourceBtn.onClick = () => this.searchSourceModal.visible = !this.searchSourceModal.visible;
            this.searchDestinationBtn.onClick = () => this.searchDestinationModal.visible = !this.searchDestinationModal.visible;
            this.searchTokenGroupBtn.onClick = () => this.searchTokenGroupModal.visible = !this.searchTokenGroupModal.visible;
            this.setVisibleMd(false);
            const isConnected = (0, index_17.isWalletConnected)();
            this.initializedState = {
                chainId: this.state.getChainId(),
                connected: isConnected,
                loading: true
            };
            await this.refreshUI(isConnected);
            this.initializedState.loading = false;
        }
        get targetTokenList() {
            let dataList = [];
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
                    }
                    else {
                        dataList.push({
                            ...tokenObject,
                            status: null,
                        });
                    }
                }
            }
            return dataList;
        }
        renderFilterButton() {
            const dropdownSource = this.searchSourceModal.querySelector('.modal');
            const dropdownDestination = this.searchDestinationModal.querySelector('.modal');
            const dropdownTokenGroup = this.searchTokenGroupModal.querySelector('.modal');
            if (this.chainId) {
                if (dropdownSource && dropdownDestination) {
                    dropdownSource.innerHTML = '';
                    dropdownDestination.innerHTML = '';
                    dropdownSource.appendChild(this.$render("i-button", { caption: '$source_chain', onClick: () => this.onChangeSource() }));
                    dropdownDestination.appendChild(this.$render("i-button", { caption: '$destination_chain', onClick: () => this.onChangeDestination() }));
                    this.networkList.forEach((item) => {
                        const url = item.image;
                        dropdownSource.appendChild(this.$render("i-button", { icon: { margin: { right: '0.25rem' }, image: { url, width: 16, height: 16 } }, caption: item.chainName, onClick: () => this.onChangeSource({ ...item, url }) }));
                        dropdownDestination.appendChild(this.$render("i-button", { icon: { margin: { right: '0.25rem' }, image: { url, width: 16, height: 16 } }, caption: item.chainName, onClick: () => this.onChangeDestination({ ...item, url }) }));
                    });
                }
                if (dropdownTokenGroup) {
                    dropdownTokenGroup.innerHTML = '';
                    dropdownTokenGroup.appendChild(this.$render("i-button", { caption: "$token_group", onClick: () => this.onChangeTokenGroup() }));
                    index_17.VaultGroupList.forEach((item) => {
                        dropdownTokenGroup.appendChild(this.$render("i-button", { caption: item.assetName, onClick: () => this.onChangeTokenGroup(item.assetName) }));
                    });
                }
            }
            else {
                if (dropdownSource && dropdownSource && dropdownDestination) {
                    dropdownSource.innerHTML = '';
                    dropdownDestination.innerHTML = '';
                    dropdownTokenGroup.innerHTML = '';
                    dropdownTokenGroup.appendChild(this.$render("i-button", { caption: "$token_group", onClick: () => this.onChangeTokenGroup() }));
                    dropdownSource.appendChild(this.$render("i-button", { caption: '$source_chain', onClick: () => this.onChangeSource() }));
                    dropdownDestination.appendChild(this.$render("i-button", { caption: '$destination_chain', onClick: () => this.onChangeDestination() }));
                }
            }
        }
        render() {
            return (this.$render("i-panel", { class: `${bridgeRecord_css_1.bridgeStyle} template-layout` },
                this.$render("i-panel", { id: "bridge-container" },
                    this.$render("i-hstack", { wrap: "wrap-reverse", justifyContent: "space-between", margin: { bottom: 20 } },
                        this.$render("i-hstack", { minWidth: 255, margin: { top: 4 }, verticalAlignment: "center" },
                            this.$render("i-label", { caption: this.lastUpdatedText, margin: { right: 5 } }),
                            this.$render("i-icon", { id: "iconRefresh", width: 15, height: 15, class: "rounded-icon", name: "sync-alt", fill: Theme.text.primary, onClick: this.onRefresh })),
                        this.$render("i-panel", { class: "group-filter" },
                            this.$render("i-panel", { class: "btn-dropdown", width: '165px' },
                                this.$render("i-button", { id: "sortDateBtn", caption: "$latest_swap", rightIcon: { name: "angle-down" }, width: "calc(100% - 1px)", font: { size: '1rem' } }),
                                this.$render("i-modal", { id: "sortDateModal", showBackdrop: false, width: "100%", height: 'auto', popupPlacement: 'bottom' },
                                    this.$render("i-panel", null,
                                        this.$render("i-button", { caption: "$latest_swap", onClick: () => this.onChangeSorting("Latest" /* DateOptions.LATEST */) }),
                                        this.$render("i-button", { caption: "$oldest_swap", onClick: () => this.onChangeSorting("Oldest" /* DateOptions.OLDEST */) })))),
                            this.$render("i-panel", { class: "btn-dropdown", width: '165px' },
                                this.$render("i-button", { id: "searchTokenGroupBtn", rightIcon: { name: "angle-down" }, caption: "$token_group", width: "calc(100% - 1px)", font: { size: '1rem' } }),
                                this.$render("i-modal", { id: "searchTokenGroupModal", showBackdrop: false, width: '100%', height: 'auto', popupPlacement: 'bottom' })),
                            this.$render("i-panel", { class: "btn-dropdown", width: '165px' },
                                this.$render("i-button", { id: "searchSourceBtn", rightIcon: { name: "angle-down" }, caption: "$source_chain", width: "calc(100% - 1px)", font: { size: '1rem' } }),
                                this.$render("i-modal", { id: "searchSourceModal", showBackdrop: false, width: '100%', height: 'auto', popupPlacement: 'bottom' })),
                            this.$render("i-panel", { class: "btn-dropdown", width: '165px' },
                                this.$render("i-button", { id: "searchDestinationBtn", rightIcon: { name: "angle-down" }, caption: "$destination_chain", width: "calc(100% - 1px)", font: { size: '1rem' } }),
                                this.$render("i-modal", { id: "searchDestinationModal", showBackdrop: false, width: '100%', height: 'auto', popupPlacement: 'bottom' })))),
                    this.$render("i-panel", null,
                        this.$render("i-vstack", { id: "largeLoading", class: "i-loading-overlay" },
                            this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                                this.$render("i-icon", { class: "i-loading-spinner_icon", cursor: "default", image: { url: assets_2.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                                this.$render("i-label", { caption: "$loading", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                        this.$render("i-panel", { id: "mobilePanel", minHeight: 100, visible: false },
                            this.$render("i-hstack", { horizontalAlignment: "center" },
                                this.$render("i-vstack", { id: "bridgeRecordMobile" }))),
                        this.$render("i-table", { id: "bridgeRecordTable", class: "os-table", margin: { bottom: 30 }, columns: bridgeRecordColumn_1.bridgeRecordColumns, data: this.getFilteredData(), expandable: {
                                onRenderExpandedRow: this.onExpandedRowRender,
                                rowExpandable: true
                            }, onRenderEmptyTable: this.renderEmpty.bind(this) }),
                        this.$render("i-hstack", { id: "hStackPagination", margin: { top: 16, bottom: 20 }, class: "record-pagination" },
                            this.$render("i-pagination", { id: "listPagination", width: "auto", totalPages: this.paging.totalPage, currentPage: this.paging.currentPage, onPageChanged: this.onSelectIndex.bind(this) }))),
                    this.$render("i-modal", { id: "requestCancelModal", class: "custom-modal_header", width: 400, maxWidth: "95%" },
                        this.$render("i-hstack", { class: "header", horizontalAlignment: "space-between" },
                            this.$render("i-label", { id: "titleModalLabel", caption: "$request_cancel" }),
                            this.$render("i-icon", { width: 20, height: 20, class: "cursor-pointer", name: "times", fill: Theme.colors.primary.main, onClick: () => this.closeModal() })),
                        this.$render("i-panel", { background: { color: Theme.divider }, height: 2, width: '100%', margin: { top: 10, bottom: 20 } }),
                        this.$render("i-hstack", { horizontalAlignment: "space-between", margin: { bottom: 20 } },
                            this.$render("i-label", { id: "networkNameLabel" }),
                            this.$render("i-label", { id: "networkNameVal" })),
                        this.$render("i-hstack", { horizontalAlignment: "space-between", margin: { bottom: 20 } },
                            this.$render("i-label", { caption: "$withdraw_amount" }),
                            this.$render("i-label", { id: "withdrawAmount" })),
                        this.$render("i-panel", { width: "100%", margin: { bottom: 30 } },
                            this.$render("i-label", { id: "noteCancelOrWithdraw", class: "inline" })),
                        this.$render("i-panel", { id: "switchNetworkPnl" },
                            this.$render("i-panel", { width: "100%", margin: { bottom: 30 } },
                                this.$render("i-label", { id: "noteNetwork", class: "inline", font: { color: 'yellow' } })),
                            this.$render("i-hstack", { margin: { top: 20, bottom: 20 }, horizontalAlignment: "center" },
                                this.$render("i-button", { height: 'auto', width: 150, maxWidth: '50%', class: "btn-bridge btn-os", caption: '$switch_network', onClick: () => this.onSwitchNetwork(0 /* ActionType.Cancel */) }))),
                        this.$render("i-panel", { id: "confirmNetwork", visible: false },
                            this.$render("i-hstack", { margin: { top: 20, bottom: 20 }, horizontalAlignment: "center" },
                                this.$render("i-button", { height: 'auto', width: 150, maxWidth: '50%', class: "btn-bridge btn-os", caption: '$confirm', onClick: () => this.onConfirm() })))),
                    this.$render("i-modal", { id: "resubmitOrderModal", class: "custom-modal_header", width: 400, maxWidth: "95%" },
                        this.$render("i-hstack", { class: "header", horizontalAlignment: "space-between" },
                            this.$render("i-label", { caption: "$amend_order" }),
                            this.$render("i-icon", { width: 20, height: 20, class: "cursor-pointer", name: "times", fill: Theme.colors.primary.main, onClick: () => this.closeResubmitModal() })),
                        this.$render("i-panel", { background: { color: Theme.divider }, height: 2, width: "100%", margin: { top: 10, bottom: 20 } }),
                        this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", margin: { bottom: 20 } },
                            this.$render("i-label", { caption: "$token_receive" }),
                            this.$render("i-scom-token-input", { id: "tokenReceiveSelection", class: "custom-token-input", isInputShown: false, isBtnMaxShown: false, isBalanceShown: false, isCommonShown: false, isSortBalanceShown: false, width: "auto" })),
                        this.$render("i-hstack", { horizontalAlignment: "space-between", margin: { bottom: 20 } },
                            this.$render("i-label", { caption: "$expected_receive" }),
                            this.$render("i-label", { id: "resubmitExpectedReceive" })),
                        this.$render("i-panel", { id: "resubmitConfirmNetwork" },
                            this.$render("i-hstack", { margin: { top: 20, bottom: 20 }, horizontalAlignment: "center" },
                                this.$render("i-button", { height: "auto", width: 150, maxWidth: "50%", class: "btn-bridge btn-os", caption: "$switch_network", onClick: () => this.onSwitchNetwork(1 /* ActionType.Resubmit */) }))),
                        this.$render("i-panel", { id: "resubmitConfirmPnl", visible: false },
                            this.$render("i-hstack", { margin: { top: 20, bottom: 20 }, horizontalAlignment: "center" },
                                this.$render("i-button", { height: 'auto', width: 150, maxWidth: '50%', class: "btn-bridge btn-os", caption: "$confirm", onClick: () => this.onConfirm(1 /* ActionType.Resubmit */) })))),
                    this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }))));
        }
    };
    __decorate([
        (0, components_14.observable)()
    ], BridgeRecord.prototype, "lastUpdatedText", void 0);
    __decorate([
        (0, components_14.observable)()
    ], BridgeRecord.prototype, "paging", void 0);
    BridgeRecord = __decorate([
        components_14.customModule,
        (0, components_14.customElements)('xchain-bridge-record')
    ], BridgeRecord);
    exports.BridgeRecord = BridgeRecord;
});
define("@scom/scom-xchain-widget/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tabStyle = exports.swapStyle = void 0;
    const Theme = components_15.Styles.Theme.ThemeVars;
    exports.swapStyle = components_15.Styles.style({
        $nest: {
            'i-icon': {
                display: 'inline-block',
                cursor: 'default'
            },
            '::-webkit-scrollbar': {
                width: '3px',
            },
            '::-webkit-scrollbar-thumb': {
                background: Theme.colors.primary.main,
                borderRadius: '5px',
            },
            '*': {
                boxSizing: 'border-box'
            },
            '.ml-auto': {
                marginLeft: 'auto'
            },
            '#swapContainer i-button': {
                fontWeight: 600,
                verticalAlign: 'middle',
                lineHeight: 1.5,
            },
            '#swapContainer i-button.disabled': {
                opacity: 0.4,
            },
            '#swapContainer i-button:not(.disabled):hover': {
                transition: 'all .2s ease-out',
            },
            '#swapContainer i-button:focus': {
                outline: 0,
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
            },
            '#swapContainer': {
                width: 500,
                maxWidth: '100%',
                padding: '1rem',
                margin: '1.5rem auto 2rem'
            },
            '.btn-dropdown': {
                marginBlock: '.25rem',
                $nest: {
                    '> i-button': {
                        background: Theme.background.main,
                        boxShadow: 'none',
                        opacity: 0.9,
                        border: 'none',
                        borderRadius: '0.5rem',
                        height: '2.5rem',
                        padding: '1rem 0.5rem',
                        justifyContent: 'space-between',
                        $nest: {
                            'span': {
                                marginInline: '8px auto',
                                fontWeight: 'normal'
                            },
                            '&:hover': {
                                background: `${Theme.background.main} !important`,
                                opacity: 1
                            }
                        }
                    },
                    'i-modal': {
                        width: '100%'
                    },
                    '.modal': {
                        padding: '0.25rem 0',
                        marginTop: 0,
                        border: `2px solid ${Theme.action.focusBackground}`,
                        background: Theme.background.modal,
                        borderRadius: 4,
                        minWidth: 0,
                        maxHeight: '50vh',
                        overflow: 'auto',
                        $nest: {
                            '&::-webkit-scrollbar': {
                                width: '3px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '5px',
                            },
                            'i-hstack': {
                                padding: '0.35rem 0.5rem',
                                fontSize: '0.875rem',
                                $nest: {
                                    '&:hover': {
                                        background: Theme.action.focusBackground,
                                    },
                                    '&.disabled': {
                                        cursor: 'default !important',
                                        opacity: '0.5',
                                        $nest: {
                                            '&:hover': {
                                                background: 'transparent'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '.content-swap': {
                padding: '1.25rem',
                // margin: '0.5rem auto 2rem',
                marginTop: '0.5rem',
                marginBottom: '2rem',
                background: Theme.background.modal,
                borderRadius: '1rem'
            },
            '.input--token-container': {
                padding: '0.5rem 1rem',
                marginLeft: '-15px',
                marginRight: '-15px',
            },
            'i-label.text--grey *': {
                color: Theme.text.primary,
                opacity: 0.7
            },
            'i-label.text--limit *': {
                color: `${Theme.colors.secondary.main} !important`
            },
            '.btn-os': {
                background: 'var(--primary-button-background)',
                transition: 'background .3s ease'
            },
            '.btn-os:not(.disabled):not(.is-spinning):hover, .btn-os:not(.disabled):not(.is-spinning):focus': {
                background: 'var(--primary-button-hover-background)',
                boxShadow: 'none',
                opacity: .9
            },
            '.btn-os:not(.disabled):not(.is-spinning):focus': {
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)',
                outline: 0
            },
            '.btn-os.disabled, .btn-os.is-spinning': {
                background: 'var(--primary-button-disabled-background)',
                opacity: 0.4
            },
            '.btn-max:not(.disabled):hover': {
                transition: 'all .2s ease-out',
                background: 'var(--max-button-hover-background)'
            },
            '.btn-max': {
                position: 'relative',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                padding: '0 0.5rem',
                marginLeft: '0.5rem',
                bottom: '1.5px',
                background: 'var(--max-button-background)',
                color: Theme.text.primary
            },
            '.bg-box': {
                margin: '0.5rem 0',
                border: `1px solid ${Theme.divider}`,
                borderRadius: '0.75rem'
            },
            '.bg-box-radius': {
                borderRadius: '0.75rem'
            },
            '#swapContainer .input--token-box': {
                padding: '0.75rem 1rem',
                $nest: {
                    '#btnToken': {
                        height: 'auto !important'
                    },
                    'i-button.custom-btn': {
                        background: Theme.background.main,
                        padding: '0.5rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        lineHeight: 1.5,
                        alignSelf: 'center',
                        textAlign: 'center',
                        opacity: 1,
                        color: Theme.text.primary,
                        $nest: {
                            '&:not(.disabled):hover': {
                                background: Theme.background.main
                            },
                            '&> span': {
                                verticalAlign: 'middle',
                            },
                            '&> i-icon': {
                                maxWidth: 10,
                                height: '16px !important',
                                opacity: 0.5,
                                marginRight: 'unset',
                                fill: Theme.text.primary
                            },
                            '&> :not(:last-child)': {
                                marginRight: '0.5rem'
                            }
                        }
                    },
                    '.text-value': {
                        display: 'block',
                        $nest: {
                            '> *': {
                                fontSize: '1.25rem',
                                paddingRight: '0.25rem'
                            }
                        }
                    },
                    '.token-input': {
                        width: '100%',
                        background: 'transparent'
                    },
                    '.token-input > input': {
                        width: '100%',
                        height: 'auto !important',
                        padding: '.375rem .75rem',
                        paddingRight: '0.25rem',
                        paddingLeft: 0,
                        borderRadius: '0.25rem',
                        border: 'none',
                        background: 'transparent',
                        color: Theme.text.primary,
                        fontSize: '1.25rem',
                        textAlign: 'right'
                    }
                }
            },
            '.rounded-icon': {
                display: 'inline-block',
                padding: '3px',
                background: Theme.background.modal,
                border: '2px solid transparent',
                borderRadius: '50%',
                cursor: 'pointer'
            },
            '.swap-btn-container': {
                marginBottom: '1.5rem',
                $nest: {
                    '.btn-swap': {
                        position: 'relative',
                        width: '100%',
                        borderRadius: '0.65rem',
                        fontSize: '1.125rem',
                        padding: '1.25rem 0.75rem',
                        opacity: 1,
                        color: Theme.text.primary
                    }
                }
            },
            '#tokenModal': {
                $nest: {
                    '.modal': {
                        background: Theme.background.main,
                        width: 492,
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        color: Theme.text.primary
                    },
                    '.i-modal_header': {
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: `2px solid ${Theme.divider}`,
                        color: Theme.colors.primary.main,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                    },
                    '.i-modal_header > i-icon': {
                        fill: `${Theme.colors.primary.main} !important`
                    },
                    '.search': {
                        position: 'relative',
                        marginBottom: '1.5rem',
                        $nest: {
                            'i-icon': {
                                position: 'absolute',
                                top: 'calc(50% - 4px)',
                                left: '1rem',
                                transform: 'rotate(90deg)',
                                opacity: 0.7
                            },
                            'i-input': {
                                width: '100%'
                            },
                            'i-input > input': {
                                width: '100%',
                                height: 'auto !important',
                                padding: '1rem 1.5rem 1rem 2.25rem',
                                borderRadius: '0.5rem',
                                border: '2px solid #2a3675',
                                background: 'transparent',
                                color: 'inherit',
                                fontSize: 'inherit',
                            }
                        }
                    },
                    '.common-token': {
                        $nest: {
                            '.common-list': {
                                margin: '0.5rem -0.5rem 0'
                            },
                            '.grid-item': {
                                padding: '0.35rem 0.5rem',
                                borderRadius: '1rem',
                                border: '2px solid transparent',
                                $nest: {
                                    '&:hover': {
                                        borderColor: Theme.colors.info.main,
                                        transform: 'none'
                                    },
                                    'i-image': {
                                        marginRight: '0.5rem'
                                    }
                                }
                            },
                        }
                    },
                    '.token-list': {
                        margin: '0.5rem -0.5rem',
                        maxHeight: '45vh',
                        overflowY: 'auto',
                        $nest: {
                            '.token-info': {
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '1rem',
                                marginRight: '0.5rem',
                            },
                            '.token-item': {
                                padding: '0.5rem',
                                overflow: 'unset',
                                animation: 'none',
                                $nest: {
                                    '&:hover': {
                                        background: 'linear-gradient(254.8deg,rgba(231,91,102,.1) -8.08%,rgba(181,32,130,.1) 84.35%) !important',
                                        transform: 'none !important'
                                    },
                                    'i-image': {
                                        marginRight: '0.5rem'
                                    },
                                    '&:not(:first-child)': {
                                        marginTop: 0
                                    }
                                }
                            },
                            '.token-name i-label > *': {
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.55)'
                            }
                        }
                    },
                }
            },
            '.cursor-input--default': {
                cursor: 'default',
                $nest: {
                    'input': {
                        cursor: 'default'
                    }
                }
            },
            '.hidden': {
                display: 'none !important'
            },
            '.cur-pointer': {
                cursor: 'pointer !important'
            },
            '.custom-modal': {
                $nest: {
                    '.modal': {
                        // background: Theme.background.main,
                        width: 490,
                        maxWidth: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        color: Theme.text.primary
                    },
                    '.i-modal_header': {
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: `2px solid ${Theme.divider}`,
                        color: Theme.colors.primary.main,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                    },
                    '.i-modal_header > i-icon': {
                        fill: `${Theme.colors.primary.main} !important`,
                        cursor: 'pointer'
                    },
                    '.i-modal_header ~ i-icon': {
                        display: 'inline-block',
                        margin: '0.75rem 0',
                        background: Theme.background.modal,
                        border: '2px solid transparent',
                        borderRadius: '50%',
                        padding: '0.25rem'
                    },
                }
            },
            '#swapModal': {
                $nest: {
                    '.icon-swap': {
                        margin: 0
                    },
                    'i-image:not(.rounded-icon)': {
                        display: 'inline-block',
                        marginRight: '0.5rem'
                    },
                    '#tokenReceiveValue': {
                        margin: '0 5px'
                    },
                    '#payOrReceiveValue': {
                        marginInline: '0.25rem',
                    },
                    '.text-primary *': {
                        color: Theme.colors.primary.main,
                    },
                    '.price-info': {
                        padding: '1rem'
                    },
                    '.arrow-down': {
                        display: 'inline-block',
                        margin: '0.75rem 0',
                        background: Theme.background.modal,
                        border: '2px solid transparent',
                        borderRadius: '50%',
                        padding: '0.25rem'
                    },
                    '.arrow-down--chain': {
                        margin: '0.75rem 6rem !important',
                    },
                    '.token-value': {
                        marginLeft: 'auto',
                    },
                    '.token-value > *, #swapModal .token-name > *': {
                        fontSize: '1.1rem'
                    },
                    '.row-chain': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }
            },
            '#dappResult': {
                $nest: {
                    '.modal': {
                        background: Theme.background.modal,
                        width: '440px',
                        maxWidth: '100%',
                        padding: '0.5rem',
                        borderRadius: '12px'
                    },
                    'i-label:nth-child(2)': {
                        marginBottom: '0.25rem'
                    },
                    '.waiting-txt > *': {
                        fontSize: '22px'
                    },
                    'i-loading': {
                        marginTop: '3rem',
                        marginBottom: '0.5rem'
                    },
                    'i-loading .i-loading-spinner_icon': {
                        width: '50px',
                        height: '48px'
                    }
                }
            },
            '.custom-md--view': {
                $nest: {
                    'i-label > *': {
                        fontSize: '.875rem',
                        wordBreak: 'normal'
                    },
                    '.i-modal_content': {
                        padding: '0 1rem 1rem',
                    },
                    'i-button': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '150px',
                        height: '50px !important',
                        fontWeight: 600,
                        borderRadius: 5,
                        margin: '0.5rem',
                    },
                    '.btn-cancel': {
                        background: '#eaecef',
                        color: `${Theme.background.default} !important`,
                        $nest: {
                            '&:hover': {
                                background: '#eaecef !important',
                                color: `${Theme.background.default} !important`
                            }
                        }
                    },
                    '.btn-submit': {
                        textAlign: 'center',
                    },
                    '.btn-submit > *': {
                        color: `${Theme.text.primary} !important`,
                    },
                }
            },
            '#modalFees': {
                $nest: {
                    '.i-modal_header': {
                        marginBottom: '0.5rem !important',
                    },
                    '.i-modal_content': {
                        $nest: {
                            'i-label *': {
                                fontSize: '0.875rem',
                            },
                            'i-button': {
                                width: '150px',
                                paddingBlock: '0.25rem',
                            },
                        },
                    },
                },
            },
            '.action-setting': {
                display: 'flex',
                margin: 'auto 0 0 auto',
                $nest: {
                    '> i-icon': {
                        marginLeft: '0.5rem'
                    },
                    '> i-label': {
                        opacity: 0.75
                    }
                }
            }
        }
    });
    exports.tabStyle = components_15.Styles.style({
        $nest: {
            '.tabs-nav-wrap': {
                $nest: {
                    '.tabs-nav': {
                        width: '100%'
                    },
                    'i-tab': {
                        width: '50%',
                        background: Theme.background.default
                    },
                    'i-tab:not(.disabled).active': {
                        background: Theme.background.gradient
                    },
                    '.tab-item': {
                        margin: 'auto'
                    }
                }
            }
        }
    });
});
define("@scom/scom-xchain-widget/formSchema.ts", ["require", "exports", "@scom/scom-network-picker", "@scom/scom-token-input", "@scom/scom-xchain-widget/store/index.ts", "@scom/scom-xchain-widget/data.json.ts"], function (require, exports, scom_network_picker_1, scom_token_input_1, index_20, data_json_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProjectOwnerSchema = exports.getBuilderSchema = void 0;
    const chainIds = (data_json_2.default.supportedNetworks || []).map(v => v.chainId);
    const networks = chainIds.map(v => { return { chainId: v }; });
    const theme = {
        type: 'object',
        properties: {
            backgroundColor: {
                type: 'string',
                format: 'color'
            },
            fontColor: {
                type: 'string',
                format: 'color'
            },
            inputBackgroundColor: {
                type: 'string',
                format: 'color'
            },
            inputFontColor: {
                type: 'string',
                format: 'color'
            },
            maxButtonBackground: {
                type: 'string',
                format: 'color'
            },
            maxButtonHoverBackground: {
                type: 'string',
                format: 'color'
            },
            primaryButtonBackground: {
                type: 'string',
                format: 'color'
            },
            primaryButtonHoverBackground: {
                type: 'string',
                format: 'color'
            },
            primaryButtonDisabledBackground: {
                type: 'string',
                format: 'color'
            }
        }
    };
    const themeUISchema = {
        type: 'Category',
        label: 'Theme',
        elements: [
            {
                type: 'VerticalLayout',
                elements: [
                    {
                        type: 'Group',
                        label: 'Dark',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/backgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/fontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/inputBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/inputFontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/maxButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/maxButtonHoverBackground'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryButtonHoverBackground'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/dark/properties/primaryButtonDisabledBackground'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'Group',
                        label: 'Light',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/backgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/fontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/inputBackgroundColor'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/inputFontColor'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/maxButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/maxButtonHoverBackground'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryButtonBackground'
                                    },
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryButtonHoverBackground'
                                    }
                                ]
                            },
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Control',
                                        scope: '#/properties/light/properties/primaryButtonDisabledBackground'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    function getBuilderSchema() {
        return {
            dataSchema: {
                type: 'object',
                properties: {
                    networks: {
                        type: 'array',
                        required: true,
                        items: {
                            type: 'object',
                            maxItems: chainIds.length,
                            properties: {
                                chainId: {
                                    type: 'number',
                                    enum: chainIds,
                                    required: true
                                }
                            }
                        }
                    },
                    tokens: {
                        type: 'array',
                        required: true,
                        items: {
                            type: 'object',
                            properties: {
                                chainId: {
                                    type: 'number',
                                    enum: chainIds,
                                    required: true
                                },
                                address: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    dark: theme,
                    light: theme
                }
            },
            uiSchema: {
                type: 'Categorization',
                elements: [
                    {
                        type: 'Category',
                        label: 'General',
                        elements: [
                            {
                                type: 'HorizontalLayout',
                                elements: [
                                    {
                                        type: 'Categorization',
                                        elements: [
                                            {
                                                type: 'Category',
                                                label: 'Networks',
                                                elements: [
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/networks',
                                                        options: {
                                                            detail: {
                                                                type: 'VerticalLayout'
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'Category',
                                                label: 'Tokens',
                                                elements: [
                                                    {
                                                        type: 'Control',
                                                        scope: '#/properties/tokens'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    themeUISchema
                ]
            },
            customControls() {
                let networkPickers = [];
                let tokenInputs = [];
                return {
                    '#/properties/networks/properties/chainId': {
                        render: () => {
                            const networkPicker = new scom_network_picker_1.default(undefined, {
                                type: 'combobox',
                                networks
                            });
                            return networkPicker;
                        },
                        getData: (control) => {
                            return control.selectedNetwork?.chainId;
                        },
                        setData: async (control, value) => {
                            await control.ready();
                            control.setNetworkByChainId(value);
                        }
                    },
                    '#/properties/tokens/properties/chainId': {
                        render: () => {
                            const idx = networkPickers.length;
                            networkPickers[idx] = new scom_network_picker_1.default(undefined, {
                                type: 'combobox',
                                networks,
                                onCustomNetworkSelected: () => {
                                    const chainId = networkPickers[idx].selectedNetwork?.chainId;
                                    tokenInputs[idx].chainId = chainId;
                                    tokenInputs[idx].tokenDataListProp = getSupportedTokens(chainId);
                                }
                            });
                            return networkPickers[idx];
                        },
                        getData: (control) => {
                            return control.selectedNetwork?.chainId;
                        },
                        setData: async (control, value) => {
                            await control.ready();
                            control.setNetworkByChainId(value);
                            const idx = networkPickers.findIndex(f => f === control);
                            if (tokenInputs[idx]) {
                                tokenInputs[idx].chainId = value;
                                tokenInputs[idx].tokenDataListProp = getSupportedTokens(value);
                            }
                        }
                    },
                    '#/properties/tokens/properties/address': {
                        render: () => {
                            const idx = tokenInputs.length;
                            tokenInputs[idx] = new scom_token_input_1.default(undefined, {
                                type: 'combobox',
                                isBalanceShown: false,
                                isBtnMaxShown: false,
                                isInputShown: false,
                                supportValidAddress: true
                            });
                            const chainId = networkPickers[idx]?.selectedNetwork?.chainId;
                            tokenInputs[idx].chainId = chainId;
                            tokenInputs[idx].tokenDataListProp = getSupportedTokens(chainId);
                            return tokenInputs[idx];
                        },
                        getData: (control) => {
                            return control.token?.address || control.token?.symbol;
                        },
                        setData: (control, value, rowData) => {
                            if (rowData)
                                control.chainId = rowData.chainId;
                            control.address = value;
                        }
                    }
                };
            }
        };
    }
    exports.getBuilderSchema = getBuilderSchema;
    const getSupportedTokens = (chainId) => {
        return index_20.SupportedERC20Tokens[chainId] || [];
    };
    function getProjectOwnerSchema() {
        return null;
    }
    exports.getProjectOwnerSchema = getProjectOwnerSchema;
});
define("@scom/scom-xchain-widget/model/configModel.ts", ["require", "exports", "@ijstech/components", "@scom/scom-xchain-widget/formSchema.ts", "@scom/scom-xchain-widget/crosschain-utils/index.ts", "@scom/scom-commission-fee-setup", "@scom/scom-token-list", "@scom/scom-xchain-widget/data.json.ts"], function (require, exports, components_16, formSchema_1, index_21, scom_commission_fee_setup_1, scom_token_list_6, data_json_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigModel = void 0;
    const Theme = components_16.Styles.Theme.ThemeVars;
    class ConfigModel {
        constructor(module, state, options) {
            this.options = {
                refreshWidget: async () => { },
                resetRpcWallet: () => { },
                setContainerTag: (value) => { },
                updateTheme: () => { },
                resizeBridgeRecord: (value) => { }
            };
            this._tokens = [];
            this._data = {
                defaultChainId: 0,
                wallets: [],
                tokens: [],
                networks: []
            };
            this.getTokenObjArr = (tokens) => {
                let tokenObjArr = [];
                for (let token of tokens) {
                    let tokenMap = scom_token_list_6.tokenStore.getTokenMapByChainId(token.chainId);
                    const tokenAddress = token.address?.startsWith('0x') ? token.address.toLowerCase() : scom_token_list_6.ChainNativeTokenByChainId[token.chainId].symbol;
                    const tokenObj = tokenMap[tokenAddress];
                    if (tokenObj) {
                        tokenObjArr.push({ ...tokenObj, chainId: token.chainId });
                    }
                }
                return tokenObjArr;
            };
            this.state = state;
            this.module = module;
            this.options = options;
        }
        get defaultChainId() {
            return this._data.defaultChainId;
        }
        set defaultChainId(value) {
            this._data.defaultChainId = value;
        }
        get wallets() {
            return this._data.wallets ?? [];
        }
        set wallets(value) {
            this._data.wallets = value;
        }
        get networks() {
            return this._data.networks ?? [];
        }
        set networks(value) {
            this._data.networks = value;
        }
        get showHeader() {
            return this._data.showHeader ?? true;
        }
        set showHeader(value) {
            this._data.showHeader = value;
        }
        get campaignId() {
            return this._data.campaignId;
        }
        get defaultInputToken() {
            return this._data.defaultInputToken;
        }
        get tokens() {
            return this._tokens || [];
        }
        async setData(value) {
            this._data = value;
            this.state.setNetworkConfig(value.networks);
            for (let network of this._data.networks) {
                scom_token_list_6.tokenStore.updateTokenMapData(network.chainId);
            }
            this._tokens = this.getTokenObjArr(this._data.tokens);
            await this.options.resetRpcWallet();
            await this.options.refreshWidget();
        }
        getData() {
            return this._data;
        }
        getTag() {
            return this.module.tag;
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this.module.tag[prop] = newValue[prop];
                }
            }
            this.options.setContainerTag(this.module.tag);
            this.options.updateTheme();
            this.options.resizeBridgeRecord();
        }
        updateTag(type, value) {
            this.module.tag[type] = this.module.tag[type] ?? {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.module.tag[type][prop] = value[prop];
            }
        }
        async loadCommissionFee() {
            if (this._data.campaignId && this.state.embedderCommissionFee === undefined) {
                const commissionRate = await (0, index_21.getCommissionRate)(this.state, this._data.campaignId);
                this.state.embedderCommissionFee = commissionRate;
            }
        }
        getBuilderActions(category) {
            const formSchema = (0, formSchema_1.getBuilderSchema)();
            const dataSchema = formSchema.dataSchema;
            const uiSchema = formSchema.uiSchema;
            const customControls = formSchema.customControls();
            let self = this;
            const actions = [
                {
                    name: 'Commissions',
                    icon: 'dollar-sign',
                    command: (builder, userInputData) => {
                        let _oldData = {
                            defaultChainId: 0,
                            wallets: [],
                            networks: []
                        };
                        return {
                            execute: async () => {
                                _oldData = { ...this._data };
                                if (userInputData.commissions)
                                    this._data.commissions = userInputData.commissions;
                                this.options.refreshWidget();
                                if (builder?.setData)
                                    builder.setData(this._data);
                            },
                            undo: () => {
                                this._data = { ..._oldData };
                                this.options.refreshWidget();
                                if (builder?.setData)
                                    builder.setData(this._data);
                            },
                            redo: () => { }
                        };
                    },
                    customUI: {
                        render: async (data, onConfirm) => {
                            const vstack = new components_16.VStack();
                            await self.loadCommissionFee();
                            const config = new scom_commission_fee_setup_1.default(null, {
                                commissions: self._data.commissions || [],
                                fee: self.state.embedderCommissionFee,
                                networks: self._data.networks
                            });
                            const hstack = new components_16.HStack(null, {
                                verticalAlignment: 'center',
                            });
                            const button = new components_16.Button(hstack, {
                                caption: 'Confirm',
                                width: '100%',
                                height: 40,
                                font: { color: Theme.colors.primary.contrastText }
                            });
                            vstack.append(config);
                            vstack.append(hstack);
                            button.onClick = async () => {
                                const commissions = config.commissions;
                                if (onConfirm)
                                    onConfirm(true, { commissions });
                            };
                            return vstack;
                        }
                    }
                }
            ];
            if (category && category !== 'offers') {
                actions.push({
                    name: 'Edit',
                    icon: 'edit',
                    command: (builder, userInputData) => {
                        let oldData = {
                            defaultChainId: 0,
                            wallets: [],
                            networks: []
                        };
                        let oldTag = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                const { networks, tokens, ...themeSettings } = userInputData;
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
                                await this.options.resetRpcWallet();
                                this.options.refreshWidget();
                                if (builder?.setData)
                                    builder.setData(this._data);
                                oldTag = JSON.parse(JSON.stringify(this.module.tag));
                                if (builder?.setTag)
                                    builder.setTag(themeSettings);
                                else
                                    this.setTag(themeSettings);
                                this.options.setContainerTag(themeSettings);
                            },
                            undo: () => {
                                this._data = JSON.parse(JSON.stringify(oldData));
                                this.options.refreshWidget();
                                if (builder?.setData)
                                    builder.setData(this._data);
                                this.module.tag = JSON.parse(JSON.stringify(oldTag));
                                if (builder?.setTag)
                                    builder.setTag(this.module.tag);
                                else
                                    this.setTag(this.module.tag);
                                this.options.setContainerTag(this.module.tag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: dataSchema,
                    userInputUISchema: uiSchema,
                    customControls: customControls
                });
            }
            return actions;
        }
        getProjectOwnerActions() {
            const formSchema = (0, formSchema_1.getProjectOwnerSchema)();
            if (!formSchema)
                return [];
            const propertiesDataSchema = formSchema.general.dataSchema;
            const propertiesUISchema = formSchema.general.uiSchema;
            const actions = [
                {
                    name: 'Settings',
                    userInputDataSchema: propertiesDataSchema,
                    userInputUISchema: propertiesUISchema
                }
            ];
            return actions;
        }
        determineActionsByTarget(target, category) {
            if (target === 'builder') {
                return this.getBuilderActions(category);
            }
            else {
                return this.getProjectOwnerActions();
            }
        }
        getConfigurators() {
            let self = this;
            return [
                {
                    name: 'Project Owner Configurator',
                    target: 'Project Owners',
                    getActions: (category) => {
                        return this.determineActionsByTarget('projectOwner', category);
                    },
                    getData: this.getData.bind(this),
                    setData: async (value) => {
                        this.setData(value);
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: (category) => {
                        return this.determineActionsByTarget('builder', category);
                    },
                    getData: this.getData.bind(this),
                    setData: async (value) => {
                        const defaultData = data_json_3.default.defaultBuilderData;
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
                        };
                    },
                    bindOnChanged: (element, callback) => {
                        element.onChanged = async (data) => {
                            const commissions = data.commissions;
                            if (commissions) {
                                this.supportedChainIds = commissions.map(v => v.chainId).filter((v, i, a) => a.indexOf(v) === i);
                            }
                            let resultingData = {
                                ...self._data,
                                ...data
                            };
                            await this.setData(resultingData);
                            await callback(data);
                        };
                    },
                    getData: async () => {
                        await self.loadCommissionFee();
                        const fee = this.state.embedderCommissionFee;
                        return { ...this._data, fee };
                    },
                    setData: async (properties, linkParams) => {
                        let resultingData = {
                            ...properties
                        };
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
                    getActions: (category) => {
                        const actions = this.determineActionsByTarget('builder', 'category');
                        const editAction = actions.find(action => action.name === 'Edit');
                        return editAction ? [editAction] : [];
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
    }
    exports.ConfigModel = ConfigModel;
});
define("@scom/scom-xchain-widget/model/xchainModel.ts", ["require", "exports", "@scom/scom-token-list", "@scom/scom-xchain-widget/global/index.ts", "@ijstech/eth-contract"], function (require, exports, scom_token_list_7, index_22, eth_contract_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XchainModel = void 0;
    const ROUNDING_NUMBER = eth_contract_1.BigNumber.ROUND_DOWN;
    class XchainModel {
        constructor(module, state, configModel, options) {
            this.options = {
                showModalFees: () => { }
            };
            this._supportedChainList = [];
            this.getSupportedTokens = (tokens, chainId) => {
                return tokens.filter(token => token.chainId === chainId) || [];
            };
            this.getSupportedChainList = (updateList) => {
                const list = this.state.getMatchNetworks({ isDisabled: false });
                const testnetSupportedList = list.filter(v => v.isTestnet && this.configModel.networks.some(n => n.chainId == v.chainId));
                const mainnetSupportedList = list.filter(v => !v.isTestnet && this.configModel.networks.some(n => n.chainId == v.chainId));
                const isMainnet = mainnetSupportedList.some((item) => item.chainId == this.chainId);
                const supportList = isMainnet ? mainnetSupportedList : testnetSupportedList;
                if (updateList)
                    this._supportedChainList = supportList;
                return supportList;
            };
            this.onUpdateEstimatedPosition = (isFrom, reverseRouting = false) => {
                if (this.isFrom != isFrom) {
                    this.isFrom = isFrom;
                }
            };
            this.isEstimated = (tokenPosition, strict = false) => {
                if (tokenPosition === 'from') {
                    return strict ? this.isFrom && !this.fromInputValue.isZero() : this.isFrom;
                }
                else if (tokenPosition === 'to') {
                    return strict ? !this.isFrom && !this.toInputValue.isZero() : !this.isFrom;
                }
                else {
                    return false;
                }
            };
            this.isMaxDisabled = () => {
                const address = this.fromToken?.address || this.fromToken?.symbol;
                let balance = this.getBalance(this.fromToken);
                return !address || new eth_contract_1.BigNumber(balance).isLessThanOrEqualTo(0);
            };
            this.module = module;
            this.state = state;
            this.configModel = configModel;
            this.options = options;
            this.fromInputValue = new eth_contract_1.BigNumber(0);
            this.toInputValue = new eth_contract_1.BigNumber(0);
        }
        get isFrom() {
            return this._isFrom;
        }
        set isFrom(value) {
            this._isFrom = value;
        }
        get fromInputValue() {
            return this._fromInputValue;
        }
        set fromInputValue(value) {
            this._fromInputValue = value;
        }
        get toInputValue() {
            return this._toInputValue;
        }
        set toInputValue(value) {
            this._toInputValue = value;
        }
        get record() {
            return this._record;
        }
        set record(value) {
            this._record = value;
        }
        get fromToken() {
            return this._fromToken;
        }
        set fromToken(token) {
            this._fromToken = token;
        }
        get toToken() {
            return this._toToken;
        }
        set toToken(token) {
            this._toToken = token;
        }
        get desChain() {
            return this._desChain;
        }
        set desChain(value) {
            this._desChain = value;
        }
        get srcChain() {
            return this._srcChain;
        }
        set srcChain(value) {
            this._srcChain = value;
        }
        get targetChainId() {
            return this._targetChainId;
        }
        set targetChainId(value) {
            this._targetChainId = value;
        }
        get isInsufficientBalance() {
            if (!this.fromToken && !this.record)
                return false;
            const balance = this.getBalance(this.fromToken);
            return this.record?.fromAmount && this.record.fromAmount.gt(balance);
        }
        get isValidToken() {
            try {
                return !!this.fromToken.symbol && !!this.toToken.symbol;
            }
            catch {
                return false;
            }
        }
        get targetTokenMap() {
            const chainId = this.desChain?.chainId || this.targetChainId || this.state.getChainId();
            return scom_token_list_7.tokenStore.getTokenMapByChainId(chainId);
        }
        get defaultTargetChainId() {
            return this._supportedChainList.find(v => v.chainId !== this.state.getChainId())?.chainId;
        }
        get supportedChainList() {
            return this._supportedChainList || [];
        }
        get chainId() {
            return this._chainId;
        }
        set chainId(value) {
            this._chainId = value;
        }
        getBalance(token) {
            if (!token)
                return '0';
            let tokenBalances = scom_token_list_7.tokenStore.getTokenBalancesByChainId(token.chainId);
            if (!tokenBalances)
                return '0';
            const address = token.address || '';
            let balance = address ? tokenBalances[address.toLowerCase()] ?? '0' : tokenBalances[token.symbol] || '0';
            return balance;
        }
        getInputValue(isFrom) {
            const token = isFrom ? this.fromToken : this.toToken;
            const value = isFrom ? this.fromInputValue : this.toInputValue;
            if (!value || value.isNaN())
                return '';
            const newValue = value.dp(token?.decimals || 18, ROUNDING_NUMBER).toFixed();
            return newValue;
        }
        calculateDefaultTokens() {
            let firstDefaultToken;
            let secondDefaultToken;
            const currentChainId = this.state.getChainId();
            const targetChainId = this.desChain?.chainId || this.targetChainId || currentChainId;
            const currentChainTokens = this.getSupportedTokens(this.configModel.tokens, currentChainId);
            const targetChainTokens = this.getSupportedTokens(this.configModel.tokens, targetChainId);
            if (!this.configModel.defaultInputToken) {
                firstDefaultToken = currentChainTokens[0];
                secondDefaultToken = targetChainTokens[0];
            }
            else {
                if (this.configModel.defaultInputToken && currentChainId === this.configModel.defaultInputToken.chainId) {
                    let inputTokens = this.getSupportedTokens(this.configModel.tokens, this.configModel.defaultInputToken.chainId);
                    firstDefaultToken = inputTokens.find(v => v.chainId === this.configModel.defaultInputToken.chainId && v.address === this.configModel.defaultInputToken.address);
                }
                else {
                    firstDefaultToken = currentChainTokens[0];
                }
                secondDefaultToken = targetChainTokens[0];
            }
            return {
                firstDefaultToken,
                secondDefaultToken
            };
        }
        updateToken(token, isFrom, tokenInput) {
            if (!token)
                return;
            if (isFrom) {
                this.fromToken = token;
                if (this.fromInputValue.gt(0)) {
                    const formattedValue = new eth_contract_1.BigNumber(this.fromInputValue).dp(token.decimals || 18, ROUNDING_NUMBER).toFixed();
                    if (!this.fromInputValue.eq(formattedValue)) {
                        if (tokenInput) {
                            tokenInput.value = formattedValue === '0' ? '' : formattedValue;
                        }
                        this.fromInputValue = new eth_contract_1.BigNumber(formattedValue);
                    }
                }
                else if (this.fromInputValue.isZero()) {
                    this.onUpdateEstimatedPosition(true);
                }
            }
            else {
                this.toToken = token;
                if (this.toInputValue.gt(0)) {
                    const formattedValue = new eth_contract_1.BigNumber(this.toInputValue).dp(token.decimals || 18, ROUNDING_NUMBER).toFixed();
                    if (!this.toInputValue.eq(formattedValue)) {
                        if (tokenInput) {
                            tokenInput.value = formattedValue === '0' ? '' : formattedValue;
                        }
                        this.toInputValue = new eth_contract_1.BigNumber(formattedValue);
                    }
                }
                else if (this.toInputValue.isZero()) {
                    this.onUpdateEstimatedPosition(false);
                }
            }
        }
        async updateChain(network) {
            const oldDestination = this.desChain;
            try {
                this.desChain = network;
                this.targetChainId = this.desChain.chainId;
                await scom_token_list_7.tokenStore.updateTokenBalancesByChainId(this.targetChainId);
            }
            catch (err) {
                console.log('err', err);
                if (oldDestination) {
                    this.desChain = oldDestination;
                }
                else {
                    this.desChain = this._supportedChainList[0];
                }
            }
        }
        getTradeFeeExactAmount() {
            const tradeFee = this.record?.feeAmounts.totalFeeAmount;
            if (tradeFee) {
                return `${(0, index_22.formatNumber)(tradeFee)} ${this.fromToken?.symbol}`;
            }
            return '-';
        }
        getFeeDetails() {
            if (this.record) {
                let feeAmounts = this.record.feeAmounts;
                let detail = [
                    {
                        title: this.module.i18n.get('$base_fee'),
                        description: this.module.i18n.get('$this_fee_is_paid_to_the_trolls_to_cover_gas_fee_on_the_target_chain'),
                        value: feeAmounts.baseFeeAmount,
                    },
                    {
                        title: this.module.i18n.get("$bridge_vault_liquidity_fee"),
                        description: this.module.i18n.get('$this_fee_is_paid_to_the_bridge_vault_liquidity_provider_on_target_chain'),
                        value: feeAmounts.transactionFeeAmount,
                    },
                    {
                        title: this.module.i18n.get("$protocol_fee"),
                        description: this.module.i18n.get('$this_fee_is_paid_to_the_troll_owners_on_the_cross_chain_network'),
                        value: feeAmounts.protocolFeeAmount,
                    },
                    {
                        title: this.module.i18n.get("$imbalance_fee"),
                        description: this.module.i18n.get('$this_fee_is_acted_as_an_incentive_to_balance_the_vault'),
                        value: feeAmounts.imbalanceFeeAmount,
                    }
                ];
                return detail;
            }
            return [];
        }
        getPriceInfo() {
            const tradeFeeExactAmount = this.getTradeFeeExactAmount();
            const fees = this.getFeeDetails();
            const countFees = fees.length;
            let feeTooltip;
            if (countFees === 1) {
                const fee = fees[0];
                feeTooltip = `${fee.description}`;
            }
            else if (countFees > 1) {
                feeTooltip = fees;
            }
            let info = [
                {
                    title: "$transaction_fee",
                    value: this.isValidToken ? tradeFeeExactAmount : '-',
                    tooltip: feeTooltip,
                    onClick: countFees > 1 ? () => this.options.showModalFees() : null
                },
                {
                    title: "$estimated_time",
                    value: this.isValidToken && this.record ? '$30_seconds' : '-',
                },
            ];
            return info.filter((f) => !f.isHidden);
        }
    }
    exports.XchainModel = XchainModel;
});
define("@scom/scom-xchain-widget/model/index.ts", ["require", "exports", "@scom/scom-xchain-widget/model/configModel.ts", "@scom/scom-xchain-widget/model/xchainModel.ts"], function (require, exports, configModel_1, xchainModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XchainModel = exports.ConfigModel = void 0;
    Object.defineProperty(exports, "ConfigModel", { enumerable: true, get: function () { return configModel_1.ConfigModel; } });
    Object.defineProperty(exports, "XchainModel", { enumerable: true, get: function () { return xchainModel_1.XchainModel; } });
});
define("@scom/scom-xchain-widget", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-xchain-widget/store/index.ts", "@scom/scom-xchain-widget/global/index.ts", "@scom/scom-xchain-widget/crosschain-utils/index.ts", "@scom/scom-xchain-widget/price-info/index.tsx", "@scom/scom-token-list", "@scom/scom-xchain-widget/expert-mode-settings/index.tsx", "@scom/scom-xchain-widget/transaction-settings/index.tsx", "@scom/scom-xchain-widget/bridge-record/index.tsx", "@scom/scom-xchain-widget/index.css.ts", "@scom/scom-xchain-widget/data.json.ts", "@scom/scom-blocknote-sdk", "@scom/scom-xchain-widget/languages/index.ts", "@scom/scom-xchain-widget/model/index.ts"], function (require, exports, components_17, eth_wallet_8, index_23, index_24, index_25, index_26, scom_token_list_8, index_27, index_28, index_29, index_css_4, data_json_4, scom_blocknote_sdk_1, index_30, index_31) {
    "use strict";
    var ScomXchainWidget_1;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApprovalStatus = void 0;
    const Theme = components_17.Styles.Theme.ThemeVars;
    var ApprovalStatus;
    (function (ApprovalStatus) {
        ApprovalStatus[ApprovalStatus["TO_BE_APPROVED"] = 0] = "TO_BE_APPROVED";
        ApprovalStatus[ApprovalStatus["APPROVING"] = 1] = "APPROVING";
        ApprovalStatus[ApprovalStatus["NONE"] = 2] = "NONE";
    })(ApprovalStatus = exports.ApprovalStatus || (exports.ApprovalStatus = {}));
    const defaultInput = '1';
    let ScomXchainWidget = ScomXchainWidget_1 = class ScomXchainWidget extends components_17.Module {
        constructor(parent, options) {
            super(parent, options);
            this.swapButtonText = '';
            this._lastUpdated = 0;
            this.lastUpdatedText = '';
            this.estimateMsg = '';
            this.payOrReceiveText = '';
            // Cross Chain
            this.crossChainApprovalStatus = ApprovalStatus.NONE;
            this.oldSupportedChainList = [];
            this.isInited = false;
            this.tag = {};
            this.fixedNumber = (value) => {
                const val = typeof value === 'object' ? value : new eth_wallet_8.BigNumber(value);
                if (val.isNaN())
                    return '0';
                let formatted = '';
                if (val.gte(1)) {
                    formatted = val.toNumber().toLocaleString('en-US', { maximumFractionDigits: 4 });
                }
                else {
                    formatted = val.toNumber().toLocaleString('en-US', { maximumSignificantDigits: 4 });
                }
                return formatted.replace(/,/g, '');
            };
            this.initWallet = async () => {
                try {
                    await eth_wallet_8.Wallet.getClientInstance().init();
                    const rpcWallet = this.state.getRpcWallet();
                    await rpcWallet.init();
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.initializeWidgetConfig = async () => {
                setTimeout(async () => {
                    await this.initWallet();
                    this.xchainModel.calculateDefaultTokens();
                    this.xchainModel.chainId = this.state.getChainId();
                    this.swapButtonText = this.getSwapButtonText();
                    await this.updateBalances();
                    await this.renderChainList();
                    await (0, index_25.getVaultGroups)(this.state, true);
                    this.initRoutes();
                    this.xchainModel.toInputValue = new eth_wallet_8.BigNumber(0);
                    if (this.secondTokenInput) {
                        this.secondTokenInput.value = '-';
                        this.secondTokenInput.inputReadOnly = true;
                        this.secondTokenInput.classList.add('cursor-input--default');
                    }
                    if (this.xchainModel.isEstimated('from')) {
                        this.xchainModel.onUpdateEstimatedPosition(false, true);
                    }
                    this.firstTokenInput.chainId = this.xchainModel.srcChain?.chainId || this.chainId;
                    this.secondTokenInput.chainId = this.xchainModel.desChain?.chainId || this.xchainModel.targetChainId;
                    this.setDefaultToken();
                    this.setGroupToken(true);
                    if (this.xchainModel.fromInputValue.isGreaterThanOrEqualTo(0)) {
                        this.xchainModel.onUpdateEstimatedPosition(false, true);
                        this.firstTokenInput.value = this.fixedNumber(this.xchainModel.fromInputValue);
                    }
                    else if (this.xchainModel.toInputValue.isGreaterThanOrEqualTo(0)) {
                        this.xchainModel.onUpdateEstimatedPosition(true, true);
                        this.secondTokenInput.value = this.fixedNumber(this.xchainModel.toInputValue);
                        this.secondTokenInput.inputReadOnly = true;
                        this.secondTokenInput.classList.add('cursor-input--default');
                    }
                    this.firstTokenInput.tokenDataListProp = this.xchainModel.getSupportedTokens(this.configModel.tokens, this.xchainModel.fromToken.chainId);
                    this.secondTokenInput.tokenDataListProp = this.xchainModel.getSupportedTokens(this.configModel.tokens, this.xchainModel.toToken.chainId);
                    this.actionSetting?.classList.remove("hidden");
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.lastUpdated++;
                    }, 1000);
                    this.lastUpdated = 0;
                    if (!this.xchainModel.record)
                        this.swapBtn.classList.add('hidden');
                    this.onRenderPriceInfo();
                    await this.handleAddRoute();
                });
            };
            this.onChainChange = async () => {
                this.xchainModel.chainId = this.state.getChainId();
                scom_token_list_8.tokenStore.updateTokenMapData(this.chainId);
                if (this.chainId != null && this.chainId != undefined)
                    this.swapBtn.classList.remove('hidden');
                this.initializeWidgetConfig();
                this.swapButtonText = this.getSwapButtonText();
            };
            this.setDefaultToken = () => {
                const { desChain, targetChainId: mTargetChainId, targetTokenMap } = this.xchainModel;
                let lstTokenMap = Object.values(scom_token_list_8.tokenStore.getTokenMapByChainId(this.chainId));
                const supportedTokens = index_23.SupportedERC20Tokens[this.chainId] || [];
                lstTokenMap = lstTokenMap.filter(v => supportedTokens.some(token => token.address?.toLowerCase() === v.address?.toLowerCase()));
                const defaultCrossChainToken = lstTokenMap.find((v) => v.address);
                const targetChainId = desChain?.chainId || mTargetChainId || this.state.getChainId();
                const supportedTargetTokens = index_23.SupportedERC20Tokens[targetChainId] || [];
                let lstTargetTokenMap = Object.values(targetTokenMap);
                lstTargetTokenMap = lstTargetTokenMap.filter(v => supportedTargetTokens.some(token => token.address?.toLowerCase() === v.address?.toLowerCase()));
                const oswapIndex = lstTargetTokenMap.findIndex((item) => item.symbol === 'OSWAP');
                if (oswapIndex > 0) {
                    [lstTargetTokenMap[0], lstTargetTokenMap[oswapIndex]] = [lstTargetTokenMap[oswapIndex], lstTargetTokenMap[0]];
                }
                if (this.fromTokenSymbol && this.toTokenSymbol) {
                    const firstObj = lstTokenMap.find((item) => this.fromTokenSymbol === item.symbol || this.fromTokenSymbol === item.address);
                    const secondObj = lstTargetTokenMap.find((item) => this.toTokenSymbol === item.symbol || this.toTokenSymbol === item.address);
                    this.xchainModel.fromToken = firstObj || defaultCrossChainToken;
                    this.xchainModel.toToken = secondObj || lstTargetTokenMap[0];
                    this.onUpdateToken(this.xchainModel.fromToken, true);
                    this.onUpdateToken(this.xchainModel.toToken, false);
                    this.firstTokenInput.token = this.xchainModel.fromToken;
                    this.secondTokenInput.token = this.xchainModel.toToken;
                    this.xchainModel.fromInputValue = new eth_wallet_8.BigNumber(this.xchainModel.fromInputValue.toNumber() || defaultInput);
                }
                else {
                    this.xchainModel.fromInputValue = new eth_wallet_8.BigNumber(defaultInput);
                    let firstDefaultToken = defaultCrossChainToken;
                    let secondDefaultToken = lstTargetTokenMap.find((v) => v.symbol === defaultCrossChainToken.symbol) || lstTokenMap.find((v) => v.symbol === 'USDT' || v.symbol === 'USDT.e');
                    if (firstDefaultToken && secondDefaultToken) {
                        this.xchainModel.fromInputValue = new eth_wallet_8.BigNumber(defaultInput);
                        this.onUpdateToken(firstDefaultToken, true);
                        this.onUpdateToken(secondDefaultToken, false);
                        this.firstTokenInput.token = this.xchainModel.fromToken;
                        this.secondTokenInput.token = this.xchainModel.toToken;
                    }
                }
            };
            this.getMinReceivedMaxSold = () => {
                const slippageTolerance = this.state.getSlippageTolerance();
                if (!slippageTolerance || !this.xchainModel.record)
                    return null;
                const amount = new eth_wallet_8.BigNumber(this.xchainModel.isFrom ? this.xchainModel.record.fromAmount : this.xchainModel.record.toAmount);
                if (amount.isZero())
                    return null;
                const minReceivedMaxSold = amount.dividedBy(1 + slippageTolerance / 100).toNumber();
                return minReceivedMaxSold;
            };
            this.onSwapConfirming = () => {
                if (!this.swapBtn.rightIcon.visible)
                    this.swapBtn.rightIcon.visible = true;
                this.swapButtonText = this.getSwapButtonText();
            };
            this.onSwapConfirmed = async () => {
                if (this.swapBtn.rightIcon.visible)
                    this.swapBtn.rightIcon.visible = false;
                this.swapButtonText = this.getSwapButtonText();
                await this.handleAddRoute();
                // this.showViewOrderModal();
            };
            this.onSubmit = async () => {
                try {
                    this.swapModal.visible = false;
                    (0, index_24.showResultMessage)(this.txStatusModal, 'warning', this.i18n.get('$swapping', {
                        from: `${(0, index_24.formatNumber)(this.xchainModel.fromInputValue, 4)} ${this.xchainModel.fromToken?.symbol}`,
                        to: `${(0, index_24.formatNumber)(this.xchainModel.toInputValue, 4)} ${this.xchainModel.toToken?.symbol}`
                    }));
                    if (this.xchainModel.toToken && this.xchainModel.fromToken && this.xchainModel.desChain) {
                        const { error } = await (0, index_25.createBridgeVaultOrder)(this.state, {
                            vaultAddress: this.xchainModel.record.fromVault.vaultAddress,
                            targetChainId: this.xchainModel.desChain.chainId,
                            tokenIn: this.xchainModel.fromToken,
                            tokenOut: this.xchainModel.toToken,
                            amountIn: this.xchainModel.record.fromAmount.toFixed(),
                            minAmountOut: this.xchainModel.record.toAmount.dividedBy(new eth_wallet_8.BigNumber("1").plus(index_23.orderMinOutRate)).toFixed(),
                        });
                        if (error) {
                            (0, index_24.showResultMessage)(this.txStatusModal, 'error', error);
                        }
                    }
                }
                catch (error) {
                    console.error(error);
                }
            };
            this.onApproveRouterMax = () => {
                (0, index_24.showResultMessage)(this.txStatusModal, 'warning', this.i18n.get('$approving'));
                this.setApprovalModalSpenderAddress();
                this.approvalModelAction.doApproveAction(this.xchainModel.fromToken, this.xchainModel.fromInputValue.toString(), this.xchainModel.record);
            };
            this.onSetMaxBalance = async (value) => {
                if (!this.xchainModel.fromToken?.symbol)
                    return;
                this.xchainModel.isFrom = false;
                const address = this.xchainModel.fromToken?.address || this.xchainModel.fromToken?.symbol;
                let balance = this.xchainModel.getBalance(this.xchainModel.fromToken);
                let inputVal = new eth_wallet_8.BigNumber(balance);
                if (!address) {
                    inputVal = new eth_wallet_8.BigNumber(0);
                }
                if (value == 0 || value) {
                    inputVal = inputVal.multipliedBy(value).dividedBy(100);
                }
                if (inputVal.eq(this.xchainModel.fromInputValue))
                    return;
                this.xchainModel.fromInputValue = inputVal;
                this.firstTokenInput.value = this.xchainModel.fromInputValue.toString();
                await this.handleAddRoute();
            };
            this.onRefresh = async (source) => {
                source.enabled = false;
                await this.handleAddRoute();
                source.enabled = true;
            };
            this.onSetting = () => {
                this.transactionModal.showModal();
            };
            this.onShowSourceChain = () => {
                if (this.isSrcOpened) {
                    this.mdSourceChain.visible = false;
                }
                else {
                    this.isSrcOpened = true;
                    this.mdSourceChain.visible = true;
                }
            };
            this.onCloseSourceChain = () => {
                setTimeout(() => {
                    this.isSrcOpened = false;
                });
            };
            this.onShowDestinationChain = () => {
                if (this.isDesOpened) {
                    this.mdDestinationChain.visible = false;
                }
                else {
                    this.isDesOpened = true;
                    this.mdDestinationChain.visible = true;
                }
            };
            this.onCloseDesChain = () => {
                setTimeout(() => {
                    this.isDesOpened = false;
                });
            };
            this.disableSelectChain = (disabled, isDes) => {
                const btnChain = isDes ? this.btnDestinationChain : this.btnSourceChain;
                if (btnChain)
                    btnChain.enabled = !disabled;
            };
            this.selectSourceChain = async (network) => {
                const { chainId, isCrossChainSupported } = network;
                const srcChain = this.xchainModel.srcChain;
                if ((srcChain && srcChain.chainId != chainId) || !srcChain) {
                    const rpcWallet = this.state.getRpcWallet();
                    await rpcWallet.switchNetwork(network.chainId);
                    if (!isCrossChainSupported) {
                        this.selectDestinationChain(network);
                    }
                    this.xchainModel.srcChain = network;
                    const networkImg = this.btnSourceChain.querySelector('i-image');
                    if (networkImg)
                        this.btnSourceChain.removeChild(networkImg);
                    this.btnSourceChain.prepend(this.$render("i-image", { width: 30, height: 30, url: this.xchainModel.srcChain.image }));
                    this.btnSourceChain.caption = `${this.xchainModel.srcChain.chainId} - ${this.xchainModel.srcChain.chainName}`;
                }
            };
            this.selectDestinationChain = async (network) => {
                this.disableSelectChain(true, true);
                await this.xchainModel.updateChain(network);
                const networkImg = this.btnDestinationChain.querySelector('i-image');
                if (networkImg)
                    this.btnDestinationChain.removeChild(networkImg);
                if (this.xchainModel.desChain) {
                    this.xchainModel.targetChainId = this.xchainModel.desChain.chainId;
                    this.btnDestinationChain.prepend(this.$render("i-image", { width: 30, height: 30, url: this.xchainModel.desChain.image }));
                    this.btnDestinationChain.caption = `${this.xchainModel.desChain.chainId} - ${this.xchainModel.desChain.chainName}`;
                }
                else {
                    this.btnDestinationChain.caption = '$destination_chain';
                }
                this.secondTokenInput.tokenDataListProp = this.xchainModel.getSupportedTokens(this.configModel.tokens, this.xchainModel.desChain?.chainId);
                this.disableSelectChain(false, true);
            };
            this.onSourceChainChanged = () => {
                this.xchainModel.getSupportedChainList(true);
                if (!this.chainId)
                    this.xchainModel.chainId = this.supportedChainList[0].chainId;
                const currentNetwork = this.supportedChainList.find((f) => f.chainId == this.chainId);
                this.xchainModel.srcChain = currentNetwork;
                const networkImg = this.btnSourceChain.querySelector('i-image');
                if (networkImg)
                    this.btnSourceChain.removeChild(networkImg);
                if (this.xchainModel.srcChain) {
                    this.btnSourceChain.prepend(this.$render("i-image", { width: 30, height: 30, url: this.xchainModel.srcChain.image }));
                    this.btnSourceChain.caption = `${this.xchainModel.srcChain.chainId} - ${this.xchainModel.srcChain.chainName}`;
                }
                else {
                    this.btnSourceChain.caption = '$source_chain';
                }
            };
            this.onSelectSourceChain = async (obj) => {
                this.mdSourceChain.visible = false;
                if (obj.chainId === this.xchainModel.srcChain?.chainId)
                    return;
                this.firstTokenInput.chainId = obj.chainId;
                await this.selectSourceChain(obj);
            };
            this.onSelectDestinationChain = async (obj) => {
                this.mdDestinationChain.visible = false;
                if (obj.chainId === this.xchainModel.desChain?.chainId)
                    return;
                this.secondTokenInput.chainId = obj.chainId;
                await this.selectDestinationChain(obj);
                this.initializeWidgetConfig();
            };
            this.setDefaultChain = async () => {
                if (this.supportedChainList && this.supportedChainList.length) {
                    let obj = this.supportedChainList.find((f) => f.chainId == this.chainId);
                    if (!obj)
                        obj = this.supportedChainList[0];
                    if (!this.xchainModel.srcChain && obj) {
                        await this.selectSourceChain(obj);
                    }
                    this.onSourceChainChanged();
                    const targetId = this.xchainModel.targetChainId === this.chainId ? this.defaultTargetChainId : (this.xchainModel.targetChainId || this.defaultTargetChainId);
                    const targetChain = this.supportedChainList.find((f) => f.chainId == targetId);
                    const isSupported = targetChain && targetChain.isCrossChainSupported;
                    if ((!this.xchainModel.desChain || this.xchainModel.desChain?.chainId === this.chainId) && isSupported) {
                        await this.selectDestinationChain(targetChain);
                    }
                    else if (!isSupported && obj) {
                        await this.selectDestinationChain(obj);
                    }
                    else {
                        await scom_token_list_8.tokenStore.updateTokenBalancesByChainId(this.xchainModel.desChain?.chainId || this.xchainModel.targetChainId);
                        if (this.xchainModel.toToken) {
                            const balance = this.xchainModel.getBalance(this.xchainModel.toToken);
                            this.receiveBalance.caption = `${this.i18n.get('$balance')}: ${(0, index_24.formatNumber)(balance, 4)} ${this.xchainModel.toToken.symbol}`;
                        }
                        this.secondTokenInput.tokenDataListProp = this.xchainModel.getSupportedTokens(this.configModel.tokens, this.xchainModel.desChain?.chainId || this.xchainModel.targetChainId);
                    }
                    const networkImg = this.btnDestinationChain.querySelector('i-image');
                    if (networkImg)
                        this.btnDestinationChain.removeChild(networkImg);
                    if (this.xchainModel.desChain) {
                        this.btnDestinationChain.prepend(this.$render("i-image", { width: 30, height: 30, url: this.xchainModel.desChain.image }));
                        this.btnDestinationChain.caption = `${this.xchainModel.desChain.chainId} - ${this.xchainModel.desChain.chainName}`;
                    }
                    else {
                        this.btnDestinationChain.caption = '$destination_chain';
                    }
                }
                else {
                    this.secondTokenInput.tokenDataListProp = this.xchainModel.getSupportedTokens(this.configModel.tokens, this.xchainModel.desChain?.chainId || this.xchainModel.targetChainId);
                }
            };
            this.initChainElm = (network, isDes) => {
                const { image, chainName, chainId } = network;
                const hStack = new components_17.HStack(undefined, {
                    gap: 8,
                    verticalAlignment: 'center',
                    cursor: 'pointer'
                });
                const img = new components_17.Image(undefined, {
                    url: image,
                    width: 30,
                    height: 30
                });
                const lb = new components_17.Label(undefined, {
                    caption: `${chainId} - ${chainName}`
                });
                hStack.appendChild(img);
                hStack.appendChild(lb);
                if (isDes) {
                    this.listElmDesChain.appendChild(hStack);
                    if (network.chainId === this.chainId) {
                        hStack.classList.add('disabled');
                        hStack.tooltip.content = '$the_target_chain_cannot_be_the_same_as_the_source_chain';
                    }
                    else {
                        hStack.onClick = () => this.onSelectDestinationChain(network);
                    }
                }
                else {
                    if (!this.isMetaMask && (0, index_23.isWalletConnected)()) {
                        hStack.tooltip.content = this.i18n.get('$xchain_dapp_supports_this_network_please_switch_network_in_the_connected_wallet', {
                            chainName,
                            chainId: `${chainId}`
                        });
                        hStack.style.cursor = 'default';
                    }
                    hStack.onClick = () => this.onSelectSourceChain(network);
                    this.listElmSrcChain.appendChild(hStack);
                }
            };
            this.renderChainList = async () => {
                this.oldSupportedChainList = this.supportedChainList;
                this.xchainModel.getSupportedChainList(true);
                if (this.oldSupportedChainList[0]?.chainId !== this.supportedChainList[0]?.chainId) {
                    this.xchainModel.srcChain = undefined;
                    this.xchainModel.desChain = undefined;
                }
                ;
                this.listElmSrcChain.clearInnerHTML();
                this.listElmDesChain.clearInnerHTML();
                this.supportedChainList.forEach((network) => {
                    this.initChainElm(network);
                    if (network.isCrossChainSupported) {
                        this.initChainElm(network, true);
                    }
                });
                await this.setDefaultChain();
            };
            // private showViewOrderModal = () => {
            //   this.modalViewOrder.visible = true;
            // }
            // private closeViewOrderModal = () => {
            //   this.modalViewOrder.visible = false;
            // }
            // private onViewOrder = () => {
            //   this.modalViewOrder.visible = false;
            // }
            this.showModalFees = () => {
                const fees = this.xchainModel.getFeeDetails();
                this.feesInfo.clearInnerHTML();
                fees.forEach((fee) => {
                    this.feesInfo.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", margin: { top: 10 }, border: { bottom: { color: Theme.colors.info.light, width: '2px', style: 'solid' } }, padding: { bottom: 16 } },
                        this.$render("i-hstack", { verticalAlignment: "center" },
                            this.$render("i-label", { caption: fee.title, margin: { right: 4 } }),
                            this.$render("i-icon", { name: "question-circle", width: 15, height: 15, fill: Theme.text.primary, tooltip: { content: fee.description }, "data-placement": "right" })),
                        this.$render("i-label", { class: "ml-auto", caption: `${(0, index_24.formatNumber)(fee.value)} ${this.xchainModel.fromToken?.symbol}` })));
                });
                this.feesInfo.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", margin: { top: 16 } },
                    this.$render("i-hstack", { verticalAlignment: "center" },
                        this.$render("i-label", { caption: this.i18n.get('$total_transaction_fee') })),
                    this.$render("i-label", { class: "ml-auto", caption: this.xchainModel.getTradeFeeExactAmount() })));
                this.modalFees.visible = true;
            };
            this.closeModalFees = () => {
                this.modalFees.visible = false;
            };
            this.initModels();
        }
        addBlock(blocknote, executeFn, callbackFn) {
            const blockType = 'xchain';
            const moduleData = {
                name: "@scom/scom-xchain-widget",
                localPath: "scom-xchain-widget"
            };
            function getData(href) {
                const widgetData = (0, scom_blocknote_sdk_1.parseUrl)(href);
                if (widgetData) {
                    const { module, properties } = widgetData;
                    if (module.localPath === moduleData.localPath)
                        return { ...properties };
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
            }, {
                render: (block) => {
                    const wrapper = new components_17.Panel();
                    const props = JSON.parse(JSON.stringify(block.props));
                    const customElm = new ScomXchainWidget_1(wrapper, { ...props });
                    if (typeof callbackFn === 'function')
                        callbackFn(customElm, block);
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
                            getAttrs: (element) => {
                                if (typeof element === "string") {
                                    return false;
                                }
                                const href = element.getAttribute('href');
                                if (href)
                                    return getData(href);
                                return false;
                            },
                            priority: 402,
                            node: blockType
                        },
                        {
                            tag: "p",
                            getAttrs: (element) => {
                                if (typeof element === "string") {
                                    return false;
                                }
                                const child = element.firstChild;
                                if (child?.nodeName === 'A' && child.getAttribute('href')) {
                                    const href = child.getAttribute('href');
                                    return getData(href);
                                }
                                return false;
                            },
                            priority: 403,
                            node: blockType
                        },
                    ];
                },
                toExternalHTML: (block, editor) => {
                    const link = document.createElement("a");
                    const url = (0, scom_blocknote_sdk_1.getWidgetEmbedUrl)({
                        type: blockType,
                        props: { ...(block.props || {}) }
                    }, moduleData);
                    link.setAttribute("href", url);
                    link.textContent = blockType;
                    const wrapper = document.createElement("p");
                    wrapper.appendChild(link);
                    return { dom: wrapper };
                }
            });
            const XchainSlashItem = {
                name: "Xchain",
                execute: (editor) => {
                    const block = {
                        type: blockType,
                        props: data_json_4.default.defaultBuilderData
                    };
                    if (typeof executeFn === 'function') {
                        executeFn(editor, block);
                    }
                },
                aliases: [blockType, "widget"],
                group: "Widget",
                icon: { name: 'exchange-alt' },
                hint: "Insert an xchain widget",
            };
            return {
                block: XchainBlock,
                slashItem: XchainSlashItem,
                moduleData
            };
        }
        removeRpcWalletEvents() {
            const rpcWallet = this.state.getRpcWallet();
            if (rpcWallet)
                rpcWallet.unregisterAllWalletEvents();
        }
        onHide() {
            this.dappContainer.onHide();
            this.removeRpcWalletEvents();
            this.bridgeRecord?.onHide();
        }
        get lastUpdated() {
            return this._lastUpdated;
        }
        set lastUpdated(value) {
            this._lastUpdated = value;
            this.lastUpdatedText = this.i18n.get('$last_updated_(s)_ago', { value: `${this._lastUpdated}` });
        }
        get defaultTargetChainId() {
            return this.xchainModel.defaultTargetChainId;
        }
        get supportedChainList() {
            return this.xchainModel.supportedChainList;
        }
        get defaultChainId() {
            return this.configModel.defaultChainId;
        }
        set defaultChainId(value) {
            this.configModel.defaultChainId = value;
        }
        get wallets() {
            return this.configModel.wallets ?? [];
        }
        set wallets(value) {
            this.configModel.wallets = value;
        }
        get networks() {
            return this.configModel.networks ?? [];
        }
        set networks(value) {
            this.configModel.networks = value;
        }
        get showHeader() {
            return this.configModel.showHeader ?? true;
        }
        set showHeader(value) {
            this.configModel.showHeader = value;
        }
        set width(value) {
            this.resizeBridgeRecord(value);
        }
        get chainId() {
            return this.xchainModel.chainId;
        }
        getConfigurators() {
            this.initModels();
            return this.configModel.getConfigurators();
        }
        async resetRpcWallet() {
            this.removeRpcWalletEvents();
            const rpcWalletId = await this.state.initRpcWallet(this.defaultChainId);
            const rpcWallet = this.state.getRpcWallet();
            const chainChangedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_8.Constants.RpcWalletEvent.ChainChanged, async (chainId) => {
                this.onChainChange();
                if (this.bridgeRecord)
                    this.bridgeRecord.onChainChange();
            });
            const connectedEvent = rpcWallet.registerWalletEvent(this, eth_wallet_8.Constants.RpcWalletEvent.Connected, async (connected) => {
                if (this.swapBtn)
                    this.swapBtn.visible = true;
                if (this.bridgeRecord)
                    this.bridgeRecord.onWalletConnect();
                await this.initializeWidgetConfig();
            });
            const data = {
                defaultChainId: this.defaultChainId,
                wallets: this.wallets,
                networks: this.networks,
                showHeader: this.showHeader,
                rpcWalletId: rpcWallet.instanceId
            };
            if (this.dappContainer?.setData)
                this.dappContainer.setData(data);
        }
        getData() {
            return this.configModel.getData();
        }
        async setData(value) {
            this.configModel.setData(value);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.configModel.setTag(value);
        }
        setContainerTag(value) {
            if (this.dappContainer)
                this.dappContainer.setTag(value);
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
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
        async refreshUI() {
            await this.initData();
            await this.initializeWidgetConfig();
        }
        async initData() {
            if (!this.isInited) {
                await this.initApprovalModelAction();
                this.isInited = true;
            }
        }
        isEmptyData(value) {
            return !value || !value.networks || value.networks.length === 0;
        }
        initModels() {
            if (!this.state) {
                this.state = new index_23.State(data_json_4.default);
            }
            if (!this.configModel) {
                this.configModel = new index_31.ConfigModel(this, this.state, {
                    updateTheme: () => this.updateTheme(),
                    refreshWidget: () => this.refreshUI(),
                    resetRpcWallet: () => this.resetRpcWallet(),
                    setContainerTag: (value) => this.setContainerTag(value),
                    resizeBridgeRecord: (value) => this.resizeBridgeRecord(value)
                });
            }
            if (!this.xchainModel) {
                this.xchainModel = new index_31.XchainModel(this, this.state, this.configModel, {
                    showModalFees: () => this.showModalFees()
                });
            }
        }
        async init() {
            this.i18n.init({ ...index_30.mainJson });
            super.init();
            this.$eventBus = components_17.application.EventBus;
            this.mdSourceChain.visible = this.mdDestinationChain.visible = true;
            this.xchainModel.chainId = this.state.getChainId();
            this.swapButtonText = this.getSwapButtonText();
            this.mdSourceChain.visible = this.mdDestinationChain.visible = false;
            this.modalFees.title = this.i18n.get('$transaction_fee_details');
            this.swapTab.caption = this.i18n.get('$swap');
            this.brigeRecordTab.caption = this.i18n.get('$bridge_record');
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
            }
            ;
            this.initBridgeRecord();
            window.addEventListener('resize', () => {
                setTimeout(() => {
                    this.bridgeRecord?.resizeLayout(Number(this.tag?.width));
                }, 300);
            });
            this.executeReadyCallback();
        }
        async initApprovalModelAction() {
            this.approvalModelAction = await this.state.setApprovalModelAction({
                sender: this,
                payAction: this.onSubmit,
                onToBeApproved: async (token) => {
                    this.crossChainApprovalStatus = ApprovalStatus.TO_BE_APPROVED;
                    this.swapBtn.enabled = true;
                },
                onToBePaid: async (token) => {
                    this.crossChainApprovalStatus = ApprovalStatus.NONE;
                },
                onApproving: async (token, receipt, data) => {
                    this.crossChainApprovalStatus = ApprovalStatus.APPROVING;
                    (0, index_24.showResultMessage)(this.txStatusModal, 'success', receipt);
                    if (!this.swapBtn.rightIcon.visible)
                        this.swapBtn.rightIcon.visible = true;
                },
                onApproved: async (token, data) => {
                    this.crossChainApprovalStatus = ApprovalStatus.NONE;
                    if (this.swapBtn.rightIcon.visible)
                        this.swapBtn.rightIcon.visible = false;
                    await this.handleAddRoute();
                },
                onApprovingError: async (token, err) => {
                    (0, index_24.showResultMessage)(this.txStatusModal, 'error', err);
                    this.crossChainApprovalStatus = ApprovalStatus.TO_BE_APPROVED;
                    if (this.swapBtn.rightIcon.visible)
                        this.swapBtn.rightIcon.visible = false;
                },
                onPaying: async (receipt, data) => {
                    (0, index_24.showResultMessage)(this.txStatusModal, 'success', receipt);
                    this.onSwapConfirming();
                },
                onPaid: async (data) => {
                    components_17.application.EventBus.dispatch("Paid" /* EventId.Paid */);
                    this.onSwapConfirmed();
                    await this.updateBalances();
                },
                onPayingError: async (err) => {
                    (0, index_24.showResultMessage)(this.txStatusModal, 'error', err);
                }
            });
        }
        // TODO Only allow Oswap to be selected in Mainnet Oswap2Oswap Pilot launch, BSC <-> AVAX, should be changed when any2any is ready
        setGroupToken(isFrom) {
            const { targetTokenMap, desChain } = this.xchainModel;
            if ([56, 97].includes(this.chainId) && [43113, 43114].includes(desChain?.chainId) || [43113, 43114].includes(this.chainId) && [56, 97].includes(this.xchainModel.desChain?.chainId)) {
                const token = isFrom ? this.xchainModel.fromToken : this.xchainModel.toToken;
                const targetToken = isFrom ? this.xchainModel.toToken : this.xchainModel.fromToken;
                const chainId = isFrom ? this.chainId : desChain.chainId;
                const targetChainId = isFrom ? desChain.chainId : this.chainId;
                const vaultGroups = this.state.getVaultGroups();
                const vaults = vaultGroups.map(v => v.vaults);
                const vault = vaults.find(v => v[chainId]?.assetToken.address.toLowerCase() === token.address.toLowerCase());
                const targetVault = vault ? vault[targetChainId] : null;
                if (targetVault && targetVault.assetToken.address.toLowerCase() !== targetToken.address.toLowerCase()) {
                    let listTargetTokenMap = Object.values(isFrom ? targetTokenMap : scom_token_list_8.tokenStore.getTokenMapByChainId(targetChainId));
                    const token = listTargetTokenMap.find(v => v.address?.toLowerCase() === targetVault.assetToken.address.toLowerCase());
                    const tokenSelection = isFrom ? this.secondTokenInput : this.firstTokenInput;
                    tokenSelection.token = token;
                    this.onUpdateToken(token, !isFrom);
                }
            }
            else {
                this.firstTokenInput.tokenDataListProp = [];
                this.secondTokenInput.tokenDataListProp = [];
            }
        }
        setupCrossChainPopup() {
            const arrows = this.swapModal.querySelectorAll('i-icon.arrow-down');
            arrows.forEach((arrow) => {
                arrow.classList.add('arrow-down--chain');
            });
            this.pnlReminderRejected?.classList.add('hidden');
            const { srcChain, desChain } = this.xchainModel;
            if (srcChain && desChain) {
                const fromToken = this.xchainModel.record.fromVault.assetToken;
                const toToken = this.xchainModel.record.toVault.assetToken;
                this.srcChainFirstPanel.classList.remove('hidden');
                this.targetChainFirstPanel.classList.remove('hidden');
                this.srcChainTokenImage.url = srcChain.image;
                this.srcChainTokenLabel.caption = srcChain.chainName;
                this.targetChainTokenImage.url = desChain.image;
                this.targetChainTokenLabel.caption = desChain.chainName;
                if (this.xchainModel.record && fromToken) {
                    let toAmount = this.xchainModel.record.toAmount;
                    this.pnlReminderRejected?.classList.remove('hidden');
                    this.lbReminderRejectedValue.caption = `${(0, index_24.formatNumber)(toAmount)} ${toToken.symbol}`;
                }
                this.targetChainSecondPanel.classList.add('hidden');
                // Show vault info at the end if vaultTokenSymbol same as toToken
                this.crossChainVaultInfoVstack.classList.remove('hidden');
            }
            else {
                this.srcChainFirstPanel.classList.add('hidden');
                this.targetChainFirstPanel.classList.add('hidden');
                this.targetChainSecondPanel.classList.add('hidden');
                this.crossChainVaultInfoVstack.classList.add('hidden');
            }
        }
        handleSwapPopup() {
            if (!this.xchainModel.record)
                return;
            this.setupCrossChainPopup();
            const { desChain, fromToken, toToken, fromInputValue, toInputValue, isFrom } = this.xchainModel;
            const slippageTolerance = this.state.getSlippageTolerance();
            this.fromTokenImage.url = scom_token_list_8.assets.tokenPath(fromToken, this.chainId);
            this.fromTokenLabel.caption = fromToken?.symbol ?? '';
            this.fromTokenValue.caption = (0, index_24.formatNumber)(fromInputValue, 4);
            this.toTokenImage.url = scom_token_list_8.assets.tokenPath(toToken, desChain?.chainId);
            this.toTokenLabel.caption = toToken?.symbol ?? '';
            this.toTokenValue.caption = (0, index_24.formatNumber)(toInputValue, 4);
            this.payOrReceiveValue.caption = (0, index_24.formatNumber)(this.getMinReceivedMaxSold());
            this.payOrReceiveToken.caption = isFrom ? this.fromTokenLabel.caption : this.toTokenLabel.caption;
            const lgKey = isFrom ? '$input_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert' : '$output_is_estimated_if_the_price_change_by_more_than_your_transaction_will_revert';
            this.estimateMsg = this.i18n.get(lgKey, { value: `${slippageTolerance}` });
            this.payOrReceiveText = isFrom ? '$you_will_pay_at_most' : '$you_will_receive_at_least';
            this.priceInfo2.Items = this.xchainModel.getPriceInfo();
            this.swapModal.visible = true;
        }
        doSwap() {
            this.approvalModelAction.doPayAction(this.xchainModel.record);
        }
        onUpdateToken(token, isFrom) {
            if (!token)
                return;
            const balance = this.xchainModel.getBalance(token);
            if (isFrom) {
                const enabled = !this.xchainModel.isMaxDisabled();
                this.maxButton.enabled = enabled;
                this.xchainModel.updateToken(token, isFrom, this.firstTokenInput);
                this.payBalance.caption = `${this.i18n.get('$balance')}: ${(0, index_24.formatNumber)(balance, 4)} ${token.symbol}`;
                this.updateTokenInput(true);
            }
            else {
                this.xchainModel.updateToken(token, isFrom, this.secondTokenInput);
                this.receiveBalance.caption = `${this.i18n.get('$balance')}: ${(0, index_24.formatNumber)(balance, 4)} ${token.symbol}`;
                this.updateTokenInput(false);
            }
        }
        async onSelectToken(token, isFrom) {
            if (!token)
                return;
            this.firstTokenInput.enabled = false;
            this.secondTokenInput.enabled = false;
            this.onUpdateToken(token, isFrom);
            this.setGroupToken(isFrom);
            await this.handleAddRoute();
            this.firstTokenInput.enabled = true;
            this.secondTokenInput.enabled = true;
        }
        setApprovalModalSpenderAddress() {
            const item = this.xchainModel.record;
            this.state.approvalModel.spenderAddress = item.fromVault.vaultAddress;
        }
        async updateTokenInput(isFrom) {
            const inputEl = isFrom ? this.firstTokenInput : this.secondTokenInput;
            if (inputEl)
                inputEl.value = this.xchainModel.getInputValue(isFrom);
        }
        async onSelectRouteItem(source, item) {
            if (this.xchainModel.isFrom) {
                if (this.payCol.children) {
                    let balanceValue = item?.fromAmount || '';
                    this.xchainModel.fromInputValue = typeof balanceValue !== 'object' ? new eth_wallet_8.BigNumber(balanceValue) : balanceValue;
                    this.firstTokenInput.value = this.fixedNumber(balanceValue);
                }
            }
            else {
                if (this.receiveCol.children) {
                    let balanceValue = item?.toAmount || '';
                    this.xchainModel.toInputValue = typeof balanceValue !== 'object' ? new eth_wallet_8.BigNumber(balanceValue) : balanceValue;
                    this.secondTokenInput.value = this.fixedNumber(balanceValue);
                    this.secondTokenInput.inputReadOnly = true;
                    this.secondTokenInput.classList.add('cursor-input--default');
                }
            }
            this.swapBtn.classList.remove('hidden');
            this.xchainModel.record = item;
            if (this.xchainModel.fromToken && !this.xchainModel.fromToken.isNative && (0, index_23.isWalletConnected)() && item) {
                try {
                    this.setApprovalModalSpenderAddress();
                    await this.approvalModelAction.checkAllowance(this.xchainModel.fromToken, this.xchainModel.fromInputValue.toFixed());
                }
                catch (e) {
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
            this.priceInfo.Items = this.xchainModel.getPriceInfo();
        }
        onTokenInputChange(source) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                const fromInput = this.payCol.getElementsByTagName('I-INPUT')?.[0];
                const toInput = this.receiveCol.getElementsByTagName('I-INPUT')?.[0];
                const isFrom = source.isSameNode(fromInput);
                const amount = source.value;
                if ((0, index_24.isInvalidInput)(amount)) {
                    this.resetValuesByInput();
                    if (fromInput)
                        fromInput.value = '0';
                    if (toInput)
                        toInput.value = '0';
                    return;
                }
                const limit = isFrom ? this.xchainModel.fromToken?.decimals : this.xchainModel.toToken?.decimals;
                const value = new eth_wallet_8.BigNumber((0, index_24.limitDecimals)(amount, limit || 18));
                if (!value.gt(0)) {
                    this.resetValuesByInput();
                    if (isFrom && toInput) {
                        toInput.value = '0';
                    }
                    else if (!isFrom && fromInput) {
                        fromInput.value = '0';
                    }
                }
                else {
                    let valueChanged = false;
                    const isLastDot = amount.indexOf('.') === amount.length - 1;
                    if (isFrom) {
                        if (!this.xchainModel.fromInputValue.eq(value)) {
                            this.xchainModel.fromInputValue = value;
                            this.xchainModel.onUpdateEstimatedPosition(false, true);
                            valueChanged = true;
                        }
                        if (!isLastDot)
                            fromInput.value = value.toFixed();
                    }
                    else {
                        if (!this.xchainModel.toInputValue.eq(value)) {
                            this.xchainModel.toInputValue = value;
                            this.xchainModel.onUpdateEstimatedPosition(true, true);
                            valueChanged = true;
                        }
                        if (!isLastDot)
                            toInput.value = value.toFixed();
                    }
                    if (valueChanged)
                        await this.handleAddRoute();
                }
            }, 1000);
        }
        resetValuesByInput() {
            this.initRoutes();
            this.priceInfo.Items = this.xchainModel.getPriceInfo();
            this.xchainModel.fromInputValue = new eth_wallet_8.BigNumber(0);
            this.xchainModel.toInputValue = new eth_wallet_8.BigNumber(0);
        }
        initRoutes() {
            this.xchainModel.record = null;
            this.isPriceToggled = false;
            this.swapBtn.classList.add('hidden');
        }
        async handleAddRoute() {
            if (!this.xchainModel.fromToken || !this.xchainModel.toToken || !(this.xchainModel.fromInputValue.gt(0) || this.xchainModel.toInputValue.gt(0)))
                return;
            this.initRoutes();
            this.disableSelectChain(true);
            this.disableSelectChain(true, true);
            const { srcChain, desChain } = this.xchainModel;
            if (!srcChain || !desChain)
                return;
            let vaultGroup = await (0, index_25.findVaultGroupByToken)(this.state, srcChain.chainId, this.xchainModel.fromToken.address || this.xchainModel.fromToken.symbol);
            let route = (0, index_25.getRoute)({
                vaultGroup,
                toChainId: desChain.chainId,
                fromChainId: srcChain.chainId,
                inAmount: new eth_wallet_8.BigNumber(this.xchainModel.fromInputValue)
            });
            if (route) {
                this.minSwapHintLabel?.classList.add('hidden');
            }
            else {
                this.minSwapHintLabel?.classList.remove('hidden');
            }
            this.xchainModel.record = route;
            this.swapModalConfirmBtn.caption = '$confirm_swap';
            this.swapModalConfirmBtn.enabled = true;
            if (this.xchainModel.record) {
                const assetSymbol = this.xchainModel.record.toVault.assetToken.symbol;
                const vaultAddress = this.xchainModel.record.toVault.vaultAddress;
                const softCap = vaultGroup.vaults[srcChain.chainId].softCap;
                const bond = await (0, index_25.getBond)(this.state, route.toVault);
                const vaultAssetBalance = await (0, index_25.getVaultAssetBalance)(this.state, desChain.chainId, vaultAddress);
                const assetBalance = vaultAssetBalance ?? 0;
                const assetDecimal = this.xchainModel.record.toVault.assetToken.decimals;
                const targetVaultAssetBalance = (new eth_wallet_8.BigNumber(assetBalance)).shiftedBy(-assetDecimal);
                const toAmount = this.xchainModel.record.toAmount;
                //const vaultToUsdPrice = oraclePriceMap[vaultTokenAddress.toLowerCase()]; // This will be the vaultToken -> USD Price
                //const oswapToUsdPrice = oraclePriceMap[bridgeVaultConstantMap['OSWAP'][this.desChain!.chainId].tokenAddress.toLowerCase()];
                //const vaultToOswapPrice = vaultToUsdPrice.div(oswapToUsdPrice); // This will vaultToken -> oswap price;
                this.targetVaultAssetBalanceLabel1.caption = `${this.i18n.get('$vault_asset_balance')}: ${(0, index_24.formatNumber)(targetVaultAssetBalance.toNumber(), 4)} ${assetSymbol}`;
                this.targetVaultAssetBalanceLabel2.caption = `${this.i18n.get('$vault_asset_balance')}: ${(0, index_24.formatNumber)(targetVaultAssetBalance.toNumber(), 4)} ${assetSymbol}`;
                this.targetVaultBondBalanceLabel1.caption = `${this.i18n.get('$vault_bond_balance')}: ${(0, index_24.formatNumber)(bond.toNumber(), 4)} ${assetSymbol}`;
                this.targetVaultBondBalanceLabel2.caption = `${this.i18n.get('$vault_bond_balance')}: ${(0, index_24.formatNumber)(bond.toNumber(), 4)} ${assetSymbol}`;
                //TODO Bond
                /*
                if (!vault.vaultGroup) {
                  this.targetVaultBondBalanceLabel1.caption = `${this.i18n.get('$vault_bond_balance')}: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} ${assetSymbol}`;
                  this.targetVaultBondBalanceLabel2.caption = `${this.i18n.get('$vault_bond_balance')}: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} ${assetSymbol}`;
                } else if (vault.vaultGroup === 'OSWAP') {
                  this.targetVaultBondBalanceLabel1.caption = `${this.i18n.get('$vault_bond_balance')}: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP`;
                  this.targetVaultBondBalanceLabel2.caption = `${this.i18n.get('$vault_bond_balance')}: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP`;
                } else {
                  this.targetVaultBondBalanceLabel1.caption = `${this.i18n.get('$vault_bond_balance')}: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP ≈ ${formatNumber(targetVaultBondBalance.div(vaultToOswapPrice).toNumber(), 4)} ${assetSymbol}`;
                  this.targetVaultBondBalanceLabel2.caption = `${this.i18n.get('$vault_bond_balance')}: ${formatNumber(targetVaultBondBalance.toNumber(), 4)} OSWAP ≈ ${formatNumber(targetVaultBondBalance.div(vaultToOswapPrice).toNumber(), 4)} ${assetSymbol}`;
                }*/
                this.crossChainSoftCapLabel1.caption = softCap ? `Cap: ${(0, index_24.formatNumber)(softCap)} ${assetSymbol}` : "-";
                this.crossChainSoftCapLabel2.caption = softCap ? `Cap: ${(0, index_24.formatNumber)(softCap)} ${assetSymbol}` : "-";
                const minValue = eth_wallet_8.BigNumber.min(targetVaultAssetBalance, bond, softCap);
                if (minValue.eq(targetVaultAssetBalance)) {
                    this.targetVaultAssetBalanceLabel1.classList.add('text--limit');
                    this.targetVaultAssetBalanceLabel2.classList.add('text--limit');
                    this.targetVaultBondBalanceLabel1.classList.remove('text--limit');
                    this.targetVaultBondBalanceLabel2.classList.remove('text--limit');
                    this.crossChainSoftCapLabel1.classList.remove('text--limit');
                    this.crossChainSoftCapLabel2.classList.remove('text--limit');
                }
                else if (minValue.eq(bond)) {
                    this.targetVaultAssetBalanceLabel1.classList.remove('text--limit');
                    this.targetVaultAssetBalanceLabel2.classList.remove('text--limit');
                    this.targetVaultBondBalanceLabel1.classList.add('text--limit');
                    this.targetVaultBondBalanceLabel2.classList.add('text--limit');
                    this.crossChainSoftCapLabel1.classList.remove('text--limit');
                    this.crossChainSoftCapLabel2.classList.remove('text--limit');
                }
                else {
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
                }
                else {
                    this.swapModalConfirmBtn.enabled = true;
                }
            }
            this.lastUpdated = 0;
            this.disableSelectChain(false);
            this.disableSelectChain(false, true);
            this.initRoutes();
            this.onSelectRouteItem(undefined, route);
            if (!route) {
                this.priceInfo.Items = this.xchainModel.getPriceInfo();
                if (this.xchainModel.isEstimated('to')) {
                    const input = this.secondTokenInput;
                    this.xchainModel.toInputValue = new eth_wallet_8.BigNumber(0);
                    if (input) {
                        input.value = '-';
                        input.inputReadOnly = true;
                        input.classList.add('cursor-input--default');
                    }
                }
                else {
                    const input = this.firstTokenInput;
                    this.xchainModel.fromInputValue = new eth_wallet_8.BigNumber(0);
                    if (input)
                        input.value = '-';
                }
            }
            if (this.xchainModel.record)
                this.setApprovalModalSpenderAddress();
        }
        // Price Info
        onTogglePrice(priceInfo) {
            this.isPriceToggled = !this.isPriceToggled;
            priceInfo.Items = this.xchainModel.getPriceInfo();
        }
        async updateBalances() {
            const chainIds = [...new Set([this.chainId, this.xchainModel.targetChainId])];
            for (let chainId of chainIds) {
                await scom_token_list_8.tokenStore.updateTokenBalancesByChainId(chainId);
            }
            if (this.xchainModel.fromToken) {
                const balance = this.xchainModel.getBalance(this.xchainModel.fromToken);
                this.payBalance.caption = `${this.i18n.get('$balance')}: ${(0, index_24.formatNumber)(balance, 4)} ${this.xchainModel.fromToken.symbol}`;
            }
            if (this.xchainModel.toToken) {
                const balance = this.xchainModel.getBalance(this.xchainModel.toToken);
                this.receiveBalance.caption = `${this.i18n.get('$balance')}: ${(0, index_24.formatNumber)(balance, 4)} ${this.xchainModel.toToken.symbol}`;
            }
            const enabled = !this.xchainModel.isMaxDisabled();
            this.maxButton.enabled = enabled;
        }
        getSwapButtonText() {
            const isApproveButtonShown = this.crossChainApprovalStatus !== ApprovalStatus.NONE;
            if (!(0, index_23.isWalletConnected)()) {
                return this.i18n.get('$connect_wallet');
            }
            if (!this.state.isRpcWalletConnected()) {
                return this.i18n.get('$switch_network');
            }
            if (isApproveButtonShown) {
                const status = this.crossChainApprovalStatus;
                switch (status) {
                    case ApprovalStatus.APPROVING:
                        return this.i18n.get('$approving');
                    case ApprovalStatus.TO_BE_APPROVED:
                        return this.i18n.get('$approve');
                }
                return '';
            }
            if (this.swapBtn.rightIcon.visible) {
                return this.i18n.get('$creating_order');
            }
            if (this.xchainModel.isInsufficientBalance) {
                return this.i18n.get('$insufficient_balance', { symbol: this.xchainModel.fromToken?.symbol });
            }
            return this.i18n.get('$create_order');
        }
        getWarningMessageText() {
            const tokens = [this.xchainModel.fromToken?.symbol, this.xchainModel.toToken?.symbol];
            if (tokens.every(v => v === 'ETH' || v === 'WETH')) {
                return this.i18n.get('$invalid_pair');
            }
            if (!this.xchainModel.record) {
                return this.i18n.get('$no_records');
            }
            if (this.crossChainApprovalStatus === ApprovalStatus.TO_BE_APPROVED) {
                return '';
            }
            let balance = this.xchainModel.getBalance(this.xchainModel.fromToken);
            if (this.xchainModel.record.fromAmount.gt(balance)) {
                return this.i18n.get('$insufficient_balance', { symbol: this.xchainModel.fromToken?.symbol });
            }
            return '';
        }
        isSwapButtonDisabled() {
            const warningMessageText = this.getWarningMessageText();
            return ((0, index_23.isWalletConnected)() && warningMessageText != '');
        }
        async switchNetworkByWallet() {
            if (this.mdWallet) {
                await components_17.application.loadPackage('@scom/scom-wallet-modal', '*');
                this.mdWallet.networks = this.networks;
                this.mdWallet.wallets = this.wallets;
                this.mdWallet.showModal();
            }
        }
        async onClickSwapButton() {
            if (!(0, index_23.isWalletConnected)()) {
                this.switchNetworkByWallet();
                return;
            }
            else if (!this.state.isRpcWalletConnected()) {
                const chainId = this.state.getChainId();
                const clientWallet = eth_wallet_8.Wallet.getClientInstance();
                await clientWallet.switchNetwork(chainId);
                return;
            }
            if (!this.xchainModel.record || this.isSwapButtonDisabled())
                return;
            const isApproveButtonShown = this.crossChainApprovalStatus !== ApprovalStatus.NONE;
            if (isApproveButtonShown) {
                this.onApproveRouterMax();
                return;
            }
            this.handleSwapPopup();
        }
        onRenderPriceInfo() {
            if (!this.priceInfo) {
                this.priceInfo = new index_26.PriceInfo();
                this.priceInfo.width = 'auto';
                this.priceInfo.height = 'auto';
                this.swapContainer.appendChild(this.priceInfo);
                this.priceInfo.onTogglePrice = this.onTogglePrice.bind(this);
            }
            this.priceInfo.Items = this.xchainModel.getPriceInfo();
            if (!this.priceInfo2) {
                this.priceInfo2 = new index_26.PriceInfo();
                this.priceInfo2.width = 'auto';
                this.priceInfo2.height = 'auto';
                this.priceInfo2.onTogglePrice = this.onTogglePrice.bind(this);
            }
            this.priceInfoContainer.appendChild(this.priceInfo2);
        }
        get isMetaMask() {
            return (0, index_23.getWalletProvider)() === index_23.WalletPlugin.MetaMask;
        }
        resizeBridgeRecord(value) {
            let interval = setInterval(() => {
                if (this.bridgeRecord) {
                    this.bridgeRecord.resizeLayout(Number(value || this.tag?.width));
                    clearInterval(interval);
                }
            }, 100);
        }
        initBridgeRecord() {
            if (this.bridgeRecord)
                return;
            this.bridgeRecord = new index_29.BridgeRecord(this.state);
            this.bridgeRecord.switchNetworkByWallet = () => this.switchNetworkByWallet();
            this.pnlBridgeRecord.appendChild(this.bridgeRecord);
        }
        initExpertModal() {
            if (this.expertModal)
                return;
            this.expertModal = new index_27.ExpertModeSettings(this.state);
            this.appendChild(this.expertModal);
        }
        initTransactionModal() {
            if (this.transactionModal)
                return;
            this.transactionModal = new index_28.TransactionSettings(this.state);
            this.transactionModal.showCrossChain = true;
            this.appendChild(this.transactionModal);
        }
        onChangeTab() {
            if (this.tabs.activeTabIndex === 1) {
                this.resizeBridgeRecord();
            }
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer" },
                this.$render("i-tabs", { id: "tabs", width: "100%", height: "100%", mode: "horizontal", class: index_css_4.tabStyle, onChanged: this.onChangeTab.bind(this) },
                    this.$render("i-tab", { id: "swapTab", caption: "$swap" },
                        this.$render("i-panel", { class: index_css_4.swapStyle },
                            this.$render("i-panel", { id: "swapContainer" },
                                this.$render("i-hstack", { horizontalAlignment: "end", verticalAlignment: "center" },
                                    this.$render("i-panel", { id: "actionSetting", class: "action-setting hidden" },
                                        this.$render("i-label", { minWidth: 160, caption: this.lastUpdatedText }),
                                        this.$render("i-icon", { width: 26, height: 26, class: "rounded-icon", name: "sync-alt", fill: Theme.text.primary, onClick: this.onRefresh }),
                                        this.$render("i-icon", { width: 26, height: 26, class: "rounded-icon", name: "cog", fill: Theme.text.primary, onClick: this.onSetting }))),
                                this.$render("i-panel", { class: "content-swap" },
                                    this.$render("i-hstack", { gap: 4, margin: { top: 8, bottom: 8 }, verticalAlignment: "center", horizontalAlignment: "space-between", wrap: "wrap" },
                                        this.$render("i-label", { caption: "$you_pay", font: { size: '1.125rem', color: Theme.text.primary } })),
                                    this.$render("i-panel", { class: "btn-dropdown", width: "auto", margin: { bottom: 4 } },
                                        this.$render("i-button", { id: "btnSourceChain", class: "btn-chain--selection", rightIcon: { name: 'angle-down', cursor: 'pointer' }, caption: "$source_chain", width: "calc(100% - 1px)", onClick: this.onShowSourceChain }),
                                        this.$render("i-modal", { id: "mdSourceChain", class: "md--chain-selection", showBackdrop: false, onClose: this.onCloseSourceChain, width: "100%", height: "auto", popupPlacement: "bottom" },
                                            this.$render("i-vstack", { id: "listElmSrcChain", gap: 2 }))),
                                    this.$render("i-panel", { class: "token-box" },
                                        this.$render("i-vstack", { id: "payContainer", class: "input--token-container" },
                                            this.$render("i-hstack", { class: "balance-info", horizontalAlignment: "space-between", verticalAlignment: "center", width: "100%", margin: { bottom: '0.5rem' } },
                                                this.$render("i-label", { id: "payBalance", class: "text--grey ml-auto", caption: "$balance:_0" }),
                                                this.$render("i-button", { id: "maxButton", class: "btn-max", caption: "$max", enabled: false, onClick: () => this.onSetMaxBalance() })),
                                            this.$render("i-panel", { id: "payCol", class: "bg-box-radius", background: { color: Theme.input.background }, width: "100%", margin: { top: 'auto' }, border: { radius: '1rem', width: '1px', style: 'solid', color: Theme.background.main } },
                                                this.$render("i-scom-token-input", { id: "firstTokenInput", placeholder: '0.0', value: '-', tokenReadOnly: false, isBalanceShown: false, isBtnMaxShown: false, isCommonShown: true, background: { color: Theme.input.background }, border: { radius: '1rem' }, height: 'auto', width: '100%', display: 'flex', font: { size: '1.25rem' }, padding: { left: '0.75rem', right: '0.75rem' }, tokenButtonStyles: {
                                                        background: { color: Theme.background.main },
                                                        padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
                                                        border: { radius: 8 },
                                                        font: { size: '1rem', weight: 700, color: Theme.input.fontColor },
                                                        lineHeight: 1.5,
                                                        opacity: 1
                                                    }, onInputAmountChanged: this.onTokenInputChange, onSelectToken: (token) => this.onSelectToken(token, true) })))),
                                    this.$render("i-hstack", { id: "minSwapHintLabel", gap: 4, verticalAlignment: "start", opacity: 0.9 },
                                        this.$render("i-icon", { name: "star", fill: Theme.colors.primary.main, width: 13, height: 13 }),
                                        this.$render("i-label", { caption: "$no_crosschain_routes_are_found_you_may_try_updating_the_input_amount_or_selecting_another_token", font: { size: '0.8rem', color: Theme.colors.primary.main } })),
                                    this.$render("i-panel", { class: "token-box" },
                                        this.$render("i-vstack", { id: "receiveContainer", class: "input--token-container" },
                                            this.$render("i-vstack", { class: "balance-info", width: "100%", margin: { left: 'auto' } },
                                                this.$render("i-hstack", { gap: 4, margin: { top: 8, bottom: 8 }, verticalAlignment: "center", horizontalAlignment: "space-between", wrap: "wrap" },
                                                    this.$render("i-label", { caption: "$you_receive", font: { size: '1.125rem', color: Theme.text.primary } })),
                                                this.$render("i-panel", { class: "btn-dropdown", width: "auto", margin: { bottom: 8 } },
                                                    this.$render("i-button", { id: "btnDestinationChain", class: "btn-chain--selection", rightIcon: { name: 'angle-down', cursor: 'pointer' }, caption: "$destination_chain", width: "calc(100% - 1px)", onClick: this.onShowDestinationChain }),
                                                    this.$render("i-modal", { id: "mdDestinationChain", class: "md--chain-selection", showBackdrop: false, onClose: this.onCloseDesChain, width: "100%", height: "auto", popupPlacement: "bottom" },
                                                        this.$render("i-vstack", { id: "listElmDesChain", gap: 2 }))),
                                                this.$render("i-vstack", { class: "text-right", width: "100%" },
                                                    this.$render("i-label", { id: "receiveBalance", class: "text--grey ml-auto", caption: "$balance:_0" }))),
                                            this.$render("i-panel", { id: "receiveCol", background: { color: Theme.input.background }, width: "100%", margin: { top: 'auto' }, border: { radius: '1rem', width: '1px', style: 'solid', color: Theme.background.main } },
                                                this.$render("i-scom-token-input", { id: "secondTokenInput", value: '-', placeholder: '0.0', inputReadOnly: true, tokenReadOnly: false, isBalanceShown: false, isBtnMaxShown: false, isCommonShown: true, background: { color: Theme.input.background }, border: { radius: '1rem' }, height: 'auto', width: '100%', display: 'flex', font: { size: '1.25rem' }, padding: { left: '0.75rem', right: '0.75rem' }, tokenButtonStyles: {
                                                        background: { color: Theme.background.main },
                                                        padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
                                                        border: { radius: 8 },
                                                        font: { size: '1rem', weight: 700, color: Theme.input.fontColor },
                                                        lineHeight: 1.5,
                                                        opacity: 1
                                                    }, onInputAmountChanged: this.onTokenInputChange, onSelectToken: (token) => this.onSelectToken(token, false) }))))),
                                this.$render("i-panel", { class: "swap-btn-container", width: "100%" },
                                    this.$render("i-button", { id: "swapBtn", class: "btn-swap btn-os hidden", height: 67, caption: this.swapButtonText, rightIcon: { spin: true, visible: false }, onClick: this.onClickSwapButton.bind(this) }))),
                            this.$render("i-modal", { id: "swapModal", class: "custom-modal", title: "$confirm_swap", closeIcon: { name: 'times' } },
                                this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "start" },
                                    this.$render("i-panel", { id: "srcChainFirstPanel", class: "row-chain" },
                                        this.$render("i-image", { id: "srcChainTokenImage", width: "30px", height: "30px", url: "#" }),
                                        this.$render("i-label", { id: "srcChainTokenLabel", class: "token-name", caption: "" }),
                                        this.$render("i-icon", { name: "minus", fill: Theme.input.fontColor, width: 28, height: 10 })),
                                    this.$render("i-panel", { class: "row-chain" },
                                        this.$render("i-image", { id: "fromTokenImage", fallbackUrl: scom_token_list_8.assets.fallbackUrl, width: "30px", height: "30px", url: "#" }),
                                        this.$render("i-label", { id: "fromTokenLabel", class: "token-name", caption: "" })),
                                    this.$render("i-label", { id: "fromTokenValue", class: "token-value", caption: " - " })),
                                this.$render("i-icon", { name: "arrow-down", class: "arrow-down", fill: Theme.input.fontColor, width: 28, height: 28 }),
                                this.$render("i-panel", { id: "targetChainSecondPanel" },
                                    this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "start" },
                                        this.$render("i-panel", { class: "row-chain" },
                                            this.$render("i-image", { id: "targetChainVaultImage", width: "30px", height: "30px", url: "#" }),
                                            this.$render("i-label", { id: "targetChainVaultLabel", class: "token-name", caption: "" }),
                                            this.$render("i-icon", { name: "minus", fill: Theme.input.fontColor, width: 28, height: 10 })),
                                        this.$render("i-panel", { class: "row-chain" },
                                            this.$render("i-image", { id: "targetVaultTokenImage", fallbackUrl: scom_token_list_8.assets.fallbackUrl, width: "30px", height: "30px", url: "#" }),
                                            this.$render("i-label", { id: "targetVaultTokenLabel", class: "token-name", caption: "" })),
                                        this.$render("i-label", { id: "targetVaultTokenValue", class: "token-value", caption: "-" })),
                                    this.$render("i-vstack", { class: "text-right" },
                                        this.$render("i-label", { id: "crossChainSoftCapLabel1", class: "text--grey ml-auto" }),
                                        this.$render("i-label", { id: "targetVaultAssetBalanceLabel1", class: "text--grey ml-auto", caption: "$vault_asset_balance:_0" }),
                                        this.$render("i-label", { id: "targetVaultBondBalanceLabel1", class: "text--grey ml-auto", caption: "$vault_bond_balance:_0" })),
                                    this.$render("i-icon", { name: "arrow-down", class: "arrow-down", fill: Theme.input.fontColor, width: 28, height: 28 })),
                                this.$render("i-hstack", { class: "mb-1", verticalAlignment: "center", horizontalAlignment: "start" },
                                    this.$render("i-panel", { id: "targetChainFirstPanel", class: "row-chain" },
                                        this.$render("i-image", { id: "targetChainTokenImage", fallbackUrl: scom_token_list_8.assets.fallbackUrl, width: "30px", height: "30px", url: "#" }),
                                        this.$render("i-label", { id: "targetChainTokenLabel", class: "token-name", caption: "" }),
                                        this.$render("i-icon", { name: "minus", fill: Theme.input.fontColor, width: 28, height: 10 })),
                                    this.$render("i-panel", { class: "row-chain" },
                                        this.$render("i-image", { id: "toTokenImage", fallbackUrl: scom_token_list_8.assets.fallbackUrl, width: "30px", height: "30px", url: "#" }),
                                        this.$render("i-label", { id: "toTokenLabel", class: "token-name", caption: "" })),
                                    this.$render("i-label", { id: "toTokenValue", class: "token-value text-primary bold", caption: " - " })),
                                this.$render("i-vstack", { id: "crossChainVaultInfoVstack", class: "text-right" },
                                    this.$render("i-label", { id: "crossChainSoftCapLabel2", class: "text--grey ml-auto" }),
                                    this.$render("i-label", { id: "targetVaultAssetBalanceLabel2", class: "text--grey ml-auto", caption: "$vault_asset_balance:_0" }),
                                    this.$render("i-label", { id: "targetVaultBondBalanceLabel2", class: "text--grey ml-auto", caption: "$vault_bond_balance:_0" })),
                                this.$render("i-panel", { class: "mb-1" },
                                    this.$render("i-label", { caption: this.estimateMsg })),
                                this.$render("i-panel", { class: "mb-1" },
                                    this.$render("i-label", { caption: this.payOrReceiveText }),
                                    this.$render("i-label", { id: "payOrReceiveValue", class: "text-primary bold", caption: "" }),
                                    this.$render("i-label", { id: "payOrReceiveToken", caption: "" })),
                                this.$render("i-panel", { id: "priceInfoContainer", background: { color: Theme.background.modal }, class: "bg-box mt-1 mb-1", width: "100%" }),
                                this.$render("i-panel", null,
                                    this.$render("i-hstack", { id: "pnlReminderRejected", margin: { top: 8, bottom: 16 }, display: 'inline' },
                                        this.$render("i-label", { caption: "$if_the_order_is_not_executed_in_the_target_chain_the_estimated_withdrawalble_amount_is", display: 'inline' }),
                                        this.$render("i-label", { id: "lbReminderRejectedValue", font: { color: Theme.colors.primary.main, bold: true }, display: 'inline', padding: { left: '0.25rem' } }))),
                                this.$render("i-panel", { class: "swap-btn-container", width: "100%" },
                                    this.$render("i-button", { id: "swapModalConfirmBtn", class: "btn-swap btn-os", height: "auto", caption: "$confirm_swap", onClick: this.doSwap }))),
                            this.$render("i-modal", { id: "modalFees", class: "bg-modal custom-modal", title: "$transaction_fee_details", closeIcon: { name: 'times' } },
                                this.$render("i-panel", { class: "i-modal_content" },
                                    this.$render("i-panel", null,
                                        this.$render("i-vstack", { id: "feesInfo" }),
                                        this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "center", margin: { top: 16, bottom: 8 } },
                                            this.$render("i-button", { caption: "$close", class: "btn-os btn-submit", onClick: () => this.closeModalFees() }))))),
                            this.$render("i-scom-tx-status-modal", { id: "txStatusModal" }))),
                    this.$render("i-tab", { id: "brigeRecordTab", caption: "$bridge_record" },
                        this.$render("i-panel", { id: "pnlBridgeRecord" }))),
                this.$render("i-scom-wallet-modal", { id: "mdWallet", wallets: [] })));
        }
    };
    __decorate([
        (0, components_17.observable)()
    ], ScomXchainWidget.prototype, "swapButtonText", void 0);
    __decorate([
        (0, components_17.observable)()
    ], ScomXchainWidget.prototype, "lastUpdatedText", void 0);
    __decorate([
        (0, components_17.observable)()
    ], ScomXchainWidget.prototype, "estimateMsg", void 0);
    __decorate([
        (0, components_17.observable)()
    ], ScomXchainWidget.prototype, "payOrReceiveText", void 0);
    ScomXchainWidget = ScomXchainWidget_1 = __decorate([
        components_17.customModule,
        (0, components_17.customElements)('i-scom-xchain-widget')
    ], ScomXchainWidget);
    exports.default = ScomXchainWidget;
});
