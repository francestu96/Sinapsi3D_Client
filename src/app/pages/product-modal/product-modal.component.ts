import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/ProductModel';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'product-modal',
	templateUrl: './product-modal.component.html',
})
export class ProductModalComponent {
	public imageBaseUrl = environment.baseURL + "/image/";
	public images: any[] = [];
	public product: any;

	constructor(
		public dialogRef: MatDialogRef<ProductModalComponent>,
		@Inject(MAT_DIALOG_DATA) data: ProductModel
	) { 
		this.product = data;
		for (var filename of this.product.images){
			this.images.push({ 
				image: environment.baseURL + "/image/" + filename,
				thumbImage: environment.baseURL + "/image/" + filename,
			});
		}
	}
}
