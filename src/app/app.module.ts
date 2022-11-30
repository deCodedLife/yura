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
import { CookieModule } from "ngx-cookie";
import { ShoppingCartModule } from "./routing/pages/shopping-cart/shopping-cart.module";
import { ShoppingCartComponent } from './routing/pages/shopping-cart/shopping-cart.component';
import { CalculatorComponent } from './routing/pages/calculator/calculator.component';
import { ServiceCategoryComponent } from './routing/pages/calculator/service-category/service-category.component';
import { NotFoundComponent } from './routing/pages/not-found/not-found.component';
import { AdminModule } from "./routing/admin/admin.module";
import { DashboardComponent } from './routing/pages/dashboard/dashboard.component';
import { AdminConditionersComponent } from './routing/pages/admin-conditioners/admin-conditioners.component';
import { MatIconModule } from "@angular/material/icon";
import { InputboxComponent } from './components/inputbox/inputbox.component';
import { ListboxComponent } from './components/listbox/listbox.component';
import { ButtonComponent } from './components/button/button.component';
import { AdminAddObjectComponent } from './routing/pages/admin-add-object/admin-add-object.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import {FormsModule} from "@angular/forms";
import { AdminServicesComponent } from './routing/pages/admin-services/admin-services.component';
import { AdminUpdateObjectComponent } from './routing/pages/admin-update-object/admin-update-object.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    CalculatorComponent,
    ServiceCategoryComponent,
    NotFoundComponent,
    DashboardComponent,
    AdminConditionersComponent,
    InputboxComponent,
    ListboxComponent,
    ButtonComponent,
    AdminAddObjectComponent,
    CheckboxComponent,
    ComboboxComponent,
    AdminServicesComponent,
    AdminUpdateObjectComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HeadModule,
    StoreModule,
    AdminModule,
    ShoppingCartModule,
    ConditionersModule,
    ConditionersModule,
    CookieModule.withOptions(),
    MatIconModule,
    FormsModule
  ],
  providers: [PopularProductsService, ProductsService],
  bootstrap: [AppComponent],
  exports: [
    InputboxComponent,
    ListboxComponent
  ]
})

export class AppModule { }
