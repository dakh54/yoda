import { Iaddress } from "./iaddress";

export interface Iperson {
    firstName?: string
    lastName?: string
    nationalId?: string
    address?: Iaddress
    phone?: string []
    pictureUrl?: string
    displayname?: string
    email?: string
}
