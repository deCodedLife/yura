import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})

export class ButtonComponent {
  @Input() link: string = ""
  @Input() title: string
  @Input() icon: string = ""
  @Input() type: string = ""
  @Input() extensions: string = "image/*"
  @Output() triggered = new EventEmitter()
  @Output() fileSelected = new EventEmitter<FileList>()

  handleFile(event: Event) {
    this.fileSelected.emit((<HTMLInputElement>event.target).files)
  }
}
