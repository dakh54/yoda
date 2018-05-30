import { Iperson } from "../shared/iperson";

export interface Iuser extends Iperson {
    uid: string
    employeeId: string
    position?: string
    roles: string []
}
