import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from "firebase/app";

import { Iemployee } from '../models/index-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getEmployee(userId: string)  {
     
    return this.db.doc(`employees/${userId}`).valueChanges();
  }
}
