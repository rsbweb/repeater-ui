import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string='';

  constructor(public httpClient: HttpClient) { 
    this.baseUrl="http://localhost:8080";
  }

  login(username:string,password:string){
    let serverUrl = this.baseUrl+"/api/login";
    let requestBody = {
      username,
      password
    }
    var headers = new HttpHeaders();
    var options = {headers: headers};
    return this.httpClient.post(serverUrl,requestBody,options);
  }

  addIssue(requestBody: any,userId:string){
    let serverUrl = this.baseUrl+"/api/issues/updateIssue";
    var headers = new HttpHeaders();
    headers = headers.set('userId',userId);
    var options = {headers: headers};
    return this.httpClient.post(serverUrl,requestBody,options);
  }

  getAllIssues(){
    let serverUrl = this.baseUrl+"/api/issues/getAll";
    var headers = new HttpHeaders();
    var options = {headers: headers};
    return this.httpClient.get(serverUrl,options);
  }

  updateAssignee(userId:string,issueId:string){
    let serverUrl = this.baseUrl+"/api/issues/updateAssignee";
    console.log(issueId);
    console.log(userId);
    var headers = new HttpHeaders()
    headers = headers.set('userId',userId as string);
    headers = headers.set('issueId', String(issueId));
    var options = {headers: headers};
    console.log(options);
    return this.httpClient.get(serverUrl,options);
  }

  updateStatus(status:string,issueId:string){
    let serverUrl = this.baseUrl+"/api/issues/updateStatus";
    var headers = new HttpHeaders()
    headers = headers.set('status',status as string);
    headers = headers.set('issueId', String(issueId));
    var options = {headers: headers};
    console.log(options);
    return this.httpClient.post(serverUrl,{},options);
  }

  getIssueBasedOnUser(userId:string){
    let serverUrl = this.baseUrl+"/api/issues/getIssueBasedOnUser";
    var headers = new HttpHeaders();
    headers = headers.set('userId',userId);
    var options = {headers: headers};
    return this.httpClient.get(serverUrl,options);
  }

  updateStatusForCompleted(status:string,issueId:string,closureDetails:any){
    let serverUrl = this.baseUrl+"/api/issues/updateStatus";
    var headers = new HttpHeaders()
    headers = headers.set('status',status as string);
    headers = headers.set('issueId', String(issueId));
    var options = {headers: headers};
    console.log(options);
    return this.httpClient.post(serverUrl,closureDetails,options);
  }

}
