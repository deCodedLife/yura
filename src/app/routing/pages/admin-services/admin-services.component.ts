import { Component } from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {FieldsService} from "../../../services/fields.service";
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/fieldItem.interface";
import {IProduct} from "../../../services/product.interface";
import {ObjectService} from "../../../services/object.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.less']
})

export class AdminServicesComponent {
  constructor(
    private objectService: ObjectService,
    private fieldsService: FieldsService,
    public headerService: HeaderService,
    private router: Router
  ) {}

  fields: IField[] = []
  services: IProduct[] = []
  searchTerm: string

  editObject(id: number) {
    this.router.navigateByUrl( "admin/services/" + id )
  }

  ngOnInit() {
    this.fieldsService.getSchema( 'services' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'services' ).subscribe(response => this.services = response.data )
    this.headerService.title.next( "Услуги" )
  }
}
