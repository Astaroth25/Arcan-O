import { Component, input } from '@angular/core';
import { TextStroke } from "../../Typography/text-stroke/text-stroke";

@Component({
  selector: 'basic-button',
  imports: [TextStroke],
  templateUrl: './basic.html',
  styleUrl: './basic.scss'
})
export class Basic {
  text = input<string>();
}
