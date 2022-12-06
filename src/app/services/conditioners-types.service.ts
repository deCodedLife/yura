import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IConditionerType} from "./interfaces/conditioner-type.interface";

export interface IConditionerTypeRequest {
  status_code: number
  data: IConditionerType[]
}

@Injectable({
  providedIn: 'root'
})
export class ConditionersTypesService {
  API_URL = "https://coded.life"
  constructor(private http: HttpClient) {}

  getConditionersTypes() {
    return this.http.get<IConditionerTypeRequest>(this.API_URL + "/conditioners_types")
  }
}
