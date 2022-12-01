import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {IProduct} from "../../../services/product.interface";
import {FieldsService} from "../../../services/fields.service";
import {IField} from "../../../services/fieldItem.interface";
import {HeaderService} from "../../../services/header.service";
import {ObjectService} from "../../../services/object.service";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-admin-conditioners',
  templateUrl: './admin-conditioners.component.html',
  styleUrls: ['./admin-conditioners.component.less']
})

export class AdminConditionersComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    private fieldsService: FieldsService,
    public headerService: HeaderService,
    private router: Router
  ) {}

  fields: IField[] = []
  conditioners: IProduct[] = []
  searchTerm: string

  editObject(id: number) {
    this.router.navigateByUrl( "admin/conditioners/" + id )
  }

  ngOnInit() {
    this.fieldsService.getSchema( 'conditioners' ).subscribe( response => this.fields = response.data.filter( item => item.display ) )
    this.objectService.getObjects( 'conditioners' ).subscribe(response => this.conditioners = response.data )
    this.headerService.title.next( "Кондиционеры" )
  }
}
