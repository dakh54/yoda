import { AngularFirestore } from "angularfire2/firestore";
import { AbstractControl } from "@angular/forms";
import { debounceTime, map, take } from "rxjs/operators";



export class CustomValidator {
   
    static collectionName: string = 'employees'

    static uniqueEmployeeEmail(afs: AngularFirestore) {
        return (c: AbstractControl) => {
            const email = c.value.toLocaleLowerCase();
            return afs.collection(this.collectionName, ref => ref.where('email', '==', email))
                .valueChanges().pipe(
                    debounceTime(500),
                    take(1),
                    map(arr => arr.length ? { exist : true } : null)
                )
            }
    }


    static uniqueEmployeeId(afs: AngularFirestore) {
        return (c: AbstractControl) => {
            const employeeId = c.value.toLocaleLowerCase();
            return afs.collection(this.collectionName, ref => ref.where('employeeId', '==', employeeId))
                .valueChanges().pipe(
                    debounceTime(500),
                    take(1),
                    map(arr => arr.length ? { exist : true } : null)
                )
            }
    }
    
    static uniqueNationalId(afs: AngularFirestore) {
        return (c: AbstractControl) => {
            const nationalId = c.value.toLocaleLowerCase();
            return afs.collection(this.collectionName, ref => ref.where('nationalId', '==', nationalId))
                .valueChanges().pipe(
                    debounceTime(500),
                    take(1),
                    map(arr => arr.length ? { exist : true } : null)
                )
            }
    }
}


