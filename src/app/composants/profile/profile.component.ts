import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  activeUserId?: any;
  firstName?: any;
  lastName?: any;
  user: User = {};
  users: Array<User> = new Array<User>();
  constructor(private router:Router, private userService:UsersService, private tokenService:TokenStorageService) { }

  ngOnInit(): void {
    this.loadUserId();
    this.loadUserName();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  loadUserName() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      this.firstName = data.firstname;
      this.lastName = data.lastname;
    });
  }
}
