import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing/app-routing.module";
import {CustomValidatorService} from "./services/custom-validator.service";
import { UserListComponent } from './components/user-list/user-list.component';
import { RegistrationCompleteComponent } from './components/registration-complete/registration-complete.component';
import { Profile } from './components/profile/profile.component';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, UserListComponent, RegistrationCompleteComponent, Profile],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AppRoutingModule
  ],
  providers: [CustomValidatorService]
})
export class UserModule { }
