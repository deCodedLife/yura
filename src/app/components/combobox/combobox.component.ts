import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.less']
})

export class ComboboxComponent implements OnChanges {

  @Input() placeholder: string = ""
  @Input() objectsList: string[] = []
  @Input() value: string = ""
  @Output() changed = new EventEmitter<string>()
  @Output() itemSelected = new EventEmitter<number>()
  @Input() required: boolean = false

  ngOnChanges() {
    if ( typeof(this.objectsList) != "undefined" ) {
      if ( /^\d+$/.test( this.value ) ) this.value = this.objectsList[ parseInt( this.value ) ]
      else if ( this.value == "" ) {
        this.value = this.objectsList[0]
        this.update( this.value, 1 )
      }
    }
  }

  update(e: string, index: number) {
    this.value = e
    this.changed.emit( this.value )
    this.itemSelected.emit( index++ )
  }
}
