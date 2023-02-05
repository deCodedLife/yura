import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { HeadModule } from "./head/head.module";
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { SnowComponent } from './snow/snow.component';
import { IceComponent } from './snow/ice/ice.component';


@NgModule({
  declarations: [
    StoreComponent,
    FooterComponent,
    SnowComponent,
    IceComponent
  ],
  imports: [
    CommonModule,
    HeadModule,
    RouterOutlet,
    RouterLink,
  ],
    exports: [StoreComponent, SnowComponent]
})
export class StoreModule { }
