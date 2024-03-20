import { Component } from '@angular/core';
import {
  ButtonComponent,
  ContainerComponent,
  PanelComponent,
} from '../../../../mui-angular/src/public-api';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [ButtonComponent, ContainerComponent, PanelComponent],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {}
