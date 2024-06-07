import {
  customElements,
  customModule,
  Module,
  Container,
  ControlElement,
  Modal,
  VStack,
  Panel,
} from '@ijstech/components';
import { TransactionSettingsLayout } from '../transaction-settings-layout/index';
import styleClass from './index.css';
import { State } from '../store/index';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['xchain-transaction-settings']: ControlElement;
    }
  }
};

@customModule
@customElements('xchain-transaction-settings')
export class TransactionSettings extends Module {
  private transactionModal: Modal;
  private transactionLayout: TransactionSettingsLayout;
  private mainContent: Panel;
  private state: State;

  private _showCrossChain: boolean;

  get showCrossChain() {
    return this._showCrossChain;
  }

  set showCrossChain(value: boolean) {
    this._showCrossChain = value;
    if (this.transactionLayout) {
      this.transactionLayout.showCrossChain = value;
    }
  }

  constructor(state: State, parent?: Container, options?: any) {
    super(parent, options);
    this.state = state;
  }

  async init() {
    this.classList.add(styleClass);
    super.init();
    this.transactionLayout = new TransactionSettingsLayout(this.state);
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
    return (
      <i-modal
        id="transactionModal"
        class='dark-modal'
        title="Transaction Settings"
        closeIcon={{ name: 'times' }}
      >
        <i-panel id="mainContent"></i-panel>
      </i-modal>
    )
  }
};