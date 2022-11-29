import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LeftMenuComponent} from "./left-menu/left-menu.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { TopHeaderComponent } from './top-header/top-header.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminComponent,
    LeftMenuComponent,
    TopHeaderComponent
  ],
  exports: [
      AdminComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    RouterLink,
    FormsModule
  ],
})
export class AdminModule { }
