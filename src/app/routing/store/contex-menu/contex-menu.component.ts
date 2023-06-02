import {Component, Input, OnInit} from '@angular/core';
import {ContextMenuService} from "../../../services/context-menu.service";
import {IMenuItem} from "../../../services/interfaces/menu-item.interface";

interface CursorEvent {
  XPos: number
  YPos: number
}

@Component({
  selector: 'app-contex-menu',
  templateUrl: './contex-menu.component.html',
  styleUrls: ['./contex-menu.component.less']
})

export class ContexMenuComponent implements OnInit {
  constructor(
    private ctxService: ContextMenuService
  ) {}

  @Input()
  menuItems: IMenuItem[] = []
  mouseEvent: CursorEvent = {
    XPos: 0,
    YPos: 0
  }
  isVisible: boolean = false

  selected( item: IMenuItem ) {
    this.isVisible = false
    item.handleFunc()
  }

  ngOnInit() {
    this.ctxService.onClicked.subscribe( event => {
      event.preventDefault();
      this.isVisible = true
      this.mouseEvent.XPos = event.pageX
      this.mouseEvent.YPos = event.pageY
    } )
    this.ctxService.hide.subscribe( () => this.isVisible = false )
  }

}
