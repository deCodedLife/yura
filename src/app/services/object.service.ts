import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IField} from "./fieldItem.interface";

export interface IRequest {
  status_code: number
  data: any[]
}

export interface IResponse {
  status_code: number
  data: any
}

@Injectable({
  providedIn: 'root'
})

export class ObjectService {
  constructor(private http: HttpClient) {}

  API_URL = "http://localhost:8080"

  getObjects(object: string ) {
    return this.http.get<IRequest>( this.API_URL + '/' + object )
  }

  getObject(object: string, id: number) {
    return this.http.get<IRequest>( this.API_URL + '/' + object, {
      params: new HttpParams({fromObject: {id: id}})
    } )
  }

  updateObject(object: string, request: object, id: number) {
    delete request[ "id" ]
    return this.http.put<IResponse>( this.API_URL + '/' + object + '/' + id, request )
  }

  createObject(object: string, request: object) {
    return this.http.post<IResponse>( this.API_URL + "/" + object, request )
  }
}
