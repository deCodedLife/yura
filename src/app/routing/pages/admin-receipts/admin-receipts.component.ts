import {Component, Input, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {ObjectService} from "../../../services/object.service";
import {list} from "postcss";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-admin-receipts',
  templateUrl: './admin-receipts.component.html',
  styleUrls: ['./admin-receipts.component.less']
})
export class AdminReceiptsComponent implements OnInit {
  constructor(
    private appheader: HeaderService,
    private objectService: ObjectService,
    private route: ActivatedRoute
  ) {
  }

  saleObject: object = {}
  saleFields: IField[] = []

  ngOnInit() {
    let objectID = parseInt( this.route.snapshot.paramMap.get('id') )

    this.appheader.title.next( "Заказ клиента" )

    this.objectService.getObject( "sales", objectID ).subscribe( response => this.saleObject = response.data[0] )

    this.objectService.getSchema( "sales" ).subscribe( response => {
      this.saleFields = response.data

      for ( let i = 0; i < this.saleFields.length; i++ ) {

        let field = this.saleFields[i]
        let take_from = field.take_from.split('/')
        let object = take_from[0]
        take_from.splice(0, 1)
        let types = take_from

        if ( field.display_type == 'combobox' ) {

          this.objectService.getObjects( object ).subscribe(response => {
            response.data.forEach( item => {
              if ( typeof( this.saleFields[i].list_items ) == "undefined") {
                this.saleFields[i].list_items = []
              }

              let list_item = ""
              console.log( types )

              types.forEach( type => {
                list_item += item[ type ] + " "
              } )

              list_item.slice(0, -1)

              this.saleFields[i].list_items.push( list_item )
            } )
          } )
        }
      }
    } )


  }

}
