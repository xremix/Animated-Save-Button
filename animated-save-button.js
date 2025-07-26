import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.3.1/+esm';

class AnimatedSaveButton extends LitElement {
  static properties = {
    text: { type: String },
    showIcon: { type: Boolean }
  };

  constructor() {
    super();
    this.text = '';
    this.showIcon = true;
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
          ${this.showIcon ? html`<ion-icon class="icon" name="save-outline"></ion-icon>` : ''}
          <span>${this.text}</span>
        </div>
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('save-clicked'));
  }

  changeState(text, animation, color, duration = 500){
    if(text){
      this.text = text;
    }
    if(animation === 'leftToRight'){
      this.fillBackgroundFromLeftToRight(color, duration);
    } else if(animation === 'fade'){
      this.fadeBackground(color, duration);
    }
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