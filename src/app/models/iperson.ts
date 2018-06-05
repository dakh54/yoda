import { Iaddress } from "./iaddress";

export interface Iperson {
    uid: string
    firstName?: string
    lastName?: string
    nationalId?: string
    phone?: string []
    pictureUrl?: string
    email?: string
}
