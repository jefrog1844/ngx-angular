import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioComponent } from './radio.component';

@Component({
  selector: 'ngmodel-radio-test',
  standalone: true,
  imports: [RadioComponent, ReactiveFormsModule, FormsModule],
  template: `
    <form class="mui-form--inline" #r="ngForm">
      <lib-radio
        [(ngModel)]="modelValue"
        name="modelValue"
        [ngModelOptions]="{ standalone: true }"
        label="Option 1"
        value="option-1"
      ></lib-radio>
      <lib-radio
        [(ngModel)]="modelValue"
        name="modelValue"
        [ngModelOptions]="{ standalone: true }"
        label="Option 2"
        value="option-2"
      ></lib-radio>
      <lib-radio
        [(ngModel)]="modelValue"
        name="modelValue"
        [ngModelOptions]="{ standalone: true }"
        label="Option 3"
        value="option-3"
      ></lib-radio>
    </form>
  `,
})
class RadiosWithNgModelComponent {
  modelValue: any = '';
}

@Component({
  selector: 'formcontrol-radio-test',
  standalone: true,
  imports: [RadioComponent, ReactiveFormsModule, FormsModule],
  template: `
    <form class="mui-form" [formGroup]="radioForm">
      <lib-radio
        formControlName="groupA"
        id="1"
        label="Option 1"
        value="a-1"
      ></lib-radio>
      <lib-radio
        formControlName="groupA"
        id="2"
        label="Option 2"
        value="a-2"
      ></lib-radio>
      <lib-radio
        formControlName="groupA"
        id="3"
        label="Option 3"
        value="a-3"
      ></lib-radio>
    </form>
  `,
})
class RadiosWithFormControlNameComponent {
  radioForm = new FormGroup({
    groupA: new FormControl(''),
  });
}

describe('RadioComponent - form control', () => {
  let component: RadiosWithFormControlNameComponent;
  let fixture: ComponentFixture<RadiosWithFormControlNameComponent>;
  let radioDebugElements: DebugElement[];
  let radioNativeElements: HTMLElement[];
  let radioInputElements: HTMLInputElement[];
  let radioInstances: RadioComponent[];

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void {}
      },
    };

    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    })
      .overrideComponent(RadioComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RadiosWithFormControlNameComponent);
    fixture.detectChanges();

    component = fixture.debugElement.componentInstance;

    radioDebugElements = fixture.debugElement.queryAll(
      By.directive(RadioComponent)
    );
    radioNativeElements = radioDebugElements.map(
      (debugEl) => debugEl.nativeElement
    );
    radioInstances = radioDebugElements.map(
      (debugEl) => debugEl.componentInstance
    );

    radioInputElements = radioDebugElements.map(
      (debugEl) => debugEl.query(By.css('input')).nativeElement
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set individual radio names based on the formControlName', () => {
    for (const radio of radioInstances) {
      expect(radio.input.nativeElement.name).toBe('groupA');
    }
  });

  it('should disable click interaction when the form control is disabled', () => {
    component.radioForm.controls.groupA.disable();
    fixture.detectChanges();

    radioInputElements[0].click();
    fixture.detectChanges();

    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
  });

  it('should disable each individual radio when the form control is disabled', () => {
    component.radioForm.controls.groupA.disable();
    fixture.detectChanges();

    for (const radio of radioInstances) {
      expect(radio.input.nativeElement.disabled).toBe(true);
    }
  });

  it('should set status valid when control is required', () => {
    expect(component.radioForm.valid).toBe(true);

    component.radioForm.controls.groupA.setValidators([Validators.required]);
    component.radioForm.controls.groupA.updateValueAndValidity();
    fixture.detectChanges();
    expect(component.radioForm.valid).toBe(false);

    fixture.componentInstance.radioForm.controls.groupA.setValue('a-3');
    fixture.detectChanges();
    expect(component.radioForm.valid).toBe(true);
  });

  it('should update form control value when one of the radios change', () => {
    expect(component.radioForm.controls.groupA.value).toBeFalsy();

    radioInputElements[2].click();
    fixture.detectChanges();

    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
    expect(radioInstances[1].input.nativeElement.checked).toBe(false);
    expect(radioInstances[2].input.nativeElement.checked).toBe(true);
    expect(component.radioForm.controls.groupA.value).toBe('a-3');
  });

  it('should update the form control and radios when one of the radios is clicked', () => {
    expect(component.radioForm.controls.groupA.value).toBeFalsy();

    radioInputElements[0].click();
    fixture.detectChanges();

    expect(component.radioForm.controls.groupA.value).toBe('a-1');
    expect(radioInstances[0].input.nativeElement.checked).toBe(true);
    expect(radioInstances[1].input.nativeElement.checked).toBe(false);
    expect(radioInstances[2].input.nativeElement.checked).toBe(false);

    radioInputElements[1].click();
    fixture.detectChanges();

    expect(component.radioForm.controls.groupA.value).toBe('a-2');
    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
    expect(radioInstances[1].input.nativeElement.checked).toBe(true);
    expect(radioInstances[2].input.nativeElement.checked).toBe(false);
  });

  it('should update radios when setting form control', () => {
    fixture.componentInstance.radioForm.controls.groupA.setValue('a-3');
    fixture.detectChanges();

    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
    expect(radioInstances[1].input.nativeElement.checked).toBe(false);
    expect(radioInstances[2].input.nativeElement.checked).toBe(true);
  });

  it('should update radios when setting form control to null programatically', () => {
    fixture.componentInstance.radioForm.controls.groupA.setValue('');
    fixture.detectChanges();

    expect(component.radioForm.controls.groupA.value).toBeFalsy();
    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
    expect(radioInstances[1].input.nativeElement.checked).toBe(false);
    expect(radioInstances[2].input.nativeElement.checked).toBe(false);
  });

  it('should emit a change event from radio buttons', () => {
    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
    expect(radioInstances[1].input.nativeElement.checked).toBe(false);
    expect(radioInstances[2].input.nativeElement.checked).toBe(false);

    const spies = radioInstances.map((radio, index) =>
      jasmine.createSpy(
        `selectSpy ${index} for ${radio.input.nativeElement.name}`
      )
    );

    spies.forEach((spy, index) => radioInstances[index].changed.subscribe(spy));

    radioInputElements[0].click();
    fixture.detectChanges();

    expect(spies[0]).toHaveBeenCalled();

    radioInputElements[1].click();
    fixture.detectChanges();

    // To match the native radio button behavior, the change event shouldn't
    // be triggered when the radio got unselected.
    expect(spies[0]).toHaveBeenCalledTimes(1);
    expect(spies[1]).toHaveBeenCalledTimes(1);
  });
});

