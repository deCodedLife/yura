import { Component } from '@angular/core';
import {ObjectService} from "../../../services/object.service";
import {HeaderService} from "../../../services/header.service";
import {AppCookieService} from "../../../services/app-cookie.service";
import {Router} from "@angular/router";
import {IField} from "../../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-admin-services-groups',
  templateUrl: './admin-services-groups.component.html',
  styleUrls: ['./admin-services-groups.component.less']
})

export class AdminServicesGroupsComponent {
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
    this.router.navigateByUrl( "admin/services_groups/" + id )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.objectService.getSchema( 'services_groups' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'services_groups' ).subscribe(response => this.services = response.data )
    this.headerService.title.next( "Группы услуг" )
  }
}
