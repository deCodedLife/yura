import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.less']
})

export class CheckListComponent {
  @Input() caption
  @Input() items: any[]

  terms: any[] = []
  @Output() changed = new EventEmitter<any[]>()

  applyTerm(item: any, event: Event) {
    if ( (<HTMLInputElement>event.target).checked ) this.terms.push(item)
    else this.terms.splice( this.terms.indexOf(item), 1 )
    this.changed.emit( this.terms )
  }
}
