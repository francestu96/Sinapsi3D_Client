import { ProductModel } from './ProductModel';

export class CartModel {
    _id: string;
    userId: string;
    products: [
        {
            quantity: number,
            product: ProductModel
        }
    ]
}
