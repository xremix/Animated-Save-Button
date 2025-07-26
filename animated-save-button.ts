import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('animated-save-button')
export class AnimatedSaveButton extends LitElement {
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

declare global {
  interface HTMLElementTagNameMap {
    'animated-save-button': AnimatedSaveButton;
  }
} 