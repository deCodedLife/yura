import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  title = new Subject<string>()
  searchTerm = new Subject<string>()
}
