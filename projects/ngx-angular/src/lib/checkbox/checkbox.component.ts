import {
  Component,
  DestroyRef,
  forwardRef,
  inject,
  Input,
  OnInit,
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
  selector: 'lib-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="mui-checkbox">
      <label [for]="formControlName">
        <input
          type="checkbox"
          [formControl]="formControl"
          [id]="formControlName"
        />
        {{ label }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string; // <-- passing custom value from parent component
  @Input() formControlName!: string; // <-- passing value from parent component

  readonly formControl: FormControl = new FormControl(); // <-- local FormControl

  private readonly destroyRef: DestroyRef = inject(DestroyRef); // <-- used for unsubscribing

  onChange: (value: boolean) => void = noop;
  onTouched: () => void = noop;

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((checked: boolean): void => this.onChange(checked)); // <-- passing value to the parent form
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(checked: boolean): void {
    this.formControl.patchValue(checked, { emitEvent: false });
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
