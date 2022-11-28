import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IManufacturer} from "./manufacturer.interface";

export interface IManufacturerRequest {
  status_code: number
  data: IManufacturer[]
}

@Injectable({
  providedIn: 'root'
})

export class ManufacturersService {
  API_URL = "http://localhost:8080"
  constructor(private http: HttpClient) {}

  getManufacturers() {
    return this.http.get<IManufacturerRequest>(this.API_URL + "/manufacturers")
  }
}
