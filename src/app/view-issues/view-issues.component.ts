import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNames } from '../models/routes.model';
import { AuthsvcService } from '../services/authsvc.service';
import { IssueDetails, UserDetails } from '../models/IssueDetails';

@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.css']
})
export class ViewIssuesComponent {
  message: any = '';
  userId:string='';
  issueDetailsAll: IssueDetails[]= [];
  userDetailsAll: UserDetails[]= [];
  assignedMessage:string='';
  viewMoreIssue!: IssueDetails;
  viewMoreIssueBoolean : boolean = false;
  issueIdCurrent:string='';
  ngOnInit(){
    this.userId=sessionStorage.getItem('userId') as string;
    this.authEvent.emitAuthStatus(true);
    this.getAllIssues();
    this.getAllUsers();
  }

  constructor(private router: Router, public loginService: LoginService, private _formBuilder: FormBuilder,private authEvent: AuthsvcService) { }

  getAllUsers(){
    this.loginService.getAllUsers().subscribe(response=> {
      this.userDetailsAll = response as UserDetails[];
      console.log(this.userDetailsAll);
      console.log(this.userDetailsAll.at(0)?.userName);
    });
  }

  getAllIssues(){
    this.loginService.getAllIssues().subscribe(response=> {
      this.issueDetailsAll = response as IssueDetails[];
      console.log(this.issueDetailsAll);
      console.log(this.issueDetailsAll.at(0)?.activityType);
    });
  }

  updateAssignee(userId:string,issueId:string){
    this.loginService.updateAssignee(userId,issueId).subscribe(response=>{
      if(response['isSuccess' as keyof typeof response]){
        this.assignedMessage=`Issue ID ${issueId} has been assigned to ${userId}`;
        let modal =  document.getElementById('id01') as HTMLElement;
        modal.style.display='block';
      }else{
        this.assignedMessage=`There occured a problem while assigning Issue ID ${issueId} to ${userId}`;
      }
      this.getAllIssues();
    });
  }

  viewDetails(issue: IssueDetails){
    this.viewMoreIssueBoolean=true;
    this.viewMoreIssue = issue;
    let modal =  document.getElementById('id02') as HTMLElement;
    modal.style.display='block';
  }

  confirmDelete(issueId:string){
    this.issueIdCurrent = issueId;
    let modal =  document.getElementById('id03') as HTMLElement;
    modal.style.display='block';
  }
  
  deleteIssue(){
    this.loginService.deleteIssue(this.issueIdCurrent).subscribe(response=>{
      this.assignedMessage=`Issue ID ${this.issueIdCurrent} has been deleted`;
      let modal =  document.getElementById('id03') as HTMLElement;
      modal.style.display='none';
      this.issueIdCurrent='';
      this.getAllIssues();
    })
  }
}
