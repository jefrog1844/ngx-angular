import { Component } from '@angular/core';

@Component({
  selector: 'lib-row',
  standalone: true,
  imports: [],
  template: `<div class="mui-row"><ng-content></ng-content></div>`,
})
export class RowComponent {}
