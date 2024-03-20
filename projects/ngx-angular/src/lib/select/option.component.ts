import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'mui-option',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #templateref>
      <option
        #option
        [disabled]="disabled"
        [value]="value"
        [ngClass]="{
          'mui--text-black': value !== '',
          'mui--text-placeholder': value === ''
        }"
      >
        {{ label }}
      </option>
    </ng-template>
  `,
  styles: [],
})
export class OptionComponent {
  @Input() disabled?: boolean = false;

  @Input() hidden: boolean = false;

  @Input() label: string;

  @Input() value: string;

  @ViewChild('templateref', { static: true })
  public optionTemplate: TemplateRef<HTMLOptionElement>;

  @ViewChild('option', { static: true, read: ElementRef }) option: ElementRef;

  constructor() {}
}
