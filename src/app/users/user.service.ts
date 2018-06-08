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
  

  constructor(private db: AngularFirestore) { 
    this.employeeCollection = db.collection<Iemployee>('employees');
  }

  getEmployees(): Observable<Iemployee[]> {
    // return this.employeeCollection.snapshotChanges().pipe(
    //   map(change => {
    //     return change.map(a => {
    //       const data = a.payload.doc.data() as Iemployee;
    //       data.uid = a.payload.doc.id;
    //       return data;
    //     })
    //   })
    // );
    return this.employeeCollection.valueChanges();
  }

  existedEmail(email: string) {
  }

  getTakenEmails(){
    return this.db.collection('emailTaken').valueChanges();
  }


  getEmployee(userId: string)  {
     
    return this.db.doc(`employees/${userId}`).valueChanges();
  }

  addNewEmployee(employee: Iemployee) {
    employee.email = employee.email.toLocaleLowerCase();
    employee.status = 'Active';
    return this.employeeCollection.doc(employee.email).set(employee);
  }
}
