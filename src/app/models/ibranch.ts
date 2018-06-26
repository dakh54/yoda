import { Iaddress } from "./iaddress";
import { Iemployee } from "./iemployee";

export interface Ibranch {
    id: string
    branchCode: string
    name: string
    address?: Iaddress
    email?: string []
    telephone?: string []
    employees?: Iemployee []
}
