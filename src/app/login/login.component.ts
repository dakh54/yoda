import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../users/user.service';

import { MyErrorStateMatcher, ParentErrorStateMatcher } from '../shared/MyErrorStateMatcher';
import { RoleService } from '../roles/role.service';
import { Iemployee } from '../models/iemployee';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';



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

  error: string
  isActivateAccount = false;
  hidePassword = true;
  hidePasswordConfirmed = true;

  matcher = new MyErrorStateMatcher();
  parentMatcher = new ParentErrorStateMatcher();


  constructor(
    public auth: AuthService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afsAuth: AngularFireAuth
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
    this.error = null;
    this.auth.emailLogin(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then((employee) => {
        if (employee.user.emailVerified) {
          this.auth.authState = employee;
          // console.log('authState in login', this.auth.authState);
          // console.log('authState in login-authendticate', this.auth.authenticated);
          // console.log('authState in login-employee', employee);
          // console.log('authState in login-email verify', employee.user.emailVerified);


          this.router.navigate(['/users']);
        } else {
          this.error = 'Please activate your account before sign in.';
          console.log('Please activate your account before sign in.');
          //console.log('authState in login-authendticate---', this.auth.authenticated);
        }

      })
      .catch(err => this.error = err);
  }


  activateAccount() {
    this.error = null;
    // check if email has only exist one in employees collection
    // create account
    // update uid in employees
    // send verification email


    let email = this.activateEmailCtrl.value.toLowerCase().trim();
    let password = this.activatePasswordCtrl.value.trim();

    this.userService.getEmployeeByEmail(this.activateEmailCtrl.value)
      .subscribe(
        users => {
          if (users.length == 1) {
            this.auth.createUser(email, password).then(credential => {
              console.log('activate account for', credential);
              console.log('activate account for user', users);
              console.log('activate account for user[0].email', users[0].email);
              console.log('activate account-uid', credential.user.uid);

              this.afsAuth.auth.currentUser.sendEmailVerification();
              
              // credential.user.sendVerificationEmail();

              this.auth.signOut();
              this.router.navigate(['/activation-success']);

              // update uid for
              // this.userService.updateEmployeeUid(users[0], credential.user.uid)
              // this.updateUserProfile(users[0], credential.user.uid)
              // .then(data =>
              //   console.log('succesfully update employee uid', data)
              // ).catch(err => {
              //   console.log('Failed to update employee uid', err);
              // });

              //send email verification
              // this.auth.sendVerificationEmail(credential);

            }
            ).catch(err => {
              this.error = 'Failed to activate. Please contact IT for support.'
              console.log('Failed to activate this account.', err);
              this.router.navigate(['activation-fail']);
            });


          } else if (users.length > 1) {
            this.error = 'Failed to activate. Please contact IT for support.'
            console.log('Failed to activate as there are multiple account.');
            this.router.navigate(['activation-fail']);
          } else {
            this.error = 'Failed to activate. Please contact IT for support.'
            console.log('Failed to activate this account as there is no account tight to this email.');
            this.router.navigate(['activation-fail']);
          }



        },
        err => {
          this.error = 'Failed to activate account. Please contact IT for support.'
          console.log('Failed to get employee data by email', err);
        }
      );


  }

  toggleActivateAccount() {
    this.error = null;
    this.isActivateAccount = !this.isActivateAccount;
    if (this.isActivateAccount) {
      this.activateForm.reset();
    } else {
      this.loginForm.reset();

    }
  }


  updateUserProfile(employee: Iemployee, new_uid: string) {
    return this.afs.collection('employees').doc(employee.email).set({
      uid: new_uid
    }, { merge: true });
  }


  //form control getter
  get activateEmailCtrl() {
    return this.activateForm.get('activateEmail');
  }

  get activatePasswordCtrl() {
    return this.activateForm.get('passwordGroup.activatePassword');
  }

  get activateConfirmedPasswordCtrl() {
    return this.activateForm.get('passwordGroup.activateConfirmedPassword');
  }
}


