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
  }

  saveRole(role: any): void {
    sessionStorage.removeItem('rolekey');
    sessionStorage.setItem('rolekey', role);
    this.checkAdmin();
  }
  getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    console.log(user);
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
      return true
    }
    console.log('checkAdmin_3 false');
    return false;
  }
}
