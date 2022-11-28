import {Component, OnInit} from '@angular/core';
import {PopularProductsService} from "../../../services/popular-products.service";
import {ProductsService} from "../../../services/products.service";
import {IProduct} from "../../../services/product.interface";
import {IResponse} from "../../../services/response.interface";
import {IDropContent} from "./banner/drop-content.interface";
import {tap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  constructor(private popularProducts: PopularProductsService, private products: ProductsService) {}
  productsList: IProduct[] = []

  productsDropdowns: IDropContent[] = [
    {
      image: "assets/Кондиционеры Funai.png",
      title: "Бытовые кондиционеры",
      link: "/conditioners"
    },
    {
      image: "assets/Полупромышленные.png",
      title: "Полупромышленные кондиционеры",
      link: "/conditioners"
    },
    {
      image: "assets/промышленные.png",
      title: "Промышленный холод",
      link: "/conditioners"
    },
    {
      image: "assets/Вентиляция.jpg",
      title: "Вентиляция",
      link: "/conditioners"
    }
  ]
  servicesDropdowns: IDropContent[] = [
    {
      image: "assets/shapka5.png",
      title: "Проектирование и монтаж систем кондиционирования",
      link: "/calculator"
    },
    {
      image: "assets/промышленные.png",
      title: "Проектирование, монтаж и обслуживание промышленных холодильных установок",
      link: "/services"
    },
    {
      image: "assets/Вентиляция.jpg",
      title: "Проектирование, монтаж и обслуживание вентиляционных установок",
      link: "/conditioners"
    },
    {
      image: "assets/Кондиционеры Funai.png",
      title: "Проектирование, монтаж и обслуживание систем отопления",
      link: "/conditioners"
    }
  ]


  ngOnInit() {
    /**
     * Get popular products
     */
    this.popularProducts.getPopular().subscribe( response => {

      /**
       * Get data about each popular product
       */
      response.data.forEach( product => {
        this.products.getProduct( product.product_id.toString() ).subscribe( response => {
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
