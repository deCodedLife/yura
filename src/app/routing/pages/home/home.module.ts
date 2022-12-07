import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BannerComponent } from "./banner/banner.component";
import {RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './product/product.component';
import { DropdownComponent } from './banner/dropdown/dropdown.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ProductComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule
  ],
  exports: [BannerComponent, ProductComponent],
  providers: []
})
export class HomeModule { }
