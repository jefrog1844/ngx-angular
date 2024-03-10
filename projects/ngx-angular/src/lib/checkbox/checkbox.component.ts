import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlValueAccessorDirective } from '../shared/control-value-accessor.directive';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  hostDirectives: [ControlValueAccessorDirective],
  template: `
    <div class="mui-checkbox">
      <label [for]="id">
        <input
          #input
          [id]="id"
          type="checkbox"
          [formControl]="ngControl.control"
        />
        {{ label }}
      </label>
    </div>
  `,
  styles: `
  label {
    &.required {
      &:after {
        content: "*";
        color: red;
      }
    }
  }
  `,
})
export class CheckboxComponent implements AfterViewInit, OnInit {
  ngControl = inject(ControlValueAccessorDirective);

  isRequired = false;

  @Input() id!: string;

  @Input() label!: string; // <-- passing custom value from parent component

  @ViewChild('input', { static: true, read: ElementRef }) input: ElementRef;

  constructor(private renderer: Renderer2, private wrapper: ElementRef) {}

  ngOnInit(): void {
    if (this.ngControl) {
      this.isRequired = this.ngControl?.control?.hasValidator(
        Validators.required
      );
    }
  }

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const inputEl: HTMLInputElement = this.input.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // set attributes on inner input element
    ['required'].forEach((attrName) => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.setAttribute(inputEl, attrName, attrVal);
      }
    });

    // remove attributes from wrapper
    ['id', 'required', 'label'].forEach((attrName) => {
      this.renderer.removeAttribute(wrapperEl, attrName);
    });
  }
}
