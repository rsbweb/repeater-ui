import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageNames } from '../models/routes.model';
import { AuthsvcService } from '../services/authsvc.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean =false;
  authSubscription : Subscription | undefined;
  message: any = '';
  userId:string='';
  userLoggedIn:string='';
  isAdmin:string='';

  ngOnInit(){
    this.authSubscription = this.authEvent.authListener().subscribe(state => {
      this.isLoggedIn=state;
      this.userId=sessionStorage.getItem('userId') as string;
      this.userLoggedIn=sessionStorage.getItem('userLoggedIn') as string;
      this.isAdmin=sessionStorage.getItem('isAdmin') as string;
    });
  }

  constructor(private router: Router, public loginService: LoginService, private _formBuilder: FormBuilder,private authEvent: AuthsvcService) { }
  openHome(){
    if(this.userLoggedIn=='Y'){
      if(this.isAdmin=='Y'){
        this.router.navigate([PageNames.ADMIN_URL]);
      }else{
        this.router.navigate([PageNames.USER_URL]);
      }
    }else{
      this.router.navigate([PageNames.LOGIN_URL]);
    }
  }

  w3_open() {
    let mySidebar = document.getElementById("mySidebar") as HTMLElement;
    let overlayBg = document.getElementById("myOverlay") as HTMLElement;
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
      overlayBg.style.display = "none";
    } else {
      mySidebar.style.display = 'block';
      overlayBg.style.display = "block";
    }
  }

  w3_close() {
    let mySidebar = document.getElementById("mySidebar") as HTMLElement;
    let overlayBg = document.getElementById("myOverlay") as HTMLElement;
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  }

  logout(){
    sessionStorage.clear();
    this.authEvent.emitAuthStatus(false);
    this.router.navigate([PageNames.LOGIN_URL]);
  }

  openNav() {
    var x = document.getElementById("navDemo") as HTMLElement;
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }

  navigateToAddIssue(){
    this.router.navigate([PageNames.ADMIN_URL]);
  }

  navigateToMyIssues(){
    this.router.navigate([PageNames.USER_URL]);
  }
  navigateToOpenIssues(){
    this.router.navigate([PageNames.OPEN_ISSUES_URL]);
  }

  navigateToAddUser(){
    this.router.navigate([PageNames.ADD_USER_URL]);
  }
  navigateToViewAllIssues(){
    this.router.navigate([PageNames.VIEW_ALL_ISSUES]);
  }
 
}
