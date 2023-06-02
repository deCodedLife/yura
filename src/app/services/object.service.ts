import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {IField} from "./interfaces/fieldItem.interface";
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
    private imageService: ApiImagesService
  ) {}
  API_URL = "/api"
  getObjects(object: string ) {
    return this.http.get<IRequest>( this.API_URL + `/${object}` )
  }

  getWithParams(object: string, params: HttpParams) {
    return this.http.get<IRequest>( this.API_URL + `/${object}?` + params.toString() )
  }

  putObject( object: string, request: Object, id: number ) {
    delete request[ "id" ]
    return this.http.put<IResponse>( this.API_URL + `/${object}/${id}`, <object>request ).toPromise()
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
      value: 'https://klimsystems.ru/api/assets/' + imageResponse.data[0],
      enumerable: true,
      configurable: true
    })

    this.putObject( object, request, id ).then( resp => this.handleResponse(resp, shouldAlert) )
  }

  deleteObject( object: string, id: number ) {
    return this.http.delete<IResponse>( this.API_URL + `/${object}/${id}` )
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
    return this.http.get<IFieldsResponse>( this.API_URL + `/${object}/schema` )
  }

  async getFields( object: string ) {
    let fields: IField[]
    let response = await this.getSchema( object ).toPromise()

    fields = Object.create(response.data).schema as IField[]

    for ( let i = 0; i < fields.length; i++ ) {

      let field = fields[i]
      let take_from = field.take_from.split('/')
      let fieldObject = take_from[0]
      take_from.splice(0, 1)
      let objectTypes = take_from

      if ( field.display_type == 'combobox' ) {

        let objects = await this.getObjects( fieldObject ).toPromise()

        if ( objects.data != null ) {


          objects.data.forEach( item => {

            if ( typeof( fields[i].list_items ) == "undefined")
              fields[i].list_items = []

            let list_item = ""

            if ( objectTypes != null ) {
              objectTypes.forEach( type => {
                if ( item[ type ] != "%!s(\u003cnil\u003e)" )
                  list_item += item[ type ] + " "
              } )
              list_item.slice(0, -1)
            }

            fields[i].list_items.push( { type: list_item, id: item.id } )
          } )

        }



      }
    }

    return fields

  }

  postImage(image: File) {

    let formData: FormData = new FormData()
    formData.append( 'image', image)

    return this.imageService.uploadImage( formData ).toPromise()
  }

  postObject(object: string, request: Object ) {
    return this.http.post<IResponse>( this.API_URL + `/${object}`, <object>request ).toPromise()
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
      value: 'https://klimsystems.ru/api/assets/' + response.data[0],
      enumerable: true,
      configurable: true
    })

    this.postObject( object, request ).then(resp => this.handleResponse(resp, shouldAlert) )
  }
}
