import { Component, OnInit } from '@angular/core';
import { Iemployee } from '../../models/iemployee';
import { FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';


function passwordMatcher(c: AbstractControl) {
  let passwordControl = c.get('password');
  let confirmedPassword = c.get('confirmedPassword')
  if (passwordControl.pristine || confirmedPassword.pristine) {
    return null;
  }
  if(passwordControl.value === confirmedPassword.value) {
    return null;
  }
  return  { 'match': true };
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

  // firstName: FormControl;
  // lastName: FormControl;
  // nationalId: FormControl;
  // employeeId: FormControl;
  // employeePosition: FormControl;
  // primaryPhone: FormControl;
  // secondaryPhone: FormControl;
  // email: FormControl;
  // homeOffice: FormControl;
  // roles: FormControl;
  // password: FormControl;
  // confirmedPassword: FormControl;

  firstName: string;
  // lastName: string;
  // nationalId: string;
  // employeeId: string;
  // employeePosition: string;
  // primaryPhone: string;
  // secondaryPhone: string;
  // email: string;
  // homeOffice: string;
  // roles: string;
  // password: string;
  // confirmedPassword: string;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newEmployeeForm = this.fb.group(
      {
        'firstName': ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        employeePosition: ['', [Validators.required]],
        employeeId: ['', [Validators.required]],
        nationalId: '',
        homeOffice: '',
        primaryPhone: '',
        secondaryPhone: '',
        roles: '',
        passwordGroup: this.fb.group(
          {
            email: ['', [
              Validators.required,
              Validators.email
            ]],
            confirmedPassword: ['', Validators.required]
          }, { validators:  passwordMatcher }
        )



      });

    // this.firstName = new string('', Validators.required);
    // this.lastName = new string('', Validators.required);
    // this.nationalId = new string('');
    // this.employeeId = new string('', Validators.required);
    // this.employeePosition = new string('', Validators.required);
    // this.primaryPhone = new string('');
    // this.secondaryPhone = new string();
    // this.email = new string('', Validators.required);
    // this.homeOffice = new string('', Validators.required);
    // this.roles = new string('', Validators.required);
    // this.password = new string('', [
    //   Validators.required,
    //   Validators.maxLength(8),
    // ]);
    // this.passwordConfirmed = new string('', [
    //   Validators.required,
    //   Validators.maxLength(8)
    // ]);

    // this.newEmployeeForm = new FormGroup(
    //   {
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     nationalId: this.nationalId,
    //     employeeId: this.employeeId,
    //     employeePosition: this.employeePosition,
    //     primaryPhone: this.primaryPhone,
    //     secondaryPhone: this.secondaryPhone,
    //     email: this.email,
    //     homeOffice: this.homeOffice,
    //     role: this.roles,
    //     password: this.password,
    //     passwordConfirmed: this.passwordConfirmed
    //   }
    // );  
  }

  getError() {

  }

  save() {

  }
}
