import { Injectable } from '@angular/core';
import {UserModule} from "../user.module";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const passwordChosen = control.get('password');
    const passwordConfirmed = control.get('passwordConfirmed');

    if(!passwordChosen || !passwordConfirmed) {
      return null;
    }

    return passwordConfirmed.value && passwordConfirmed.value !== passwordChosen.value ? { passwordsDoNotMatch : true } : null;
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if(!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    }
  }
}
