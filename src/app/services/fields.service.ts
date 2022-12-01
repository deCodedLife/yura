import { Injectable } from '@angular/core';
import {IField} from "./fieldItem.interface";
import {HttpClient} from "@angular/common/http";

export interface IFieldsResponse {
  status_code: number
  data: IField[]
}

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  constructor(
    private http: HttpClient
  ) { }

  API_URL = "https://coded.life"

  getSchema(object: string) {
    return this.http.get<IFieldsResponse>( this.API_URL + '/' + object + '/schema' )
  }
}
