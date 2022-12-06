import {Component, Input} from '@angular/core';
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectService} from "../../../services/object.service";
import {AppCookieService} from "../../../services/app-cookie.service";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-admin-add-object',
  templateUrl: './admin-add-object.component.html',
  styleUrls: ['./admin-add-object.component.less']
})
export class AdminAddObjectComponent {
  constructor(
    private route: ActivatedRoute,
    public objectsService: ObjectService,
    private appCookies: AppCookieService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  @Input() object: object = {}
  @Input() objectName: string = ""
  @Input() fields: IField[] = []

  ngOnInit() {
    if ( this.appCookies.isAuthorized() == false ) {
      this.router.navigateByUrl( "admin/sign-in" )
      return
    }

    this.headerService.title.next( "Добавить объект" )

    this.objectName = this.route.snapshot.paramMap.get('object');
    this.objectsService.getSchema( this.objectName ).subscribe(response => {
      this.fields = response.data

      for ( let i = 0; i < this.fields.length; i++ ) {

        let field = this.fields[i]
        let take_from = field.take_from.split('/')
        let object = take_from[0]
        let type = take_from[1]

        if ( field.display_type == 'combobox' ) {

          this.objectsService.getObjects( object ).subscribe(response => {
            response.data.forEach( item => {
              if ( typeof( this.fields[i].list_items ) == "undefined") {
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
