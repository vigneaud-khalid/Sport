import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { UsersService } from 'src/app/shared/users.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  mail!: string;

  isLoggedIn = false;
  isLoginFailed = false;

  errorMessage = '';
  user: User = {};
  users: Array<User> = new Array<User>();

  userRole: any;

  constructor(private router: Router, 
              private authService: AuthService,
              private usersService: UsersService, 
              private tokenStorage: TokenStorageService,
              private dataService: DataService) { }

  ngOnInit(): void { 
    this.dataService.isLoggedIn.subscribe( value => {
      this.isLoggedIn = value;
      console.log(this.isLoggedIn);
    });
    console.log(this.isLoggedIn);
  }

  isAuthenticated() {
    const { email, password } = this.form;
    this.mail = email;
    this.authService.login(email, password).subscribe(
      data => {
        console.log("email =" + this.mail);

        this.usersService.getUserByEmail(this.mail).subscribe(
          data => {
            console.log("email  :::: =" + this.mail);
            console.log('data : ' + data[0].role);
            var role = data[0].role;
            console.log('ROLE : ' + data[0].role);
            this.userRole = data[0].role;
            this.dataService.userRole.next(this.userRole);    
            this.tokenStorage.saveRole(role);
            this.tokenStorage.saveUser(data[0]);
            this.tokenStorage.getUser();
          })
        this.isLoggedIn = true;
        this.dataService.isLoggedIn.next(this.isLoggedIn);
        this.isLoginFailed = false;
        alert("You are successfully logged in !!!!");
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log('trigered');
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      })
  }

  register() { this.router.navigateByUrl('/register'); }
}