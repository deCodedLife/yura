import { Component } from '@angular/core';
import { AppCookieService } from "./services/app-cookie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'yura';

  constructor(
    private cartCookieService: AppCookieService,
    public location: Location
  ) {
    cartCookieService.recalculate()
  }
}
