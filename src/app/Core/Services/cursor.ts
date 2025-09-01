import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CursorState } from '../../Shared/Interfaces/CursorState';
import { LightingStateService } from '../../Shared/Services/lighting-state';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  private initialState: CursorState = {
    currentX: window.innerWidth / 2,
    currentY: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    cursorName: 'torch.svg',
    deg: '-15deg'
  }
  private lightingStateService = inject(LightingStateService);
  private lightingState$ = this.lightingStateService.lit$;
  private lightingSubscription: Subscription;

  private _cursorState = new BehaviorSubject<CursorState>(this.initialState);
  readonly cursorState$ = this._cursorState.asObservable();

  private speed: number = 0.05;
  private animationFrameId: number = 0;

  constructor() {
    this.lightingSubscription = this.lightingState$.subscribe(isLit => {
      if (isLit) {
        console.log(isLit);
        this.stopAnimation();
      } else {
        console.log(isLit);
        this.startAnimation();
      }
    });
  }

  // Métodos
  private calculateCursorPhysics(): void {
    const currentState = this._cursorState.getValue();
    const newX = currentState.currentX + (currentState.targetX - currentState.currentX) * this.speed;
    const newY = currentState.currentY + (currentState.targetY - currentState.currentY) * this.speed;
    this.updateCursorState({ currentX: newX, currentY: newY });
  }

  private updateCursorState(updates: Partial<CursorState>): void {
    const currentState = this._cursorState.getValue();
    this._cursorState.next({ ...currentState, ...updates });
  }

  public updateTargetPosition(x: number, y: number): void {
    const currentState = this._cursorState.getValue();
    this.updateCursorState({ targetX: x, targetY: y })
  }

  private startAnimation(): void {
    if (this.animationFrameId === 0) {
      this.animationLoop();
      this.updateCursorState({ cursorName: 'torch.svg', deg: '-15deg' });
    }
  }

  private stopAnimation(): void {
    if (this.animationFrameId !== 0) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
      this.updateCursorState({ cursorName: 'gauntlet.svg', deg: '-45deg' });
    }
  }

  private animationLoop(): void {
    this.calculateCursorPhysics();
    this.animationFrameId = requestAnimationFrame(() => {
      if (this.animationFrameId !== 0) this.animationLoop();
    });
  }
}