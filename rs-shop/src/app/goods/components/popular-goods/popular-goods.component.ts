import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IItem } from '../../types/item.type';
import { getCategories } from '../../../redux/selectors/get-categories.selector';
import { GetCategoriesService } from '../../../core/services/get-categories.service';
import { GetItemsService } from '../../services/get-items.service';
import { IStore } from '../../../redux/state.model';
import { ICategory } from '../../../core/types/category.type';

@Component({
  selector: 'app-popular-goods',
  templateUrl: './popular-goods.component.html',
  styleUrls: ['./popular-goods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularGoodsComponent implements OnInit {
  categories$!: Observable<ICategory[]>;
  goods!: Observable<IItem[]>[];

  constructor(
    private getCategoriesService: GetCategoriesService,
    private getItemsService: GetItemsService,
    private store: Store<IStore>,
  ) {}

  ngOnInit() {
    this.categories$ = this.store.select(getCategories);

    this.categories$.subscribe((categories) => {
      this.goods = categories
        .map((category) =>
          this.getItemsService
            .getItems(category.id, category.subCategories[0].id, 1, 20)
            .pipe(map((items) => items.filter((item: IItem) => item.rating > 3).slice(0, 6))),
        )
        .slice(0, 3);
    });
  }
}
