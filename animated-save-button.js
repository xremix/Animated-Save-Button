import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@3.3.1/+esm';

class AnimatedSaveButton extends LitElement {
  static styles = css`
    button {
      padding: 8px 16px;
      border: 1px solid #ccc;
      background-color: #f8f9fa;
      color: #333;
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