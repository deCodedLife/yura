import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from "../../../../services/interfaces/product.interface";
import {IManufacturerRequest, ManufacturersService} from "../../../../services/manufacturers.service";
import {IManufacturer} from "../../../../services/interfaces/manufacturer.interface";
import {Observable} from "rxjs";
import {IConditionerType} from "../../../../services/interfaces/conditioner-type.interface";
import {ConditionersTypesService} from "../../../../services/conditioners-types.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
export class FiltersComponent {

  constructor(
    private manufacturers: ManufacturersService,
    private conditionerTypes: ConditionersTypesService
  ) {
  }

  @Input() products: IProduct[]
  @Output() filtered = new EventEmitter<IProduct[]>()

  max_price: number
  min_served_area: number

  max_external_block_width: number
  max_external_block_depth: number
  max_external_block_height: number

  max_internal_block_width: number
  max_internal_block_depth: number
  max_internal_block_height: number

  manufacturersList: IManufacturer[] = []
  manufacturersTerm: IManufacturer[] = []

  conditionersTypesList: IConditionerType[] = []
  conditionersTypesTerm: IConditionerType[] = []

  applyFilters() {
    let sorted: IProduct[]

    sorted = this.products.filter( item => item.price <= this.max_price )

    if ( this.manufacturersTerm.length > 0 ) {
      sorted = sorted.filter( item => this.manufacturersTerm.some( term => item.manufacturer == term.id ) )
    }

    if ( this.conditionersTypesTerm.length > 0 ) {
      sorted = sorted.filter( item => this.conditionersTypesTerm.some( term => item.type == term.id ) )
    }

    sorted = sorted.filter( item => item.served_area >= this.min_served_area )
    sorted = sorted.filter( item => item.external_block_height <= this.max_external_block_height )
    sorted = sorted.filter( item => item.external_block_width <= this.max_external_block_width )
    sorted = sorted.filter( item => item.external_block_depth <= this.max_external_block_depth )
    sorted = sorted.filter( item => item.internal_block_width <= this.max_internal_block_width )
    sorted = sorted.filter( item => item.internal_block_height <= this.max_internal_block_height )
    sorted = sorted.filter( item => item.internal_block_depth <= this.max_internal_block_depth )

    this.filtered.emit( sorted )
  }

  ngOnInit() {
    this.max_price = this.findMaxValue(this.products, 'price')
    this.min_served_area = this.findMinValue(this.products, 'served_area')
    this.max_external_block_width = this.findMaxValue(this.products, "external_block_width")
    this.max_external_block_depth = this.findMaxValue(this.products, "external_block_depth")
    this.max_external_block_height = this.findMaxValue(this.products, "external_block_height")
    this.max_internal_block_width = this.findMaxValue(this.products, "internal_block_width")
    this.max_internal_block_height = this.findMaxValue(this.products, "internal_block_height")
    this.max_internal_block_depth = this.findMaxValue(this.products, "internal_block_depth")

    this.manufacturers.getManufacturers().subscribe( response => {
      this.manufacturersList = response.data
    } )
    this.conditionerTypes.getConditionersTypes().subscribe( response => {
      this.conditionersTypesList = response.data
    } )
  }

  findMaxValue(array: object[], key: string) {
    let max_value = array[0][key]
    array.forEach( item => {max_value = max_value < item[key] ? item[key] : max_value} )
    return max_value
  }

  findMinValue(array: object[], key: string) {
    let min_value = array[0][key]
    array.forEach( item => {min_value = min_value > item[key] ? item[key] : min_value} )
    return min_value
  }

}
