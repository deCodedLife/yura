import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IField} from "../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-fieldsbox',
  templateUrl: './fieldsbox.component.html',
  styleUrls: ['./fieldsbox.component.less']
})
export class FieldsboxComponent {

  API_URL = "https://coded.life"
  @Input() fields: IField[] = []
  @Input() object: object = {}
  @Output() fieldsUpdated = new EventEmitter<IField[]>()

  update(value: any, index: number) {
    this.fields[ index ].value = value
    this.fieldsUpdated.emit( this.fields )
  }

  getIndex(property: any) {
    return parseInt( property ) - 1
  }

  isNull(data: any) {
    return typeof (data) == "undefined"
  }
}
