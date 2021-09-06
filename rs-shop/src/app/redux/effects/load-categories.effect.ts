import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { ICategory } from '../../core/types/category.type';

@Injectable()
export class LoadCategoriesEffect {
  constructor(private actions$: Actions, private httpService: HttpService) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Header Component] LOAD_CATEGORIES'),
      mergeMap(() =>
        this.httpService.getCategories$().pipe(
          map((categories: ICategory[]): { categories: ICategory[]; type: string } => ({
            type: 'CATEGORIES_LOAD_SUCCESS',
            categories,
          })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
