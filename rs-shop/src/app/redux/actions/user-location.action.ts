import { createAction, props } from '@ngrx/store';

export const setUserLocation = createAction(
  '[Modal Location Component] SET_USER_LOCATION',
  props<{ city: string }>(),
);
