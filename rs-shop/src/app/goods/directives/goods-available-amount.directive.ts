import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGoodsAvailableAmount]',
})
export class GoodsAvailableAmountDirective implements OnInit {
  @Input('appGoodsAvailableAmount') availableAmount = 0;

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.availableAmount > 19) {
      this.renderer.setStyle(this.elemRef.nativeElement, 'color', 'green');
    } else if (this.availableAmount < 20 && this.availableAmount > 4) {
      this.renderer.setStyle(this.elemRef.nativeElement, 'color', 'orange');
    } else {
      this.renderer.setStyle(this.elemRef.nativeElement, 'color', 'red');
    }
  }
}
