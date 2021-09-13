import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../constants/base-url';
import { IItem } from '../types/item.type';

@Injectable()
export class GetItemService {
  constructor(private http: HttpClient) {}

  getItem(id: string): Observable<IItem> {
    return this.http.get<IItem>(`${baseUrl}goods/item/${id}`);
  }
}
