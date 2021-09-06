import { createAction, props } from '@ngrx/store';

export const setUserLocationAction = createAction(
  '[Modal Location Component] SET_USER_LOCATION',
  props<{ city: string }>(),
);
