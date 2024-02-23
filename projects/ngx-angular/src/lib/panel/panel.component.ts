import { Component } from '@angular/core';

@Component({
  selector: 'lib-panel',
  standalone: true,
  imports: [],
  template: `<div class="mui-panel"><ng-content></ng-content></div>`,
})
export class PanelComponent {}
