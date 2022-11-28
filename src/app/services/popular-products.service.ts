import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPopularProduct} from "./popularProduct.interface";

export interface IPopularPeoductsResponse {
  status_code: number,
  data: IPopularProduct[]
}

@Injectable({
  providedIn: 'root'
})
export class PopularProductsService {

  API_URL = "http://localhost:8080"
  constructor(private http: HttpClient) {}

  getPopular() {
    return this.http.get<IPopularPeoductsResponse>(this.API_URL+"/popular_products")
  }
}
