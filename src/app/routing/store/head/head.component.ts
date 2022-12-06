import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie";
import {AppCookieService} from "../../../services/app-cookie.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less'],
})

export class HeadComponent implements OnInit{
  constructor(
    private cookiesService: AppCookieService,
    private cookieCartService: AppCookieService
  ) {}
  cartProductsCount = 0

  ngOnInit() {
    this.cookieCartService.cookieUpdated.subscribe( number => this.cartProductsCount = number )
  }
}
