import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

import { Iuser } from './iuser';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user: Observable<Iuser>;

  // constructor(private afAuth: AngularFireAuth,
  //             private afs: AngularFirestore,
  //             private router: Router) {

  //     //           console.log('afAuth', this.afAuth.authState);
  //     //           // console.log('this.afs.doc<Iuser>', this.afs.doc<Iuser>(`users/${user.id}`));
  //     //           // this.afAuth.authState.pipe(
  //     // console.log('users:', this.user);
  //               // )
  //     // Define the user observable
  //     this.user = this.afAuth.authState.pipe(
  //         switchMap(user => {
  //           if (user) {
  //             // logged in, get custom user from Firestore
  //             console.log('customData', this.afs.doc<Iuser>(`users/${user.email}`).valueChanges());
  //             return this.afs.doc<Iuser>(`users/${user.email}`).valueChanges()
  //           } else {
  //             // logged out, null
  //             return of(null)
  //           }
  //         })
  //       );

  //       console.log()
  // }

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth  });
      console.log('authState', this.authState);
    }

    emailLogin(email:string, password:string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          //this.authState = user
          //console.log('this.authState', this.authState)
          //this.updateUserData()
          console.log('login-user', user);
        })
        .catch(error => console.log(error));
   }
 
  //  // Sends email allowing user to reset password
  //  resetPassword(email: string) {
  //    var auth = firebase.auth();
 
  //    return auth.sendPasswordResetEmail(email)
  //      .then(() => console.log("email sent"))
  //      .catch((error) => console.log(error))
  //  }
 
 
  //  //// Sign Out ////
  //  signOut(): void {
  //    this.afAuth.auth.signOut();
  //    this.router.navigate(['/'])
  //  }
 
 
  //  //// Helpers ////
  //  private updateUserData(): void {
  //  // Writes user name and email to realtime db
  //  // useful if your app displays information about users or for admin features
  //    let path = `users/${this.currentUserId}`; // Endpoint on firebase
  //    let data = {
  //                  email: this.authState.email,
  //                  name: this.authState.displayName
  //                }
 
  //    this.db.object(path).update(data)
  //    .catch(error => console.log(error));
 
  //  }
}
