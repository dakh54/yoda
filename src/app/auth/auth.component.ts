import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  
  constructor(private auth: AuthService) { }

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
  }

  login(loginFormValue) {
    console.log('formGroup', loginFormValue);
    this.auth.emailLogin(loginFormValue.email, loginFormValue.password).catch(;
  }
}
