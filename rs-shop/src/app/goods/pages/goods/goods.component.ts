import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../core/types/category.type';
import { IStore } from '../../../redux/state.model';
import { getCategories } from '../../../redux/selectors/get-categories.selector';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('subcategory') subcategory!: QueryList<ElementRef>;
  categories$!: Observable<ICategory[]>;
  currentSubcategory!: Element;
  subscription = new Subscription();

  constructor(
    private store: Store<IStore>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.categories$ = this.store.select(getCategories);

    this.subscription = this.router.events.subscribe(() => {
      if (this.currentSubcategory) {
        this.currentSubcategory.classList.remove('visible');
      }
      this.setCurrentSubcategory();
    });
  }

  ngAfterViewInit() {
    this.setCurrentSubcategory();
  }

  setCurrentSubcategory() {
    this.currentSubcategory = this.subcategory.find(
      (subcat, index) => index === +this.activatedRoute.snapshot.params.catNum,
    )?.nativeElement;

    if (this.currentSubcategory) {
      this.currentSubcategory.classList.add('visible');
    }
  }

  visibleSubcategory(event: Event, categoryId: string) {
    const subcategory = (<Element>event.target).querySelector(`.${categoryId}`);

    if (this.currentSubcategory) {
      this.currentSubcategory.classList.remove('visible');
    }

    if (subcategory) {
      subcategory.classList.add('visible');
      this.currentSubcategory = subcategory;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
