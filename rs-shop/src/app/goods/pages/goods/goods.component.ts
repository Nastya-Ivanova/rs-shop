import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
export class GoodsComponent implements OnInit {
  categories$!: Observable<ICategory[]>;
  changeText!: boolean;

  constructor(private store: Store<IStore>) {}

  ngOnInit() {
    this.categories$ = this.store.select(getCategories);
  }

  ChangeSubcategory() {}
}
