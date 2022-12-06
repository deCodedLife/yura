import {Component, OnInit} from '@angular/core';
import {AppCookieService} from "../../../services/app-cookie.service";
import {AuthService, IAuthData} from "../../../services/auth.service";
import {sha512} from "js-sha512";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})

export class SignInComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private appCookies: AppCookieService,
    private router: Router
  ) {}

  username: string
  password: string

  isValid(userData: IAuthData): boolean {
    return userData.token == sha512(new Date().getDay() + userData.username + userData.password)
  }

  signIn() {
    this.authService.signIn({
      username: this.username,
      password: this.password,
      token: ""
    }).subscribe( response => {
      if ( response.status_code != 200 ) {
        alert( response.data )
        return
      }

      this.appCookies.setAuthorized(true)
      this.appCookies.setAuthData({
        username: this.username,
        password: this.password,
        token: response.data
      })

      this.router.navigateByUrl("admin/dashboard")

    } )
  }

  ngOnInit() {
    let userData = this.appCookies.getAuthData()

    if ( this.isValid(userData) ) {

      this.authService.signIn( userData ).subscribe( response => {

        if ( response.data == userData.token ) {

          this.router.navigateByUrl("admin/dashboard")
          this.appCookies.setAuthorized(true)
          return

        }

      } )

    }

    this.appCookies.setAuthorized(false)
  }
}
