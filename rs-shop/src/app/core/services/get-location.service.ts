import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ICity } from '../types/city.type';

@Injectable()
export class GetLocationService {
  url = 'http:///ip-api.com/json/?lang=ru&fields=city';

  constructor(private http: HttpClient) {}

  getLocation$(): Observable<string> {
    return this.http.get<ICity>(this.url).pipe(
      map((location) => location.city),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(`Backend returned status: ${error.status}, message: ${error.message}`);
    }
    return throwError('Something went wrong. Please try again later.');
  }
}
