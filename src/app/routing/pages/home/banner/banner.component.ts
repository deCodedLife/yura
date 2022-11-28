import { Component, Input } from '@angular/core';
import { IDropContent } from "./drop-content.interface";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less'],
})

export class BannerComponent {

  @Input() title: string
  @Input() subtitle: string
  @Input() image: string
  @Input() backgroundColor: string
  @Input() dropContent: IDropContent[]

}
