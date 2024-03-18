import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'select-formcontrol-test',
  standalone: true,
  imports: [
    SelectComponent,
    OptionComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  template: `
    <lib-select [formControl]="formControlSelect">
      <lib-option value="option-1" label="Option 1"></lib-option>
      <lib-option value="option-2" label="Option 2"></lib-option>
      <lib-option value="option-3" label="Option 3"></lib-option>
      <lib-option
        value="option-4"
        label="Option 4"
        disabled="true"
      ></lib-option>
    </lib-select>
  `,
})
class SelectWithFormControlComponent {
  formControlSelect: FormControl = new FormControl('', Validators.required);
}

@Component({
  selector: 'select-formcontrolname-test',
  standalone: true,
  imports: [
    SelectComponent,
    OptionComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  template: `
    <form class="mui-form" [formGroup]="selectForm">
      <lib-select formControlName="select">
        <lib-option value="option-1" label="Option 1"></lib-option>
        <lib-option value="option-2" label="Option 2"></lib-option>
        <lib-option value="option-3" label="Option 3"></lib-option>
        <lib-option
          value="option-4"
          label="Option 4"
          disabled="true"
        ></lib-option>
      </lib-select>
    </form>
  `,
})
class SelectWithFormControlNameComponent {
  selectForm = new FormGroup({
    select: new FormControl('', Validators.required),
  });
}

@Component({
  selector: 'select-ngmodel-test',
  standalone: true,
  imports: [
    SelectComponent,
    OptionComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  template: `
    <form class="mui-form" #s="ngForm">
      <lib-select [(ngModel)]="selectValue" name="selectValue" required="true">
        <lib-option value="option-1" label="Option 1"></lib-option>
        <lib-option value="option-2" label="Option 2"></lib-option>
        <lib-option value="option-3" label="Option 3"></lib-option>
        <lib-option
          value="option-4"
          label="Option 4"
          disabled="true"
        ></lib-option>
      </lib-select>
    </form>
  `,
})
class SelectWithNgModelComponent {
  selectValue: any = '';
}

describe('SelectComponent - form control', () => {
  let component: SelectWithFormControlComponent;
  let fixture: ComponentFixture<SelectWithFormControlComponent>;
  let selectDebugElement: DebugElement;
  let selectNativeElement: HTMLElement;
  let selectInstance: SelectComponent;
  let selectInputElement: HTMLSelectElement;
  let optionDebugElements: DebugElement[];
  let optionInstances: OptionComponent[];
  let innerOptions: DebugElement[];

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void {}
      },
    };

    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    })
      .overrideComponent(SelectComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SelectWithFormControlComponent);
    fixture.detectChanges();

    component = fixture.debugElement.componentInstance;

    selectDebugElement = fixture.debugElement.query(
      By.directive(SelectComponent)
    );
    selectInstance =
      selectDebugElement.injector.get<SelectComponent>(SelectComponent);
    selectNativeElement = selectDebugElement.nativeElement;
    selectInputElement = selectDebugElement.query(
      By.css('select')
    ).nativeElement;

    optionDebugElements = fixture.debugElement.queryAll(
      By.directive(OptionComponent)
    );
    optionInstances = optionDebugElements.map(
      (debugEl) => debugEl.componentInstance
    );
    innerOptions = fixture.debugElement.queryAll(By.css('option'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty', () => {
    expect(component.formControlSelect.value).toBeFalsy();
    expect(selectInputElement.selectedIndex).toEqual(-1);
  });

  it('should call onChange and set form control when an option when it is selected', () => {
    spyOn(selectInstance, 'onChange').and.callThrough();
    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(selectInstance.ngControl.value).toBe(
      innerOptions[0].nativeElement.value
    );
    expect(selectInstance.onChange).toHaveBeenCalledTimes(1);
  });

  it('should select option when setting form control value', () => {
    component.formControlSelect.setValue(innerOptions[3].nativeElement.value);
    fixture.detectChanges();

    expect(selectInputElement.value).toEqual(
      innerOptions[3].nativeElement.value
    );
    expect(selectInputElement.selectedIndex).toEqual(3);
  });

  it('should disable select when form control is disabled', () => {
    component.formControlSelect.disable();
    fixture.detectChanges();

    expect(selectInputElement.disabled).toBeTrue();
  });

  it('should disable change interaction when form control is disabled', () => {
    component.formControlSelect.disable();
    fixture.detectChanges();

    spyOn(selectInstance, 'onChange');
    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.formControlSelect.value).toBeFalsy();
  });

  it('should set option to disabled', () => {
    expect(innerOptions[3].nativeElement.disabled).toBeTrue();
  });
});

