import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { baseUrl } from '../../constants/base-url';
import { IUserInfo } from '../types/user-info';
import { LocalStorageAuthService } from './local-storage-auth.service';

@Injectable()
export class UserInfoService {
  userInfo = new Subject<IUserInfo>();
  userInfo$ = this.userInfo.asObservable();

  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  getUserInfo() {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .get<IUserInfo>(`${baseUrl}users/userInfo`, requestOptions)
      .subscribe((userInfo) => this.userInfo.next(userInfo));
  }
}
