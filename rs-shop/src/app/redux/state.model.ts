export interface IStore {
  appStore: IAppStore;
}

export interface IAppStore {
  userSettings: IUserSettings;
}

export interface IUserSettings {
  city: string;
}
