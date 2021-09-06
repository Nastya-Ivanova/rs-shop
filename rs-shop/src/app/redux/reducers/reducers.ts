import { Action, createReducer, on } from '@ngrx/store';
import { IAppStore } from '../state.model';
import { setUserLocationAction } from '../actions/user-location.action';
import { loadCategoriesSuccessAction } from '../actions/load-categories-success.action';

const initialState: IAppStore = {
  userSettings: {
    city: '',
  },
  categories: [],
};

const reducer = createReducer(
  initialState,
  on(setUserLocationAction, (state, { city }) => ({
    ...state,
    userSettings: { city },
  })),
  on(loadCategoriesSuccessAction, (state, { categories }) => {
    const res = {
      ...state,
      categories: [...state.categories, ...categories],
    };
    console.log(res);
    return res;
  }),
);

export function appReducer(state: IAppStore | undefined, action: Action): IAppStore {
  return reducer(state, action);
}

// on(loadCategoriesSuccessAction, (state, { categories }) => ({
//   ...state,
//   categories: [...state.categories, ...categories],
// })),
