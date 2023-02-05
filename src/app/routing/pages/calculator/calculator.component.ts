import {Component, OnInit} from '@angular/core';
import {ObjectService} from "../../../services/object.service";
import {IServiceGroup} from "../../../services/interfaces/services-groups.interface";
import {IService} from "../../../services/interfaces/service.interface";
import {CookieService} from "ngx-cookie";
import {AppCookieService} from "../../../services/app-cookie.service";

export interface IDisplayGroup {
  group: IServiceGroup
  services: IService[]
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.less']
})

export class CalculatorComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    private cookieService: CookieService,
    private cookieCartService: AppCookieService
  ) {}

  servicesGroups: IServiceGroup[] = []
  content: IDisplayGroup[] = []
  TotalSum = 0

  update(groupItem: IDisplayGroup, index: number) {
    this.content[ index ] = groupItem
    this.calculatePrice()
  }

  calculatePrice() {
    this.content.forEach( contentItem => {
      contentItem.services.forEach( service => {
        if ( typeof( service.amount ) == "undefined" ) return

        this.TotalSum += service.price * service.amount
        this.cookieCartService.deleteProduct( service.id, "services" )
        this.cookieCartService.addProduct( {id: service.id, count: service.amount}, "services" )

        if ( typeof (service.additional_service_id) == "undefined" ) return;
        this.content.forEach( groups => {
          groups.services.forEach( add_service => {
            if ( add_service.id != service.additional_service_id ) return
            this.TotalSum += add_service.price
            this.cookieCartService.deleteProduct( add_service.id, "services" )
            this.cookieCartService.addProduct( { id: add_service.id, count: 1 }, "services" )
          } )
        } )

        this.cookieCartService.recalculate()
      } )
    } )
  }

  ngOnInit() {
    this.objectService.getObjects( "services_groups" ).subscribe( response => {
      this.servicesGroups = response.data

      this.servicesGroups.forEach( serviceGroup =>
        this.content.push( {
          group: serviceGroup,
          services: []
        })
      )
    } )
  }
}
