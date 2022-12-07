import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpParamsOptions} from "@angular/common/http";
import {IField} from "./interfaces/fieldItem.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiImagesService} from "./api-images.service";
import {firstValueFrom, Observable} from "rxjs";
import * as http from "http";

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

  API_URL = "/api"

  getObjects(object: string ) {
    return this.http.get<IRequest>( this.API_URL + '/' + object )
  }

  getWithParams(object: string, params: HttpParams) {
    return this.http.get<IRequest>( this.API_URL + '/' + object, { params: params })
  }

  getObject(object: string, id: number) {
    return this.http.get<IRequest>( this.API_URL + '/' + object, {
      params: new HttpParams({fromObject: {id: id}})
    } )
  }

  putObject( object: string, request: Object, id: number ) {
    delete request[ "id" ]
    return this.http.put<IResponse>( this.API_URL + '/' + object + '/' + id, JSON.stringify(request) ).toPromise()
  }

  async updateObject(object: string, fields: IField[], id: number, shouldAlert: boolean) {

    let request = this.generateRequest(fields)

    if (typeof (request['image']) == 'undefined') {
      await this.putObject(object, request, id).then( resp => this.handleResponse(resp, shouldAlert) )
      return
    }

    let imageResponse = await this.postImage(request['image'])
    if ( this.handleResponse(imageResponse, false) == false ) return

    delete request[ "image" ]
    Object.defineProperty(request, "image", {
      value: '/assets/' + imageResponse.data[0],
      enumerable: true,
      configurable: true
    })

    this.putObject( object, request, id ).then( resp => this.handleResponse(resp, shouldAlert) )
  }

  deleteObject( object: string, id: number ) {
    return this.http.delete<IResponse>( this.API_URL + '/' + object + '/' + id, { headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }) } )
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

  postImage(image: File) {

    let uploadForm: FormGroup
    let formData: FormData = new FormData()
    uploadForm = this.formBuilder.group(({
      image: ['']
    }))

    uploadForm.get('image').setValue( image )
    formData.append('image', uploadForm.get('image').value)

    return this.imageService.uploadImage( formData ).toPromise()
  }

  postObject(object: string, request: Object ) {
    return this.http.post<IResponse>( this.API_URL + "/" + object, JSON.stringify(request) ).toPromise()
  }

  handleResponse( response: IResponse, last: boolean ): boolean {
    if ( response.status_code != 200 ) {
      alert( "Что то пошло не так" )
      return false
    }

    if ( last ) alert( "Успешно" )
    return true
  }

  async createObject(object: string, fields: IField[], shouldAlert: boolean) {

    let request = this.generateRequest(fields)

    if (typeof (request['image']) == 'undefined') {
      await this.postObject( object, request ).then( resp => this.handleResponse(resp, shouldAlert) )
      return
    }

    let response = await this.postImage(request['image'])
    if ( this.handleResponse(response, false) == false ) return

    delete request[ "image" ]
    Object.defineProperty(request, "image", {
      value: '/assets/' + response.data[0],
      enumerable: true,
      configurable: true
    })

    this.postObject( object, request ).then(resp => this.handleResponse(resp, shouldAlert) )
  }
}
