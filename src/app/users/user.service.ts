import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Iemployee } from '../models/index-models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private employeeCollection: AngularFirestoreCollection<Iemployee>;
  employeeRef;
  
  private collectionName: string = 'employees'

  constructor(private db: AngularFirestore) { 
    this.employeeCollection = db.collection<Iemployee>('employees');
  }

  getEmployees(): Observable<Iemployee[]> {
    return this.employeeCollection.valueChanges();
  }


  getEmployee(userId: string)  {
   // return this.db.doc(`employees/${userId}`).valueChanges();
   
  }

  getEmployeeByEmail(email: string) {
    return this.db.collection<Iemployee>('employees', ref => ref.where('email', '==', email)).valueChanges();
  }

  addNewEmployee(employee: Iemployee) {
    employee.email = employee.email.toLowerCase();
    employee.status = 'Active';
    return this.employeeCollection.doc(employee.email).set({ employee }, { merge: true });
    
  }

  // updateEmployeeUid(employee: Iemployee, newUid: string) {
  //   return this.employeeCollection.doc(employee.email).set({
  //     uid: newUid
  //   }, { merge: true });
  // }
}
