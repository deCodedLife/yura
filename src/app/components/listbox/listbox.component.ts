import {Component, Input} from '@angular/core';
import {IField} from "../../services/fieldItem.interface";

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.less']
})

export class ListboxComponent {

  @Input() listItems: any[]
  @Input() fields: IField[]

  ngOnInit() {}

}
