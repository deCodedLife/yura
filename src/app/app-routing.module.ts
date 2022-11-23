import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./routing/pages/home/home.component";
import { ConditionersComponent } from "./routing/pages/conditioners/conditioners.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "conditioners",
    component: ConditionersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
