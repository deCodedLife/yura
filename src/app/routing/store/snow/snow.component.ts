import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-snow',
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.less']
})
export class SnowComponent {
  snowCount: any = Array(200).fill(0)
}
