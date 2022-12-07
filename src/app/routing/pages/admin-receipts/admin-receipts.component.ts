import {Component, Input, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {ObjectService} from "../../../services/object.service";
import {ActivatedRoute, Route} from "@angular/router";
import {IProduct} from "../../../services/interfaces/product.interface";
import {IService} from "../../../services/interfaces/service.interface";
import {HttpParams} from "@angular/common/http";
import {ISaleProduct} from "../../../services/interfaces/sale-product.interface";
import {ISaleService} from "../../../services/interfaces/sale-service.interface";

export interface IAbstractProduct {
  id: number
  image: string
  title: string
  price: number
  amount: number
  summary: number
  reference: IProduct | IService
}

@Component({
  selector: 'app-admin-receipts',
  templateUrl: './admin-receipts.component.html',
  styleUrls: ['./admin-receipts.component.less']
})
export class AdminReceiptsComponent implements OnInit {
  constructor(
    private appheader: HeaderService,
    private objectService: ObjectService,
    private route: ActivatedRoute
  ) {
  }

  saleObject: object = {}
  saleFields: IField[] = []

  allProducts: IAbstractProduct[] = []
  productCart: IAbstractProduct[] = []
  summary: number = 0
  selectedItem: IAbstractProduct
  saleID: number
  oldUserCart: IAbstractProduct[] = []

  updateCount(index: number, event: Event) {
    this.productCart[ index ].amount = parseInt ( (<HTMLInputElement>event.target).value )
    this.productCart[ index ].summary = this.productCart[ index ].price * this.productCart[ index ].amount
    this.updateSummary()
  }

  removeFromCard(product: IAbstractProduct) {
    this.productCart.splice( this.productCart.indexOf( product ), 1 )
  }

  addProduct() {
    if ( typeof (this.selectedItem) == "undefined" ) {
      alert( "Ничего не выбрано" )
      return
    }
    this.productCart.push( this.selectedItem )
  }

  isProduct(item: object): item is IProduct {
    return (item as IProduct).model !== undefined;
  }

  updateSale() {
    console.log( this.oldUserCart )

    this.oldUserCart.forEach( cartItem => {
      let type = this.isProduct( cartItem.reference ) ? "sales_products" : "sales_services"
      if ( cartItem.id != null ) this.objectService.deleteObject( type, cartItem.id ).subscribe( response => {} )
    } )

    this.productCart.forEach( cartItem => {

      let type = this.isProduct( cartItem.reference ) ? "sales_products" : "sales_services"

      this.objectService.getSchema( type ).subscribe( response => {
        let request: IField[] = []
        let sale: ISaleProduct | ISaleService = {
          sale_id: this.saleID,
          amount: cartItem.amount,
          price: cartItem.price,
          id: null,
          service_id: cartItem.reference.id,
          product_id: cartItem.reference.id,
          content_id: null
        }

        sale.sale_id = this.saleID
        sale.amount = cartItem.amount
        sale.price = cartItem.price

        response.data.forEach( field => {
          field.value = <object>sale[ field.article ]
          request.push( field )
        } )

        this.objectService.createObject( type, request, false )
      } )

      let request: IField[] = []

      this.saleFields.forEach( field => {
        if ( typeof (field.value) == "undefined" ) field.value = this.saleObject[ field.article ]
        request.push( field )
      } )

      this.objectService.updateObject( "sales", request, this.saleID, true )
    } )

  }

  updateSummary(){
    this.summary = 0
    this.productCart.forEach(item => this.summary += item.summary )
  }

  arrayByKey( data: object[], key: string ): string[] {
    let titleList: string[] = []
    data.forEach( item => titleList.push( item[ key ] ) )
    return titleList
  }

  getAllProducts() {
    this.objectService.getObjects( "conditioners" ).subscribe( response => {
      response.data.forEach( item => {
        let product = item as IProduct
        this.allProducts.push({
          id: null,
          image: product.image,
          title: product.model,
          price: product.price,
          amount: 1,
          summary: product.price,
          reference: product
        })
      } )
    } )
    this.objectService.getObjects( "services" ).subscribe( response => {
      response.data.forEach( item => {
        let service = item as IService
        this.allProducts.push({
          id: null,
          image: "/assets/service-cart.png",
          title: service.title,
          price: service.price,
          amount: 1,
          summary: service.price,
          reference: service
        })
      } )
    } )
  }

  addToCart( data: ISaleService | ISaleProduct, type: string ) {

    let amount = data.amount
    let price = data.price
    let summary = amount * price
    this.summary += summary

    this.objectService.getWithParams( type, new HttpParams( { fromObject: {
        id: data.content_id
      } } ) ).subscribe( response => {

      let product = response.data[0] as IService | IProduct
      let isService = typeof(<object>product[ "model" ]) == "undefined"

      this.productCart.push({
        id: data.id,
        image: isService ? "/assets/service-cart.png" : (<object>product)["image"],
        title: isService ? (<object>product)["title"] : (<object>product)["model"],
        price: data.price,
        amount: amount,
        summary: summary,
        reference: product
      })

      this.oldUserCart.push( this.productCart[ this.productCart.length - 1 ] )

    } )
  }

  getSaleDetails(objectID: number) {
    this.objectService.getWithParams( "sales_services", new HttpParams({fromObject: {
        sale_id: objectID
      }}) ).subscribe( response => {
      if ( response.data == null ) return

      response.data.forEach( item => {
        item = item as ISaleService
        item.content_id = item.service_id
        this.addToCart( item, "services" )
      } )

    } )


    this.objectService.getWithParams( "sales_products", new HttpParams({fromObject: {
        sale_id: objectID
      }}) ).subscribe( response => {
      if ( response.data == null ) return

      response.data.forEach( item => {
        item = item as ISaleProduct
        item.content_id = item.product_id
        this.addToCart( item, "conditioners" )
      } )

    } )
  }

  getSaleSchema() {
    this.objectService.getSchema( "sales" ).subscribe( response => {
      this.saleFields = response.data

      for ( let i = 0; i < this.saleFields.length; i++ ) {

        let field = this.saleFields[i]
        let take_from = field.take_from.split('/')
        let object = take_from[0]
        take_from.splice(0, 1)
        let types = take_from

        if ( field.display_type == 'combobox' ) {

          this.objectService.getObjects( object ).subscribe(response => {
            response.data.forEach( item => {
              if ( typeof( this.saleFields[i].list_items ) == "undefined") {
                this.saleFields[i].list_items = []
              }

              let list_item = ""

              types.forEach( type => {
                list_item += item[ type ] + " "
              } )

              list_item.slice(0, -1)

              this.saleFields[i].list_items.push( list_item )
            } )
          } )
        }
      }
    } )
  }

  ngOnInit() {
    this.saleID = parseInt( this.route.snapshot.paramMap.get('id') )
    this.getSaleDetails( this.saleID )
    this.appheader.title.next( "Заказ клиента" )
    this.objectService.getObject( "sales", this.saleID ).subscribe( response => this.saleObject = response.data[0] )
    this.getSaleSchema()
    this.getAllProducts()
  }

}
