import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mui-dropdown-item',
  standalone: true,
  imports: [],
  template: `
    <ng-template #templateref>
      <li>
        <a href="{{ link }}"><ng-content></ng-content></a>
      </li>
    </ng-template>
  `,
})
export class DropdownItemComponent {
  @Input()
  link!: string;

  @ViewChild('templateref', { static: true })
  public itemTemplate!: TemplateRef<HTMLLIElement>;

  constructor() {}
}
