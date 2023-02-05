import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {IField} from "./interfaces/fieldItem.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ApiImagesService} from "./api-images.service";

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

export interface IProxyRequest {
  api_url: string
  method: string
  data: object
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

  ORIGIN_API_URL = "https://95.142.40.58"
  API_URL = "/api"

  getObjects(object: string ) {

    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL  + `/${object}`,
      method: "GET",
      data: null
    }

    return this.http.get<IRequest>( this.ORIGIN_API_URL + `/${object}` )
  }

  getWithParams(object: string, params: HttpParams) {

    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL + `/${object}?` + params.toString(),
      method: "GET",
      data: null
    }

    return this.http.get<IRequest>( this.ORIGIN_API_URL + `/${object}?` + params.toString() )
  }

  putObject( object: string, request: Object, id: number ) {
    delete request[ "id" ]

    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL + `/${object}/${id}`,
      method: "PUT",
      data: <object>request
    }

    return this.http.put<IResponse>( this.ORIGIN_API_URL + `/${object}/${id}`, <object>request ).toPromise()
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
    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL + `/${object}/${id}`,
      method: "DELETE",
      data: null
    }

    return this.http.post<IResponse>( this.API_URL, httpRequest )
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
    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL + `/${object}/schema`,
      method: "GET",
      data: null
    }

    return this.http.post<IFieldsResponse>( this.API_URL, httpRequest )
  }

  async getFields( object: string ) {
    let fields: IField[]
    let response = await this.getSchema( object ).toPromise()

    fields = response.data as IField[]

    for ( let i = 0; i < fields.length; i++ ) {

      let field = fields[i]
      let take_from = field.take_from.split('/')
      let fieldObject = take_from[0]
      take_from.splice(0, 1)
      let objectTypes = take_from

      if ( field.display_type == 'combobox' ) {

        let objects = await this.getObjects( fieldObject ).toPromise()

        objects.data.forEach( item => {
          if ( typeof( fields[i].list_items ) == "undefined") {
            fields[i].list_items = []
          }

          let list_item = ""

          objectTypes.forEach( type => {
            if ( item[ type ] != "%!s(\u003cnil\u003e)" )
            list_item += item[ type ] + " "
          } )
          list_item.slice(0, -1)

          fields[i].list_items.push( { type: list_item, id: item.id } )
        } )
      }
    }

    return fields

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
    let httpRequest: IProxyRequest = {
      api_url: this.ORIGIN_API_URL + `/${object}`,
      method: "POST",
      data: <object>request
    }

    return this.http.post<IResponse>( this.API_URL, httpRequest ).toPromise()
  }

  handleResponse( response: IResponse, shouldAlert: boolean ): boolean {
    if ( response.status_code != 200 ) {
      alert( "Что то пошло не так" )
      return false
    }

    if ( shouldAlert ) alert( "Успешно" )
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
