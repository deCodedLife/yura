import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDisplayGroup} from "../calculator.component";
import {ObjectService} from "../../../../services/object.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.less']
})

export class ServiceCategoryComponent implements OnInit {
  constructor(private objectsService: ObjectService) {}

  @Input() group: IDisplayGroup
  @Output() changed = new EventEmitter<IDisplayGroup>()

  isToggled = false

  ngOnInit() {
    this.objectsService.getWithParams( "services", new HttpParams({
      fromObject: {
        "group_id": this.group.group.id
      }
    }) ).subscribe( response => {
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
