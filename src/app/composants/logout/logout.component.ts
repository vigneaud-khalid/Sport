import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  isLoggedIn: any;
  activeUserId: any;
  userRole: any;
  activeUserRole: any;

  constructor(private router: Router, 
              private tokenStorage: TokenStorageService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.tokenStorage.signOut();

    this.isLoggedIn = false;
    this.dataService.isLoggedIn.next(this.isLoggedIn);

    this.activeUserId = undefined;
    this.dataService.activeUserId.next(this.activeUserId);

    this.userRole = undefined;
    this.dataService.userRole.next(this.userRole);
    
    this.activeUserRole = undefined;
    this.dataService.activeUserRole.next(this.activeUserRole);

    alert('You have been signed out successfully!');
    this.router.navigate(['login']);
  }

}
