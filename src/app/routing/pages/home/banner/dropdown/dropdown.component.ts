import {Component, Input} from '@angular/core';
import {IDropContent} from "../drop-content.interface";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less']
})
export class DropdownComponent {

  @Input() content: IDropContent

}
