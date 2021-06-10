import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { CartService } from 'src/app/shared/cart.service';
import { ProductsService } from 'src/app/shared/products.service';
import { ReservationService } from 'src/app/shared/reservation.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  url="../../../assets/img/";
  products: Products[]|null = null;
  cartProducts: cartProducts[]|null = null;
  reservedProducts: any[] = [];
  productToReserve?: any;
  user?: any;

  constructor(private productsService: ProductsService, 
    private cartService: CartService, 
    private userService: UsersService,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartProducts();
    this.loadReservedProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCartProducts() {
    this.cartService.getAllCartProducts().subscribe(data => {
      this.cartProducts = data.cart;
    });
  }

  loadReservedProducts() {
    this.reservationService.getAllReservedProducts().subscribe(data => {
      this.reservedProducts = data.reservations;
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

  loadModalData(id: any) {
    console.log(id);
    this.productsService.getProduct(id).subscribe(data => {
      this.productToReserve = data;
      console.log(data);
    });
    this.userService.getUserById(1).subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }

  addReservation() {
    if (this.reservedProducts.some(item => item.id === this.productToReserve.id)) {
      alert("This product has already been reserved");
    }
    else if(this.products && this.reservedProducts != null) {

      // Add product to the reservations list of the user
      const {reservedBy, ...partialObject} = this.productToReserve;
      this.reservedProducts.push(partialObject); 
      this.reservationService.reserveProduct(this.reservedProducts).subscribe();

      // Add user email address to the reserved product 
      this.productToReserve.reservedBy.push(this.user.email);
      console.log(this.productToReserve);
      this.productsService.updateProduct(this.productToReserve).subscribe();  

      alert("This product has been successfully reserved");
    }
  }
}
