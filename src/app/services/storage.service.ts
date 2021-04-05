import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token';
const ID_TOKEN = 'id_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public saveUser(idToken: any): void {
    localStorage.removeItem(ID_TOKEN);
    localStorage.setItem(ID_TOKEN, JSON.stringify(idToken));
  }

  public getUser(): any {
    const user = JSON.parse(jwt_decode(localStorage.getItem(ID_TOKEN)));
    if (user) {
      return user;
    }

    return {};
  }
}
