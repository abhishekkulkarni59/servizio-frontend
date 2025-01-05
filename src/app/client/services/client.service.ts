import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/api/v1/"

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllAds(page: number = 1, size: number = 1): Observable<PaginatedResponse<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<any>>(BASIC_URL + `client/ads`, {
      headers: this.createAuthorizationHeader(),
      params: params
    });
  }

  searchAdByName(name: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<any>> {
    const params = new HttpParams()
       .set('page', page.toString())
       .set('size', size.toString());

    return this.http.get<PaginatedResponse<any>>(BASIC_URL + `client/ads/search/${name}`, {
       headers: this.createAuthorizationHeader(),
       params: params
    });
 }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    )
  }
}
