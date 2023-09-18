import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNames } from '../models/routes.model';
import { AuthsvcService } from '../services/authsvc.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  message: any = '';
  userId:string='';

  ngOnInit(){
    this.userId=sessionStorage.getItem('userId') as string;
    this.authEvent.emitAuthStatus(true);
  }

  constructor(private router: Router, public loginService: LoginService, private _formBuilder: FormBuilder,private authEvent: AuthsvcService) { }

  form: FormGroup = this._formBuilder.group({
    activityType: new FormControl("", [Validators.required]),
    companyName: new FormControl("", [Validators.required]),
    companyAddress: new FormControl("", [Validators.required]),
    companyLocation: new FormControl("", [Validators.required]),
    customerContactName: new FormControl("", [Validators.required]),
    customerContactNumber: new FormControl("", [Validators.required])
  })

  addIssue() {
    let userId:string= sessionStorage.getItem('userId') as string;
    this.loginService.addIssue(this.form.value,userId).subscribe(response => {
      console.log("Added Issue");
      this.message=response['message' as keyof typeof response];
      console.log(this.message);
    });
  }
}
