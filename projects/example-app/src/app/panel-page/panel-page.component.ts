import { Component } from '@angular/core';
import {
  ContainerComponent,
  PanelComponent,
} from '../../../../mui-angular/src/public-api';

@Component({
  selector: 'app-panel-page',
  standalone: true,
  imports: [ContainerComponent, PanelComponent],
  templateUrl: './panel-page.component.html',
  styleUrl: './panel-page.component.scss',
})
export class PanelPageComponent {}
