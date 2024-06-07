import { formatNumber } from '../global/index';
import { State, VaultOrderItem } from '../store/index';
import { assets } from '@scom/scom-token-list';
import { HStack, Icon, Label, Styles, VStack } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

const truncateAddress = (address: string, length: number, separator?: string): string => {
  if (!address || address.length <= length) return address;

  separator = separator || '...';

  const sepLen = separator.length;
  const charsToShow = length - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return address.substr(0, frontChars) + separator + address.substr(address.length - backChars);
}

const fromTokenIcon = (data: any) => {
  return assets.tokenPath(data.fromToken, data.fromNetwork.chainId);
}

const toTokenIcon = (data: any) => {
  return assets.tokenPath(data.toToken, data.toNetwork.chainId);
}

const viewTransaction = (state: State, chainId: number, txHash: string) => {
  state.viewOnExplorerByTxHash(chainId, txHash);
}

const getBridgeRecordColumns = () => {
  return [
    {
      title: 'ID',
      fieldName: 'orderId',
      onRenderCell: function (source: any, data: number, row: VaultOrderItem) {
        return `<i-label caption="#${data}"></i-label>`;
      }
    },
    {
      title: 'Token Swap',
      fieldName: 'token_swap',
      onRenderCell: function (source: any, data: any, row: VaultOrderItem) {
        return renderFromToToken(row);
      }
    },
    {
      title: 'From',
      fieldName: 'from',
      onRenderCell: function (source: any, data: any, row: VaultOrderItem) {
        return renderTokenFrom(row);
      }
    },
    {
      title: 'To',
      fieldName: 'to',
      onRenderCell: function (source: any, data: any, row: VaultOrderItem) {
        return renderTokenTo(row);
      }
    },
    {
      title: 'Status',
      fieldName: 'status',
      onRenderCell: function (source: any, data: any, row: VaultOrderItem) {
        return renderStatus(row.status);
      }
    },
    {
      title: '',
      fieldName: '',
      type: 'actions',
      onRenderCell: async function (source: any, data: any, row: VaultOrderItem) {
        const { orderId, fromNetwork, toNetwork } = row;
        const orderHash = `${orderId}-${fromNetwork.chainId}-${toNetwork.chainId}`
        const icon = await Icon.create();
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

const renderFromToToken = (row: VaultOrderItem, justify: string = 'start') => {
  // const date = moment(row.date).format(DefaultDateTimeFormat);
  const vstack = new VStack();
  const hstack = new HStack(vstack, {
    gap: '5px',
    verticalAlignment: 'center'
  })
  const fromLb = new Label(hstack, {
    caption: row.fromToken.symbol,
    font: { bold: true }
  })
  const to = new Label(hstack, {
    caption: 'to',
  })
  const toLb = new Label(hstack, {
    caption: row.toToken.symbol,
    font: { bold: true }
  })
  hstack.append(fromLb, to, toLb)
  // const dateLb = new Label(vstack, {
  //   caption: date,
  //   font: { size: '0.875rem', color: 'hsla(0, 0%, 100%, 0.55)' },
  //   margin: { right: '0.5rem' }
  // })
  // vstack.append(hstack, dateLb);

  return vstack;
}

const renderTokenFrom = (row: VaultOrderItem) => {
  return `
  <i-hstack gap="4px" verticalAlignment="center">
    <i-image width="20px" class="inline-block" url="${fromTokenIcon(row)}"></i-image>
    <i-label caption="${formatNumber(row.fromAmount)} ${row.fromToken.symbol}"></i-label>
  </i-hstack>
  <i-label class="text-opacity" caption="${row.fromNetwork.chainName}"></i-label>
  `;
}

const renderTokenTo = (row: VaultOrderItem) => {
  return `
  <i-hstack gap="4px" verticalAlignment="center">
    <i-image width="20px" class="inline-block" url="${toTokenIcon(row)}"></i-image>
    <i-label caption=" ${formatNumber(row.toAmount)} ${row.toToken.symbol}"></i-label>
  </i-hstack>
  <i-label class="text-opacity" caption="${row.toNetwork.chainName}"></i-label>
  `;
}

const renderStatus = (status: string) => {
  let color = status == 'Executed' ? "green" : "red"
  return `
  <i-vstack>
    <i-label class="${color}" caption="${status}"></i-label>
  <i-vstack>
  `;
}

export {
  bridgeRecordColumns,
  toTokenIcon,
  viewTransaction,
  truncateAddress
};
