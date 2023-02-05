import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProxyRequest, IResponse} from "./object.service";
import {tap} from "rxjs";

export interface IAuthData {
  username: string
  password: string
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  API_URL = "/api/index.php"
  ORIGIN_API_URL = "https://95.142.40.58"

  signIn(authData: IAuthData) {
    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL  + '/sign-in',
      method: "POST",
      data: <object>authData
    }

    return this.http.post<IResponse>( this.ORIGIN_API_URL + '/sign-in', <object>authData )
  }

}
