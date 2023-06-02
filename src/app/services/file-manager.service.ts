import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IResponse} from "./object.service";
import {IImageResponse} from "./api-images.service";

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(
    private http: HttpClient,
  ) { }

  API_URL = "/api"

  uploadFile( images: FileList, fileNames: string[] ) {

    let formData: FormData = new FormData()

    for (let i = 0; i < images.length; i++) {
      formData.append( 'file', images[i] )
      formData.append( 'path', fileNames[i] )
    }

    return this.http.post<IImageResponse>( this.API_URL + "/files", formData )

  }

  deleteFile( path: string ) {

    let request = Object.create(null)
    request[ "path" ] = 'assets/uploads/' + path

    return this.http.post<IResponse>( this.API_URL + "/deleteFile", request )

  }

  createDirectory( path: string ) {

    let request = Object.create(null)
    request[ "path" ] = 'assets/uploads/' + path

    return this.http.post<IResponse>(this.API_URL + "/createFolder", request)

  }

  ls ( path: string ) {
    let request = Object.create(null)
    request[ "path" ] = path

    return this.http.post<IResponse>( this.API_URL + "/fm/ls", request )
  }

}
