import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IProduct} from "./interfaces/product.interface";
import {delay} from "rxjs";

export interface IProductsResponse {
  status_code: number,
  data: IProduct[]
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  API_URL = "https://coded.life"

  constructor(private http: HttpClient) {}

  getProduct(id: string) {
    return this.http.get<IProductsResponse>(this.API_URL+`/conditioners`, {
      params: new HttpParams({
        fromObject: {
          id: id
        }
      })
    }).pipe(delay(1000))
  }

  searchByName(name: string) {
    return this.http.get<IProductsResponse>(this.API_URL+`/conditioners?product_name=${name}`).pipe(delay(1000))
  }

  searchByModel(model: string) {
    return this.http.get<IProductsResponse>(this.API_URL+`/conditioners?model=${model}`).pipe(delay(1000))
  }

  getProducts() {
    return this.http.get<IProductsResponse>(this.API_URL+"/conditioners").pipe(delay(1000))
  }
}
