import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IItem } from '../../types/item.type';
import { GetItemService } from '../../../core/services/get-item.service';
import { getCategories } from '../../../redux/selectors/get-categories.selector';
import { IStore } from '../../../redux/state.model';
import { ICategory } from '../../../core/types/category.type';
import { AddToCartService } from '../../../core/services/add-to-cart.service';
import { AddToFavoriteService } from '../../../core/services/add-to-favorite.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  item$!: Observable<IItem>;
  itemId = '';
  categories$!: Observable<ICategory[]>;
  categoryId = '';
  subCategoryId = '';
  categoryName: string | undefined = '';
  subcategoryName: string | undefined = '';
  catNum = 0;
  categoriesSubscription = new Subscription();
  itemSubscription = new Subscription();

  constructor(
    private getItemService: GetItemService,
    private router: ActivatedRoute,
    private store: Store<IStore>,
    private addToCartService: AddToCartService,
    private addToFavoriteService: AddToFavoriteService,
  ) {}

  ngOnInit() {
    this.itemId = this.router.snapshot.params.itemId;
    this.item$ = this.getItemService.getItem(this.itemId);

    this.categories$ = this.store.select(getCategories);

    this.itemSubscription = this.item$.subscribe((item) => {
      this.categoryId = item.category;
      this.subCategoryId = item.subCategory;

      this.categoriesSubscription = this.categories$.subscribe((categories) => {
        const category = categories.find((categ, index) => {
          this.catNum = index;
          return categ.id === this.categoryId;
        });
        this.categoryName = category?.name;

        if (category) {
          const subcategory = category.subCategories.find(
            (subCateg) => subCateg.id === this.subCategoryId,
          );
          this.subcategoryName = subcategory?.name;
        }
      });
    });
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
