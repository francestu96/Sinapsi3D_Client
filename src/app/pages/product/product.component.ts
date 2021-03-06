import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/ProductModel';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ProductProxy } from 'src/app/services/proxy/product.proxy';
import { CartProxy } from 'src/app/services/proxy/cart.proxy';
import { MessageService } from 'src/app/services/message.service';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
    public imageBaseUrl = environment.baseURL + "/image/thumb/";
    public products: ProductModel[] = [];
    public quantities: any = {};
    public filter: string;

    constructor(
        private router: Router, 
        private storageService: StorageService,
        private productProxy: ProductProxy, 
        private cartProxy: CartProxy, 
        private dialog: MatDialog, 
        private translateService: TranslateService, 
        private messageService: MessageService) {}

    ngOnInit() {
        this.getProducts();
    }

    getProducts(filterText: string = null): void {
        this.productProxy.productList(filterText).subscribe(data => {
            this.products = data;
            data.forEach(product => this.quantities[product._id] = 0);
        });
    }

    addToCart(productId: string): void {
        if(this.quantities[productId] > 0) {
            if (!this.storageService.getIdentity()){
                const snackBarRef = this.messageService.error(this.translateService.instant("PRODUCT.MUST_LOGIN"), this.translateService.instant("PRODUCT.LOGIN"));

                snackBarRef.afterDismissed().subscribe(info => {
                    if (info.dismissedByAction === true) {
                        this.router.navigate(['/login']);
                    }
                });
                return;
            }
            this.cartProxy.addUpdate(productId, this.quantities[productId]).subscribe(
                cart => {
                    const productName = cart.products.map(x => x.product).filter(x => x._id === productId)[0].name;
                    const snackBarRef = this.messageService.success("\"" + productName + "\" " + this.translateService.instant("PRODUCT.ITEM_ADDED"), this.translateService.instant("PRODUCT.GO_CART"));

                    snackBarRef.afterDismissed().subscribe(info => {
                        if (info.dismissedByAction === true) {
                            this.router.navigate(['/cart']);
                        }
                    });

                    this.quantities[productId] = 0;
                },
                error => {
                    this.messageService.error(error.message);
                });
        }
        else{
            this.messageService.error(this.translateService.instant("PRODUCT.0_QUANTITY"));
        }
    }

    deleteProduct(productId: string): void {
        this.productProxy.delete(productId).subscribe(
            _ => {
                var index = this.products.indexOf(this.products.find(x => x._id === productId));
                if (index !== -1){
                    this.products.splice(index, 1);
                }
                this.messageService.success(this.translateService.instant("PRODUCT.ITEM_DELETED"));
            },
            err => this.messageService.error(err.error.message)
        );
    }

    clearFilter(): void{
        this.filter = null;   
        this.getProducts();
    }

    openDialog(product: ProductModel): void {
		this.dialog.open(ProductModalComponent, {
			width: "800px",
			data: product,
		});
	}

    isAdmin(): boolean {
        return this.storageService.isAdmin();
    }
}
