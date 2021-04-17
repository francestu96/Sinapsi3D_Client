import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderResponse } from 'src/app/shared/paypal';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderProxy {
  constructor(private http: HttpClient) { }

  get(): Observable<OrderResponse[]> {
    return this.http.get(`${environment.baseURL}/order`).pipe(map((response: OrderResponse[]) => response));
  }

  create(order: OrderResponse): Observable<any> {
    return this.http.post(`${environment.baseURL}/order`, order);
  }
}
