import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from '../../models/ProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductProxy {
  constructor(private http: HttpClient) {}
  productList(): Observable<ProductModel[]> {
    return this.http.get(`${environment.baseURL}/product`).pipe(map((response: ProductModel[]) => response));
  }
}
