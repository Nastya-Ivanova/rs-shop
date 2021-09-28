import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../constants/base-url';
import { LocalStorageAuthService } from '../../users/services/local-storage-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  addToCart(id: string) {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .post(`${baseUrl}users/cart`, { id }, requestOptions)
      .subscribe({ error: (e) => console.error(e) });
  }
}
