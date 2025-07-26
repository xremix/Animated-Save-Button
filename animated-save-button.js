import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.3.1/+esm';

class AnimatedSaveButton extends LitElement {
  static styles = css`
    button {
      padding: 8px 16px;
      border: 1px solid rgb(3, 98, 193);
      background-color:rgb(0, 112, 225);
      color:rgb(255, 255, 255);
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
    }
  `;

  render() {
    return html`
      <button>Save</button>
    `;
  }
}

customElements.define('animated-save-button', AnimatedSaveButton); 