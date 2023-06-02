import {Component, HostListener} from '@angular/core';
import { AppCookieService } from "./services/app-cookie.service";
import {Location} from "@angular/common";
import {ContextMenuService} from "./services/context-menu.service";
import {PromptService} from "./services/prompt.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'yura';

  isWinter(): boolean {
    let winterStarts = new Date( new Date().getFullYear(), 11, 20 );
    let winterEnding = new Date( new Date().getFullYear(), 3,  20 );
    return !(new Date() < winterStarts && new Date() > winterEnding);
  }

  @HostListener('document:click')
  documentClick(): void {

  }

  constructor(
    private cartCookieService: AppCookieService,
    public location: Location,
    public ctxMenu: ContextMenuService,
    public prompt: PromptService
  ) {
    cartCookieService.recalculate()
  }
}
