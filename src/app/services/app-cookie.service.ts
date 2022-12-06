import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { CookieService } from "ngx-cookie";
import {IAuthData} from "./auth.service";

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

  addProduct(id: number) {
    let products = this.cookieService.getObject( "products" ) as number[]
    products.push( id )
    this.cookieService.putObject( "products", products )
    this.recalculate()
  }

  addServices(id: number) {
    let services = this.cookieService.getObject( "services" ) as number[]
    services.push( id )
    this.cookieService.putObject( "services", services )
    this.recalculate()
  }

  deleteProduct(id: number) {
    let products = this.cookieService.getObject( "products" ) as number[]
    products.splice(products.indexOf( id ), 1)
    this.cookieService.putObject( "products", products )
    this.recalculate()
  }

  deleteService(id: number) {
    let services = this.cookieService.getObject( "services" ) as number[]
    services.splice(services.indexOf( id ), 1)
    this.cookieService.putObject( "services", services )
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

    this.cookieUpdated.next( products.length + services.length )
  }

  cookieUpdated = new Subject<number>()
}
