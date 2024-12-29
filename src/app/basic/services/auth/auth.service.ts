import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = 'http://localhost:8080/api/v1/auth/';
export const AUTH_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  registerClient(signupRequestDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "client/sign-up", signupRequestDto)
  }

  registerCompany(signupRequestDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "company/sign-up", signupRequestDto)
  }

  login(username: string, password: string) {
    return this.http.post(BASIC_URL + "authenticate", { username, password }, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => {
          console.log(res.body);
          this.userStorageService.saveUser(res.body);
          const tokenLength = res.headers.get(AUTH_HEADER)?.length;
          const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
          console.log(bearerToken);
          if (bearerToken) {
            this.userStorageService.saveToken(bearerToken);
          }
          return res;
        })
      );
  }
}
