import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from "./head.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [HeadComponent],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [HeadComponent]
})

export class HeadModule { }
