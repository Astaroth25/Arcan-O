import { inject, Injectable, OnDestroy } from '@angular/core';
import { LightingStateService } from '../../Shared/Services/lighting-state';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface LightState {
  opacity: number;
  class: string;
}

@Injectable({
  providedIn: 'root'
})
export class IlluminationService implements OnDestroy {
  private initialState: LightState = { opacity: 0.95, class: 'dungeon-container-no-light' };
  private _illuminationState = new BehaviorSubject(this.initialState);
  readonly illuminationState$ = this._illuminationState.asObservable();

  private lightingStateService = inject(LightingStateService);
  private lightingState$ = this.lightingStateService.lit$;
  private subscription: Subscription;

  constructor() {
    this.subscription = this.lightingState$.subscribe(lit => {
      if (lit) this._illuminationState.next({ opacity: 0.65, class: 'dungeon-container-light' });
      else this._illuminationState.next({ opacity: 0.95, class: 'dungeon-container-no-light' });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
