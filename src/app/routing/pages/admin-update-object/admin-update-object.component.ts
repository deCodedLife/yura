import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "../../../services/object.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {AppCookieService} from "../../../services/app-cookie.service";
import {HeaderService} from "../../../services/header.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-admin-update-object',
  templateUrl: './admin-update-object.component.html',
  styleUrls: ['./admin-update-object.component.less']
})

export class AdminUpdateObjectComponent {
  constructor(
    private route: ActivatedRoute,
    public objectsService: ObjectService,
    private appCookies: AppCookieService,
    private router: Router,
    private headerServeice: HeaderService
  ) {}

  @Input() objectName: string = ""
  @Input() objectID: number = 0
  @Input() fields: IField[] = []
  @Input() object: any = {}

  deleteObject() {
    this.objectsService.deleteObject( this.objectName, this.objectID ).subscribe( resposne => {
      if ( resposne.status_code != 200 ) {
        alert( "Что то пошло не так. " + resposne.data )
        return
      }

      alert( "Успешно" )
      this.router.navigateByUrl( `admin/${this.objectName}` )
    } )
  }

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.headerServeice.title.next( "Обновить объект" )

    this.objectName = this.route.snapshot.paramMap.get('object');
    this.objectID = parseInt( this.route.snapshot.paramMap.get('id') )

    this.objectsService.getWithParams( this.objectName, new HttpParams({
      fromObject: {
        id: this.objectID
      }
    }) ).subscribe(response => this.object = response.data[0])

    this.objectsService.getFields( this.objectName ).then( response => this.fields = response )
  }
}
