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
    
    productList(filterText: string = null): Observable<ProductModel[]> {
        var filter = filterText ? "?filter=" + filterText : "";
        return this.http.get(`${environment.baseURL}/product${filter}`).pipe(map((response: ProductModel[]) => response));
    }

    get(productId: string): Observable<ProductModel> {
        return this.http.get(`${environment.baseURL}/product/${productId}`).pipe(map((response: ProductModel) => response));
    }
}
