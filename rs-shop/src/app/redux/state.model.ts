import { ICategory } from '../core/types/category.type';

export interface IStore {
  appStore: IAppStore;
}

export interface IAppStore {
  userSettings: IUserSettings;
  categories: ICategory[];
}

export interface IUserSettings {
  city: string;
}
