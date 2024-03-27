import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectPresenter implements OnDestroy {
  private _open: BehaviorSubject<boolean> = new BehaviorSubject(false);
  open$: Observable<boolean> = this._open.asObservable();

  public setOpen(open: boolean): void {
    console.log(`setting open to: ${open}`);
    this._open.next(open);
  }

  ngOnDestroy(): void {
    this._open.complete();
  }
}
