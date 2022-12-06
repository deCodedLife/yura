import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-admin-receipts',
  templateUrl: './admin-receipts.component.html',
  styleUrls: ['./admin-receipts.component.less']
})
export class AdminReceiptsComponent implements OnInit {
  constructor(
    private appheader: HeaderService
  ) {
  }

  ngOnInit() {
    this.appheader.title.next( "Заказ клиента" )
  }

}
