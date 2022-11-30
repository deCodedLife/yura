import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.less']
})

export class InputboxComponent implements OnInit {
  @Input() icon: string = ""
  @Input() digits: boolean = false
  @Input() placeholder: string = ""
  @Output() edited = new EventEmitter<string>()

  value: string

  update(v: string) {
    this.edited.emit( this.value )
  }

  ngOnInit() {
    console.log( this.placeholder )
  }
}
