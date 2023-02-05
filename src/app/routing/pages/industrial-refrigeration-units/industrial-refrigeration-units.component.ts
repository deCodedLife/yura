import {Component, OnInit} from '@angular/core';
import {ObjectService} from "../../../services/object.service";

@Component({
  selector: 'app-industrial-refrigeration-units',
  templateUrl: './industrial-refrigeration-units.component.html',
  styleUrls: ['./industrial-refrigeration-units.component.less']
})
export class IndustrialRefrigerationUnitsComponent implements OnInit {
  constructor(
    private objectService: ObjectService
  ) {}

  services: any[] = []

  ngOnInit() {
    this.objectService.getObjects( "industrial_refrigeration_units" ).subscribe( (response) => {
      this.services = response.data
    } )
  }
}
