import {Component, OnInit} from '@angular/core';
import {AppCookieService} from "../../../services/app-cookie.service";
import {Router} from "@angular/router";
import {ObjectService} from "../../../services/object.service";
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})

export class DashboardComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    public headerService: HeaderService,
    private appCookies: AppCookieService,
    private router: Router
  ) {}

  fields: IField[] = []
  sales: object[] = []
  searchTerm: string

  openReceipt(id: number) {
    this.router.navigateByUrl( `admin/receipt/${id}` )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.objectService.getSchema( 'clients' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'sales' ).subscribe(response => {

      response.data.forEach( saleData => {

        if ( saleData.active == false ) return

        this.objectService.getWithParams( 'clients', new HttpParams({
          fromObject: {
            id: saleData[ 'client_id' ]
          }
        }) ).subscribe( response => {

          let data = response.data[0]
          data[ 'id' ] = saleData[ 'id' ]
          this.sales.push( data )

        } )

      } )

    } )
    this.headerService.title.next( "Заказы" )
  }
}
