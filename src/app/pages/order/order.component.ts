import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/shared/paypal';
import { OrderProxy } from 'src/app/services/proxy/order.proxy';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    public imageBaseUrl = environment.baseURL + "/image/thumb/";
    public pageStruct: PageStruct[] = [];
    
    constructor(
        private orderProxy: OrderProxy
    ) { }

    ngOnInit(): void{
        this.orderProxy.get().subscribe(orders => {
            for (var item of orders){         
                var products: {model: ProductModel, images: any[]}[] = [];       
                for (var purchaseUnit of item.purchase_units){
                    var product = { model: purchaseUnit.reference_id, images: [] };
                    var currentImages = [];
                    for(var filename of purchaseUnit.reference_id.images){
                        currentImages.push({
                            image: environment.baseURL + "/image/original/" + filename,
                            thumbImage: environment.baseURL + "/image/thumb/" + filename,
                        });
                    }
                    product.images = currentImages;
                    products.push(product);
                }

                this.pageStruct.push({
                    order: item,
                    products: products,
                    isLoading: false
                });
            }
        });
    }
}

class PageStruct {
    order: OrderResponse;
    products: {
        model: ProductModel,
        images: any[]
    }[];
    isLoading: boolean;
}