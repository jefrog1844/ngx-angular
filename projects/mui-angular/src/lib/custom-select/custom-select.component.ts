import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  RendererStyleFlags2,
  Self,
  ViewChild,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CustomOptionComponent } from './custom-option.component';
import { SelectPresenter } from './select.presenter';

const importantFlag = RendererStyleFlags2.Important;

@Component({
  selector: 'mui-custom-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #wrapper
      class="mui-select"
      (blur)="onWrapperBlurOrFocus($event)"
      (focus)="onWrapperBlurOrFocus($event)"
      (click)="onWrapperClick($event)"
      (keydown)="onWrapperKeydown($event)"
      (keypress)="onWrapperKeypress($event)"
    >
      <select
        #select
        (change)="onChange($event.target.value)"
        (mousedown)="onInnerMousedown($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
        [required]="required"
        [ngClass]="{ 'mui--text-placeholder': ngControl.value === '' }"
      >
        <ng-container *ngIf="useDefault">
          <ng-container *ngFor="let option of options">
            <ng-container
              [ngTemplateOutlet]="option.optionTemplate"
            ></ng-container>
          </ng-container>
        </ng-container>
      </select>
      <label [for]="id" tabindex="-1">{{ label }}</label>
      <div
        id="menu"
        class="mui-select__menu"
        #menu
        *ngIf="isOpen && !useDefault"
      >
        <ng-container *ngFor="let option of options">
          <div (click)="chooseOption($event, option)">{{ option.label }}</div>
        </ng-container>
      </div>
    </div>
  `,
})
export class CustomSelectComponent
  implements AfterViewInit, ControlValueAccessor
{
  @Input() autofocus?: boolean = false;

  @Input() disabled?: boolean = false;

  @Input() useDefault?: boolean = false;

  @Input() id?: string;

  @Input() label?: string;

  @Input() required?: boolean = false;

  @ContentChildren(CustomOptionComponent)
  options!: QueryList<CustomOptionComponent>;

  @ViewChild('select', { static: true, read: ElementRef }) select: ElementRef;

  @ViewChild('wrapper', { static: true, read: ElementRef }) wrapper: ElementRef;

  @ViewChild('menu', { static: true, read: ElementRef }) menu: ElementRef;

  isOpen: boolean = false;

  menuIndex: number = 0;

  private selectPresenter: SelectPresenter;

  constructor(
    @Self() public ngControl: NgControl,
    private renderer: Renderer2
  ) {
    this.selectPresenter = inject(SelectPresenter);

    this.selectPresenter.open$.subscribe((open) => {
      this.isOpen = open;
      if (open) {
        this.renderer.setStyle(
          document.body,
          'overflow',
          'hidden',
          importantFlag
        );
        setTimeout(() => {
          const menuDiv = document.getElementById('menu');
          console.log(menuDiv);
          console.log(this.menu);
          this.renderer.setStyle(menuDiv, 'top', '-200px');
        }, 100);
      } else {
        this.renderer.removeStyle(document.body, 'overflow');
      }
    });

    ngControl.valueAccessor = this;
  }

  ngAfterViewInit(): void {
    // cache references to select and wrapper
    const selectEl: HTMLInputElement = this.select.nativeElement;
    const wrapperEl: HTMLElement = this.wrapper.nativeElement;

    // autofocus
    if (this.autofocus) {
      this.renderer.selectRootElement(selectEl).focus();
    }

    /**
     * name - gets set on NgControl through inputs for NgModel and formControlName directives only.
     * Does not work for standalone FormControl directive
     */
    if (this.ngControl.name) {
      this.renderer.setAttribute(
        selectEl,
        'name',
        this.ngControl.name.toString()
      );
    } else {
      console.warn(`
       It looks like you're using formControl which does not have an input for the
       name attribute.  If the name attribute is required (i.e. when submitting a form),
       it is recommended to use either ngModel or formControlName.`);
    }

    // set attributes
    ['id', 'placeholder', 'required'].forEach((attrName) => {
      const attrVal = this[attrName];
      if (attrVal) {
        this.renderer.setAttribute(selectEl, attrName, attrVal);
      }
    });

    // remove attributes from wrapper
    //this.renderer.removeAttribute(wrapperEl, 'id');

    // set the selected index
    const index = this.options
      .toArray()
      .findIndex((option) => option.value === this.ngControl.value);
    this.renderer.setProperty(
      this.select.nativeElement,
      'selectedIndex',
      index
    );

    if (this.useDefault) {
      this.renderer.setAttribute(wrapperEl, 'tabIndex', '-1');
      this.renderer.setAttribute(selectEl, 'tabIndex', '0');
    } else {
      this.renderer.setAttribute(wrapperEl, 'tabIndex', '0');
      this.renderer.setAttribute(selectEl, 'tabIndex', '-1');
    }
  }

  onWrapperKeydown(event: KeyboardEvent): void {
    // exit if preventDefault() was called or useDefault is true
    if (event.defaultPrevented || this.useDefault) return;

    var keyCode = event.keyCode;

    if (!this.isOpen) {
      // spacebar, down, up
      if (keyCode === 32 || keyCode === 38 || keyCode === 40) {
        // prevent win scroll
        event.preventDefault();

        // open menu
        //this.isOpen = true;
        this.selectPresenter.setOpen(true);
      }
    } else {
      // tab
      if (keyCode === 9) {
        //this.isOpen = false;
        this.selectPresenter.setOpen(false);
      }

      // escape | up | down | enter
      if (
        keyCode === 27 ||
        keyCode === 40 ||
        keyCode === 38 ||
        keyCode === 13
      ) {
        event.preventDefault();
      }

      //  var options = selectEl.children(),
      //      nextIndex = null,
      //      i;
      var nextIndex = null;
      var i;

      if (keyCode === 27) {
        // escape -> close
        //this.isOpen = false;
        this.selectPresenter.setOpen(false);
      } else if (keyCode === 40) {
        // down -> increment
        i = this.menuIndex + 1;
        while (i < this.options.length) {
          // exit if option not disabled
          if (!this.options.get(i).disabled && !this.options.get(i).hidden) {
            nextIndex = i;
            break;
          }
          i += 1;
        }
        if (nextIndex !== null) {
          this.menuIndex = nextIndex;
        }
      } else if (keyCode === 38) {
        // up -> decrement
        i = this.menuIndex - 1;
        while (i > -1) {
          // exit if option not disabled
          if (!this.options.get(i).disabled && !this.options.get(i).hidden) {
            nextIndex = i;
            break;
          }
          i -= 1;
        }
        if (nextIndex !== null) {
          this.menuIndex = nextIndex;
        }
      } else if (keyCode === 13) {
        // enter -> choose and close
        //dispatchChange(options[scope.menuIndex]);
        //this.isOpen = false;
        this.selectPresenter.setOpen(false);
      }
    }
  }

  onWrapperKeypress(event: KeyboardEvent): void {}

  onWrapperBlurOrFocus(event: Event): void {}

  chooseOption(event: MouseEvent, option: CustomOptionComponent): void {
    event.preventDefault();
    //this.isOpen = false;
    this.selectPresenter.setOpen(false);
  }

  onInnerMousedown(event: MouseEvent): void {
    // check flag
    if (event.button !== 0 || this.useDefault) return;

    // prevent built-in menu from opening
    event.preventDefault();
  }

  onWrapperClick(event: MouseEvent): void {
    if (
      event.button !== 0 ||
      event.defaultPrevented ||
      this.useDefault ||
      this.disabled
    ) {
      return;
    }

    // focus wrapper
    this.wrapper.nativeElement.focus();

    // open custom menu
    //this.isOpen = true;
    this.selectPresenter.setOpen(true);
  }

  /**
   * This code listens for updates from the component and
   * writes them to the native <select> element
   *
   * NOTE: writeValue gets called before ngOnInit Angular issue #29218
   * Side effect of the issue is that trying to access the selectEl
   * cached in ngOnInit will result in undefined error in writeValue.
   * This also requires ViewChild({static: true}) in order for select to
   * be available before onChange is called.
   * @param value - value from <mui-select>
   */
  writeValue(value: string): void {
    // update select field with value received from outer component
    this.renderer.setProperty(this.select.nativeElement, 'value', value);
  }

  /**
   * Code below this point is all boilerplate - DO NOT CHANGE
   */
  onTouched: () => void;
  onChange: (value: string) => void;

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}
