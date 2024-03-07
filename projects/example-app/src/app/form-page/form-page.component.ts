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
import {
  ButtonComponent,
  CheckboxComponent,
  ContainerComponent,
  InputComponent,
  PanelComponent,
} from '../../../../ngx-angular/src/public-api';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [
    ContainerComponent,
    PanelComponent,
    InputComponent,
    CheckboxComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonComponent,
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
  });

  // Input - template driven form
  firstName = 'Mui';
  lastName = 'Css';

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
}
