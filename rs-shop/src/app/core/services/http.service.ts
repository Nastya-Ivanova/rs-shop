import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../types/category.type';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient) {}

  getCategories$(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}categories`);
  }
}
