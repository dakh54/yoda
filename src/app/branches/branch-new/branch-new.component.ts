import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { debounceTime, map, take, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-branch-new',
  templateUrl: './branch-new.component.html',
  styleUrls: ['./branch-new.component.scss']
})
export class BranchNewComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private afs: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:  ['', [
        Validators.required, 
        Validators.email
      ]],
      username:  ['', 
        Validators.required
      ],
    });

    this.email.valueChanges.pipe(
      map(email => email.toLocaleLowerCase().trim()),
      debounceTime(500),
      distinctUntilChanged(),
      tap(em => console.log('distinct until change', em))
      // switchMap(email => this.afs.collection('employees', ref => ref.where('email', '==', email)).valueChanges()),
      // take(1),
      // map(users => users.length ? { exist: false } : null)
  ).subscribe(
    email => console.log('suscribe', email)
  )

  }

  // Use getters for cleaner HTML code

  get email() {
    return this.loginForm.get('email')
  }

  get username() {
    return this.loginForm.get('username')
  }



}


