import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
