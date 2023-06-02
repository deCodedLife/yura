import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  result = "";

  ngOnInit() {
    fetch("http://localhost:8880", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: "{ 'Hello': 'World' }"
    }).then( (c) => c.json() )
      .then( (json) => this.result = json )
  }

}
