import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { baseUrl } from 'src/app/constants/base-url';
import { Observable, throwError } from 'rxjs';
import { IAuthToken } from '../types/auth-token';

interface ILogin {
  login: 'string';
  password: 'string';
}

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  setLogin(body: ILogin): Observable<IAuthToken> {
    return this.http
      .post<IAuthToken>(`${baseUrl}users/login`, body)
      .pipe(catchError(this.handleError));
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
