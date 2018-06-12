import { Iaddress } from "./iaddress";

export interface Iperson {
    uid?: string // set documentId of AngularFireStore in a collection
    userId: string
    firstName?: string
    lastName?: string
    nationalId?: string
    phone?: string []
    pictureUrl?: string
    email?: string
    createAt?: Date
    createBy?: string
}
