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
};

export const enum EventId {
    ConnectWallet = 'connectWallet',
    IsWalletConnected = 'isWalletConnected',
    IsWalletDisconnected = 'IsWalletDisconnected',
    Paid = 'Paid',
    chainChanged = 'chainChanged',
    ShowExpertModal = 'showExpertModal',
    ShowTransactionModal = 'showTransactionModal',
    SlippageToleranceChanged = 'slippageToleranceChanged',
    ExpertModeChanged = 'expertModeChanged',
    ShowResult = 'showResult',
    SetResultMessage = 'setResultMessage',
    ShowBondModal = 'ShowBondModal',
    ChangeSeletedImage = 'ChangeSeletedImage',
    EmitFocusField = 'emitFocusField',
    EmitFieldChange = 'emitFieldChange',
    ShowActionQueueModal = 'showActionQueueModal',
    EmitButtonStatus = 'emitButtonStatus',
    EmitNewToken = 'emitNewToken',
    ChangedGovState = 'changedGovState',
    ChangedProposalList = 'changedProposalList'
}

export {
    getAPI,
    formatNumber,
    formatNumberWithSeparators,
    DefaultDateTimeFormat,
    DefaultDateFormat,
    formatDate,
    formatUTCDate,
    limitDecimals,
    limitInputNumber,
    isInvalidInput,
    toWeiInv,
    numberToBytes32,
    getParamsFromUrl,
    uniqWith,
    getWeekDays,
    compareDate,
    formatPercentNumber,
    SITE_ENV,
    showResultMessage,
    flatMap
  } from './helper';
  
  export {
    parseContractError
  } from './error';
  
  export {
    isTransactionConfirmed,
    registerSendTxEvents,
    approveERC20Max,
    getERC20Allowance,
    TokenMapType,
    isAddressValid,
    ERC20MaxAmount,
  } from './common';