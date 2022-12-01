import {Component, Input} from '@angular/core';
import {FieldsService} from "../../../services/fields.service";
import {ActivatedRoute} from "@angular/router";
import {ObjectService} from "../../../services/object.service";
import {IField} from "../../../services/fieldItem.interface";

@Component({
  selector: 'app-admin-update-object',
  templateUrl: './admin-update-object.component.html',
  styleUrls: ['./admin-update-object.component.less']
})

export class AdminUpdateObjectComponent {
  constructor(
    private fieldsService: FieldsService,
    private route: ActivatedRoute,
    private objectsService: ObjectService
  ) {}

  @Input() objectName: string = ""
  @Input() objectID: number = 0
  @Input() fields: IField[] = []
  @Input() object: any = {}

  update(value: any, index: number) {
    this.object[ this.fields[ index ].article ] = value
  }

  updateObject() {
    this.objectsService.updateObject(this.objectName, this.object, this.objectID).subscribe(response => {
      console.log( response.data )

      if ( /^\d+$/.test( (<string>response.data) ) ) {
        alert( "Успешно" )
        return
      }

      alert( "Что то пошло не так" )
    } )
  }

  ngOnInit() {
    this.objectName = this.route.snapshot.paramMap.get('object');
    this.objectID = parseInt( this.route.snapshot.paramMap.get('id') )

    this.objectsService.getObject( this.objectName, this.objectID ).subscribe(response => {
      this.object = response.data[0]
    } )

    this.fieldsService.getSchema( this.objectName ).subscribe(itemResponse => {
      this.fields = itemResponse.data

      for ( let i = 0; i < this.fields.length; i++ ) {

        let field = this.fields[i]
        let take_from = field.take_from.split('/')
        let requiredObject = take_from[0]
        let type = take_from[1]

        if ( field.display_type == 'combobox' ) {
          console.log( field.article )
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
