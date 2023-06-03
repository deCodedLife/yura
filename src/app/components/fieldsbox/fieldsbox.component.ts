import {Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import {IField} from "../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-fieldsbox',
  templateUrl: './fieldsbox.component.html',
  styleUrls: ['./fieldsbox.component.less']
})
export class FieldsboxComponent implements OnChanges {

  @Input() fields: IField[] = []
  @Input() object: object = {}
  @Output() fieldsUpdated = new EventEmitter<IField[]>()

  simpleItems: IField[] = []
  heavyItems: IField[] = []

  updateSimple( value: any, index: number ) {
    this.simpleItems[ index ].value = value
    this.update()
  }

  update() {
    this.fields = []
    this.simpleItems.forEach( item => this.fields.push( item ) )
    this.heavyItems.forEach( item => this.fields.push( item ) )
    this.fieldsUpdated.emit( this.fields )
  }

  updateHeavy(value: any, index: number) {
    this.heavyItems[ index ].value = value
    this.update()
  }

  toInt( value: any ) {
    return parseInt( value )
  }

  ngOnChanges() {
    if ( this.fields.length == 0 ) return
    this.fields = this.fields.filter( (item) => item.display_type != "" )
    this.heavyItems = this.fields.filter( item => item.display_type == "image" || item.display_type == "textarea" )
    this.simpleItems = this.fields.filter( item => item.display_type != "image" && item.display_type != "textarea" )
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
