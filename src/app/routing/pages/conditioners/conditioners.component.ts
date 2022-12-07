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
    this.sortedList = newData
    this.sortPages()
  }

  addToCard(product: IProduct) {
    this.cookieCartService.addProduct( product.id )
  }

  sortPages() {
    this.pagesContent = []

    for ( let i = 0; i < Math.ceil( this.sortedList.length / this.limit ); i++ )
      this.pagesContent[i] = []

    for ( let i = 0; i < this.sortedList.length; i++ )
      this.pagesContent.at( Math.ceil( (i + 1) / this.limit ) - 1 ).push( this.sortedList[ i ] )
  }

  ngOnInit() {
    this.objects.getObjects( "conditioners" ).subscribe( response => {
      this.productsList = response.data
      this.sortedList = response.data
      this.isLoading = false
      this.sortPages()
    } )
  }

}
