import { Component } from '@angular/core';
import { CookieCartService } from "./services/cookie-cart.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'yura';

  constructor(
    private cartCookieService: CookieCartService,
    public location: Location
  ) {
    cartCookieService.recalculate()
  }
}
