import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.3.1/+esm';

class AnimatedSaveButton extends LitElement {
  static properties = {
    text: { type: String },
    showIcon: { type: Boolean },
    icon: { type: String }
  };

  constructor() {
    super();
    this.text = '';
    this.icon = '';
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
      border: 1px solid rgb(3, 98, 193);
      background-color: rgb(0, 112, 225);
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

  fillBackgroundFromLeftToRight(color = 'rgb(0, 150, 255)', duration = 500) {
    const button = this.shadowRoot.querySelector('button');
    
    // Create fill-overlay div
    const overlay = document.createElement('div');
    overlay.className = 'fill-overlay';
    overlay.style.backgroundColor = color;
    overlay.style.width = '0%';
    overlay.style.opacity = '1';
    overlay.style.transition = `width ${duration}ms ease`;
    button.appendChild(overlay);
    
    // Force reflow and animate
    overlay.offsetHeight;
    overlay.style.width = '100%';
    
    setTimeout(() => {
      button.style.backgroundColor = color;
      overlay.remove();
    }, duration);
  }

  fadeBackground(color = 'rgb(0, 150, 255)', duration = 500) {
    const button = this.shadowRoot.querySelector('button');
    
    // Create fill-overlay div
    const overlay = document.createElement('div');
    overlay.className = 'fill-overlay';
    overlay.style.backgroundColor = color;
    overlay.style.width = '100%';
    overlay.style.opacity = '0';
    overlay.style.transition = `opacity ${duration}ms ease`;
    button.appendChild(overlay);
    
    // Force reflow and animate
    overlay.offsetHeight;
    overlay.style.opacity = '1';
    
    setTimeout(() => {
      button.style.backgroundColor = color;
      overlay.remove();
    }, duration);
  }
}

customElements.define('animated-save-button', AnimatedSaveButton); 