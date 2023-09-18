import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthsvcService {

  private authEvent = new BehaviorSubject<boolean>(true);
   constructor(){}

   emitAuthStatus(state: boolean){
     this.authEvent.next(state);
   }

   authListener(){
     return this.authEvent.asObservable();
   }
}
