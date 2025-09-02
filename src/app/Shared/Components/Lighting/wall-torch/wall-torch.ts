import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LightingStateService } from '../../../Services/lighting-state';

@Component({
  selector: 'wall-torch',
  imports: [AsyncPipe],
  templateUrl: './wall-torch.html',
  styleUrl: './wall-torch.scss'
})
export class WallTorch {
  private lightingStateService = inject(LightingStateService);
  protected lit$ = this.lightingStateService.lit$;

  changeLit(): void {
    this.lightingStateService.changeLit();
  }
}
