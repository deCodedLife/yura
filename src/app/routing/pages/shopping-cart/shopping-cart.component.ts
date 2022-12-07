import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie";
import { IProduct } from "../../../services/interfaces/product.interface";
import { AppCookieService } from "../../../services/app-cookie.service";
import {IService} from "../../../services/interfaces/service.interface";
import {tap} from "rxjs";
import {ObjectService} from "../../../services/object.service";
import {HttpParams} from "@angular/common/http";

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
    private objectsService: ObjectService,
    private cartCookieService: AppCookieService
  ) {}

  summary = 0
  cartList: IAbstractProduct[] = []

  removeFromCard(product: IAbstractProduct) {
    if ( product.productReference != null ) {
      this.cartCookieService.deleteProduct( product.productReference.id )
    }
    if ( product.serviceReference != null ) {
      this.cartCookieService.deleteService( product.serviceReference.id )
    }
    this.update()
  }

  updateCount(index: number, event: Event) {
    this.cartList[ index ].amount = parseInt ( (<HTMLInputElement>event.target).value )
    this.cartList[ index ].summary = this.cartList[ index ].price * this.cartList[ index ].amount
    this.updateSummary()
  }

  updateSummary(){
    this.summary = 0
    this.cartList.forEach(item => this.summary += item.summary )
  }

  update() {
    this.cartList = []
    this.cartCookieService.recalculate()

    let cartProducts = this.cookiesService.getObject( "products" ) as number[]
    let cartServices = this.cookiesService.getObject( "services" ) as number[]

    cartProducts.forEach( productID => {
      this.objectsService.getWithParams( "conditioners", new HttpParams({
        fromObject: {
          id: productID.toString()
        }
      }) ).pipe( tap( _ => {
        this.updateSummary()
      } ) ).subscribe( response => {
        this.cartList.push( {
          productReference: response.data[0],
          amount: 1,
          price: response.data[0].price,
          image: '/api/' + response.data[0].image,
          title: response.data[0].product_name,
          subTitle: response.data[0].model,
          serviceReference: null,
          summary: response.data[0].price
        } )
      } )
    } )

    cartServices.forEach( serviceID => {
      this.objectsService.getWithParams( "services", new HttpParams({
        fromObject: {
          id: serviceID
        }
      }) ).pipe( tap( _ => {
        this.updateSummary()
      } ) ).subscribe( response => {
        this.cartList.push({
          productReference: null,
          amount: 1,
          price: response.data[0].price,
          image: "/assets/service-cart.png",
          title: response.data[0].title,
          subTitle: "",
          serviceReference: response.data[0],
          summary: response.data[0].price
        })
      } )
    } )

    this.updateSummary()
  }

  ngOnInit() {
    this.update()
  }

}
