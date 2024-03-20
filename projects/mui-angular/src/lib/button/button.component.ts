import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RippleDirective } from './ripple.directive';

@Component({
  selector: 'mui-button',
  standalone: true,
  imports: [RippleDirective],
  template: `
    <button
      type="{{ type }}"
      class="mui-btn"
      muiRipple
      #button
      [disabled]="disabled"
    >
      <ng-content></ng-content>
      <span class="mui-btn__ripple-container"
        ><span class="mui-ripple" #ripple></span
      ></span>
    </button>
  `,
})
export class ButtonComponent implements AfterViewInit {
  @ViewChild('button')
  button!: ElementRef<HTMLButtonElement>;

  @Input() variant?: string;
  @Input() color?: string;
  @Input() size?: string;
  @Input() disabled?: boolean = false;
  @Input() type?: 'button' | 'reset' | 'submit' = 'submit';

  private buttonEl!: HTMLButtonElement;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // cache button and ripple elements
    this.buttonEl = this.button.nativeElement;

    // set button styles
    ['variant', 'color', 'size'].forEach((attrName) => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.addClass(this.buttonEl, 'mui-btn--' + attrVal);
      }
    });
  }
}
