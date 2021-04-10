import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/CartModel';
import { ProductModel } from 'src/app/models/ProductModel';
import { MessageService } from 'src/app/services/message.service';
import { CartProxy } from 'src/app/services/proxy/cart.proxy';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    public imageBaseUrl = environment.baseURL + "/image/thumb/";
    public pageStruct: PageStruct[] = [];
    public totalPrice: number = 0;
    
    constructor(private cartProxy: CartProxy, private messageService: MessageService) { }

    ngOnInit(): void{
        this.cartProxy.get().subscribe(cart => {
            for (var item of cart.products){
                var currentImages = [];
                for (var filename of item.product.images){
                    currentImages.push({
                        image: environment.baseURL + "/image/original/" + filename,
                        thumbImage: environment.baseURL + "/image/thumb/" + filename,
                    });
                }

                this.pageStruct.push({
                    product: item.product,
                    quantity: item.quantity,
                    images: currentImages,
                    isLoading: false
                });

                this.totalPrice += item.product.price * item.quantity;
            }
        });
    }

    quantityChanged(productId: string): void{
        var item = this.pageStruct.find(x => x.product._id === productId);
        if(!item) {
            this.messageService.genericError();
            return;
        }
        if(item.quantity <= 0){
            this.remove(item);
            return;
        }

        item.isLoading = true;
        this.cartProxy.addUpdate(productId, item.quantity).subscribe(
            () => {
                this.refreshTotalPrice();
                item.isLoading = false;
            },
            error => {
                this.messageService.error(error.message);
                item.isLoading = false
            });
    }

    remove(item: PageStruct): void{
        item.isLoading = true;
        this.cartProxy.remove(item.product._id).subscribe(
            () => {
                const index = this.pageStruct.indexOf(item);
                this.pageStruct.splice(index, 1);
                this.refreshTotalPrice();
                this.messageService.success("Elemento rimosso dal carrello");
            },
            error => this.messageService.error(error.message),
            () => item.isLoading = false
        )
    }

    private refreshTotalPrice(): void{
        var aux = 0;
        for (var item of this.pageStruct){
            aux += item.product.price * item.quantity;
        }
        this.totalPrice = aux;
    }
}

class PageStruct {
    product: ProductModel;
    quantity: number;
    images: any[];
    isLoading: boolean
}
