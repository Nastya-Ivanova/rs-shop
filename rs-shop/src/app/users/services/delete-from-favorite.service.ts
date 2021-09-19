import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from '../../constants/base-url';
import { LocalStorageAuthService } from './local-storage-auth.service';

@Injectable()
export class DeleteFromFavoriteService {
  constructor(private http: HttpClient, private localStorageAuthService: LocalStorageAuthService) {}

  deleteFromFavorite(id: string) {
    const token = this.localStorageAuthService.getToken();

    const requestOptions = {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`),
    };

    this.http
      .delete(`${baseUrl}users/favorites?id=${id}`, requestOptions)
      .subscribe({ error: (e) => console.error(e) });
  }
}
