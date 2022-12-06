import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.less']
})
export class TextareaComponent {
  @Input() icon: string = ""
  @Input() digits: boolean = false
  @Input() placeholder: string = ""
  @Input() isPassword: boolean = false
  @Input() value: string
  @Input() required: boolean = false
  @Output() edited = new EventEmitter<string>()

  update(v: string) {
    this.edited.emit( this.value )
  }

  getType() {
    return this.digits ? 'number' : this.isPassword ? 'password' : 'string'
  }
}
