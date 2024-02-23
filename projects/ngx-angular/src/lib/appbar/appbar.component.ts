import { Component } from '@angular/core';

@Component({
  selector: 'lib-appbar',
  standalone: true,
  imports: [],
  template: `<div class="mui-appbar mui--z3"><ng-content></ng-content></div>`,
})
export class AppbarComponent {}
