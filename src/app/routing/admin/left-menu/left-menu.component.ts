import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TreeNodeInterface} from "../../../services/interfaces/tree-node.interface";
import {IField} from "../../../services/interfaces/fieldItem.interface";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from '@angular/cdk/tree';

export interface IFieldsResponse {
  status_code: number
  data: IField[]
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.less']
})

export class LeftMenuComponent {

  nodeList: TreeNodeInterface[]
  dataSource = new MatTreeNestedDataSource<TreeNodeInterface>()
  treeControl = new NestedTreeControl<TreeNodeInterface>(node => node.children);

  constructor(
    private http: HttpClient
  ) {
    http.get<IFieldsResponse>( "/api/menu" ).subscribe( response => {
      this.nodeList = response.data[ "items" ] as TreeNodeInterface[]
      this.dataSource.data = this.nodeList
      console.log( this.dataSource.data )
    } )
  }

  hasChild = (_: number, node: TreeNodeInterface) => !!node.children && node.children.length > 0

}
