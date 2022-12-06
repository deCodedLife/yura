import {ApplicationRef, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-imagebox',
  templateUrl: './imagebox.component.html',
  styleUrls: ['./imagebox.component.less'],
})

export class ImageboxComponent {
  @Input() image: string | ArrayBuffer = ""
  @Input() placeholder = ""
  @Output() edited = new EventEmitter<File>()

  handleImage(inputData: FileList) {
    let reader = new FileReader()
    reader.onload = (event) => {
      this.image = event.target.result
    }
    this.edited.emit( inputData[0] )
    reader.readAsDataURL( inputData[0] )
  }
}
