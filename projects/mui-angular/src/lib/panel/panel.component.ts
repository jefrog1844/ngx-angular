import { Component } from '@angular/core';

@Component({
  selector: 'mui-panel',
  standalone: true,
  imports: [],
  template: `<div class="mui-panel"><ng-content></ng-content></div>`,
})
export class PanelComponent {}
