import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WallTorch } from "./Shared/Lighting/wall-torch/wall-torch";
import { AsyncPipe, NgClass } from '@angular/common';
import { Brazier } from "./Shared/Lighting/brazier/brazier";
import { ScreenSizeService } from './Core/Services/screen-size';
import { CursorService } from './Core/Services/cursor';
import { combineLatest, map, Observable } from 'rxjs';
import { IlluminationService } from './Core/Services/illumination';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, NgClass, RouterOutlet, WallTorch, Brazier],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:touchmove)': 'onTouchMove($event)'
  }
})
export class App {
  private cursorService = inject(CursorService);
  private illuminationService = inject(IlluminationService)

  protected combinedState$ = combineLatest([this.cursorService.cursorState$, this.illuminationService.illuminationState$]).pipe(
    map(([cursorState, illuminationState]) => ({ cursor: cursorState, illumination: illuminationState }))
  );

  private screenSizeService = inject(ScreenSizeService);
  protected screenSize$ = this.screenSizeService.screenSize$;
  protected position$: Observable<{ x: string, y: string }> = this.screenSizeService.screenSize$.pipe(map(size => {
    if (size === 'desktop') return { x: '95%', y: '45%' };
    else return { x: '50%', y: '90%' };
  }));

  onMouseMove(event: MouseEvent) {
    this.cursorService.updateTargetPosition(event.clientX, event.clientY);
  }

  onTouchMove(event: TouchEvent) {
    this.cursorService.updateTargetPosition(event.touches[0].clientX, event.touches[0].clientY);
  }
}
