import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role';
let rolekey = 'auth-roleee';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  //rolekey = "admin";
  constructor() { }

  signOut(): void {
    sessionStorage.clear();
  }

  saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveUser(user: User): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    //sessionStorage.setItem(ROLE_KEY, JSON.stringify(user.idUser));
  }

  saveRole(role: any): void {
    console.log("roleeee!!!! = " +role);
    console.log('TOKENSTORAGE_saveRole_0');
    sessionStorage.removeItem('rolekey');
    sessionStorage.setItem('rolekey', role);
    let nomRole = sessionStorage.getItem('rolekey');
    console.log('Role(role) = '+nomRole);
    console.log('Role(ROLE_KEY) = '+rolekey);
    this.checkAdmin();
  }
  getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  getRole(): string | null {
    return sessionStorage.getItem(ROLE_KEY);
  }
  checkAdmin(): any {
    let nomRole = sessionStorage.getItem('rolekey');
    if (nomRole=="admin") {
      console.log('checkAdmin_2');
      console.log('Role(role) = '+nomRole);
      return true
    }
    console.log('checkAdmin_3 false');
    return false;
  }
}
