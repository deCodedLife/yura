import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.less']
})

export class TopHeaderComponent implements OnInit {
  constructor(
    private headerService: HeaderService
  ) {}

  title: string
  searchTerm = ""

  ngOnInit() {
    this.headerService.title.subscribe( newTitle => this.title = newTitle )
  }
}
