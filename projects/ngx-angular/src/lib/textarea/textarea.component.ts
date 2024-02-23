import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  Self,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'lib-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mui-textfield">
      <textarea
        id="textarea"
        #textarea
        [ngClass]="{
          'mui--is-dirty': ngControl?.dirty,
          'mui--is-empty': ngControl?.value,
          'mui--is-invalid': ngControl?.invalid,
          'mui--is-not-empty': ngControl?.value,
          'mui--is-pristine': ngControl?.pristine,
          'mui--is-touched': ngControl?.touched,
          'mui--is-untouched': ngControl?.untouched
        }"
        (input)="onChange($event.target.value)"
        (blur)="onTouched()"
        [disabled]="disabled"
      >
      </textarea>
      <label for="textarea" tabindex="-1">{{ label }}</label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements AfterViewInit, ControlValueAccessor {
  @Input() autofocus?: boolean = false;

  @Input() disabled?: boolean = false;

  @Input() placeholder?: string;

  @Input() id?: string;

  @Input() label?: string;

  @Input() maxlength?: string;

  @Input() required?: boolean = false;

  @Input() rows?: string = '2';

  @ViewChild('textarea', { static: true, read: ElementRef })
  textarea!: ElementRef;

  constructor(
    @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private wrapper: ElementRef
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    // cache references to input and wrapper
    const inputEl: HTMLTextAreaElement = this.textarea.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) {
      this.renderer.selectRootElement(inputEl).focus();
    }

    /**
     * name - gets set on NgControl through inputs for NgModel and formControlName directives only.
     * Does not work for standalone FormControl directive
     */
    if (this.ngControl?.name) {
      this.renderer.setAttribute(
        inputEl,
        'name',
        this.ngControl.name.toString()
      );
    } else {
      console.warn(`
        It looks like you're using formControl which does not have an input for the
        name attribute.  If the name attribute is required (i.e. when submitting a form),
        it is recommended to use either ngModel or formControlName.`);
    }

    // set attributes
    if (this.id) {
      this.renderer.setAttribute(inputEl, 'id', this.id);
    }

    if (this.maxlength) {
      this.renderer.setAttribute(inputEl, 'maxLength', this.maxlength);
    }

    if (this.placeholder) {
      this.renderer.setAttribute(inputEl, 'placeholder', this.placeholder);
    }

    // TODO - verify this works as intended
    if (this.required) {
      this.renderer.setProperty(inputEl, 'required', this.required);
    }

    if (this.rows) {
      this.renderer.setAttribute(inputEl, 'rows', this.rows);
    }

    // remove attributes from wrapper
    this.renderer.removeAttribute(wrapperEl, 'maxlength');
    this.renderer.removeAttribute(wrapperEl, 'id');
  }

  /**
   * This code listens for updates from the component and
   * writes them to the native <textarea> element
   *
   * NOTE: writeValue gets called before ngOnInit Angular issue #29218
   * Side effect of the issue is that trying to access the inputEl
   * cached in ngOnInit will result in undefined error in writeValue.
   * This also requires ViewChild({static: true}) in order for input to
   * be available before onChanges is called.
   * @param value - value from <mui-textarea>
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  writeValue(value: any): void {
    // update input field with value received from outer component
    this.renderer.setProperty(this.textarea.nativeElement, 'value', value);
  }

  /**
   * Code below this point is all boilerplate - DO NOT CHANGE
   */
  onTouched = () => {};

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  onChange = (_: any) => {};

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}
