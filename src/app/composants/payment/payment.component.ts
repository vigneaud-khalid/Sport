import { Component, OnInit } from '@angular/core';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { CartService } from 'src/app/shared/cart.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PaymentService } from 'src/app/shared/payment.service';
import { ProductsService } from 'src/app/shared/products.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  url="../../../assets/img/cards.png";
  activeUserId?: any;
  cartProducts: cartProducts[]|null = null;
  deliveryAddress: any;
  clientOrders: any;
  newProductQuantity: any;
  checkQuantities: any[] = [];
  orderInformations: any;
  totalPrice = 0;

  paymentInformations = new FormGroup({
    cardHolder: new FormControl(''),
    cardNumber: new FormControl(''),
    cardExpirationDate: new FormControl(''),
    cryptogram: new FormControl('')
  });

  constructor(private tokenService: TokenStorageService,
              private userService: UsersService,
              private cartService: CartService, 
              private paymentService: PaymentService, 
              private productService: ProductsService,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadUserId();
    this.loadAllUserData();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  loadAllUserData() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      // Load cart
      this.cartProducts = data.cart;
      // Load delivery address
      this.deliveryAddress = data.delivery;
      //Load Client Orders
      this.clientOrders = data.orders;
      console.log(this.clientOrders);
      // Compute total amount to pay
      if (this.cartProducts != null) {
        for(const [i, cartProduct] of this.cartProducts.entries()) {
          if (cartProduct.price != undefined && cartProduct.cartQuantity != undefined) {
            this.totalPrice = this.totalPrice + (cartProduct.price * cartProduct.cartQuantity);
            if (this.cartProducts != null && i == this.cartProducts.length - 1) {
              if (this.totalPrice < 150) this.totalPrice = (0.9 * this.totalPrice) + 6.99;
              else if (this.totalPrice >= 150) this.totalPrice = (0.9 * this.totalPrice);
            }
          }
        }
      }
    });
  }

  checkQuantitiesAndRespond() {
    if (this.cartProducts != null) {
      // Check quantities
      for(const [i, cartProduct] of this.cartProducts.entries()) {
        if (cartProduct.id) {
          this.productService.getProduct(cartProduct.id).subscribe(data => {
            this.newProductQuantity = data;
            this.newProductQuantity.quantity - cartProduct.quantity >= 0 ? this.checkQuantities.push(true) : this.checkQuantities.push(false);
            if (this.cartProducts != null && i == this.cartProducts.length - 1) {
              // Response when the order cannot be fulfilled
              if (this.checkQuantities.includes(false)) {
                for(let cartProduct of this.cartProducts) {
                  if (cartProduct.id) {
                    this.productService.getProduct(cartProduct.id).subscribe(data => {
                      cartProduct.cartQuantity = data.quantity;
                      cartProduct.quantity = data.quantity;
                      console.log(data.quantity);
                      if (this.cartProducts != null && i == this.cartProducts.length - 1) {
                        this.cartService.updateUserCart(this.activeUserId, this.cartProducts).subscribe();
                      }
                    });
                  }
                }
                alert('Dear client, unfortunately, another client placed an order before you and we cannot fulfill yours now.\n If you please, maybe you would be able to place an order with less quantity.\n We deeply apologize for the inconvenience.');
                location.href='cart';
              }
              // Response when the order can be fulfilled
              else if (!this.checkQuantities.includes(false)) {
                // Update products quantities
                for(let cartProduct of this.cartProducts) {
                  if (cartProduct.id) {
                    this.productService.getProduct(cartProduct.id).subscribe(data => {
                      this.newProductQuantity = data;
                      this.newProductQuantity.quantity = this.newProductQuantity.quantity - cartProduct.cartQuantity;
                      this.productService.updateProduct(this.newProductQuantity).subscribe();
                    });
                  }
                }
                // Regroup order informations
                this.orderInformations = Object.assign(this.paymentInformations.value, { amount: this.totalPrice, cart: this.cartProducts, delivery: this.deliveryAddress });
                // Add order to orders list
                this.clientOrders.push(this.orderInformations);
                console.log(this.clientOrders);
                this.paymentService.postUserOrderData(this.activeUserId, this.clientOrders).subscribe();
                // Delete all cart products
                this.cartService.updateUserCart(this.activeUserId, []).subscribe();
                alert('Thank you for your order. Your order is being processed.');
                // location.href='product';
              }
            }
          });
        }
      }
    }
  }
}