describe('RadioComponent - ngModel', () => {
  let component: RadiosWithNgModelComponent;
  let fixture: ComponentFixture<RadiosWithNgModelComponent>;
  let radioDebugElements: DebugElement[];
  let innerRadios: DebugElement[];
  let radioInstances: RadioComponent[];

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void {}
      },
    };

    await TestBed.configureTestingModule({
      imports: [RadioComponent],
    })
      .overrideComponent(RadioComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RadiosWithNgModelComponent);
    fixture.detectChanges();

    component = fixture.debugElement.componentInstance;

    radioDebugElements = fixture.debugElement.queryAll(
      By.directive(RadioComponent)
    );
    radioInstances = radioDebugElements.map(
      (debugEl) => debugEl.componentInstance
    );
    innerRadios = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set individual radio names based on the group name', () => {
    for (const radio of radioInstances) {
      expect(radio.input.nativeElement.name).toBe('modelValue');
    }
  });

  it('should check the corresponding radio button on form control value change', () => {
    expect(component.modelValue).toBeFalsy();
    for (const radio of radioInstances) {
      expect(radio.input.nativeElement.checked).toBeFalsy();
    }

    component.modelValue = 'option-2';
    for (const radio of radioInstances) {
      expect(radio.input.nativeElement.checked).toBe(
        component.modelValue.value === radio.value
      );
    }
  });

  it('should update the ngModel value when selecting a radio button', async () => {
    innerRadios[1].nativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.modelValue).toBe('option-2');
    });
    expect(radioInstances[0].input.nativeElement.checked).toBe(false);
    expect(radioInstances[1].input.nativeElement.checked).toBe(true);
    expect(radioInstances[2].input.nativeElement.checked).toBe(false);
  });

  it('should update the radio button when changing ngModel', async () => {
    component.modelValue = 'option-3';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(innerRadios[0].nativeElement.checked).toBe(false);
      expect(innerRadios[1].nativeElement.checked).toBe(false);
      expect(innerRadios[2].nativeElement.checked).toBe(true);
    });
  });
});
