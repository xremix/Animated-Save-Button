import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.3.1/+esm';

class AnimatedSaveButton extends LitElement {
  static properties = {
    text: { type: String },
    showIcon: { type: Boolean },
    icon: { type: String },
    backgroundColor: { type: String }
  };

  constructor() {
    super();
    this.text = '';
    this.icon = '';
    this.backgroundColor = 'rgb(0, 112, 225)';
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    
    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid;
      background-color: var(--button-bg-color, rgb(0, 112, 225));
      border-color: var(--button-border-color, rgb(0, 100, 202));
      color: rgb(255, 255, 255);
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      overflow: visible;
      min-width: 60px;
      min-height: 36px;
      width: 100%;
      transition: transform 0.1s ease;
      transform: scale(1);
    }

    button:active {
      transform: scale(0.98);
    }

    .fill-overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: rgb(0, 150, 255);
      transition: width 0.5s ease;
      pointer-events: none;
    }

    .button-content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1;
    }

    .icon {
      font-size: 16px;
      line-height: 1;
    }
  `;

  updated(changedProperties) {
    if (changedProperties.has('backgroundColor')) {
      this._updateButtonColors();
    }
  }

  _updateButtonColors() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      const borderColor = this._darkenColor(this.backgroundColor, 10);
      button.style.setProperty('--button-bg-color', this.backgroundColor);
      button.style.setProperty('--button-border-color', borderColor);
    }
  }

  _darkenColor(color, percent) {
    // Parse RGB values
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length !== 3) return color;
    
    const r = Math.max(0, parseInt(rgb[0]) - Math.round(parseInt(rgb[0]) * percent / 100));
    const g = Math.max(0, parseInt(rgb[1]) - Math.round(parseInt(rgb[1]) * percent / 100));
    const b = Math.max(0, parseInt(rgb[2]) - Math.round(parseInt(rgb[2]) * percent / 100));
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  render() {
    return html`
      <button @click=${this.handleClick}>
        <div class="button-content">
          ${this.icon ? html`<ion-icon class="icon" name="${this.icon}"></ion-icon>` : ''}
          <span>${this.text}</span>
        </div>
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('save-clicked'));
  }

  changeState(text, animation, color, duration = null, icon = null){
    if(text && text !== this.text){
      this.text = text;
    }
    if(icon !== null && icon !== this.icon){
      this._animateIconChange(icon, duration || 300);
    }
    if(animation === 'leftToRight'){
      this.fillBackgroundFromLeftToRight(color, duration || 500);
    } else if(animation === 'fade'){
      this.fadeBackground(color, duration || 500);
    }
  }

  async _animateIconChange(newIcon, duration) {
    const buttonContent = this.shadowRoot.querySelector('.button-content');
    const iconEl = buttonContent?.querySelector('.icon');
    iconEl.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    iconEl.style.transform = 'scale(0.8)';
    iconEl.style.opacity = '0';
    setTimeout(() => {
      iconEl.name = newIcon;
      iconEl.style.transform = 'scale(1)';
      iconEl.style.opacity = '1';
    }, duration);
  }

  fillBackgroundFromLeftToRight(color = null, duration = 500) {
    const button = this.shadowRoot.querySelector('button');
    const targetColor = color || this.backgroundColor;
    
    // Create fill-overlay div
    const overlay = document.createElement('div');
    overlay.className = 'fill-overlay';
    overlay.style.backgroundColor = targetColor;
    overlay.style.width = '0%';
    overlay.style.opacity = '1';
    overlay.style.transition = `width ${duration}ms ease`;
    button.appendChild(overlay);
    
    // Force reflow and animate
    overlay.offsetHeight;
    overlay.style.width = '100%';
    
    setTimeout(() => {
      this.backgroundColor = targetColor;
      this._updateButtonColors();
      overlay.remove();
    }, duration);
  }

  fadeBackground(color = null, duration = 500) {
    const button = this.shadowRoot.querySelector('button');
    const targetColor = color || this.backgroundColor;
    
    // Create fill-overlay div
    const overlay = document.createElement('div');
    overlay.className = 'fill-overlay';
    overlay.style.backgroundColor = targetColor;
    overlay.style.width = '100%';
    overlay.style.opacity = '0';
    overlay.style.transition = `opacity ${duration}ms ease`;
    button.appendChild(overlay);
    
    // Force reflow and animate
    overlay.offsetHeight;
    overlay.style.opacity = '1';
    
    setTimeout(() => {
      this.backgroundColor = targetColor;
      this._updateButtonColors();
      overlay.remove();
    }, duration);
  }
}

customElements.define('animated-save-button', AnimatedSaveButton); 