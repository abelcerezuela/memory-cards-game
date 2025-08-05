import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /** Button type: "button" | "submit" | "reset" */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Disables the button and sets aria-disabled */
  @Input() disabled = false;

  /** aria-pressed for toggles or selection states */
  @Input('aria-pressed') ariaPressed?: boolean;

  /** aria-describedby or any other ARIA attribute */
  @Input('aria-describedby') ariaDescribedBy?: string;

  /** Additional CSS classes to apply */
  @Input() extraClasses: string | string[] = [];

  /** Custom [ngClass] configuration */
  @Input() ngClassConfig: string | string[] | { [klass: string]: any } = {};

  /** Click event emitter */
  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  // Always return a string for [class]
  get classList(): string {
    return Array.isArray(this.extraClasses)
      ? this.extraClasses.join(' ')
      : this.extraClasses;
  }
}
