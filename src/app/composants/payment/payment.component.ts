import { Component, OnInit } from '@angular/core';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { CartService } from 'src/app/shared/cart.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PaymentService } from 'src/app/shared/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  url="../../../assets/img/cards.png";
  cartProducts: cartProducts[]|null = null;
  totalPrice = 0;

  form = new FormGroup({
    cardHolder: new FormControl(''),
    cardNumber: new FormControl(''),
    cardExpirationDate: new FormControl(''),
    cryptogram: new FormControl('')
  });

  constructor(private cartService: CartService, private paymentService: PaymentService, public formBuilder: FormBuilder) { }

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

  onSubmit() {
    this.paymentService.postPaymentData(this.form.value).subscribe();
    alert('Nous vous remercions pour votre commande qui est en cours de traitement');
    location.href='product';
  }
}
