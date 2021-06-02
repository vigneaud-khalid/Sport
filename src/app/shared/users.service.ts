import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user:User={};
  constructor(private http:HttpClient) { }

  reachableHost:string= "http://localhost:3000";

  getUserByEmail(email :string): Observable<User[]>{
    let host= this.reachableHost;
    console.log("email !!!!=" + email);
    console.log(this.http.get<any>(host+"/users?email_like="+email));
    console.log(" !!!!" );
    return this.http.get<any>(host+"/users?email_like="+email);
   }
  
}
