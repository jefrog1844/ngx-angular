import { Component } from '@angular/core';
import {
  ContainerComponent,
  DropdownComponent,
  DropdownItemComponent,
  PanelComponent,
  RowComponent,
} from '../../../../ngx-angular/src/public-api';

@Component({
  selector: 'app-dropdown-page',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    PanelComponent,
    DropdownComponent,
    DropdownItemComponent,
  ],
  templateUrl: './dropdown-page.component.html',
  styleUrl: './dropdown-page.component.scss',
})
export class DropdownPageComponent {}
