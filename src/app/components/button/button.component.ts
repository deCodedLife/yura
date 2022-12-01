import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})

export class ButtonComponent {
  @Input() link: string = ""
  @Input() title: string
  @Input() icon: string
  @Output() triggered = new EventEmitter()
}
