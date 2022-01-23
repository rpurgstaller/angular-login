import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {CustomValidatorService} from "../../services/custom-validator.service";
import {UserRestApiService} from "../../services/user-rest-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: any;

  hidePassword: boolean;
  hidePasswordConfirmed: boolean;

  constructor(
    public customValidator: CustomValidatorService,
    public restApi: UserRestApiService,
    public router: Router
  ) {
    this.hidePassword = true;
    this.hidePasswordConfirmed = true;
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9._]+')
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        // includes a number
        CustomValidatorService.patternValidator(/\d/, { hasNoNumber: true }),
        // include upper case
        CustomValidatorService.patternValidator(/[A-Z]/, {hasNoCapitalCase: true}),
        // include lower case
        CustomValidatorService.patternValidator(/[a-z]/, {hasNoLowerCase: true}),
        // include special character
        CustomValidatorService.patternValidator(/[\@\#\$\%\^\&\*\(\)\_\+\!]/, {hasNoSpecialCharacter: true}),
        // no invalid character todo fix regexp
        //CustomValidatorService.patternValidator(/[A-Za-z0-9\@\#\$\%\^\&\*\(\)\_\+\!]/, {invalidCharacter: true}),
        // at least 8 characters
        Validators.minLength(8)
      ]),
      'passwordConfirmed': new FormControl('', [
        Validators.required
      ])
    }, { validators: [this.customValidator.passwordMatchValidator]});
  }

  submit(): void {
    this.restApi.createUser(this.registrationForm.value).subscribe((data: {}) => {
      this.router.navigate(['/registration-complete'], {queryParams: {username: this.username}}).then(()=>{
        // ... do after navigation
      });
    });
  }

  isPasswordPatternInvalid(err: string): boolean {
    return this.password.hasError('required') || this.password.hasError(err);
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

}
