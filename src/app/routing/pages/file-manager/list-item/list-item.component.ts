import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface IFileItem {
  fileName: string
  isDir: boolean
  isRedirect: boolean
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.less']
})

export class ListItemComponent implements OnInit {
  @Input()
  item: IFileItem
  @Output()
  itemClicked = new EventEmitter<IFileItem>()
  @Output()
  contextMenuClicked = new EventEmitter<MouseEvent>()

  ngOnInit() {
  }

}
