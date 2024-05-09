import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}

  readonly _data = new BehaviorSubject<boolean>(true);

  public readonly data$ = this._data.asObservable();

  enter() {
    this._data.next(!this._data.value);
  }
}
