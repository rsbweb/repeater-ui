import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNames } from '../models/routes.model';
import { AuthsvcService } from '../services/authsvc.service';
import { UserDetails } from '../models/IssueDetails';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  message: any = '';
  userId:string='';
  userDetailsAll: UserDetails[]= [];
  adminDetailsAll: UserDetails[]= [];
  assignedMessage:string='';
  viewMoreIssueBoolean : boolean = false;
  userIdCurrent:string='';

  ngOnInit(){
    this.userId=sessionStorage.getItem('userId') as string;
    this.authEvent.emitAuthStatus(true);
    this.getAllUsers();
    this.getAdminUsers();
  }
  
  constructor(private router: Router, public loginService: LoginService, private _formBuilder: FormBuilder,private authEvent: AuthsvcService) { }

  form: FormGroup = this._formBuilder.group({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    isAdmin: new FormControl("", [Validators.required]),
  })
  getAllUsers(){
    this.loginService.getAllUsers().subscribe(response=> {
      this.userDetailsAll = response as UserDetails[];
      console.log(this.userDetailsAll);
      console.log(this.userDetailsAll.at(0)?.userName);
    });
  }

  getAdminUsers(){
    this.loginService.getAllAdmins().subscribe(response=> {
      this.adminDetailsAll = response as UserDetails[];
      console.log(this.adminDetailsAll);
      console.log(this.adminDetailsAll.at(0)?.userName);
    });
  }

  confirmDelete(userId:string){
    this.userIdCurrent = userId;
    let modal =  document.getElementById('id03') as HTMLElement;
    modal.style.display='block';
  }
  
  deleteUser(){
    this.loginService.deleteUser(this.userIdCurrent).subscribe(response=>{
      this.assignedMessage=`Issue ID ${this.userIdCurrent} has been deleted`;
      let modal =  document.getElementById('id03') as HTMLElement;
      modal.style.display='none';
      this.userIdCurrent='';
      this.getAllUsers();
      this.getAdminUsers();
    })
  }

  addUser(){
    this.loginService.addUser(this.form.value).subscribe(response => {
      console.log("Added User");
      this.message=response['message' as keyof typeof response];
      console.log(this.message);
      this.getAllUsers();
      this.getAdminUsers();
    });
  }
}
