import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.3.1/+esm';

class AnimatedSaveButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    
    button {
      position: relative;
      display: inline-block;
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

    .button-text {
      position: relative;
      display: inline-block;
    }
  `;

  render() {
    return html`
      <button @click=${this.handleClick}>
        <div class="fill-overlay" id="fillOverlay"></div>
        <span class="button-text">Save</span>
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('save-clicked'));
  }



  fillBackgroundFromLeftToRight(color = 'rgb(0, 150, 255)', duration = 500) {
    console.log('fillBackgroundFromLeftToRight');

    const button = this.shadowRoot.querySelector('button');
    
    const overlay = this.shadowRoot.getElementById('fillOverlay');
    if (!overlay) return;
    
    // Set the color
    overlay.style.backgroundColor = color;
    
    // Set the transition duration
    overlay.style.transition = `width ${duration}ms ease`;
    
    // Reset to 0% width
    overlay.style.width = '0%';
    
    // Force a reflow to ensure the reset is applied
    overlay.offsetHeight;
    
    // Animate to 100% width
    overlay.style.width = '100%';
    
    // after animation completes, set the background color to the new color and reset the width to 0%
    setTimeout(() => {
      button.style.backgroundColor = color;
      overlay.style.width = '0%';
    }, duration);
  }
}

customElements.define('animated-save-button', AnimatedSaveButton); 