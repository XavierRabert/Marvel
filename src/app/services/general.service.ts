import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}

  readonly _data = new BehaviorSubject<boolean>(true);

  public readonly data$ = this._data.asObservable();

  public apiDeprecated = signal(false);

  public setApiDeprecated(isDeprecated: boolean) {
    this.apiDeprecated.set(isDeprecated);
  }

  enter() {
    this._data.next(!this._data.value);
  }
}
