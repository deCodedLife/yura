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
  @Input() required: boolean = false

  ngOnChanges() {
    if ( typeof(this.objectsList) != "undefined" ) {
      if ( /^\d+$/.test( this.value ) ) this.value = this.objectsList[ parseInt( this.value ) ]
      else if ( this.value == "" ) {
        this.value = this.objectsList[0]
        this.changed.emit( this.value )
      }
    }
  }

  update(e: string) {
    this.value = e
    this.changed.emit( this.value )
  }
}
