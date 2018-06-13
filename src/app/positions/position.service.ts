import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Iposition } from '../models/iposition';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  positionsCollections: AngularFirestoreCollection<Iposition>;
  

  constructor(private afs: AngularFirestore) { 
    this.positionsCollections = this.afs.collection<Iposition>('employeePositions', ref => ref.orderBy('name'));
  }

  getPositions(): Observable<Iposition[]> {
    return this.positionsCollections.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Iposition;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }
}
