import { IpersonBrief } from "./iperson-brief";
import { Iloans } from "./iloans";

export interface IemployeeLoans extends IpersonBrief {
    pendingLoans?: Iloans [];
    rejectLoans?: Iloans [];
    suspendLoans?: Iloans [];
    approvedLoans?: Iloans [];
}
