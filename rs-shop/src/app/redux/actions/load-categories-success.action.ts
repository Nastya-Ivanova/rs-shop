import { createAction, props } from '@ngrx/store';
import { ICategory } from '../../core/types/category.type';

export const loadCategoriesSuccessAction = createAction(
  'CATEGORIES_LOAD_SUCCESS',
  props<{ categories: ICategory[] }>(),
);
