import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IServiceGroup} from "./services-groups.interface";

export interface IServiceGroupResponse {
  status_code: number
  data: IServiceGroup[]
}

@Injectable({
  providedIn: 'root'
})

export class ServicesGroupsService {
  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:8080"

  getServicesGroups() {
    return this.http.get<IServiceGroupResponse>( this.API_URL + "/services_groups" )
  }
}
