import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadModule } from "./routing/store/head/head.module";
import { StoreModule } from "./routing/store/store.module";
import { HomeModule } from "./routing/pages/home/home.module";
import { PopularProductsService } from "./services/popular-products.service";
import { ProductsService } from "./services/products.service";
import { ConditionersModule } from "./routing/pages/conditioners/conditioners.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HeadModule,
    StoreModule,
    ConditionersModule
  ],
  providers: [PopularProductsService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
