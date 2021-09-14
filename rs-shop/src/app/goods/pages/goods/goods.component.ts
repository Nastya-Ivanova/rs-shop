import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategory } from '../../../core/types/category.type';
import { IStore } from '../../../redux/state.model';
import { getCategories } from '../../../redux/selectors/get-categories.selector';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoodsComponent implements OnInit, AfterViewInit {
  @ViewChild('subcategory') subcategory!: ElementRef;
  categories$!: Observable<ICategory[]>;
  currentVisibleSubcategoryElement!: Element;

  constructor(private store: Store<IStore>) {}

  ngOnInit() {
    this.categories$ = this.store.select(getCategories);
  }

  ngAfterViewInit() {
    this.currentVisibleSubcategoryElement = this.subcategory.nativeElement;
    this.currentVisibleSubcategoryElement.classList.add('visible');
  }

  visibleSubcategory(event: Event, categoryId: string) {
    const subcategory = (<Element>event.target).querySelector(`.${categoryId}`);

    if (this.currentVisibleSubcategoryElement) {
      this.currentVisibleSubcategoryElement.classList.remove('visible');
    }

    if (subcategory) {
      subcategory.classList.add('visible');
      this.currentVisibleSubcategoryElement = subcategory;
    }
  }
}
