import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IAbstractProduct} from "../components/tableview/tableview.component";

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  constructor() { }
  public tableContent$ = new Subject<IAbstractProduct[]>()
}
