import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IItem } from '../types/item.type';
import { TSortKey, TSortOrder } from '../types/sorting-by.types';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  res!: Observable<IItem[]>;

  transform(
    sortArr: Observable<IItem[]>,
    sortOrder: TSortOrder,
    sortKey: TSortKey,
  ): Observable<IItem[]> {
    if (!sortArr || sortKey === '') {
      this.res = sortArr;
    } else {
      this.res = sortArr.pipe(
        map((items: IItem[]) => items.sort((a, b) => a[sortKey] - b[sortKey])),
      );
    }
    return sortOrder === 'asc' ? this.res : this.res.pipe(map((items: IItem[]) => items.reverse()));
  }
}
