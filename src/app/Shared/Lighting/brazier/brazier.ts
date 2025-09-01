import { Component, inject } from '@angular/core';
import { LightingStateService } from '../../Services/lighting-state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'brazier',
  imports: [AsyncPipe],
  templateUrl: './brazier.html',
  styleUrl: './brazier.scss'
})
export class Brazier {
  private lightingStateService = inject(LightingStateService);
  protected lit$ = this.lightingStateService.lit$;

  changeLit(): void {
    this.lightingStateService.changeLit();
  }
}
