import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { HeadModule } from "./head/head.module";
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterOutlet } from "@angular/router";


@NgModule({
  declarations: [
    StoreComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HeadModule,
    RouterOutlet,
    RouterLink,
  ],
  exports:[StoreComponent]
})
export class StoreModule { }
