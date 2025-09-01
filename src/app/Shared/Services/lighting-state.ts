import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightingStateService {
  private _lit = new BehaviorSubject<boolean>(false);
  public lit$ = this._lit.asObservable();

  changeLit(): void {
    this._lit.next(!this._lit.value);
  }
}
