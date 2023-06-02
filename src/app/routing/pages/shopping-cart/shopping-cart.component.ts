import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie";
import { AppCookieService } from "../../../services/app-cookie.service";
import {tap} from "rxjs";
import {ObjectService} from "../../../services/object.service";
import {HttpParams} from "@angular/common/http";
import {IAbstractProduct} from "../../../components/tableview/tableview.component";
import {TableDataService} from "../../../services/table-data.service";
import {IProduct} from "../../../services/interfaces/product.interface";
import {IField} from "../../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less']
})

export class ShoppingCartComponent implements OnInit {
  constructor(
    private cookiesService: CookieService,
    private objectsService: ObjectService,
    private cartCookieService: AppCookieService,
    private dataService: TableDataService
  ) {}

  cartList: IAbstractProduct[] = []
  clientName: string = ""
  clientEmail: string = ""
  phoneNumber: string = ""

  checkout() {

    let nameSplit = this.clientName.split( " ")
    if ( nameSplit.length < 2 ) {
      alert( "Введите ФИО" )
      return
    }

    if ( !this.clientEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ) ) {
      alert( "Почта введена не корректно" )
      return;
    }

    if ( !this.phoneNumber.match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/) ) {
      alert( "Номер телефона введен не корректно" )
      return;
    }

    let newClient: object = {
      surname: nameSplit[0],
      first_name: nameSplit[1],
      phone: this.phoneNumber
    }

    if ( nameSplit.length > 2 ) newClient[ "patronymic" ] = nameSplit[2]

    this.objectsService.postObject( "clients", newClient ).then( response => {

     if ( response.status_code != 200 ) {
       alert( "Что то пошло не так. 1 " + response.data )
       return
     }

     let newSale: object = {client_id: response.data as number, active: 1}

     this.objectsService.postObject( "sales", newSale ).then( saleResponse => {

       if ( saleResponse.status_code != 200 ) {
         alert( "Что то пошло не так. 2 " + saleResponse.data )
         return
       }

       this.cartList.forEach( cartItem => {

         let type = this.isProduct( cartItem.reference ) ? "sales_products" : "sales_services"
         let newItem: object = {
           sale_id: saleResponse.data as number,
           amount: cartItem.amount,
           price: cartItem.price
         }

         if ( this.isProduct( cartItem.reference ) ) newItem[ "product_id" ] = cartItem.reference.id
         else newItem[ "service_id" ] = cartItem.reference.id

         this.objectsService.postObject( type, newItem ).then( objectResponse => {

           if ( objectResponse.status_code != 200 ) {
             alert( "Что то пошло не так. 3 " + objectResponse.data )
             return
           }

         } )

       } )

     } )

    } )
  }

  isProduct(item: object): item is IProduct {
    return (item as IProduct).model !== undefined;
  }

  updateCart(products: IAbstractProduct[] ) {
    this.cartList = products
    this.cartCookieService.reset()

    this.cartList.forEach( item => {
      let type = this.isProduct( item.reference ) ? "products" : "services"
      this.cartCookieService.addProduct( {id: item.id, count:item.amount}, type )
    } )

    this.dataService.tableContent$.next( this.cartList )
  }

  initCartProducts() {
    this.cartList = []
    this.cartCookieService.recalculate()

    let cartProducts = this.cartCookieService.get( "products" )
    let cartServices = this.cartCookieService.get( "services" )


    cartProducts.forEach( product => {
      this.objectsService.getWithParams( "conditioners", new HttpParams({
        fromObject: {
          id: product.id.toString()
        }
      }) ).subscribe( response => {
        this.cartList.push( {
          id: response.data[0].id,
          reference: response.data[0],
          amount: product.count,
          price: response.data[0].price,
          image: response.data[0].image,
          title: response.data[0].model,
          summary: response.data[0].price
        } )

        this.dataService.tableContent$.next( this.cartList )
      } )
    } )

    cartServices.forEach( service => {
      this.objectsService.getWithParams( "services", new HttpParams({
        fromObject: {
          id: service.id
        }
      }) ).subscribe( response => {
        this.cartList.push({
          id: response.data[0].id,
          reference: response.data[0],
          amount: service.count,
          price: response.data[0].price,
          image: "/assets/service-cart.png",
          title: response.data[0].title,
          summary: response.data[0].price
        })
        this.dataService.tableContent$.next( this.cartList )
      } )
    } )
  }

  ngOnInit() {
    this.dataService.tableContent$.next( [] )
    this.initCartProducts()
  }

}
