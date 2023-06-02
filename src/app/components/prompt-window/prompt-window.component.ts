import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {PromptService} from "../../services/prompt.service";

@Component({
  selector: 'app-prompt-window',
  templateUrl: './prompt-window.component.html',
  styleUrls: ['./prompt-window.component.less']
})

export class PromptWindowComponent {

  isVisible: boolean = false

  constructor(
    private prompt: PromptService
  ) {
    prompt.handler.subscribe( () => this.isVisible = true )
    prompt.onHide.subscribe( () => this.isVisible = false )
  }

}
