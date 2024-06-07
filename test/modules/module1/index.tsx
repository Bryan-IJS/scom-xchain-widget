import { Module, customModule, Container, VStack, Styles, application } from '@ijstech/components';
import { getMulticallInfoList } from '@scom/scom-multicall';
import { INetwork } from '@ijstech/eth-wallet';
import getNetworkList from '@scom/scom-network-list';
import ScomXchainWidget from '@scom/scom-xchain-widget'

const Theme = Styles.Theme.currentTheme;
Theme.background.main = '#2c2626';
Theme.background.default = '#0c1234';
Theme.text.primary = '#d3c0c0 ';
Theme.input.background = '#272F39';
Theme.input.fontColor = '#ffffff4d';
@customModule
export default class Module1 extends Module {

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    const multicalls = getMulticallInfoList();
    const networkMap = this.getNetworkMap(options.infuraId);
    application.store = {
      infuraId: options.infuraId,
      multicalls,
      networkMap
    }
  }

  private getNetworkMap = (infuraId?: string) => {
    const networkMap = {};
    const defaultNetworkList: INetwork[] = getNetworkList();
    const defaultNetworkMap: Record<number, INetwork> = defaultNetworkList.reduce((acc, cur) => {
      acc[cur.chainId] = cur;
      return acc;
    }, {});
    for (const chainId in defaultNetworkMap) {
      const networkInfo = defaultNetworkMap[chainId];
      const explorerUrl = networkInfo.blockExplorerUrls && networkInfo.blockExplorerUrls.length ? networkInfo.blockExplorerUrls[0] : "";
      if (infuraId && networkInfo.rpcUrls && networkInfo.rpcUrls.length > 0) {
        for (let i = 0; i < networkInfo.rpcUrls.length; i++) {
          networkInfo.rpcUrls[i] = networkInfo.rpcUrls[i].replace(/{INFURA_ID}/g, infuraId);
        }
      }
      networkMap[networkInfo.chainId] = {
        ...networkInfo,
        symbol: networkInfo.nativeCurrency?.symbol || "",
        explorerTxUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}tx/` : "",
        explorerAddressUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}address/` : ""
      }
    }
    return networkMap;
  }

  async init() {
    super.init();
  }

  render() {
    return (
      <i-panel>
        <i-hstack
          id='mainStack'
          margin={{ top: '1rem', left: '1rem' }}
          gap='2rem'
        >
          <i-scom-xchain-widget
            tokens={[
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
            ]}
            defaultChainId={43113}
            networks={[
              {
                "chainId": 43113
              },
              {
                "chainId": 97
              }
            ]}
            wallets={[
              {
                "name": "metamask"
              }
            ]}
          />
        </i-hstack>
      </i-panel>
    )
  }
}