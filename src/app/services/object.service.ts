import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {IField} from "./interfaces/fieldItem.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiImagesService} from "./api-images.service";
import {firstValueFrom} from "rxjs";

export interface IFieldsResponse {
  status_code: number
  data: IField[]
}

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
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private imageService: ApiImagesService
  ) {}

  API_URL = "https://coded.life"

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
    return this.http.post<IResponse>( this.API_URL + '/' + object + '/' + id, JSON.stringify(request) )
  }
  generateRequest(fields: IField[]) {
    let request = Object.create(null)
    let filtered = fields.filter( field => field.display_type != null && field.value != null )
    filtered.forEach( field => Object.defineProperty(request, field.article,
      {
        value: field.value,
        enumerable: true,
        configurable: true
      })
    )
    return request
  }

  getSchema(object: string) {
    return this.http.get<IFieldsResponse>( this.API_URL + '/' + object + '/schema' )
  }

  uploadImage(image: File) {

    let uploadForm: FormGroup
    let formData: FormData = new FormData()
    uploadForm = this.formBuilder.group(({
      image: ['']
    }))

    uploadForm.get('image').setValue( image )
    formData.append('image', uploadForm.get('image').value)

    return this.imageService.uploadImage( formData )
  }

  uploadObject(object: string, request: Object ) {
    return this.http.post<IResponse>( this.API_URL + "/" + object, JSON.stringify(request) )
  }

  async createObject(object: string, fields: IField[]) {

    let request = this.generateRequest(fields)

    if (typeof (request['image']) == 'undefined') {
      return this.uploadObject(object, request)
    }

    let response = await firstValueFrom(this.uploadImage(request['image']))

    if ( response.status_code != 200 ) {
      alert( "Невозможно загрузить изображение. Причина: " + response.data )
      return null
    }

    delete request[ "image" ]
    Object.defineProperty(request, "image", {
      value: '/assets/' + response.data[0],
      enumerable: true,
      configurable: true
    })

    return this.uploadObject( object, request )

  }
}
