import { Iperson } from "./iperson";

export interface Iemployee extends Iperson {
    employeeId: string // CO code
    // position?: string
    roles: string []
    homeOffice?: string
    status?: string
   
}
