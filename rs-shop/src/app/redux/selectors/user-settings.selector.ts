import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppStore } from '../state.model';

export const userSettingsSelector = createFeatureSelector<IAppStore>('appStore');

export const getUserLocation = createSelector(
  userSettingsSelector,
  (state) => state.userSettings.city,
);
