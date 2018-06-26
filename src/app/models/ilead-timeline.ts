import { IpersonBrief } from "./iperson-brief";

export interface IleadTimeline {
    createAt: Date
    createBy: IpersonBrief
    comments?: string
    status: string
    assignTo: IpersonBrief
}
