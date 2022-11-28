import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from "../../../../services/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})

export class ProductComponent {

  API_URL = "http://localhost:8080"
  @Input() product: IProduct
  @Output() cardEvent = new EventEmitter()

}
