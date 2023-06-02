import {Component, OnInit} from '@angular/core';
import { IProduct } from "../../../services/interfaces/product.interface";
import { CookieService } from "ngx-cookie";
import {AppCookieService} from "../../../services/app-cookie.service";
import {ObjectService} from "../../../services/object.service";

@Component({
  selector: 'app-conditioners',
  templateUrl: './conditioners.component.html',
  styleUrls: ['./conditioners.component.less']
})

export class ConditionersComponent implements OnInit {
  constructor(
    private objects: ObjectService,
    private cookieService: CookieService,
    private cookieCartService: AppCookieService
  ) {}

  productsList: IProduct[] = []
  sortedList: IProduct[] = []
  isLoading = true

  pagesContent: IProduct[][] = []
  selectedPage = 0
  limit = 12

  applyFilters(newData: IProduct[]) {
    this.selectedPage = 0
    this.sortedList = newData
    this.sortPages()
  }

  addToCard(product: IProduct) {
    this.cookieCartService.addProduct( {id: product.id, count: 1}, "products" )
  }

  sortPages() {
    this.pagesContent = []

    for ( let i = 0; i < Math.ceil( this.sortedList.length / this.limit ); i++ )
      this.pagesContent[i] = []

    for ( let i = 0; i < this.sortedList.length; i++ )
      this.pagesContent.at( Math.ceil( (i + 1) / this.limit ) - 1 ).push( this.sortedList[ i ] )
  }

  ngOnInit() {
    this.objects.getObjects( "manufacturers" ).subscribe( m_response => {
      if ( m_response.status_code != 200 ) return

      this.objects.getObjects( "conditioners" ).subscribe( response => {
        response.data.forEach( (product, index) => {
          let manufacturer = m_response.data.filter( item => item[ "id" ] == product[ "manufacturer" ] )[0]

          product[ "price" ] = product[ "price" ] * manufacturer[ "coefficient" ] * manufacturer[ "exchange_rate" ]
          product[ "price" ] = product[ "price" ].toFixed( 2 )
          response.data[ index ] = product
        } )

        this.productsList = response.data
        this.sortedList = response.data
        this.isLoading = false
        this.sortPages()
      } )

    } )
  }

}
