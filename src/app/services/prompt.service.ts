import { Injectable } from '@angular/core';
import {Subject} from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class PromptService {

  constructor() { }

  handler = new Subject<string>()
  onHide = new Subject()
  handlerFunction: any

  show( title: string, handlerFunction: any ) {
    this.handlerFunction = handlerFunction
    this.handler.next( title )
  }

  hide() {
    this.onHide.next(null)
  }

}
