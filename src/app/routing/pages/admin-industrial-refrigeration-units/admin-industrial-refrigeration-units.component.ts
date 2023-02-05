import { Component } from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {ObjectService} from "../../../services/object.service";
import {Router} from "@angular/router";
import {AppCookieService} from "../../../services/app-cookie.service";

@Component({
  selector: 'app-admin-industrial-refrigeration-units',
  templateUrl: './admin-industrial-refrigeration-units.component.html',
  styleUrls: ['./admin-industrial-refrigeration-units.component.less']
})
export class AdminIndustrialRefrigerationUnitsComponent {

  constructor(
    private objectService: ObjectService,
    public headerService: HeaderService,
    private appCookies: AppCookieService,
    private router: Router
  ) {}

  fields: IField[] = []
  industrial_refrigeration_units: object[] = []
  searchTerm: string

  editObject(id: number) {
    this.router.navigateByUrl( "admin/industrial_refrigeration_units/" + id )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.objectService.getSchema( 'industrial_refrigeration_units' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'industrial_refrigeration_units' ).subscribe(response => this.industrial_refrigeration_units = response.data )
    this.headerService.title.next( "Промхолод" )
  }
}
