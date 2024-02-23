import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="mui-textfield">
      <input
        #input
        type="text"
        [formControl]="formControl"
        [id]="formControlName"
      />
      <label [for]="formControlName">
        {{ label }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() label!: string; // <-- passing custom value from parent component

  @Input() formControlName!: string; // <-- passing value from parent component

  @Input() placeholder?: string;

  @Input() maxlength?: string;

  @Input() minlength?: string;

  @Input() max?: number;

  @Input() min?: number;

  @Input() autofocus?: boolean = false;

  @Input() type?: 'number' | 'text' | 'password' | 'email' = 'text';

  @ViewChild('input', { static: true, read: ElementRef }) input: ElementRef;

  readonly formControl: FormControl = new FormControl(); // <-- local FormControl

  private readonly destroyRef: DestroyRef = inject(DestroyRef); // <-- used for unsubscribing

  onChange: (value: string) => void = noop;
  onTouched: () => void = noop;

  constructor(private renderer: Renderer2, private wrapper: ElementRef) {}

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((text: string): void => this.onChange(text)); // <-- passing value to the parent form
  }

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const inputEl: HTMLInputElement = this.input.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) {
      this.renderer.selectRootElement(inputEl).focus();
    }

    // set attributes
    [
      'id',
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
    this.renderer.removeAttribute(wrapperEl, 'minlength');
    this.renderer.removeAttribute(wrapperEl, 'maxlength');
    this.renderer.removeAttribute(wrapperEl, 'id');
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(text: string): void {
    this.formControl.patchValue(text, { emitEvent: false });
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
