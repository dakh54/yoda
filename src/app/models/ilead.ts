import { Iaddress } from "./iaddress";
import { Iphone } from "./iphone";
import { Iemployee } from "./iemployee";
import { IpersonBrief } from "./iperson-brief";

export interface Ilead {
    firstName?: string
    lastName?: string
    address?: Iaddress
    phones?: Iphone
    comments?: string
    status?: string
    assignTo?:IpersonBrief []
    createAt: Date
    createBy?: IpersonBrief
}
