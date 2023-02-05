import {Component, OnInit} from '@angular/core';
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {HeaderService} from "../../../services/header.service";
import {ObjectService} from "../../../services/object.service";
import {Router} from "@angular/router";
import {AppCookieService} from "../../../services/app-cookie.service";
import {ImportService} from "../../../services/import.service";

@Component({
  selector: 'app-admin-conditioners',
  templateUrl: './admin-conditioners.component.html',
  styleUrls: ['./admin-conditioners.component.less']
})

export class AdminConditionersComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    public headerService: HeaderService,
    private appCookies: AppCookieService,
    private router: Router,
    private importService: ImportService
  ) {}

  fields: IField[] = []
  conditioners: object[] = []
  searchTerm: string

  editObject(id: number) {
    this.router.navigateByUrl( "admin/conditioners/" + id )
  }

  importFromExel(inputData: FileList) {
    this.importService.importFile( inputData[0], ["conditioners"] ).subscribe( (response) => {
      if ( response.status_code != 200 ) {
        alert( response.data )
        return
      }

      window.location.reload()
    } )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.objectService.getSchema( 'conditioners' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'conditioners' ).subscribe(response => this.conditioners = response.data )
    this.headerService.title.next( "Кондиционеры" )
  }
}
