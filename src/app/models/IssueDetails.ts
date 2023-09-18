export interface IssueDetails{
    issueId: string;
    activityType:string;
    createdTimestamp:string;
    issueReportedTimestamp:string;
    companyName: string;
    companyAddress: string;
    companyLocation: string;
    customerContactName: string;
    customerContactNumber: string;
    status: string;
    assignedUserName: string;
}

export interface UserDetails{
    userName: string;
    password:string;
    isAdmin:boolean;
}