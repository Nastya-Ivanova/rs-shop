import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageAuthService } from './local-storage-auth.service';
import { baseUrl } from '../../constants/base-url';
import { IEditOrder } from '../types/edit-order';

@Injectable()
export class EditOrderService {
  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  editOrder(body: IEditOrder) {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .put(`${baseUrl}users/order`, body, requestOptions)
      .subscribe({ error: (e) => console.error(e) });
  }
}
