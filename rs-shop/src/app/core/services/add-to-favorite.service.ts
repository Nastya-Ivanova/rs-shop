import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageAuthService } from '../../users/services/local-storage-auth.service';
import { baseUrl } from '../../constants/base-url';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoriteService {
  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  addToFavorite(id: string) {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .post(`${baseUrl}users/favorites`, { id }, requestOptions)
      .subscribe({ error: (e) => console.error(e) });
  }
}
