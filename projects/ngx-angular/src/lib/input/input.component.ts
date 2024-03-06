import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ControlValueAccessorDirective,
  injectNgControl,
} from '../shared/control-value-accessor.directive';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  hostDirectives: [ControlValueAccessorDirective],
  template: `
    <div class="mui-textfield">
      <input [id]="id" #input [type]="type" [formControl]="ngControl.control" />
      <label [for]="id" [class.required]="isRequired">
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
export class InputComponent implements AfterViewInit, OnInit {
  ngControl = injectNgControl();

  isRequired = false;

  @Input() label!: string;

  @Input() id!: string;

  @Input() placeholder?: string;

  @Input() maxlength?: string;

  @Input() minlength?: string;

  @Input() max?: number;

  @Input() min?: number;

  @Input() autofocus?: boolean = false;

  @Input() type?: 'number' | 'text' | 'password' | 'email' = 'text';

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

    // autofocus
    if (this.autofocus) {
      this.renderer.selectRootElement(inputEl).focus();
    }

    // set attributes on inner input element
    [
      'min',
      'max',
      'minlength',
      'maxlength',
      'placeholder',
      'required',
      'type',
    ].forEach((attrName) => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.setAttribute(inputEl, attrName, attrVal);
      }
    });

    // remove attributes from wrapper
    [
      'id',
      'min',
      'max',
      'minlength',
      'maxlength',
      'placeholder',
      'required',
      'type',
      'label',
      'placeholder',
    ].forEach((attrName) => {
      this.renderer.removeAttribute(wrapperEl, attrName);
    });
  }
}
