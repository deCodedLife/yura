import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {CookieService} from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class CookieCartService {
  constructor(
    private cookieService: CookieService
  ) { }

  recalculate() {
    let products = this.cookieService.getObject( "products" ) as number[]
    let services = this.cookieService.getObject( "services" ) as number[]
    this.cookieUpdated.next( products.length + services.length )
  }

  cookieUpdated = new Subject<number>()
}
