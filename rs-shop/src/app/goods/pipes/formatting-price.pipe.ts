import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattingPrice',
})
export class FormattingPricePipe implements PipeTransform {
  transform(price: number): string {
    if (`${price}`.length - `${price}`.indexOf('.') === 2) {
      return `${price.toLocaleString('ru-RU')}0`;
    }
    if (`${price}`.indexOf('.')) {
      return price.toLocaleString('ru-RU');
    }
    return `${price.toLocaleString('ru-RU')},00`;
  }
}
