import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Iemployee } from '../models/index-models';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private employeeCollection: AngularFirestoreCollection<Iemployee>;

  constructor(private db: AngularFirestore) { 
    this.employeeCollection = this.db.collection<Iemployee>('employees');

  }

  getEmployees(): Observable<Iemployee[]> {
    return this.employeeCollection.snapshotChanges();
  }
}
