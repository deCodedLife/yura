import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./routing/pages/home/home.component";
import { ConditionersComponent } from "./routing/pages/conditioners/conditioners.component";
import { ShoppingCartComponent } from "./routing/pages/shopping-cart/shopping-cart.component";
import {CalculatorComponent} from "./routing/pages/calculator/calculator.component";
import {SigninComponent} from "./routing/pages/signin/signin.component";
import {DashboardComponent} from "./routing/pages/dashboard/dashboard.component";
import {AdminConditionersComponent} from "./routing/pages/admin-conditioners/admin-conditioners.component";
import {AdminAddObjectComponent} from "./routing/pages/admin-add-object/admin-add-object.component";
import {AdminServicesComponent} from "./routing/pages/admin-services/admin-services.component";
import {AdminUpdateObjectComponent} from "./routing/pages/admin-update-object/admin-update-object.component";

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
    path: 'admin/sign-in',
    pathMatch: "full",
    component: SigninComponent
  },
  {
    path: "admin/dashboard",
    pathMatch: "full",
    component: DashboardComponent
  },
  {
    path: "admin/conditioners",
    pathMatch: "full",
    component: AdminConditionersComponent
  },
  {
    path: "admin/services",
    pathMatch: "full",
    component: AdminServicesComponent
  },
  {
    path: 'admin/add/:object',
    component: AdminAddObjectComponent
  },
  {
    path: 'admin/update/:object',
    component: AdminUpdateObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
