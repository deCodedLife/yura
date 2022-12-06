import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "../../../services/object.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {AppCookieService} from "../../../services/app-cookie.service";
import {HeaderService} from "../../../services/header.service";

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
  API_URL = "https://coded.life"

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.headerServeice.title.next( "Обновить объект" )

    this.objectName = this.route.snapshot.paramMap.get('object');
    this.objectID = parseInt( this.route.snapshot.paramMap.get('id') )

    this.objectsService.getObject( this.objectName, this.objectID ).subscribe(response => {
      this.object = response.data[0]
    } )

    this.objectsService.getSchema( this.objectName ).subscribe(itemResponse => {
      this.fields = itemResponse.data

      for ( let i = 0; i < this.fields.length; i++ ) {

        let field = this.fields[i]
        let take_from = field.take_from.split('/')
        let requiredObject = take_from[0]
        let type = take_from[1]

        if ( field.display_type == 'combobox' ) {
          this.objectsService.getObjects( requiredObject ).subscribe(subItemResponse => {
            subItemResponse.data.forEach( item => {
              if ( typeof(this.fields[i].list_items) == "undefined") {
                this.fields[i].list_items = []
              }
              this.fields[i].list_items.push( item[ type ] )
            } )
          } )
        }
      }
    } )
  }
}
