import { Component } from '@angular/core';
import {ObjectService} from "../../../services/object.service";
import {ActivatedRoute} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {IProduct} from "../../../services/interfaces/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent {

  product: IProduct

  constructor(
    public objectService: ObjectService,
    public route: ActivatedRoute
  ) {
    let object_id = route.snapshot.paramMap.get( "id" )

    objectService.getObjects( "manufacturers" ).subscribe( m_response =>
    {
      if (m_response.status_code != 200) return

      objectService.getWithParams(
        "conditioners",
        new HttpParams( { fromObject: { id: object_id } } )
      ).subscribe( (reply) => {
        let product = reply.data[0]
        let manufacturer = m_response.data.filter( item => item[ "id" ] == product[ "manufacturer" ] )[0]
        product[ "price" ] = product[ "price" ] * manufacturer[ "coefficient" ] * manufacturer[ "exchange_rate" ]
        product[ "price" ] = product[ "price" ].toFixed( 2 )

        this.product = product as IProduct
      } )

    })


  }

}
