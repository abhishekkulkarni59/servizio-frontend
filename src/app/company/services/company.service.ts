import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
   providedIn: 'root'
})
export class CompanyService {

   constructor(private http: HttpClient) { }

   postAd(adDTO: any): Observable<any> {
      const userId = UserStorageService.getUserId();
      return this.http.post(BASIC_URL + `api/v1/company/ad/${userId}`, adDTO,
         {
            headers: this.createAuthorizationHeader()
         })
   }

   getAllAdsByUserId(): Observable<any> {
      const userId = UserStorageService.getUserId();
      return this.http.get(BASIC_URL + `api/v1/company/ads/${userId}`,
         {
            headers: this.createAuthorizationHeader()
         })
   }

   getAdById(adId: any): Observable<any> {
      return this.http.get(BASIC_URL + `api/v1/company/ad/${adId}`,
         {
            headers: this.createAuthorizationHeader()
         })
   }

   updateAd(adId: any, adDTO: any): Observable<any> {
      return this.http.put(BASIC_URL + `api/v1/company/update/${adId}`, adDTO, {
         headers: this.createAuthorizationHeader()
      })
   }

   deleteAd(adId: any): Observable<any> {
      return this.http.delete(BASIC_URL + `api/v1/company/ad/${adId}`, {
         headers: this.createAuthorizationHeader()
      })
   }

   createAuthorizationHeader(): HttpHeaders {
      let authHeaders: HttpHeaders = new HttpHeaders();
      return authHeaders.set(
         'Authorization',
         'Bearer ' + UserStorageService.getToken()
      )

   }
}
