import { customElements, Module, Control, ControlElement, Panel, Image, Label, Icon, HStack, Container } from '@ijstech/components';
import './index.css';
import Assets from '../assets';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['price-info']: ControlElement;
    }
  }
};

@customElements('price-info')
export class PriceInfo extends Module {
  private priceContent: Panel;

  private _items: any[];
  public onTogglePrice: any;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get Items(): any[] {
    return this._items;
  }
  set Items(value: any[]) {
    this._items = value;
    this.renderItems();
  }

  renderItems = async () => {
    if (this.priceContent.children.length === this.Items.length) {
      this.updateItems();
      return;
    }

    this.priceContent.innerHTML = '';

    for (let i = 0; i < this.Items.length; i++) {
      const item = this.Items[i];
      const row = new HStack(undefined, {
        gap: 2,
        wrap: 'wrap',
        verticalAlignment: 'center',
        horizontalAlignment: 'space-between',
        padding: { top: '0.25rem', bottom: '0.25rem', left: 0, right: 0 }
      });
      if (item.isHidden) {
        row.classList.add('hidden');
      }

      const titleLabel = new Label(row, { caption: item.title });
      row.appendChild(titleLabel);

      if (item.tooltip) {
        const iconTooltip = this.renderIconTooltip(row, item);
        row.appendChild(await iconTooltip);
      }
      const hStack = new HStack(row, {
        verticalAlignment: 'center',
        margin: { left: 'auto' }
      });
      if (item.width) {
        hStack.width = item.width;
      }
      const valueLabel = new Label(hStack, { caption: item.value });
      valueLabel.classList.add('ml-auto', 'text-right');

      if (item.isToggleShown) {
        this.onRenderToggleBtn(hStack);
      }
      this.priceContent.appendChild(row);
    }
  }

  onRenderToggleBtn = (parent: Control) => {
    const image = new Image(parent, {
      width: 24,
      height: 24,
      url: Assets.fullPath("img/swap/icon-swap.png"),
      margin: { left: 5 },
      display: 'flex'
    });
    image.classList.add("rounded-icon");
    image.style.transform = "rotate(90deg)";
    image.onClick = (source: Control, event: Event) => {
      event.stopPropagation();
      if (this.onTogglePrice)
        this.onTogglePrice(this);
    };
    return image;
  }

  renderIconTooltip = async (parent: Control, item: any) => {
    const iconTooltip = await Icon.create();
    iconTooltip.classList.add('icon-tooltip');
    iconTooltip.name = 'question-circle';
    iconTooltip.width = 15;
    iconTooltip.height = 15;
    iconTooltip.fill = '#fff';
    if (item.onClick) {
      iconTooltip.classList.add('cur-pointer');
      iconTooltip.tooltip.content = 'Click to view details';
      iconTooltip.tooltip.placement = 'right';
      iconTooltip.tooltip.maxWidth = '270px';
      iconTooltip.onClick = item.onClick;
    } else {
      iconTooltip.tooltip.content = item.tooltip;
      iconTooltip.tooltip.placement = 'right';
      iconTooltip.tooltip.maxWidth = '270px';
    }
    return iconTooltip;
  }

  updateItems = async () => {
    for (let i = 0; i < this.Items.length; i++) {
      const item = this.Items[i];
      const row = this.priceContent.children[i] as HStack;
      const iconTooltip = row.querySelector('.icon-tooltip');
      const titleLabel = row.firstChild as Label;
      const hStack = row.children[iconTooltip ? 2 : 1] as HStack;
      const valueLabel = hStack.firstChild as Label;
      if (titleLabel?.caption && item.title != titleLabel.caption) {
        titleLabel.caption = item.title
      }
      if (valueLabel?.caption && item.value != valueLabel.caption) {
        valueLabel.caption = item.value
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
      } else if (!item.isToggleShown && hStack.children.length > 1 && !item.tooltip) {
        hStack.removeChild(hStack.children[1]);
      }

      setTimeout(function(){
        const iconTooltips = row.querySelectorAll(".icon-tooltip");
        if (iconTooltips && iconTooltips.length > 1) {
            row.removeChild(iconTooltips[1])
        }
      }, 2000)
    }
  }

  init() {
    super.init();
  }

  render() {
    return (
      <i-panel class="price-info" width="auto">
        <i-label class="header" caption="Price Info" padding={{ bottom: '0.5rem' }} font={{ size: '1.125rem' }}></i-label>
        <i-panel id="priceContent"></i-panel>
      </i-panel>
    )
  }
}