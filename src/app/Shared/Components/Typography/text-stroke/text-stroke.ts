import { Component, input } from '@angular/core';

@Component({
  selector: 'text-stroke',
  imports: [],
  templateUrl: './text-stroke.html',
  styleUrl: './text-stroke.scss'
})
export class TextStroke {
  text = input<string>();
}
