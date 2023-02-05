import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IProduct} from "../../services/interfaces/product.interface";
import {IService} from "../../services/interfaces/service.interface";
import {Subject} from "rxjs";
import {TableDataService} from "../../services/table-data.service";

export interface IFieldView {
  title: string
  article: string
}

export interface IAbstractProduct {
  id: number
  image: string
  title: string
  price: number
  amount: number
  summary: number
  reference: IProduct | IService
}

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.less']
})
export class TableviewComponent implements OnInit {
  constructor(private tableData: TableDataService) {
  }

  productsCart: IAbstractProduct[] = []
  @Output() itemsUpdated = new EventEmitter<IAbstractProduct[]>()

  summary: number = 0

  ngOnInit() {
    this.tableData.tableContent$.subscribe(data => {
      this.productsCart = data
      this.updateSummary()
    } )
  }

  updateItemCount( index: number, e: Event ) {
    this.productsCart[ index ].amount = parseInt ( (<HTMLInputElement>e.target).value )
    this.productsCart[ index ].summary = this.productsCart[ index ].price * this.productsCart[ index ].amount
    this.itemsUpdated.emit( this.productsCart )
    this.updateSummary()
  }

  removeItem( index: number ) {
    this.productsCart.splice( index, 1 )
    this.itemsUpdated.emit( this.productsCart )
    this.updateSummary()
  }

  updateSummary() {
    this.summary = 0
    this.productsCart.forEach( item => this.summary += item.summary )
  }

}
