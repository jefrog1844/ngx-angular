import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'mui-appbar',
  standalone: true,
  imports: [],
  template: `<div #appbar class="mui-appbar">
    <ng-content></ng-content>
  </div>`,
})
export class AppbarComponent implements AfterViewInit {
  @Input() depth?: string;

  @ViewChild('appbar')
  appbar!: ElementRef<HTMLDivElement>;

  private appbarEl!: HTMLDivElement;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.depth) {
      this.appbarEl = this.appbar.nativeElement;
      this.renderer.addClass(this.appbarEl, 'mui--' + this.depth);
    }
  }
}
