import {IProduct} from "./services/product.interface";

export interface ICartProduct {
  product: IProduct
  amount: number
}

export interface IShoppingCart {
  card: ICartProduct[]
}
