import { AngularFirestore } from "angularfire2/firestore";
import { AbstractControl } from "@angular/forms";
import { debounceTime, map, take, tap } from "rxjs/operators";


export class CustomValidator {
    static uniqueEmployeeEmail(afs: AngularFirestore) {
        return (c: AbstractControl) => {
            const email = c.value.toLocaleLowerCase();
            return afs.collection('employees', ref => ref.where('email', '==', email))
                .valueChanges().pipe(
                    debounceTime(500),
                    take(1),
                    map(arr => arr.length ? { exist : true } : null)
                )
            }
    }
}



