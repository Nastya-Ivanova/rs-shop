import { ActionReducerMap } from '@ngrx/store';
import { appReducer } from './reducers';
import { IStore } from '../state.model';

export const reducers: ActionReducerMap<IStore> = {
  appStore: appReducer,
};
