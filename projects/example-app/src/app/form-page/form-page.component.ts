import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelDirective } from '../../../../mui-angular/src/lib/shared/float-label-directive';
import {
  ButtonComponent,
  CheckboxComponent,
  ContainerComponent,
  InputComponent,
  OptionComponent,
  PanelComponent,
  RadioComponent,
  SelectComponent,
  TextareaComponent,
} from '../../../../mui-angular/src/public-api';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    ContainerComponent,
    PanelComponent,
    InputComponent,
    SelectComponent,
    OptionComponent,
    TextareaComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonComponent,
    RadioComponent,
    FloatLabelDirective,
  ],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent {
  // Input - reactive form
  inputForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl('', Validators.required),
    age: new FormControl(18),
    notes: new FormControl(''),
  });

  // Input - template driven form
  firstName = 'Mui';
  lastName = 'Css';

  // input - floating
  floatingForm = new FormGroup({
    floatingText: new FormControl(''),
  });

  // input - inline
  inlineForm = new FormGroup({
    inlineText: new FormControl(''),
  });

  // Input - standalone
  inputControl: FormControl = new FormControl('');
  inputValue = 'some input value for ngModel';

  // checkbox - reactive
  checkForm = new FormGroup({
    checkOne: new FormControl(false, Validators.requiredTrue),
    checkTwo: new FormControl({ value: false, disabled: true }),
    checkThree: new FormControl(true),
  });

  // checkbox - template driven
  checkValueA: boolean = false;
  checkValueB: boolean;

  // checkbox - standalone
  standaloneCheck: FormControl = new FormControl(false);
  standaloneCheckValue: boolean = false;

  // radio - reactive
  radioForm = new FormGroup({
    groupA: new FormControl('', Validators.required),
    groupB: new FormControl('', Validators.required),
  });

  // radio - template driven
  radioValue: any = '';

  // radio - standalone
  standaloneRadio: FormControl = new FormControl('');
  standaloneRadioValue: any = '';

  // select - reactive
  selectForm = new FormGroup({
    inputA: new FormControl('option-4'),
    inputB: new FormControl('', Validators.required),
    inputC: new FormControl({ value: '', disabled: true }),
    inputD: new FormControl(''),
  });

  // select template driven
  selectValueA: any = 'option-4';
  selectValueB: any = '';
  selectValueC: any = '';
  selectValueD: any = '';

  // select - standalone
  standaloneSelect: FormControl = new FormControl('');
  standaloneSelectValue: any = '';

  constructor(private fb: FormBuilder) {}

  // reset input form
  submitInputReactiveForm(): void {
    console.log(
      'reset reactive inputForm: ',
      `${this.inputForm.value} | ${this.inputForm.status}`
    );
    this.inputForm.reset();
  }

  // reset template driven form
  submitInputTemplateForm(f: NgForm): void {
    console.log(
      'reset template driven input form: ',
      `${f.value} | ${f.valid}`
    );
    f.reset();
  }

  // reset inline form
  resetInlineForm(): void {
    console.log('reset inline form: ', this.inlineForm.value);
    this.inlineForm.reset();
  }

  // reset inline form
  submitInlineForm(): void {
    console.log('submit inline form: ', this.inlineForm.value);
    this.inlineForm.reset();
  }
}
