import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/ProductModel';
import { HttpService } from '../../services/http.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    public imageBaseUrl = environment.baseURL + "/image/";
    public products: ProductModel[] = [];

    constructor(private http: HttpService, private dialog: MatDialog) {}

    ngOnInit() {
        this.http.productList().subscribe(data => {
            this.products = data;
        });
    }

    productList(): void {
        this.http.productList().subscribe(data => {
          this.products = data;
        });
    }

    openDialog(product: ProductModel): void {
		this.dialog.open(ProductModalComponent, {
			width: "800px",
			data: product,
		});
	}
}
