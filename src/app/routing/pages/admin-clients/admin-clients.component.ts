import { Component } from '@angular/core';
import {ObjectService} from "../../../services/object.service";
import {HeaderService} from "../../../services/header.service";
import {AppCookieService} from "../../../services/app-cookie.service";
import {Router} from "@angular/router";
import {IField} from "../../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.less']
})
export class AdminClientsComponent {
  constructor(
    private objectService: ObjectService,
    public headerService: HeaderService,
    private appCookies: AppCookieService,
    private router: Router
  ) {}

  fields: IField[] = []
  clients: object[] = []
  searchTerm: string

  editObject(id: number) {
    this.router.navigateByUrl( "admin/clients/" + id )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.objectService.getSchema( 'clients' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'clients' ).subscribe(response => this.clients = response.data )
    this.headerService.title.next( "Клиенты" )
  }
}
