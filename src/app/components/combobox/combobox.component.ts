import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IListItem} from "../../services/interfaces/fieldItem.interface";

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.less']
})

export class ComboboxComponent implements OnChanges {

  @Input() placeholder: string = ""
  @Input() objectsList: IListItem[] = []
  filteredList: IListItem[] = []
  @Input() value: string = ""
  @Output() itemSelected = new EventEmitter<number>()
  @Output() indexSelected = new EventEmitter<number>()
  @Input() required: boolean = false
  @Input() preSet: number


  ngOnChanges(changes:SimpleChanges) {
    if ( typeof(this.objectsList) == "undefined" ) return

    this.filteredList = this.filteredList.length == 0 ? this.objectsList : this.filteredList

    if ( typeof (this.preSet ) != "undefined" ) {
      this.value = this.objectsList.filter( item => item.id == this.preSet )[0].type
      this.preSet = undefined
      return;
    }

    if ( this.required ) this.update( this.objectsList[0].type, this.objectsList[0].id )
  }

  filter() {
    if ( this.value == "" ) {
      this.filteredList = this.objectsList
      return
    }

    this.filteredList = this.objectsList.filter( item => item.type.toLowerCase().includes( this.value.toLowerCase() ) )
  }

  update(e: string, index: number) {
    let textValue = this.filteredList[ index ]
    let indexValue = this.objectsList.indexOf( textValue )

    this.value = e
    this.itemSelected.emit( this.objectsList.at( indexValue ).id )
    this.indexSelected.emit( index )
  }
}
