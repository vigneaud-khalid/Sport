import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../shared/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenStorageService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //Pour recuperer une variable de localStorage
    if (Boolean(this.tokenService.checkAdmin())){
      alert('Welcome,                                                                          You are logged as an ADMINISTRATOR ');
      return true;
    } else {
      alert('You have to be logged as an ADMINISTRATOR                                     Please do log in ...');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
