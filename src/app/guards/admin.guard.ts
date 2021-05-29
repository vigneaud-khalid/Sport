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
    // Pour recuperer une variable de localStorage
    // if (Boolean(this.tokenService.checkAdmin())){
    //   alert('You are logged as an ADMINISTRATOR');
    //   return true;
    // } else {
    //   alert('You have to be logged as an ADMINISTRATOR');
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
    return true;   // par défaut
  }
 

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}
