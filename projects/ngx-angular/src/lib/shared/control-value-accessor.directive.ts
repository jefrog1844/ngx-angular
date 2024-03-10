import { Directive, Injector, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class ControlValueAccessorDirective
  implements ControlValueAccessor, OnInit
{
  control: FormControl;

  private injector = inject(Injector);
  private subscription?: Subscription;

  // https://dev.to/cyrillbrito/stop-re-implementing-controlvalueaccessor-5hmh
  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });

    if (ngControl instanceof NgModel) {
      this.control = ngControl.control;
      this.subscription = ngControl.control.valueChanges.subscribe((value) => {
        if (ngControl.model !== value || ngControl.viewModel !== value) {
          ngControl.viewToModelUpdate(value);
        }
      });
    } else if (ngControl instanceof FormControlDirective) {
      this.control = ngControl.control;
    } else if (ngControl instanceof FormControlName) {
      const container = this.injector.get(ControlContainer)
        .control as FormGroup;
      this.control = container.controls[ngControl.name] as FormControl;
    } else {
      this.control = new FormControl();
    }
  }

  writeValue() {}
  registerOnChange() {}
  registerOnTouched() {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
