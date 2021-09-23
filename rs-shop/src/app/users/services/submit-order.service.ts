import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrderGood } from '../types/order-good';
import { LocalStorageAuthService } from './local-storage-auth.service';
import { baseUrl } from '../../constants/base-url';

@Injectable()
export class SubmitOrderService {
  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  submitOrder(body: IOrderGood) {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .post(`${baseUrl}users/order`, body, requestOptions)
      .subscribe({ error: (e) => console.error(e) });
  }
}
