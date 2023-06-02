import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./routing/pages/home/home.component";
import { ConditionersComponent } from "./routing/pages/conditioners/conditioners.component";
import { ShoppingCartComponent } from "./routing/pages/shopping-cart/shopping-cart.component";
import { CalculatorComponent } from "./routing/pages/calculator/calculator.component";
import { SignInComponent } from "./routing/pages/signin/sign-in.component";
import { DashboardComponent } from "./routing/pages/dashboard/dashboard.component";
import { AdminAddObjectComponent } from "./routing/pages/admin-add-object/admin-add-object.component";
import { AdminUpdateObjectComponent } from "./routing/pages/admin-update-object/admin-update-object.component";
import {AdminReceiptsComponent} from "./routing/pages/admin-receipts/admin-receipts.component";
import {
  IndustrialRefrigerationUnitsComponent
} from "./routing/pages/industrial-refrigeration-units/industrial-refrigeration-units.component";
import {AdminObjectComponent} from "./routing/pages/admin-object/admin-object.component";
import {FileManagerComponent} from "./routing/pages/file-manager/file-manager.component";
import {ProductComponent} from "./routing/pages/product/product.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "conditioners",
    pathMatch: "full",
    component: ConditionersComponent
  },
  {
    path: "product/:id",
    pathMatch: "full",
    component: ProductComponent
  },
  {
    path: 'shopping-card',
    pathMatch: "full",
    component: ShoppingCartComponent
  },
  {
    path: 'calculator',
    pathMatch: "full",
    component: CalculatorComponent
  },
  {
    path: "industrial-refrigeration-units",
    pathMatch: "full",
    component: IndustrialRefrigerationUnitsComponent
  },
  {
    path: "admin",
    redirectTo: "admin/sign-in",
    pathMatch: "full"
  },
  {
    path: 'admin/add/:object',
    component: AdminAddObjectComponent
  },
  {
    path: "admin/receipt/:id",
    component: AdminReceiptsComponent
  },
  {
    path: 'admin/:object/:id',
    component: AdminUpdateObjectComponent
  },

  {
    path: 'admin/sign-in',
    pathMatch: "full",
    component: SignInComponent
  },
  {
    path: "admin/dashboard",
    pathMatch: "full",
    component: DashboardComponent
  },
  {
    path: "admin/fileManager",
    pathMatch: "full",
    component: FileManagerComponent
  },
  {
    path: "admin/:object",
    pathMatch: "full",
    component: AdminObjectComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
