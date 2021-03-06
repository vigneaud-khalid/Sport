import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/';
const role = "user";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    //this.tokenStorageService.saveRole(role);
    return this.http.post(AUTH_API + 'register', {
      firstname,
      lastname,
      email,
      password,
      role,
      cart: [],
      reservations: [],
      delivery: [],
      orders: [],
      messages: []
    }, httpOptions);
  
};
}