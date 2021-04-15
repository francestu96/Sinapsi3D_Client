import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { OrderResponse } from 'src/app/shared/paypal';
import { OrderProxy } from 'src/app/services/proxy/order.proxy';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/models/ProductModel';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewChecked {
    @ViewChildren('slider')
    public sliders: QueryList<NgImageSliderComponent>;
    @ViewChildren('container')
    public containers: QueryList<ElementRef>;
    public imageBaseUrl = environment.baseURL + "/image/thumb/";
    public breakpoint: number;
    public pageStruct: PageStruct[] = [];
    
    constructor(
        private cdRef: ChangeDetectorRef,
        private orderProxy: OrderProxy
    ) { }

    ngAfterViewChecked(): void {
        for(var i = 0; this.sliders && i < this.sliders.length; i++){
            this.sliders.toArray()[i].sliderImageWidth = this.containers.toArray()[i].nativeElement.offsetWidth;
            this.sliders.toArray()[i].sliderImageHeight = this.containers.toArray()[i].nativeElement.offsetWidth;
        }

        this.cdRef.detectChanges();
    }

    ngOnInit(): void{
        this.breakpoint = (window.innerWidth <= 1000) ? ((window.innerWidth <= 700) ? 1 : 2) : 4;
        
        this.orderProxy.get().subscribe(orders => {
            for (var item of orders){         
                var products: {model: ProductModel, images: any[]}[] = [];       
                for (var purchaseUnit of item.purchase_units){
                    var product = { model: purchaseUnit.reference_id, images: [] };
                    var quantity = purchaseUnit.items.map(x => +x.quantity).reduce((a, b) => a + b);
                    var currentImages = [];
                    for(var filename of purchaseUnit.reference_id.images){
                        currentImages.push({
                            image: environment.baseURL + "/image/original/" + filename,
                            thumbImage: environment.baseURL + "/image/thumb/" + filename,
                            title: purchaseUnit.reference_id.name + " x" + quantity
                        });
                    }
                    product.images = currentImages;
                    products.push(product);
                }

                this.pageStruct.push({
                    order: item,
                    products: products,
                    totalPrice: item.purchase_units.map(x => +x.amount.breakdown.item_total.value).reduce((a, b) => a + b),
                    isLoading: false
                });
            }
        });
    }

    onResize(event: any) {
        this.breakpoint = (event.target.innerWidth <= 1000) ? ((event.target.innerWidth <= 700) ? 1 : 2) : 4;
    }
}

class PageStruct {
    order: OrderResponse;
    products: {
        model: ProductModel,
        images: any[]
    }[];
    totalPrice: number;
    isLoading: boolean;
}