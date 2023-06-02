import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IField} from "../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-fieldsbox',
  templateUrl: './fieldsbox.component.html',
  styleUrls: ['./fieldsbox.component.less']
})
export class FieldsboxComponent {

  @Input() fields: IField[] = []
  @Input() object: object = {}
  @Output() fieldsUpdated = new EventEmitter<IField[]>()

  update(value: any, index: number) {
    this.fields[ index ].value = value
    this.fieldsUpdated.emit( this.fields )
  }

  toInt( value: any ) {
    return parseInt( value )
  }

  getIndex(item: IField): number {
    let propertyID = parseInt( this.object[ item.article ] )
    let objectID: number = 0

    item.list_items.forEach( (field, index) => {
      if ( field.id == propertyID ) objectID = index
    } )

    return objectID
  }

  isNull(data: any) {
    return typeof (data) == "undefined"
  }
}
