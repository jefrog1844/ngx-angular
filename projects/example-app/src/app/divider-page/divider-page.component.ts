import { Component } from '@angular/core';
import {
  ContainerComponent,
  DividerComponent,
  PanelComponent,
} from '../../../../ngx-angular/src/public-api';

@Component({
  selector: 'app-divider-page',
  standalone: true,
  imports: [DividerComponent, ContainerComponent, PanelComponent],
  templateUrl: './divider-page.component.html',
  styleUrl: './divider-page.component.scss',
})
export class DividerPageComponent {}
