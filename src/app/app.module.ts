import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadModule } from "./routing/store/head/head.module";
import { StoreModule } from "./routing/store/store.module";
import { HomeModule } from "./routing/pages/home/home.module";
import { ConditionersModule } from "./routing/pages/conditioners/conditioners.module";
import { CookieModule } from "ngx-cookie";
import { ShoppingCartModule } from "./routing/pages/shopping-cart/shopping-cart.module";
import { ShoppingCartComponent } from './routing/pages/shopping-cart/shopping-cart.component';
import { CalculatorComponent } from './routing/pages/calculator/calculator.component';
import { ServiceCategoryComponent } from './routing/pages/calculator/service-category/service-category.component';
import { NotFoundComponent } from './routing/pages/not-found/not-found.component';
import { AdminModule } from "./routing/admin/admin.module";
import { DashboardComponent } from './routing/pages/dashboard/dashboard.component';
import { MatIconModule } from "@angular/material/icon";
import { InputboxComponent } from './components/inputbox/inputbox.component';
import { ListboxComponent } from './components/listbox/listbox.component';
import { ButtonComponent } from './components/button/button.component';
import { AdminAddObjectComponent } from './routing/pages/admin-add-object/admin-add-object.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminUpdateObjectComponent } from './routing/pages/admin-update-object/admin-update-object.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SignInComponent } from "./routing/pages/signin/sign-in.component";
import { ImageboxComponent } from './components/imagebox/imagebox.component';
import { AdminReceiptsComponent } from './routing/pages/admin-receipts/admin-receipts.component';
import { FieldsboxComponent } from './components/fieldsbox/fieldsbox.component';
import { TableviewComponent } from './components/tableview/tableview.component';
import { IndustrialRefrigerationUnitsComponent } from './routing/pages/industrial-refrigeration-units/industrial-refrigeration-units.component';
import { IndustrialServiceComponent } from './routing/pages/industrial-refrigeration-units/industrial-service/industrial-service.component';
import { TestComponent } from './routing/pages/test/test.component';
import { AdminObjectComponent } from './routing/pages/admin-object/admin-object.component';
import { FileManagerComponent } from './routing/pages/file-manager/file-manager.component';
import { ListItemComponent } from "./routing/pages/file-manager/list-item/list-item.component";
import { NotificationComponent } from './components/notification/notification.component';
import {PromptWindowComponent} from "./components/prompt-window/prompt-window.component";
import { PromptContentComponent } from './components/prompt-window/prompt-content/prompt-content.component';
import { ProductComponent } from './routing/pages/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    CalculatorComponent,
    ServiceCategoryComponent,
    NotFoundComponent,
    DashboardComponent,
    InputboxComponent,
    ListboxComponent,
    ButtonComponent,
    AdminAddObjectComponent,
    CheckboxComponent,
    ComboboxComponent,
    AdminUpdateObjectComponent,
    TextareaComponent,
    SignInComponent,
    ImageboxComponent,
    AdminReceiptsComponent,
    FieldsboxComponent,
    TableviewComponent,
    IndustrialRefrigerationUnitsComponent,
    IndustrialServiceComponent,
    TestComponent,
    AdminObjectComponent,
    FileManagerComponent,
    ListItemComponent,
    NotificationComponent,
    PromptWindowComponent,
    PromptContentComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HeadModule,
    AdminModule,
    ShoppingCartModule,
    ConditionersModule,
    ConditionersModule,
    CookieModule.withOptions(),
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
    exports: [
        InputboxComponent,
        ListboxComponent,
        ButtonComponent
    ]
})

export class AppModule { }
