import { Action, createReducer, on } from '@ngrx/store';
import { IAppStore } from '../state.model';
import { setUserLocation } from '../actions/user-location.action';

const initialState: IAppStore = {
  userSettings: {
    city: '',
  },
};

const reducer = createReducer(
  initialState,
  on(setUserLocation, (state, { city }) => ({
    ...state,
    userSettings: { city },
  })),
);

export function appReducer(state: IAppStore | undefined, action: Action): IAppStore {
  return reducer(state, action);
}
