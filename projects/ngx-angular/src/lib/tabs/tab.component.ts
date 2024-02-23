import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="mui-tabs__pane"
      [hidden]="!active"
      [ngClass]="{ 'mui--is-active': active }"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class TabComponent {
  @Input()
  label!: string;

  @Input() active: boolean = false;

  @Output() muiSelect = new EventEmitter<TabComponent>();
  @Output() muiDeselect = new EventEmitter<TabComponent>();

  constructor() {}

  onSelect(): void {
    this.muiSelect.emit(this);
    this.active = true;
  }

  onDeselect(): void {
    this.muiDeselect.emit(this);
    this.active = false;
  }
}
