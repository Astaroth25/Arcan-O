import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { ScreenSizeService } from './Core/Services/screen-size';
import { CursorService } from './Core/Services/cursor';
import { combineLatest, map, Observable } from 'rxjs';
import { IlluminationService } from './Core/Services/illumination';
import { WallTorch } from './Shared/Components/Lighting/wall-torch/wall-torch';
import { Brazier } from './Shared/Components/Lighting/brazier/brazier';
import { Navbar } from "./Core/Components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, NgClass, RouterOutlet, WallTorch, Brazier, Navbar],
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

  onMouseMove(event: MouseEvent) {
    this.cursorService.updateTargetPosition(event.clientX, event.clientY);
  }

  onTouchMove(event: TouchEvent) {
    this.cursorService.updateTargetPosition(event.touches[0].clientX, event.touches[0].clientY);
  }
}
