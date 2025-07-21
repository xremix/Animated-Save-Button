import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import "@awesome.me/webawesome/dist/components/icon/icon.js"

@Component({
  selector: 'app-animated-button',
  imports: [CommonModule],
  templateUrl: './animated-button.component.html',
  styleUrl: './animated-button.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnimatedButtonComponent {
  @Input() text: string = 'Save';
  @Input() icon: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
