import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../services/interfaces/product.interface";
import {IDropContent} from "./banner/drop-content.interface";
import {CookieService} from "ngx-cookie";
import {AppCookieService} from "../../../services/app-cookie.service";
import {ObjectService} from "../../../services/object.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  constructor(
    private objectService: ObjectService,
    private cookieService: CookieService,
    private cookieCartService: AppCookieService
  ) {}
  productsList: IProduct[] = []

  addToCard(product: IProduct) {
    this.cookieCartService.addProduct( {id: product.id, count: 1}, "products" )
  }

  productsDropdowns: IDropContent[] = [
    {
      image: "assets/Кондиционеры Funai.png",
      title: "Бытовые кондиционеры",
      link: "/conditioners",
      enabled: true
    },
    {
      image: "assets/Полупромышленные.png",
      title: "Полупромышленные кондиционеры",
      link: "/conditioners",
      enabled: false
    },
    {
      image: "assets/промышленные.png",
      title: "Промышленный холод",
      link: "/conditioners",
      enabled: false
    },
    {
      image: "assets/Вентиляция.jpg",
      title: "Вентиляция",
      link: "/conditioners",
      enabled: false
    }
  ]
  servicesDropdowns: IDropContent[] = [
    {
      image: "assets/shapka5.png",
      title: "Проектирование и монтаж систем кондиционирования",
      link: "/calculator",
      enabled: true
    },
    {
      image: "assets/промышленные.png",
      title: "Проектирование, монтаж и обслуживание промышленных холодильных установок",
      link: "/services",
      enabled: false
    },
    {
      image: "assets/Вентиляция.jpg",
      title: "Проектирование, монтаж и обслуживание вентиляционных установок",
      link: "/conditioners",
      enabled: false
    },
    {
      image: "assets/Кондиционеры Funai.png",
      title: "Проектирование, монтаж и обслуживание систем отопления",
      link: "/conditioners",
      enabled: false
    }
  ]


  ngOnInit() {
    /**
     * Get popular products
     */
    this.objectService.getObjects( "popular_products" ).subscribe( response => {

      /**
       * Get data about each popular product
       */
      response.data.forEach( product => {
        this.objectService.getWithParams( "conditioners", new HttpParams({
          fromObject: {
            id: product.product_id.toString()
          }
        }) ).subscribe( response => {
          /**
           * API always provide GET request as array of items
           * It will be array even if it's a single item =(
           */
          this.productsList.push( response.data.at(0) )
        } )
      } )
    } )

  }
}
