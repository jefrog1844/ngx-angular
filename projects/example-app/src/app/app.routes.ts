import { Routes } from '@angular/router';
import { AppbarPageComponent } from './appbar-page/appbar-page.component';
import { ButtonPageComponent } from './button-page/button-page.component';
import { DividerPageComponent } from './divider-page/divider-page.component';
import { DropdownPageComponent } from './dropdown-page/dropdown-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { GridPageComponent } from './grid-page/grid-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PanelPageComponent } from './panel-page/panel-page.component';
import { TabsPageComponent } from './tabs-page/tabs-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'appbar', component: AppbarPageComponent },
  { path: 'button', component: ButtonPageComponent },
  { path: 'divider', component: DividerPageComponent },
  { path: 'dropdown', component: DropdownPageComponent },
  { path: 'grid', component: GridPageComponent },
  { path: 'panel', component: PanelPageComponent },
  { path: 'tabs', component: TabsPageComponent },
  { path: 'form', component: FormPageComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
