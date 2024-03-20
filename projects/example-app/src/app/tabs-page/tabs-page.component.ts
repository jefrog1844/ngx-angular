import { Component } from '@angular/core';
import {
  ContainerComponent,
  PanelComponent,
  RowComponent,
  TabComponent,
  TabsComponent,
} from '../../../../mui-angular/src/public-api';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [
    ContainerComponent,
    PanelComponent,
    RowComponent,
    TabsComponent,
    TabComponent,
  ],
  templateUrl: './tabs-page.component.html',
  styleUrl: './tabs-page.component.scss',
})
export class TabsPageComponent {
  select(tab: TabComponent): void {
    console.log('Tab selected: ', tab.label);
  }

  deselect(tab: TabComponent): void {
    console.log('Tab deselected: ', tab.label);
  }

  change(index: number): void {
    console.log('User activated new tab index: ', index);
  }
}
