import { IpersonBrief } from "./iperson-brief";
import { Ilead } from "./ilead";

export interface IemployeeLeads extends IpersonBrief {
    workingLeads?: Ilead []
    disqualifiedLeads?: Ilead[]
    convertedLeads?: Ilead []
}
