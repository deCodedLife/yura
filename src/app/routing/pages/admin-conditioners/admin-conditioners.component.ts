import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {IProduct} from "../../../services/product.interface";
import {FieldsService} from "../../../services/fields.service";
import {IField} from "../../../services/fieldItem.interface";
import {HeaderService} from "../../../services/header.service";
import {ObjectService} from "../../../services/object.service";

@Component({
  selector: 'app-admin-conditioners',
  templateUrl: './admin-conditioners.component.html',
  styleUrls: ['./admin-conditioners.component.less']
})

export class AdminConditionersComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    private fieldsService: FieldsService,
    public headerService: HeaderService
  ) {}

  fields: IField[] = []
  conditioners: IProduct[] = []
  searchTerm: string

  ngOnInit() {
    this.fieldsService.getSchema( 'conditioners' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObject( 'conditioners' ).subscribe( response => this.conditioners = response.data )
    this.headerService.title.next( "Кондиционеры" )
  }
}
