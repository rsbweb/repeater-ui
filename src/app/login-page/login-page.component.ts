import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { PageNames } from '../models/routes.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string='';
  password: string='';
  message:any = '';
  
  constructor(private router: Router,public loginService: LoginService) { }

  ngOnInit(){
    console.log("Inside LoginPage Component");
  }
  login() {
    console.log("Login () method called");
    console.log(this.username);
    console.log(this.password);
    this.loginService.login(this.username,this.password).subscribe(response => {
      console.log("Validating success");
        if(response['isSuccess' as keyof typeof response]){
          console.log("success");
          sessionStorage.setItem("userLoggedIn",'Y');
          sessionStorage.setItem("userId",this.username);
          if(response['isAdmin' as keyof typeof response]){
            console.log("Admin Page");
            sessionStorage.setItem("isAdmin",'Y');
            this.router.navigate([PageNames.ADMIN_URL]);
          }else{
            sessionStorage.setItem("isAdmin",'N');
            console.log("User Page");
            this.router.navigate([PageNames.USER_URL]);
          }
        }else{
          console.log("Not Success");
          this.message=response['message' as keyof typeof response];
          console.log(this.message);
        }
    });
  }
}
