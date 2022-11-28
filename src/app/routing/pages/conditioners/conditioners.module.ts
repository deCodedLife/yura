import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { FiltersComponent } from './filters/filters.component';
import {ConditionersComponent} from "./conditioners.component";
import { RangebarComponent } from './filters/rangebar/rangebar.component';
import {FormsModule} from "@angular/forms";
import { CheckListComponent } from './filters/check-list/check-list.component';
import {CookieModule, CookieService} from "ngx-cookie";

@NgModule({
  declarations: [
    ProductComponent,
    FiltersComponent,
    ConditionersComponent,
    RangebarComponent,
    RangebarComponent,
    CheckListComponent
  ],
    exports: [
        ProductComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ConditionersModule { }
