import { Component, OnInit } from '@angular/core';
import {CustomValidatorService} from "../../services/custom-validator.service";
import {UserRestApiService} from "../../services/user-rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Profile implements OnInit {

  profileForm: any;

  publicId!: string;

  constructor(
    public customValidator: CustomValidatorService,
    public restApi: UserRestApiService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.publicId = this.route.snapshot.params.public_id;
    let username, email;

    this.restApi.getUser(this.publicId).subscribe(result => {
      this.profileForm = new FormGroup({
        'username': new FormControl(result['username'], [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9._]+')
        ]),
        'email': new FormControl(result['email'], [
          Validators.required,
          Validators.email
        ])
      });
    },
    (err: HttpErrorResponse) => {
      console.log(err.error);
      console.log(err.message);
      // TODO abort
    });
  }

  submit(): void {
    this.restApi.updateUser(this.publicId, this.profileForm.value).subscribe((data: {}) => {

    });
  }

  cancel(): void {

  }

  get username() {
    return this.profileForm.get('username');
  }

  get email() {
    return this.profileForm.get('email');
  }


}
