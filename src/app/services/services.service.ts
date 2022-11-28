import { Injectable } from '@angular/core';
import {IService} from "./service.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

export interface IServiceResponse {
  status_code: number
  data: IService[]
}

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8080"

  getServiceByID(serviceID: number) {
    return this.http.get<IServiceResponse>( this.API_URL + "/services", {
      params: new HttpParams({
          fromObject: {
            "id": serviceID
          }
      })
    } )
  }

  getServiceByGroup(group_id: number) {
    return this.http.get<IServiceResponse>( this.API_URL + "/services", {
      params: new HttpParams({
        fromObject: {
          "group_id": group_id
        }
      })
    } )
  }

  getServices() {
    return this.http.get<IServiceResponse>( this.API_URL + "/services" )
  }
}
