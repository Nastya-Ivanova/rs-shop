import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../../redux/state.model';
import { setUserLocation } from '../../../redux/actions/user-location.action';
import { cities } from '../../../constants/locations';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalLocationComponent {
  cities: string[] = cities;
  selectedValue = 'Москва';

  constructor(private store: Store<IStore>) {}

  selectChange(city: string) {
    this.selectedValue = city;
  }

  setUserCity() {
    this.store.dispatch(
      setUserLocation({
        city: this.selectedValue,
      }),
    );
  }
}
