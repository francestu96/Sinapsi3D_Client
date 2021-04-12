import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/shared/paypal';
import { OrderProxy } from 'src/app/services/proxy/order.proxy';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
    public imageBaseUrl = environment.baseURL + "/image/thumb/";
    public orders: OrderResponse[];
    
    constructor(
        private orderProxy: OrderProxy
    ) { }

    ngOnInit(): void{
        this.orderProxy.get().subscribe(orders => {
            this.orders = orders;
        });
    }
}