import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IProxyRequest} from "./object.service";

export interface IImportResponse {
  status_code: number
  data: any
}

@Injectable({
  providedIn: 'root'
})

export class ImportService {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {}

  ORIGIN_API_URL = "https://95.142.40.58"
  API_URL = "/api/index.php"

  importFile(file: File, objects: string[]) {
    let uploadForm: FormGroup
    let formData: FormData = new FormData()
    uploadForm = this.formBuilder.group(({
      tables: [''],
      objects: [''],
      api_url: this.ORIGIN_API_URL + "/exel",
      method: "POST",
      formData: true
    }))

    uploadForm.get( 'tables' ).setValue( file )
    uploadForm.get( 'objects' ).setValue( objects )
    uploadForm.get( 'api_url' ).setValue( this.ORIGIN_API_URL + "/exel" )
    uploadForm.get( 'method' ).setValue( "POST" )
    uploadForm.get( 'formData' ).setValue( true )

    formData.append('tables', uploadForm.get( 'tables' ).value)
    formData.append( 'objects', uploadForm.get( 'objects' ).value )
    formData.append( 'api_url', uploadForm.get( 'api_url' ).value )
    formData.append( 'method', uploadForm.get( 'method' ).value )
    formData.append( 'formData', uploadForm.get( 'formData' ).value )

    return this.http.post<IImportResponse>( this.API_URL, formData )
  }
}
