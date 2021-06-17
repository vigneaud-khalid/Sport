import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { UsersService } from 'src/app/shared/users.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sport';
  isLoggedIn: any;
  userRole: any;
  activeUserId?: any;
  activeUserRole?: any;
  cartProducts: any[] = [];
  cartProductsNumber: any;

  constructor(private tokenService: TokenStorageService,
              private userService: UsersService,
              private dataService: DataService) { 
    this.dataService.cartProductsNumber.subscribe( value => {
      this.cartProductsNumber = value;
    });
    this.dataService.isLoggedIn.subscribe( value => {
      this.isLoggedIn = value;
    });
    this.dataService.userRole.subscribe( value => {
      this.userRole = value;
    });
    this.dataService.activeUserId.subscribe( value => {
      this.activeUserId = value;
    });
    this.dataService.activeUserRole.subscribe( value => {
      this.activeUserRole = value;
    });
  }

  ngOnInit(): void {
    this.loadUserIdAndRole();
    if (this.isLoggedIn) this.loadUserCartProductsNumber();
  }

  loadUserIdAndRole() {
    this.activeUserId = this.tokenService.getUser().id;
    this.activeUserRole = this.tokenService.getUser().role;
    console.log(this.activeUserRole);
  }

  loadUserCartProductsNumber() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      this.cartProducts = data.cart;
      this.cartProductsNumber = this.cartProducts.length;
    });
  }
}
