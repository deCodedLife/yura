import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {IProduct} from "../../../services/product.interface";
import {FieldsService} from "../../../services/fields.service";
import {IField} from "../../../services/fieldItem.interface";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-admin-conditioners',
  templateUrl: './admin-conditioners.component.html',
  styleUrls: ['./admin-conditioners.component.less']
})

export class AdminConditionersComponent implements OnInit {
  constructor(
    private conditionersService: ProductsService,
    private fieldsService: FieldsService,
    private headerService: HeaderService
  ) {}

  fields: IField[] = []
  conditioners: IProduct[] = []

  ngOnInit() {
    this.fieldsService.getSchema( 'conditioners' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.conditionersService.getProducts().subscribe( response => this.conditioners = response.data )
    this.headerService.title.next( "Кондиционеры" )
  }
}
