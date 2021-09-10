import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../constants/base-url';
import { IItem } from '../types/item.type';

@Injectable()
export class GetItemsService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(
      `${baseUrl}goods/category/appliances/refrigerators?start=1&count=5`,
    );
  }
}
