import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

import { Iuser } from '../users/iuser';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router) {
    
    // get authState when there is a change in login
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  //  // Sends email allowing user to reset password
  //  resetPassword(email: string) {
  //    var auth = firebase.auth();

  //    return auth.sendPasswordResetEmail(email)
  //      .then(() => console.log("email sent"))
  //      .catch((error) => console.log(error))
  //  }


   //// Sign Out ////
   signOut(): void {
     this.afAuth.auth.signOut();
     this.router.navigate(['/'])
   }


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
