import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDisplayGroup} from "../calculator.component";
import {ServicesService} from "../../../../services/services.service";

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.less']
})

export class ServiceCategoryComponent implements OnInit {
  constructor(private serviceServices: ServicesService) {}

  @Input() group: IDisplayGroup
  @Output() changed = new EventEmitter<IDisplayGroup>()

  isToggled = false

  ngOnInit() {
    this.serviceServices.getServiceByGroup( this.group.group.id ).subscribe( response => {
      this.group.services = response.data
      console.log( response.data )
    } )
  }

  change(event: Event, index: number) {
    let value = parseInt( (<HTMLInputElement>event.target).value )
    if ( isNaN(value) ) value = 0
    this.group.services[ index ].amount = value
    this.changed.emit( this.group )
  }
}
