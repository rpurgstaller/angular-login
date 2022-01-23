import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../user/components/login/login.component";
import {RegistrationComponent} from "../user/components/registration/registration.component";
import {HomeComponent} from "../home/home/home.component";
import {UserListComponent} from "../user/components/user-list/user-list.component";
import {RegistrationCompleteComponent} from "../user/components/registration-complete/registration-complete.component";
import {Profile} from "../user/components/profile/profile.component";


const routes: Routes = [

  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'user-list', component: UserListComponent},
  { path: 'registration-complete', component: RegistrationCompleteComponent },
  { path: 'profile/:public_id', component: Profile }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
