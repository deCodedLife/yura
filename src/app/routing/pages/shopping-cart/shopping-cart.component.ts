import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie";
import { IProduct } from "../../../services/product.interface";
import { ProductsService } from "../../../services/products.service";
import { CookieCartService } from "../../../services/cookie-cart.service";
import {ServicesService} from "../../../services/services.service";
import {IService} from "../../../services/service.interface";
import {tap} from "rxjs";

export interface IAbstractProduct {
  image: string
  title: string
  subTitle: string
  price: number
  amount: number
  summary: number
  productReference: IProduct
  serviceReference: IService
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less']
})

export class ShoppingCartComponent implements OnInit {
  constructor(
    private cookiesService: CookieService,
    private productsService: ProductsService,
    private servicesService: ServicesService,
    private cartCookieService: CookieCartService
  ) {}

  summary = 0
  cartList: IAbstractProduct[] = []
  API_URL = "https://coded.life"

  updateCount(index: number, event: Event) {
    this.cartList[ index ].amount = parseInt ( (<HTMLInputElement>event.target).value )
    this.cartList[ index ].summary = this.cartList[ index ].price * this.cartList[ index ].amount
    this.updateSummary()
  }

  updateSummary(){
    this.summary = 0
    this.cartList.forEach(item => this.summary += item.summary )
  }

  ngOnInit() {
    this.cartCookieService.recalculate()

    let cartProducts = this.cookiesService.getObject( "products" ) as number[]
    let cartServices = this.cookiesService.getObject( "services" ) as number[]

    cartProducts.forEach( productID => {
      this.productsService.getProduct( productID.toString() ).pipe( tap( _ => {
        this.updateSummary()
      } ) ).subscribe( response => {
        this.cartList.push( {
          productReference: response.data[0],
          amount: 1,
          price: response.data[0].price,
          image: this.API_URL + response.data[0].image,
          title: response.data[0].product_name,
          subTitle: response.data[0].model,
          serviceReference: null,
          summary: response.data[0].price
        } )
      } )
    } )

    cartServices.forEach( serviceID => {
      this.servicesService.getServiceByID( serviceID ).pipe( tap( _ => {
        this.updateSummary()
      } ) ).subscribe( response => {
        this.cartList.push({
          productReference: null,
          amount: 1,
          price: response.data[0].price,
          image: "assets/services-cart.png",
          title: response.data[0].title,
          subTitle: "",
          serviceReference: response.data[0],
          summary: response.data[0].price
        })
      } )
    } )

    this.updateSummary()

  }

}
