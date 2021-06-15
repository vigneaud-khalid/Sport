import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import {ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  elt: any;
  user: User = {};
  users: Array<User> = new Array<User>();
  constructor(private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
  }
  userEdit(idUser: any){
    this.router.navigate(['edit', idUser]);
  }
}
