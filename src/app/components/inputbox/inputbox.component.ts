import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.less']
})

export class InputboxComponent {
  @Input() icon: string = ""
  @Input() digits: boolean = false
  @Input() placeholder: string = ""
  @Input() isPassword: boolean = false
  @Input() value: string
  @Output() edited = new EventEmitter<string>()

  update(v: string) {
    this.edited.emit( this.value )
  }

  getType() {
    return this.digits ? 'number' : this.isPassword ? 'password' : 'string'
  }
}
