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

  API_URL = "/api"

  signIn(authData: IAuthData) {
    return this.http.post<IResponse>( this.API_URL + '/sign-in', <object>authData )
  }

}
