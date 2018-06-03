import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';

import { MyErrorStateMatcher } from '../../shared/error-state-matcher';

function passwordMatcher(c: AbstractControl) {
  let passwordControl = c.get('password');
  let confirmedPassword = c.get('confirmedPassword')
  if (passwordControl.pristine || confirmedPassword.pristine) {
    return null;
  }
  if(passwordControl.value === confirmedPassword.value) {
    return null;
  }
  return  { 'match': false };
}


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  newEmployeeForm: FormGroup;
  employee: Iemployee;
  hidePassword = true;
  hidePasswordConfirmed = true;
  
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newEmployeeForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        employeePosition: ['', [Validators.required]],
        employeeId: ['', [Validators.required]],
        nationalId: '',
        homeOffice: '',
        primaryPhone: '',
        secondaryPhone: '',
        roles: '',
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        passwordGroup: this.fb.group(
          {
            password: ['', [
              Validators.required,
              Validators.minLength(8)
            ]],
            confirmedPassword: ['', Validators.required]
          }, { validator:  passwordMatcher }
        )
     });
     console.log('errorMatch', this.newEmployeeForm.get('passwordGroup'));
  }

  getError() {

  }

  save() {

  }
}
