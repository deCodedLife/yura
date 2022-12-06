import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent {
  constructor(public location: Location) {
  }
}
