import { ActionReducerMap } from '@ngrx/store';
import { appReducer } from './user-location.reducer';
import { IStore } from '../state.model';

export const reducers: ActionReducerMap<IStore> = {
  appStore: appReducer,
};
