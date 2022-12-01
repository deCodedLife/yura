import {Component, Input} from '@angular/core';
import {FieldsService} from "../../../services/fields.service";
import {IField} from "../../../services/fieldItem.interface";
import {ActivatedRoute} from "@angular/router";
import {ObjectService} from "../../../services/object.service";

@Component({
  selector: 'app-admin-add-object',
  templateUrl: './admin-add-object.component.html',
  styleUrls: ['./admin-add-object.component.less']
})
export class AdminAddObjectComponent {
  constructor(
    private fieldsService: FieldsService,
    private route: ActivatedRoute,
    private objectsService: ObjectService
  ) {}

  @Input() object: object = {}
  @Input() objectObject: string = ""
  @Input() fields: IField[] = []

  update(value: any, index: number) {
    this.fields[ index ].value = value
  }

  createObject() {
    let request = Object.create(null)
    let filtered = this.fields.filter( field => field.display_type != null && field.value != null )
    filtered.forEach( field => Object.defineProperty(request, field.article,
      { "value": field.value,
        enumerable: true,
        configurable: true
      })
    )

    this.objectsService.createObject(this.objectObject, <object>request).subscribe(response => {
      console.log( response.data )

      if ( /^\d+$/.test( (<string>response.data) ) ) {
        alert( "Успешно" )
        return
      }

      alert( "Что то пошло не так" )
    } )
  }

  ngOnInit() {
    this.objectObject = this.route.snapshot.paramMap.get('object');
    this.fieldsService.getSchema( this.objectObject ).subscribe(response => {
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
