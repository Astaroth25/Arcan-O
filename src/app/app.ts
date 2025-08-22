import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Basic } from "./Shared/Buttons/basic/basic";
import { WallTorch } from "./Shared/Lighting/wall-torch/wall-torch";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Basic, WallTorch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:touchmove)': 'onTouchMove($event)'
  }
})
export class App implements OnInit {
  protected targetX = window.innerWidth / 2;
  protected targetY = window.innerHeight / 2;
  protected currentX = this.targetX;
  protected currentY = this.targetY;
  private speed: number = 0.05;

  // Actualiza el movimiento del mouse en desktop
  onMouseMove(event: MouseEvent) {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
  }

  //Actualiza el movimiento del touch en mobile
  onTouchMove(event: TouchEvent) {
    this.targetX = event.touches[0].clientX;
    this.targetY = event.touches[0].clientY;
  }

  ngOnInit(): void {
    this.flicker();
  }

  flicker(): void {
    this.currentX += (this.targetX - this.currentX) * this.speed;
    this.currentY += (this.targetY - this.currentY) * this.speed;

    requestAnimationFrame(() => this.flicker());
  }

}
