import {Component, ElementRef, ViewChild} from '@angular/core';
import {PromptService} from "../../../services/prompt.service";

@Component({
  selector: 'app-prompt-content',
  templateUrl: './prompt-content.component.html',
  styleUrls: ['./prompt-content.component.less']
})
export class PromptContentComponent {

  title: string = ""
  content: string

  constructor(
    public prompt: PromptService
  ) {
    prompt.handler.subscribe( newTitle => this.title = newTitle )
  }

  submit() {
    if ( this.prompt.handlerFunction != null )
      this.prompt.handlerFunction( this.content )

    this.content = ""
    this.prompt.hide()
  }

}
