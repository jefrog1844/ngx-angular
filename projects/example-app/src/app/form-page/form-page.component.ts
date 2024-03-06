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
  // reactive form - input
  inputForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl('', Validators.required),
    age: new FormControl(18),
  });

  // template driven form - input
  firstName: any = 'Mui';
  lastName: any = 'Css';

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