describe('SelectComponent - form control name', () => {
  let component: SelectWithFormControlNameComponent;
  let fixture: ComponentFixture<SelectWithFormControlNameComponent>;
  let selectDebugElement: DebugElement;
  let selectNativeElement: HTMLElement;
  let selectInstance: SelectComponent;
  let selectInputElement: HTMLSelectElement;
  let optionDebugElements: DebugElement[];
  let optionInstances: OptionComponent[];
  let innerOptions: DebugElement[];

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void {}
      },
    };

    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    })
      .overrideComponent(SelectComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SelectWithFormControlNameComponent);
    fixture.detectChanges();

    component = fixture.debugElement.componentInstance;

    selectDebugElement = fixture.debugElement.query(
      By.directive(SelectComponent)
    );
    selectInstance =
      selectDebugElement.injector.get<SelectComponent>(SelectComponent);
    selectNativeElement = selectDebugElement.nativeElement;
    selectInputElement = selectDebugElement.query(
      By.css('select')
    ).nativeElement;

    optionDebugElements = fixture.debugElement.queryAll(
      By.directive(OptionComponent)
    );
    optionInstances = optionDebugElements.map(
      (debugEl) => debugEl.componentInstance
    );
    innerOptions = fixture.debugElement.queryAll(By.css('option'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty', () => {
    expect(component.selectForm.controls.select.value).toBeFalsy();
    expect(selectInputElement.selectedIndex).toEqual(-1);
  });

  it('should call onChange and set form control when an option when it is selected', () => {
    spyOn(selectInstance, 'onChange').and.callThrough();
    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(selectInstance.ngControl.value).toBe(
      innerOptions[0].nativeElement.value
    );
    expect(selectInstance.onChange).toHaveBeenCalledTimes(1);
  });

  it('should select option when setting form control value', () => {
    component.selectForm.controls.select.setValue(
      innerOptions[3].nativeElement.value
    );
    fixture.detectChanges();

    expect(selectInputElement.value).toEqual(
      innerOptions[3].nativeElement.value
    );
    expect(selectInputElement.selectedIndex).toEqual(3);
  });

  it('should disable select when form control is disabled', () => {
    component.selectForm.controls.select.disable();
    fixture.detectChanges();

    expect(selectInputElement.disabled).toBeTrue();
  });

  it('should disable change interaction when form control is disabled', () => {
    component.selectForm.controls.select.disable();
    fixture.detectChanges();

    spyOn(selectInstance, 'onChange');
    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectForm.controls.select.value).toBeFalsy();
  });

  it('should set option to disabled', () => {
    expect(innerOptions[3].nativeElement.disabled).toBeTrue();
  });

  it('should set form to valid when option is selected', () => {
    expect(component.selectForm.valid).toBeFalse();

    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectForm.valid).toBeTrue();
  });
});

describe('SelectComponent - ngModel', () => {
  let component: SelectWithNgModelComponent;
  let fixture: ComponentFixture<SelectWithNgModelComponent>;
  let selectDebugElement: DebugElement;
  let selectNativeElement: HTMLElement;
  let selectInstance: SelectComponent;
  let selectInputElement: HTMLSelectElement;
  let optionDebugElements: DebugElement[];
  let optionInstances: OptionComponent[];
  let innerOptions: DebugElement[];
  let form: NgForm;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void {}
      },
    };

    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    })
      .overrideComponent(SelectComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SelectWithNgModelComponent);
    fixture.detectChanges();

    component = fixture.debugElement.componentInstance;

    selectDebugElement = fixture.debugElement.query(
      By.directive(SelectComponent)
    );
    selectInstance =
      selectDebugElement.injector.get<SelectComponent>(SelectComponent);
    selectNativeElement = selectDebugElement.nativeElement;
    selectInputElement = selectDebugElement.query(
      By.css('select')
    ).nativeElement;

    optionDebugElements = fixture.debugElement.queryAll(
      By.directive(OptionComponent)
    );
    optionInstances = optionDebugElements.map(
      (debugEl) => debugEl.componentInstance
    );
    innerOptions = fixture.debugElement.queryAll(By.css('option'));

    const formElement = fixture.debugElement.children[0];
    form = formElement.injector.get(NgForm);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty', () => {
    expect(component.selectValue).toBeFalsy();
    expect(selectInputElement.selectedIndex).toEqual(-1);
  });

  it('should call onChange and set form control when an option when it is selected', () => {
    spyOn(selectInstance, 'onChange').and.callThrough();
    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(selectInstance.ngControl.value).toBe(
      innerOptions[0].nativeElement.value
    );
    expect(selectInstance.onChange).toHaveBeenCalledTimes(1);
  });

  it('should select option when setting ngModel value', fakeAsync(() => {
    component.selectValue = innerOptions[3].nativeElement.value;
    fixture.detectChanges();
    tick();

    expect(selectInputElement.value).toEqual(
      innerOptions[3].nativeElement.value
    );
    expect(selectInputElement.selectedIndex).toEqual(3);
  }));

  it('should disable select when form control is disabled', () => {
    selectInstance.disabled = true;
    fixture.detectChanges();

    expect(selectInputElement.disabled).toBeTrue();
  });

  it('should disable change interaction when form control is disabled', () => {
    selectInstance.disabled = true;
    fixture.detectChanges();

    spyOn(selectInstance, 'onChange');
    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectValue).toBeFalsy();
  });

  it('should set option to disabled', () => {
    expect(innerOptions[3].nativeElement.disabled).toBeTrue();
  });

  it('should set form to valid when option is selected', fakeAsync(() => {
    expect(form.valid).toBe(false);

    selectInputElement.value = innerOptions[0].nativeElement.value;
    selectInputElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();

    expect(form.valid).toBe(true);
  }));
});
