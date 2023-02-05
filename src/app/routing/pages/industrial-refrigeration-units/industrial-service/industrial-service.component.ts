import {Component, OnInit, Input} from '@angular/core';
import {ObjectService} from "../../../../services/object.service";

@Component({
  selector: 'app-industrial-service',
  templateUrl: './industrial-service.component.html',
  styleUrls: ['./industrial-service.component.less']
})

export class IndustrialServiceComponent {

  @Input() service: any

}
