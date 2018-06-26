import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore
} from "angularfire2/firestore";
import { Router } from "@angular/router";
// import * as firebase from "firebase/app";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Iemployee } from "../models/iemployee";
import { User } from "@firebase/auth-types";
import { IpersonBrief } from "../models/iperson-brief";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authState: any = null;
  // employee: Observable<Iemployee>;
  private _user: IpersonBrief;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    // this.employee = this.afAuth.authState.pipe(
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  set User(briefUser: IpersonBrief){
    this._user = briefUser;
  }

  get User(): IpersonBrief {
    return this._user;
  }

  // emailLogin(email: string, password: string) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  // }

  
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

 

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // getAddionalUserInfo() {
  //   console.log('getAdditionalUserInfo - authenticate', this.authenticated);
  //   if(this.authenticated) {
  //     console.log('getAdditionalUserInfo', this.afAuth.auth.currentUser.email);
  //     this.afs.doc(`employees/${this.afAuth.auth.currentUser.email}`).valueChanges();
  //   }

  //   console.log('this.afAuth.auth.currentUser.email', this.afAuth.auth.currentUser.email);
  // }

  createUser(email: string, password: string){
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // sendVerificationEmail(user: any) {
  //   return user.sendVerificationEmail();
  // }
  // // Returns current user
  // get currentUser(): any {
  //   if (this.authenticated) {
  //     let employeeCollection: AngularFirestoreCollection<Iemployee>;
  //     employeeCollection = this.afs.collection<Iemployee>("employees", ref =>
  //       ref
  //         .where("email", "==", this.authState.user.email)
  //         .where("status", "==", "active")
  //         .limit(1)
  //     );

  //     employeeCollection.valueChanges().subscribe(
  //       data => {
  //         console.log("data[0]", data[0]);
  //         return data[0];
  //       },
  //       error => {
  //         return "error data user";
  //       }
  //     );
  //   } else {
  //     return null;
  //   }

  //   //   return this.authenticated ? this.authState.auth : null;
  // }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
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
    this._user = null;
    // this.router.navigate(["/"]);
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

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { User } from './user';

// @Injectable()
// export class AuthService {
//   private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   get isLoggedIn() {
//     return this.loggedIn.asObservable();
//   }

//   constructor(
//     private router: Router
//   ) {}

//   login(user: User) {
//     if (user.userName !== '' && user.password !== '' ) {
//       this.loggedIn.next(true);
//       this.router.navigate(['/']);
//     }
//   }

//   logout() {
//     this.loggedIn.next(false);
//     this.router.navigate(['/login']);
//   }
// }
