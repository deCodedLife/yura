import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface IImportResponse {
  status_code: number
  data: any
}

@Injectable({
  providedIn: 'root'
})

export class ImportService {
  constructor(
    private http: HttpClient
  ) {}

  API_URL = "/api"

  importFile(file: File, objects: string[]) {
    let formData: FormData = new FormData()

    formData.append('tables', file)
    objects.forEach( object => formData.append( 'objects', object ) )

    return this.http.post<IImportResponse>( this.API_URL + "/exel", formData )
  }
}
