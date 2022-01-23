import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRestApiService} from "../../services/user-rest-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(
    public restApi: UserRestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    this.restApi.createUser(this.loginForm.value).subscribe((data: {}) => {
      this.router.navigate(['/user-list']).then(()=>{
        // ... do after navigation
      });
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
