import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthProxy {
  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/signin`, { email, password });
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/signup`, { name, email, password });
  }
}
