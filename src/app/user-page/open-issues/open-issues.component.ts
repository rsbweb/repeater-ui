import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNames } from '../../models/routes.model';
import { AuthsvcService } from '../../services/authsvc.service';
import { IssueDetails } from '../../models/IssueDetails';

@Component({
  selector: 'app-open-issues',
  templateUrl: './open-issues.component.html',
  styleUrls: ['./open-issues.component.css']
})
export class OpenIssuesComponent {
  message: any = '';
  userId:string='';
  issueDetailsAll: IssueDetails[]= [];
  assignedMessage:string='';
  viewMoreIssue!: IssueDetails;
  viewMoreIssueBoolean : boolean = false;
  ngOnInit(){
    this.userId=sessionStorage.getItem('userId') as string;
    this.authEvent.emitAuthStatus(true);
    this.getAllIssues();
  }

  constructor(private router: Router, public loginService: LoginService, private _formBuilder: FormBuilder,private authEvent: AuthsvcService) { }

  getAllIssues(){
    this.loginService.getAllIssues().subscribe(response=> {
      this.issueDetailsAll = response as IssueDetails[];
      console.log(this.issueDetailsAll);
      console.log(this.issueDetailsAll.at(0)?.activityType);
    });
  }

  assignIssueToUser(issueId:string){
    this.loginService.updateAssignee(this.userId,issueId).subscribe(response=>{
      if(response['isSuccess' as keyof typeof response]){
        this.assignedMessage=`Issue ID ${issueId} has been assigned to you`;
        let modal =  document.getElementById('id01') as HTMLElement;
        modal.style.display='block';
      }else{
        this.assignedMessage=`There occured a problem while assigning Issue ID ${issueId} to you`;
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

}
