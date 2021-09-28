import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppStore } from '../state.model';

const selectAppStore = createFeatureSelector<IAppStore>('appStore');

export const getCategories = createSelector(selectAppStore, (state) => state.categories);
