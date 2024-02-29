import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
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
  name = 'Angular';
  form!: FormGroup;
  result: string = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      termsAndConditions: [false, Validators.pattern('true')],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      password: [''],
      age: [18],
    });
  }

  getResult() {
    const formValue = this.form.value;

    this.result = `I, ${formValue.firstName} ${formValue.lastName},
     agree to terms and conditions: ${formValue.termsAndConditions}
    }`;
  }
}
