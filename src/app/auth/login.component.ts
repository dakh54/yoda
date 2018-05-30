import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  error: any
  
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });

    console.log('loginComponent', this.auth.authenticated);
  }

  login(loginFormValue) {
    this.auth.emailLogin(loginFormValue.email, loginFormValue.password)
    .then((user) => {
      this.auth.authState = user;
      this.error = null;
      this.router.navigate(['/users']);
    })
    .catch(err => this.error = err);
  }

  logout() {
    this.auth.signOut();
  } 

  goToUser() {
    this.router.navigate(['/users/1/edit']);
  }
}
