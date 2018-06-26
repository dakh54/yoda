import { Iaddress } from "./iaddress";
import { Database } from "@firebase/database";

export interface Iperson {
    uid?: string // set documentId of AngularFireStore in a collection
    userId: string
    firstName?: string
    lastName?: string
    nationalId?: string
    phone?: string []
    photoURL?: string
    email?: string
    createAt?: Date;
    createBy?: string
}
