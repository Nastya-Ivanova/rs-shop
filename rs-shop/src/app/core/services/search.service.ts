import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../constants/base-url';
import { ISearchResult } from '../../goods/types/search-result';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  getSearchResult$(searchStr: string): Observable<ISearchResult[]> {
    return this.http.get<ISearchResult[]>(`${baseUrl}goods/search?text=${searchStr}`);
  }
}
