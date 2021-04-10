import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { CartModel } from '../../models/CartModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartProxy {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  addUpdate(productId: string, quantity: number): Observable<CartModel> {
    return this.http.post(`${environment.baseURL}/cart/${this.storageService.getIdentity().id}`, { productId: productId, quantity: quantity }).pipe(map((response: CartModel) => response));
  }

  get(): Observable<CartModel> {
    return this.http.get(`${environment.baseURL}/cart/${this.storageService.getIdentity().id}`).pipe(map((response: CartModel) => response));
  }
  
  remove(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/cart/${this.storageService.getIdentity().id}/${productId}`);
  }

  delete(): Observable<any> {
    return this.http.delete(`${environment.baseURL}/cart/${this.storageService.getIdentity().id}`);
  }
}
