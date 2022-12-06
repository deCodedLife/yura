import { Component } from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {ObjectService} from "../../../services/object.service";
import {Router} from "@angular/router";
import {AppCookieService} from "../../../services/app-cookie.service";

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.less']
})

export class AdminServicesComponent {
  constructor(
    private objectService: ObjectService,
    public headerService: HeaderService,
    private appCookies: AppCookieService,
    private router: Router
  ) {}

  fields: IField[] = []
  services: object[] = []
  searchTerm: string

  editObject(id: number) {
    this.router.navigateByUrl( "admin/services/" + id )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.objectService.getSchema( 'services' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'services' ).subscribe(response => this.services = response.data )
    this.headerService.title.next( "Услуги" )
  }
}
