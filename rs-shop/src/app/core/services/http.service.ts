import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../types/category.type';
import { baseUrl } from '../../constants/base-url';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getCategories$(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${baseUrl}categories`);
  }
}
