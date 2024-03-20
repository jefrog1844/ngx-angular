import { Component } from '@angular/core';
import {
  AppbarComponent,
  ContainerComponent,
} from '../../../../mui-angular/src/public-api';

@Component({
  selector: 'app-appbar-page',
  standalone: true,
  imports: [ContainerComponent, AppbarComponent],
  templateUrl: './appbar-page.component.html',
  styleUrl: './appbar-page.component.scss',
})
export class AppbarPageComponent {}
