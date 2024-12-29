import { Injectable } from '@angular/core';

const TOKEN = 's_token';
const USER = 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user === null) {
      return '';
    }
    return user.role;
  }

  static isClientLoggedIn(): boolean {
    // if (typeof window === 'undefined' || !window.localStorage) {
    //   return false;
    // }
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'CLIENT';
  }

  static isCompanyLoggedIn(): boolean {
    // if (typeof window === 'undefined' || !window.localStorage) {
    //   return false;
    // }
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'COMPANY';
  }

  static signOut(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }

}
