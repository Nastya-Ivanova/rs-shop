import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageAuthService } from './local-storage-auth.service';
import { baseUrl } from '../../constants/base-url';

@Injectable()
export class DeleteCartService {
  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  deleteOrder(id: string) {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .delete(`${baseUrl}users/cart?id=${id}`, requestOptions)
      .subscribe({ error: (e) => console.error(e) });
  }
}
