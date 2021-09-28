import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IItem } from '../../types/item.type';
import { GetItemsService } from '../../services/get-items.service';
import { TSortKey, TSortOrder } from '../../types/sorting-by.types';
import { AddToCartService } from '../../../core/services/add-to-cart.service';
import { AddToFavoriteService } from '../../../core/services/add-to-favorite.service';
import { getCategories } from '../../../redux/selectors/get-categories.selector';
import { ICategory } from '../../../core/types/category.type';
import { IStore } from '../../../redux/state.model';

@Component({
  selector: 'app-category',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  categories$!: Observable<ICategory[]>;
  categoryName: string | undefined = '';
  subcategoryName: string | undefined = '';
  catNum = 0;
  categoryId = '';
  subCategoryId = '';
  count = 0;
  items$!: Observable<IItem[]>;
  sortOrder: TSortOrder = 'desc';
  sortKey: TSortKey = '';
  arrowRating = false;
  arrowPrice = false;
  toggleArrowRotate = false;
  subscription = new Subscription();
  isAddToCart = false;

  constructor(
    private getItemsService: GetItemsService,
    private activatedRoute: ActivatedRoute,
    private addToCartService: AddToCartService,
    private addToFavoriteService: AddToFavoriteService,
    private store: Store<IStore>,
  ) {}

  ngOnInit() {
    this.catNum = this.activatedRoute.snapshot.params.catNum;
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
    this.subCategoryId = this.activatedRoute.snapshot.params.subCategoryId;

    this.categories$ = this.store.select(getCategories);

    this.subscription = this.categories$.subscribe((categories) => {
      const category = categories.find((categ) => categ.id === this.categoryId);
      this.categoryName = category?.name;

      if (category) {
        const subcategory = category.subCategories.find(
          (subCateg) => subCateg.id === this.subCategoryId,
        );
        this.subcategoryName = subcategory?.name;
      }
    });

    this.items$ = this.getItemsService.getItems(
      this.categoryId,
      this.subCategoryId,
      this.count,
      this.count + 10,
    );
    this.count += 10;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setSortKey(key: TSortKey) {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.sortKey = key;
    if (key === 'rating') {
      this.arrowPrice = false;
      this.arrowRating = true;
      this.toggleArrowRotate = !this.toggleArrowRotate;
    }
    if (key === 'price') {
      this.arrowRating = false;
      this.arrowPrice = true;
      this.toggleArrowRotate = !this.toggleArrowRotate;
    }
  }

  resetSortBy() {
    this.sortOrder = 'desc';
    this.sortKey = '';
    this.arrowRating = false;
    this.arrowPrice = false;
  }

  getMoreItems() {
    const newItems$ = this.getItemsService.getItems(
      this.categoryId,
      this.subCategoryId,
      this.count,
      this.count + 10,
    );

    this.items$ = this.items$.pipe(
      mergeMap((items: IItem[]) => newItems$.pipe(map((newItems) => items.concat(newItems)))),
    );

    this.count += 10;
  }

  addToCart(id: string, btn: HTMLInputElement) {
    this.addToCartService.addToCart(id);
    btn.value = 'добавлено';
    btn.classList.add('add');
    btn.setAttribute('disabled', 'disabled');
  }

  addToFavorite(id: string, btn: HTMLInputElement) {
    this.addToFavoriteService.addToFavorite(id);
    btn.value = 'добавлено';
    btn.classList.add('add');
    btn.setAttribute('disabled', 'disabled');
  }
}
