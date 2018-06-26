import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

import { Iemployee } from "../models/index-models";
import { Observable } from "rxjs";
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private employeeCollection: AngularFirestoreCollection<Iemployee>;
  employeeRef;

  private collectionName: string = "employees";

  constructor(private db: AngularFirestore) {
    this.employeeCollection = db.collection<Iemployee>(this.collectionName);
  }

  getEmployees(): Observable<Iemployee[]> {
    return this.employeeCollection.valueChanges();
  }

  getEmployee(userId: string) {
    return this.db.doc(`employees/${userId}`).valueChanges();
  }

  getEmployeeByEmail(email: string) {
    return this.db
      .collection<Iemployee>(this.collectionName, ref =>
        ref.where("email", "==", email)
      )
      .valueChanges();
  }

  addNewEmployee(employee: Iemployee) {
    employee.email = employee.email.toLowerCase();
    employee.status = "Active";
    return this.employeeCollection
      .doc(employee.email)
      .set(employee, { merge: true });
  }

  updateCreatedAt(employee: Iemployee) {
    return this.employeeCollection.doc(employee.email).update({
      createAt: firestore.FieldValue.serverTimestamp()
    });
  }
  
}
