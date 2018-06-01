import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
  }

  login() {
    this.auth.emailLogin(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then((user) => {
      this.auth.authState = user;
      
      console.log('userId', this.auth.authState);
      
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
