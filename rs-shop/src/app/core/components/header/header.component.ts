import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalLocationComponent } from '../modal-location/modal-location.component';
import { GetLocationService } from '../../services/get-location.service';
import { IStore } from '../../../redux/state.model';
import { getUserLocation } from '../../../redux/selectors/user-settings.selector';
import { setUserLocationAction } from '../../../redux/actions/user-location.action';
import { ICategory } from '../../types/category.type';
import { getCategories } from '../../../redux/selectors/get-categories.selector';
import { loadCategoriesAction } from '../../../redux/actions/load-categories.action';
import { SearchService } from '../../services/search.service';
import { ISearchResult } from '../../../goods/types/search-result';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userCity$!: Observable<string>;
  categories$!: Observable<ICategory[]>;
  search$ = new BehaviorSubject('');
  searchResult$!: Observable<ISearchResult[]>;
  isSearchResult = false;

  constructor(
    private dialog: MatDialog,
    private getLocationService: GetLocationService,
    public store: Store<IStore>,
    private searchService: SearchService,
  ) {}

  ngOnInit() {
    this.getLocationService.getLocation$().subscribe((initialCity) => {
      this.store.dispatch(
        setUserLocationAction({
          city: initialCity,
        }),
      );
    });

    this.userCity$ = this.store.select(getUserLocation);

    this.store.dispatch(loadCategoriesAction());
    this.categories$ = this.store.select(getCategories);

    this.search$
      .pipe(
        filter((searchStr) => searchStr.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((searchStr) => {
        console.log(searchStr);
        // if (searchStr.length === 0) {
        //   this.isSearchResult = false;
        // } else {
        //   this.isSearchResult = true;
        // }
        this.searchResult$ = this.searchService.getSearchResult$(searchStr);
      });
  }

  openModalLocation() {
    this.dialog.open(ModalLocationComponent);
  }
}
