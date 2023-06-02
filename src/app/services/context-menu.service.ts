import { Injectable } from '@angular/core';
import {IMenuItem} from "./interfaces/menu-item.interface";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ContextMenuService {

  constructor() { }

  onClicked = new Subject<MouseEvent>();
  hide = new Subject<boolean>();

}
