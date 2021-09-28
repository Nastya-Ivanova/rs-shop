import { Component, ChangeDetectionStrategy } from '@angular/core';
import { slides } from '../../../constants/main-slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  slides = slides;
}
