import { Component, OnInit } from '@angular/core';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { UsersService } from 'src/app/shared/users.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  activeUserId?: any;
  cartProducts: cartProducts[]|null = null;
  totalPrice = 0;

  constructor(private userService: UsersService, 
              private tokenService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.loadUserId();
    this.loadUserCartProducts();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  loadUserCartProducts() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      this.cartProducts = data.cart;
      if (this.cartProducts != null) {
        for(let cartProduct of this.cartProducts) {
          if (cartProduct.price != undefined && cartProduct.cartQuantity != undefined && cartProduct.quantity != 0) 
            this.totalPrice = this.totalPrice + (cartProduct.price * cartProduct.cartQuantity); 
        }
      }
    });
  }
}
