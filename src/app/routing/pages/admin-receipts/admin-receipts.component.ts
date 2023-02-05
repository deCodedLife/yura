import {Component, Input, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {IField, IListItem} from "../../../services/interfaces/fieldItem.interface";
import {IRequest, ObjectService} from "../../../services/object.service";
import {ActivatedRoute, Route} from "@angular/router";
import {IProduct} from "../../../services/interfaces/product.interface";
import {IService} from "../../../services/interfaces/service.interface";
import {HttpParams} from "@angular/common/http";
import {ISaleProduct} from "../../../services/interfaces/sale-product.interface";
import {ISaleService} from "../../../services/interfaces/sale-service.interface";
import {IAbstractProduct} from "../../../components/tableview/tableview.component";
import {Subject} from "rxjs";
import {TableDataService} from "../../../services/table-data.service";



@Component({
  selector: 'app-admin-receipts',
  templateUrl: './admin-receipts.component.html',
  styleUrls: ['./admin-receipts.component.less']
})
export class AdminReceiptsComponent implements OnInit {
  constructor(
    private appheader: HeaderService,
    private objectService: ObjectService,
    private route: ActivatedRoute,
    private dataService: TableDataService
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

  updateCart( products: IAbstractProduct[] ) {
    this.productCart = products
    this.dataService.tableContent$.next( this.productCart )
  }

  updateReciept() {
    let request: IField[] = []

    this.saleFields.forEach( field => {
      if ( typeof (field.value) == "undefined" ) field.value = this.saleObject[ field.article ]
      request.push( field )
    } )

    this.objectService.updateObject( "sales", request, this.saleID, true )
  }

  closeReceipt() {
    this.saleObject[ "active" ] = 0
    this.updateReciept()
  }

  updateList() {
    this.dataService.tableContent$.next( this.productCart )
  }

  addProduct() {
    if ( typeof (this.selectedItem) == "undefined" ) {
      alert( "Ничего не выбрано" )
      return
    }

    this.productCart.push( this.selectedItem )

    if ( this.isProduct( this.selectedItem ) ) {
      this.updateList()
      return;
    }

    if ( (<IService>this.selectedItem.reference).additional_service_id != null ) {
      this.allProducts.forEach( product => {
        if ( this.isProduct( product ) ) return
        if ( product.reference.id != (<IService>this.selectedItem.reference).additional_service_id ) return;

        this.productCart.push( product )
      } )
    }

    this.updateList()
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

        this.objectService.createObject( type, request,false )
      } )

      this.updateReciept()
    } )

  }

  arrayByKey( data: object[], key: string ): IListItem[] {
    let titleList: IListItem[] = []
    data.forEach( (item, index) => titleList.push( { type: item[ key ], id: index } ) )
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

  addToCart( response: IRequest, type: string ) {

    if ( response.data == null ) return

    response.data.forEach( item => {
      item.content_id = type == "services" ? (<ISaleService>item).service_id : (<ISaleProduct>item).product_id

      let amount = item.amount
      let price = item.price
      let summary = amount * price
      this.summary += summary

      this.objectService.getWithParams( type, new HttpParams( { fromObject: {
          id: item.content_id
        } } ) ).subscribe( response => {

        let product = response.data[0] as IService | IProduct
        let isService = typeof(<object>product[ "model" ]) == "undefined"

        this.productCart.push({
          id: item.id,
          image: isService ? "/assets/service-cart.png" : (<object>product)["image"],
          title: isService ? (<object>product)["title"] : (<object>product)["model"],
          price: item.price,
          amount: amount,
          summary: summary,
          reference: product
        })

        this.oldUserCart.push( this.productCart[ this.productCart.length - 1 ] )
        this.dataService.tableContent$.next( this.productCart )

      } )
    } )
  }

  getSaleDetails(objectID: number) {
    this.objectService.getWithParams( "sales_services", new HttpParams({fromObject: {
        sale_id: objectID
      }}) ).subscribe( response => this.addToCart( response, "services" ) )

    this.objectService.getWithParams( "sales_products", new HttpParams({fromObject: {
        sale_id: objectID
      }}) ).subscribe( response => this.addToCart( response, "conditioners" ) )
  }

  ngOnInit() {
    this.appheader.title.next( "Заказ клиента" )

    this.dataService.tableContent$.next([])
    this.saleID = parseInt( this.route.snapshot.paramMap.get('id') )

    this.getSaleDetails( this.saleID )

    this.objectService.getWithParams( "sales", new HttpParams( {
      fromObject: {
        id: this.saleID
      }
    } ) ).subscribe( response => this.saleObject = response.data[0] )
    this.objectService.getFields( "sales" ).then( response => this.saleFields = response )
    this.getAllProducts()
  }

}
