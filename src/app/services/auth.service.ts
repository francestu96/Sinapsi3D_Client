import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/user/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}/user`, { email, password });
  }
}
