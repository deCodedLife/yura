import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie";
import { IAuthData } from "./auth.service";

export interface ICookieProduct {
  id: number
  count: number
}

@Injectable({
  providedIn: 'root'
})

export class AppCookieService {
  constructor(
    private cookieService: CookieService
  ) { }

  getAuthData(): IAuthData {

    let username = this.cookieService.get( "username" ) as string
    let password = this.cookieService.get( "password" ) as string
    let token = this.cookieService.get( "token" ) as string

    return {
      username: typeof ( username ) == "undefined" ? "" : username,
      password: typeof ( password ) == "undefined" ? "" : password,
      token: typeof ( token ) == "undefined" ? "" : token
    }

  }

  isAuthorized() {
    let token = this.cookieService.get( "isAuth" ) as string
    token = typeof ( token ) == "undefined" ? "false" : token
    return token == "true"
  }

  setAuthorized(state: boolean) {
    let token = state ? "true" : "false"
    this.cookieService.put( "isAuth", token )
  }

  setAuthData(userData: IAuthData) {
    this.cookieService.put( "username", userData.username )
    this.cookieService.put( "password", userData.password )
    this.cookieService.put( "token", userData.token )
  }

  get( type: string ): ICookieProduct[] {
    let productList: ICookieProduct[] = []
    let products = this.cookieService.getObject( type ) as number[]

    products.forEach( (product, index) => {
      if ( index % 2 != 0 ) return
      productList.push( {id: product, count: products[ index + 1 ]} )
    } )

    return productList
  }

  addProduct(product: ICookieProduct, type: string) {
    let products = this.cookieService.getObject( type ) as number[]

    products.push( product.id )
    products.push( product.count )

    this.cookieService.putObject( type, products )
    this.recalculate()
  }

  reset() {
    this.cookieService.putObject( "products", [] )
    this.cookieService.putObject( "services", [] )
  }

  deleteProduct( id: number, type: string ) {
    let products = this.cookieService.getObject( type ) as number[]

    products.forEach( ( product, index ) => {
      if ( index % 2 != 0 || product != id ) return
      products.splice( index, 2 )
    } )

    console.log( products, id )
    this.cookieService.putObject( type, products )
    this.recalculate()
  }

  recalculate() {
    let products = this.cookieService.getObject( "products" ) as number[]
    let services = this.cookieService.getObject( "services" ) as number[]

    if ( typeof (products) == "undefined" ) {
      this.cookieService.putObject( "products", [] )
      products = []
    }

    if ( typeof (services) == "undefined" ) {
      this.cookieService.putObject( "services", [] )
      services = []
    }

    this.cookieUpdated.next( products.length / 2 + services.length / 2 )
  }

  cookieUpdated = new Subject<number>()
}
