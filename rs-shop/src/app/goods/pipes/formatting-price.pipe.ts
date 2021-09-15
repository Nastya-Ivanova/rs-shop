import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattingPrice',
})
export class FormattingPricePipe implements PipeTransform {
  transform(price: number): string {
    return `${price.toLocaleString('ru-RU')},00`;
  }
}
