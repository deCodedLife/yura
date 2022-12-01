import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.less']
})

export class CheckboxComponent {
  @Input() placeholder: string = ""
  @Input() toggled: boolean = false
  @Output() changed = new EventEmitter<boolean>()
}
