import { Iperson } from "./iperson";

export interface Iemployee extends Iperson {
    employeeId: string
    position?: string
    roles: string []
    homeOffice?: string
    status?: string
}
