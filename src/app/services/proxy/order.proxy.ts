import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderResponse } from 'src/app/shared/paypal';

@Injectable({
  providedIn: 'root'
})
export class OrderProxy {
  constructor(private http: HttpClient) { }

  create(order: OrderResponse): Observable<any> {
    return this.http.post(`${environment.baseURL}/order`, order);
  }
}
