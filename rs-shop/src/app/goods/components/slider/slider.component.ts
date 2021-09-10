import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  slides = [
    {
      image: '/assets/img/sale_beko.jpg',
      id: 'RCSK250M20W',
    },
    {
      image: '/assets/img/sale_nout.jpg',
      id: '612fe4ecbf9776bdd90e3d73',
    },
    {
      image: '/assets/img/sale_photo.jpg',
      id: '612fca72b30a4da2267182c2',
    },
    {
      image: '/assets/img/sale_samsung.jpg',
      id: '612e05c5a8a87d5b554569a8',
    },
    {
      image: '/assets/img/sale_tvs_samsung.jpg',
      id: '612fcd83edb42a61b13e2754',
    },
  ];
}
