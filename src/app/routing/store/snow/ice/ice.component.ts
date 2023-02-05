import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ice',
  templateUrl: './ice.component.html',
  styleUrls: ['./ice.component.less']
})
export class IceComponent {

  xPos = Math.floor( Math.random() * window.innerWidth )
  yPos = -Math.floor( Math.random() * window.innerHeight )
  size = Math.floor( Math.random() * 5 ) + 1
  speed = (Math.floor( Math.random() * 25 ) + 7)
  screenHeight = window.innerHeight + 10
}
