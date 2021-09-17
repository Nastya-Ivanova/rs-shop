import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../../types/item.type';
import { GetItemsService } from '../../services/get-items.service';
import { TSortKey, TSortOrder } from '../../types/sorting-by.types';

@Component({
  selector: 'app-category',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryComponent implements OnInit {
  categoryName = '';
  subcategoryName = '';
  categoryId = '';
  subCategoryId = '';
  count = 0;
  items$!: Observable<IItem[]>;
  sortOrder: TSortOrder = 'desc';
  sortKey: TSortKey = '';
  arrowRating = false;
  arrowPrice = false;
  toggleArrowRotate = false;

  constructor(
    private getItemsService: GetItemsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
    this.subCategoryId = this.activatedRoute.snapshot.params.subCategoryId;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.categoryName = params.categoryName;
      this.subcategoryName = params.subcategoryName;
    });

    this.items$ = this.getItemsService.getItems(
      this.categoryId,
      this.subCategoryId,
      this.count,
      this.count + 10,
    );
    this.count += 10;
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
}
