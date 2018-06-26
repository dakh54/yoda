import { IpersonBrief } from "./iperson-brief";

export interface IemployeeStat extends IpersonBrief {
    workingLeads?: number
    disqualifiedLeads?: number
    convertedLeads?: number;
    pendingLoans?: number;
    rejectLoans?: number;
    suspendLoans?: number;
    approvedLoans?: number
}
