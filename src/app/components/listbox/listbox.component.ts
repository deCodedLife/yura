import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IField} from "../../services/interfaces/fieldItem.interface";
import {Subject} from "rxjs";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.less']
})

export class ListboxComponent {

  @Input() listItems: any[] = []
  @Input() fields: IField[] = []
  @Input() filtered: any[] = []
  @Input() searchTerm: Subject<string>
  @Input() activeIcon = "edit"
  @Output() onEdit = new EventEmitter<number>()

  ngOnInit() {
    this.searchTerm.subscribe( term => {
      if ( term.trim().length === 0 ) {
        this.filtered = this.listItems
        return
      }

      this.filtered = this.listItems.filter( item =>
        this.fields.some( field => item[ field.article ].toString().toLowerCase().includes( term.toLowerCase() ) )
      )
    } )
  }

}
