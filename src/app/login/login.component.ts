import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../users/user.service';

import { MyErrorStateMatcher, ParentErrorStateMatcher } from '../shared/MyErrorStateMatcher';



function passwordMatcher(c: AbstractControl) {
  let passwordControl = c.get('activatePassword');
  let confirmedPassword = c.get('activateConfirmedPassword')
  if (passwordControl.pristine || confirmedPassword.pristine) {
    return null;
  }
  if (passwordControl.value === confirmedPassword.value) {
    return null;
  }
  return { 'match': true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  activateForm: FormGroup;

  imgSrc = 'assets/img/flat-avatar.png';

  error: any
  isActivateAccount = false;
  hidePassword = true;
  hidePasswordConfirmed = true;

  matcher = new MyErrorStateMatcher();
  parentMatcher = new ParentErrorStateMatcher();


  constructor(
    public auth: AuthService, 
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });

    this.activateForm = this.fb.group({
      activateEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      passwordGroup: this.fb.group(
        {
          activatePassword: ['', [
            Validators.required,
            Validators.minLength(8)
          ]],
          activateConfirmedPassword: ['', [
            Validators.required
          ]]
        }, { validator: passwordMatcher })
    })

  }

  login() {
    this.auth.emailLogin(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then((employee) => {
      this.auth.authState = employee;
       
       console.log('inLoginComponent-user-uid', employee.user.uid);
                
      
        // this.userService.getEmployee('LtySLveum6o4sVHkpojQ');
        // this.userService.getEmployee('LtySLveum6o4sVHkpojQ'
        // ).subscribe(
        //   data => console.log('getEmployee', data)
        // )

      this.error = null;
      this.router.navigate(['/users']);
    })
    .catch(err => this.error = err);
  }

  activateAccount() {

  }

  toggleActivateAccount() {
    this.isActivateAccount = !this.isActivateAccount;
  }
  
}





// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { AuthService } from './../auth/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   form: FormGroup;
//   private formSubmitAttempt: boolean;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.form = this.fb.group({
//       userName: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   isFieldInvalid(field: string) {
//     return (
//       (!this.form.get(field).valid && this.form.get(field).touched) ||
//       (this.form.get(field).untouched && this.formSubmitAttempt)
//     );
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       this.authService.login(this.form.value);
//     }
//     this.formSubmitAttempt = true;
//   }
// }
