import { Injectable } from '@angular/core';
import {HttpClient, HttpSentEvent} from "@angular/common/http";

export interface IImageResponse {
  status_code: number
  data: string | string[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiImagesService {

  API_URL = "https://95.142.40.58"

  constructor(private http: HttpClient) {}

  uploadImage(request: FormData) {
    return this.http.post<IImageResponse>( this.API_URL + "/images", request )
  }

}
