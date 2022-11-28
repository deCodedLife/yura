import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.less']
})
export class InputboxComponent {
  @Input() icon: string
  @Output() edited = new EventEmitter<string>()
}
