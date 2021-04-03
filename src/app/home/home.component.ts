import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    products: ProductModel[] = [];

    constructor(private http: HttpService) {}

    ngOnInit() {
        this.http.productList().subscribe(data => {
            this.products = data;
            console.log(this.products);
        });
    }

    productList(): void {
        this.http.productList().subscribe(data => {
          this.products = data;
          console.log(this.products);
        });
      }

    openDialog() {
        alert('bye bye');
    }
}
