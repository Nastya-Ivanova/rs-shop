import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageAuthService {
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  clearToken() {
    localStorage.clear();
  }
}
