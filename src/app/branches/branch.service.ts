import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Ibranch } from '../models/ibranch';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  branchesCollections: AngularFirestoreCollection<Ibranch>;
  branches$: Observable<Ibranch[]>;

  constructor(private afs: AngularFirestore) {
    this.branchesCollections = this.afs.collection<Ibranch>('branches');
  }

  getBranches(): Observable<Ibranch[]> {
    return this.branchesCollections.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Ibranch;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }
}
