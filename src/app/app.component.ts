import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageNames } from './models/routes.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'repeater-ui';
  userLoggedIn: string = 'N';

  constructor(private router:Router){}

  ngOnInit(){
    const storedUserLoggedIn = sessionStorage.getItem("userLoggedIn");
    if(storedUserLoggedIn){
      this.userLoggedIn = storedUserLoggedIn;
    }else{
      this.userLoggedIn = 'N';
    }
    if(this.userLoggedIn==='N'){
      this.router.navigate([PageNames.LOGIN_URL]);
    }
  }
}
