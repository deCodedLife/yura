import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {ObjectService} from "../../../services/object.service";
import {ActivatedRoute, NavigationEnd, Router, Scroll} from "@angular/router";
import {AppCookieService} from "../../../services/app-cookie.service";
import {ImportService} from "../../../services/import.service";



@Component({
  selector: 'app-admin-object',
  templateUrl: './admin-object.component.html',
  styleUrls: ['./admin-object.component.less']
})



export class AdminObjectComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    public headerService: HeaderService,
    private appCookies: AppCookieService,
    private router: Router,
    private route: ActivatedRoute,
    private importService: ImportService
  ) {}

  fields: IField[] = []
  objects: object[] = []
  objectName: string

  importFromExel(inputData: FileList) {
    this.importService.importFile( inputData[0], [this.objectName] ).subscribe( ( response ) => {
      if ( response.status_code != 200 ) {
        alert( response.data )
        return
      }
      window.location.reload()
    } )
  }

  editObject(id: number) {
    this.router.navigateByUrl( "admin/" + this.objectName + "/" + id )
  }

  getObjectDetails(objectName: string) {
    this.objectName = objectName

    this.objectService.getSchema( objectName ).subscribe( response => {

      this.fields = Object.create(response.data).schema.filter( item => item.display )
      this.headerService.title.next( Object.create(response.data).table )

    } )
    this.objectService.getObjects( objectName ).subscribe(response => this.objects = response.data ?? [] )
  }

  ngOnInit() {

    this.router.events.subscribe(( currentData ) => {
      if ( !(currentData instanceof Scroll ) ) return
      this.objects = []
      this.getObjectDetails( (<Scroll>currentData).routerEvent.url.split( '/' )[2] )
    });

    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

  }
}
