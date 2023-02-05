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
    this.objectsService.getFields( this.objectName ).then( response => {
      this.fields = response
    } )
  }
}
