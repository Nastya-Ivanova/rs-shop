import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../constants/base-url';
import { IAuthToken } from '../types/auth-token';

interface IRegisterUser {
  firstName?: 'string';
  lastName?: 'string';
  login: 'string';
  password: 'string';
}

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(body: IRegisterUser): Observable<IAuthToken> {
    return this.http.post<IAuthToken>(`${baseUrl}users/register`, body);
  }
}
