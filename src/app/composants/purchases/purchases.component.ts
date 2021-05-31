import { Component, OnInit } from '@angular/core';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  cartProducts: cartProducts[]|null = null;
  totalPrice = 0;

  constructor(private cartService: CartService) { }
  
  ngOnInit(): void {
    this.loadCartProducts();
  }

  loadCartProducts() {
    this.cartService.getAllCartProducts().subscribe(data => {
      this.cartProducts = data.cart;
      if (this.cartProducts != null) {
        for(let cartProduct of this.cartProducts) {
          if (cartProduct.price != undefined && cartProduct.cartQuantity != undefined) 
            this.totalPrice = this.totalPrice + (cartProduct.price * cartProduct.cartQuantity); 
        }
      }
    });
  }
}
