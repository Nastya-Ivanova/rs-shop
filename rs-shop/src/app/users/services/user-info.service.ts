import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { baseUrl } from '../../constants/base-url';
import { IUserInfo } from '../types/user-info';

@Injectable()
export class UserInfoService {
  constructor(private http: HttpClient) {}

  private userInfo = new BehaviorSubject<IUserInfo | null>(null);

  userInfo$ = this.userInfo.asObservable();

  getUserInfo(token: string) {
    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .get<IUserInfo>(`${baseUrl}users/userInfo`, requestOptions)
      .subscribe((userInfo) => this.userInfo.next(userInfo));
  }
}
