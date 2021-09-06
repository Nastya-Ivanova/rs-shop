import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalLocationComponent } from '../modal-location/modal-location.component';
import { GetLocationService } from '../../services/get-location.service';
import { IStore } from '../../../redux/state.model';
import { getUserLocation } from '../../../redux/selectors/user-settings.selector';
import { setUserLocationAction } from '../../../redux/actions/user-location.action';
import { ICategory } from '../../types/category.type';
import { getCategories } from '../../../redux/selectors/get-categories.selector';
import { loadCategoriesAction } from '../../../redux/actions/load-categories.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  userCity$!: Observable<string>;
  submenuPurchaseTermsToggle = false;
  submenuContactsToggle = false;
  categories$!: Observable<ICategory[]>;

  constructor(
    public modalLocation: MatDialog,
    private getLocationService: GetLocationService,
    public store: Store<IStore>,
    private elemRef: ElementRef,
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
  }

  openModalLocation() {
    this.modalLocation.open(ModalLocationComponent);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: { target: Element }) {
    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.submenuPurchaseTermsToggle = false;
      this.submenuContactsToggle = false;
    }
  }
}
