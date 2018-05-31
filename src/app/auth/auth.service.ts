import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Iemployee } from '../models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  authState: any = null;
  

  constructor(private afAuth: AngularFireAuth,
//    private db: AngularFireDatabase,
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

  

  // // Returns current user
  // get currentUser(): any {
    
  //   // if(this.authenticated) {

  //   //   let employeeCollection: AngularFirestoreCollection<Iemployee>;
  //   //   employeeCollection = this.afs.collection('employees', ref =>
  //   //   {
  //   //     return ref.where('email', '==',  this.authState.user.email).where('status', '==', 'active').limit(1);
  //   //   });
  
  //   //     employeeCollection.valueChanges().subscribe(
  //   //       data => { 
  //   //         return data[0]; 
  //   //       },
  //   //       error => { return 'error data user' }
  //   //     )
  //   //   } else {
  //   //     return null;
  //   //   }
    

    
  //   return this.authenticated ? this.authState.auth : null;
  // }

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
