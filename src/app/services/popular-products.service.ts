import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPopularProduct} from "./interfaces/popularProduct.interface";

export interface IPopularPeoductsResponse {
  status_code: number,
  data: IPopularProduct[]
}

@Injectable({
  providedIn: 'root'
})
export class PopularProductsService {

  API_URL = "https://coded.life"
  constructor(private http: HttpClient) {}

  getPopular() {
    return this.http.get<IPopularPeoductsResponse>(this.API_URL+"/popular_products")
  }
}
