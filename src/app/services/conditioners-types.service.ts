import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IConditionerType} from "./conditioner-type.interface";

export interface IConditionerTypeRequest {
  status_code: number
  data: IConditionerType[]
}

@Injectable({
  providedIn: 'root'
})
export class ConditionersTypesService {
  API_URL = "http://localhost:8080"
  constructor(private http: HttpClient) {}

  getConditionersTypes() {
    return this.http.get<IConditionerTypeRequest>(this.API_URL + "/conditioners_types")
  }
}
