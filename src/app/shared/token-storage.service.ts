import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

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
    sessionStorage.setItem(ROLE_KEY, JSON.stringify(user.idUser));
  }

  saveRole(role: any): void {
    console.log('TOKENSTORAGE_saveRole_0');
    sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
    console.log('TOKENSTORAGE_saveRole_1');
    console.log('Role = '+JSON.stringify(role));
    console.log('Role = '+ROLE_KEY);
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
  checkAdmin(): any {
    console.log('TOKENSTORAGE_checkAdmin_0');
    const role = sessionStorage.getItem(ROLE_KEY);
    console.log('checkAdmin_1');
    if (role=="ADMIN") {
      console.log('checkAdmin_2');
      return true
    }
    console.log('checkAdmin_3 false');
    return false;
  }
}
