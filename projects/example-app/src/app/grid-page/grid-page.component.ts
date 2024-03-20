import { Component } from '@angular/core';
import {
  ColComponent,
  ContainerComponent,
  PanelComponent,
  RowComponent,
} from '../../../../mui-angular/src/public-api';

@Component({
  selector: 'app-grid-page',
  standalone: true,
  imports: [ContainerComponent, PanelComponent, RowComponent, ColComponent],
  templateUrl: './grid-page.component.html',
  styleUrl: './grid-page.component.scss',
})
export class GridPageComponent {}
