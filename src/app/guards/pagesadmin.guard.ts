import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from '../shared/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PagesadminGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenStorageService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //Pour recuperer une variable de localStorage
    if (Boolean(this.tokenService.checkAdmin())){
      return true;
    } else {
      alert('You have no right to be redirected here                                                   for you need to be logged as an ADMINISTRATOR                                  Please do not proceed hacking in ...');
      this.router.navigateByUrl('/login');
      return false;
    }
    
  }
}
