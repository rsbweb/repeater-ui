import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNames } from '../models/routes.model';
import { AuthsvcService } from '../services/authsvc.service';
import { IssueDetails } from '../models/IssueDetails';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  message: any = '';
  userId:string='';
  issueDetailsAll: IssueDetails[]= [];
  issueIdCurrent : string='';
  assignedMessage:string='';
  viewMoreIssue!: IssueDetails;
  viewMoreIssueBoolean : boolean = false;
  ngOnInit(){
    this.userId=sessionStorage.getItem('userId') as string;
    this.authEvent.emitAuthStatus(true);
    this.getIssueBasedOnUser();
  }

  constructor(private router: Router, public loginService: LoginService, private _formBuilder: FormBuilder,private authEvent: AuthsvcService) { }
  form: FormGroup = this._formBuilder.group({
    remarks1: new FormControl("", [Validators.required]),
    remarks2: new FormControl("", [Validators.required]),
    remarks3: new FormControl("", [Validators.required]),
  })
  getIssueBasedOnUser(){
    this.loginService.getIssueBasedOnUser(this.userId).subscribe(response=> {
      this.issueDetailsAll = response as IssueDetails[];
      console.log(this.issueDetailsAll);
    });
  }

  viewDetails(issue: IssueDetails){
    this.viewMoreIssueBoolean=true;
    this.viewMoreIssue = issue;
    let modal =  document.getElementById('id02') as HTMLElement;
    modal.style.display='block';
  }
  updateStatus(status:string,issueId:string){
    this.loginService.updateStatus(status,issueId).subscribe(response=>{
      if(response['isSuccess' as keyof typeof response]){
        this.assignedMessage=`Issue ID ${issueId} has been moved to ${status}`;
        let modal =  document.getElementById('id01') as HTMLElement;
        modal.style.display='block';
      }else{
        this.assignedMessage=`There occured a problem while updating the status of Issue ID ${issueId}`;
      }
      this.getIssueBasedOnUser();
    });
  }

  moveToCompleted(issueId:string){
    this.issueIdCurrent = issueId;
    let modal =  document.getElementById('id03') as HTMLElement;
    modal.style.display='block';
  }

  markAsCompleted(){
    this.loginService.updateStatusForCompleted("COMPLETED",this.issueIdCurrent,this.form.value).subscribe(response=>{
      if(response['isSuccess' as keyof typeof response]){
        this.assignedMessage=`Issue ID ${this.issueIdCurrent} has been moved to COMPLETED. Congratulations !!`;
        let modal =  document.getElementById('id03') as HTMLElement;
        modal.style.display='none';
      }else{
        this.assignedMessage=`There occured a problem while updating the statue of Issue ID ${this.issueIdCurrent}`;
      }
      this.getIssueBasedOnUser();
      this.issueIdCurrent='';
    });
  }
}
