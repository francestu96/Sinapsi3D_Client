import { Component, forwardRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { MessageService } from 'src/app/services/message.service';
import { CartProxy } from 'src/app/services/proxy/cart.proxy';
import { OrderProxy } from 'src/app/services/proxy/order.proxy';
import { StorageService } from 'src/app/services/storage.service';
import { Item, OnApproveActions, OnApproveData, OnCancelData, OnErrorData, OrderRequest, PayPalProcessor, PurchaseUnitRequest } from 'src/app/shared/paypal';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [ { provide: PayPalProcessor, useExisting: forwardRef(() => CartComponent) }]
})
export class CartComponent implements OnInit {
    public imageBaseUrl = environment.baseURL + "/image/thumb/";
    public isPaymentLoading = false;
    public pageStruct: PageStruct[] = [];
    public totalPrice: number = 0;
    
    constructor(
        private router: Router,
        private cartProxy: CartProxy, 
        private orderProxy: OrderProxy,
        private messageService: MessageService, 
        private storageService: StorageService) { }

    ngOnInit(): void{
        this.cartProxy.get().subscribe(cart => {
            for (var item of cart?.products){
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

    createOrder(): OrderRequest {
        var purchasedUnits: PurchaseUnitRequest[] = [];

        for (var purchasedUnit of this.pageStruct){
            purchasedUnits.push({
                reference_id: purchasedUnit.product._id,
                amount: { 
                    currency_code: "EUR", 
                    value: (purchasedUnit.product.price * purchasedUnit.quantity).toString(), 
                    breakdown: { item_total: { currency_code: "EUR", value: (purchasedUnit.product.price * purchasedUnit.quantity).toString() } } 
                },
                items: [{
                    name: purchasedUnit.product.name,
                    quantity: purchasedUnit.quantity.toString(),
                    unit_amount: { currency_code: "EUR", value: purchasedUnit.product.price.toString() }
                }]
            });
        }
        return {
            intent: 'CAPTURE', 
            payer: {
                email_address: this.storageService.getIdentity().email
            },
            purchase_units: purchasedUnits
        }
    }

    async onApprove(_: OnApproveData, actions: OnApproveActions): Promise<void> {   
        this.isPaymentLoading = true; 
        const details = await actions.order.capture();
        details.user_id = this.storageService.getIdentity().id;
        this.isPaymentLoading = false;

        this.orderProxy.create(details).subscribe(
            () => {
                this.cartProxy.delete().subscribe(error => this.messageService.error(error.message));
                this.router.navigate(['/home']);
                this.messageService.success("Ordine effettuato con successo. Riceverai una mail con maggiori istruzioni!");
            },
            error => this.messageService.error(error.message)
        );
    }
    
    onCancel(_: OnCancelData): void {    
        this.messageService.success("Transazione cancellata");
    }

    onError(data: OnErrorData): void {    
        this.messageService.error(data);
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
