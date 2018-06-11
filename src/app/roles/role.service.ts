import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Irole } from '../models/irole';


@Injectable()
export class RoleService {
  rolesCollection: AngularFirestoreCollection<Irole>;
  private collectionName: string = 'roles'

  constructor(private afs: AngularFirestore) {
    this.rolesCollection = this.afs.collection<Irole>(this.collectionName, ref => ref.orderBy('name'));
   }

   getRoles() {
    return this.rolesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Irole;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
   }

   getRole(role: string) {
      return this.afs.collection<Irole>(this.collectionName, ref => ref.where('name','==', role)).valueChanges();
   }
}
