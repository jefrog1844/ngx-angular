import { Directive, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControlDirective,
  FormControlName,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';

@Directive({
  selector: '[libControlValueAccessor]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ControlValueAccessorDirective,
    },
  ],
})
export class ControlValueAccessorDirective implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}

export function injectNgControl() {
  const ngControl = inject(NgControl, { self: true, optional: true });

  if (!ngControl) throw new Error('...');
  if (
    ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
  ) {
    return ngControl;
  } else {
    throw new Error('...');
  }
}
