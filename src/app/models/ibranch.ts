import { Iaddress } from "./iaddress";

export interface Ibranch {
    id: string
    branchCode: string
    name: string
    address?: Iaddress
    email?: string []
    telephone?: string []
}
