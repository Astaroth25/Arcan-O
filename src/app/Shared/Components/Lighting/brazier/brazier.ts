import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LightingStateService } from '../../../Services/lighting-state';

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
