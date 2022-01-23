import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./modules/app-routing/app-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMaterialModule} from "./modules/angular-material/angular-material.module";
import {UserModule} from "./modules/user/user.module";
import {HomeModule} from "./modules/home/home.module";
import {HttpClientModule} from "@angular/common/http";
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        AppRoutingModule,
        FlexLayoutModule,
        UserModule,
        HomeModule,
        HttpClientModule,
        MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
