import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { HeadModule } from "./head/head.module";
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { SnowComponent } from './snow/snow.component';
import { IceComponent } from './snow/ice/ice.component';
import { ContexMenuComponent } from './contex-menu/contex-menu.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    StoreComponent,
    FooterComponent,
    SnowComponent,
    IceComponent,
    ContexMenuComponent,
  ],
  imports: [
    CommonModule,
    HeadModule,
    RouterOutlet,
    RouterLink,
    MatIconModule,
  ],
  exports: [StoreComponent, SnowComponent, ContexMenuComponent]
})
export class StoreModule { }
