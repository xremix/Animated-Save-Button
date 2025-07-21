import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedButtonComponent } from './animated-button/animated-button.component';
import "@awesome.me/webawesome/dist/components/button/button.js"
import "@awesome.me/webawesome/dist/components/icon/icon.js"
import "@awesome.me/webawesome/dist/components/input/input.js";
import "@awesome.me/webawesome/dist/components/select/select.js";
import "@awesome.me/webawesome/dist/components/textarea/textarea.js";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimatedButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'animated-save-button';

  onButtonClick(buttonType: string) {
    console.log(`${buttonType} button clicked!`);
  }

  onSendMessage() {
    alert('Save button clicked! Message sent!');
    console.log('Message sent!');
    // Add your form submission logic here
  }
}
