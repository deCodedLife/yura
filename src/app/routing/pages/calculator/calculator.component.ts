import {Component, OnInit} from '@angular/core';
import {ServicesGroupsService} from "../../../services/services-groups.service";
import {IServiceGroup} from "../../../services/services-groups.interface";
import {IService} from "../../../services/service.interface";
import {CookieService} from "ngx-cookie";
import {CookieCartService} from "../../../services/cookie-cart.service";

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
    private servicesGroupsService: ServicesGroupsService,
    private cookieService: CookieService,
    private cookieCartService: CookieCartService
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
        if ( typeof( service.amount ) != "undefined") {
          this.TotalSum += service.price * service.amount
          let services = this.cookieService.getObject( "services" ) as number[]
          if ( services.includes( service.id ) == false ) {
            services.push( service.id )
            this.cookieService.putObject( "services", services )
            this.cookieCartService.recalculate()
          }
        }
      } )
    } )
  }

  ngOnInit() {
    this.servicesGroupsService.getServicesGroups().subscribe( response => {
      this.servicesGroups = response.data

      this.servicesGroups.forEach( serviceGroup =>
        this.content.push( {
          group: serviceGroup,
          services: []
        })
      )
    })
  }
}
