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
  activeUserId?: any;
  cartProducts: any[] = [];
  cartProductsNumber: any;

  constructor(private tokenService: TokenStorageService,
              private userService: UsersService,
              private dataService: DataService) { 
    this.dataService.cartProductsNumber.subscribe( value => {
      this.cartProductsNumber = value;
    });
  }

  ngOnInit(): void {
    this.loadUserId();
    this.loadUserCartProductsNumber();
  }

  ngOnChanges(): void {
    this.loadUserCartProductsNumber();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  loadUserCartProductsNumber() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      this.cartProducts = data.cart;
      this.cartProductsNumber = this.cartProducts.length;
    });
  }
}
