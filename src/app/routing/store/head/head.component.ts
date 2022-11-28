import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {CookieCartService} from "../../../services/cookie-cart.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less'],
})

export class HeadComponent implements OnInit{
  constructor(
    private cookiesService: CookieService,
    private cookieCartService: CookieCartService
  ) {}
  cartProductsCount = 0

  ngOnInit() {
    this.cookieCartService.cookieUpdated.subscribe( number => this.cartProductsCount = number )
  }
}
