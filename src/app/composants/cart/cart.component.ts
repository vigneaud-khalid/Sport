import { Component, OnInit } from '@angular/core';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: cartProducts[]|null = null;
  url="../../../assets/img/";

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartProducts();
  }

  loadCartProducts() {
    this.cartService.getAllCartProducts().subscribe(data => {
      this.cartProducts = data.cart;
    });
  }

  onDeleteCartProduct(id: any) {
    this.cartService.getAllCartProducts().subscribe(data => {
      if(this.cartProducts != null) {
        this.cartProducts = this.cartProducts.filter((item: any) => item.id !== id); 
        this.cartService.updateCart(this.cartProducts).subscribe();
      }
    });
  }

  qtyplus(i: any, cartQuantity: any) {
    cartQuantity = cartQuantity + 1;
    if(this.cartProducts != null) 
      this.cartProducts[i].cartQuantity = cartQuantity;
    this.cartService.updateCart(this.cartProducts).subscribe();
  }

  qtyminus(i: any, cartQuantity: any) {
    if (cartQuantity > 1) cartQuantity = cartQuantity - 1;
    if(this.cartProducts != null) 
      this.cartProducts[i].cartQuantity = cartQuantity;
    this.cartService.updateCart(this.cartProducts).subscribe();
  }
}
