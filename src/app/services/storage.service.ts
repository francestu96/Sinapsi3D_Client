import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

const ACCESS_TOKEN = 'access_token';
const ID_TOKEN = 'id_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  loggedEmitter: EventEmitter<void> = new EventEmitter();
  
  constructor(private jwtService: JwtService) { }

  public saveToken(token: string): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  public saveIdentity(idToken: any): void {
    localStorage.removeItem(ID_TOKEN);
    localStorage.setItem(ID_TOKEN, JSON.stringify(idToken));
    this.loggedEmitter.emit();
  }

  public getIdentity(): UserModel {
    const token = localStorage.getItem(ID_TOKEN);
    if (!token){
      return null;
    }
    const identity = this.jwtService.decodeToken(localStorage.getItem(ID_TOKEN));
    if (identity) {
      return identity;
    }

    return null;
  }

  public signOut(): void {
    localStorage.clear();
    this.loggedEmitter.emit();
  }
}
