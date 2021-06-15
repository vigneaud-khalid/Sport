import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { cartProducts } from 'src/app/interfaces/cartProducts';
import { CartService } from 'src/app/shared/cart.service';
import { ProductsService } from 'src/app/shared/products.service';
import { ReservationService } from 'src/app/shared/reservation.service';
import { UsersService } from 'src/app/shared/users.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

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
  activeUserId?: any;

  constructor(private productsService: ProductsService, 
              private cartService: CartService, 
              private userService: UsersService,
              private reservationService: ReservationService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.loadUserId();
    this.loadProducts();
    this.loadUserCartProducts();
    this.loadUserReservedProducts();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadUserCartProducts() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      this.cartProducts = data.cart;
    });
  }

  loadUserReservedProducts() {
    this.reservationService.getAllUserReservedProducts(this.activeUserId).subscribe(data => {
      this.reservedProducts = data.reservations;
    });
  }

  onDeleteCartProduct(id: any) {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      if(this.cartProducts != null) {
        this.cartProducts = this.cartProducts.filter((item: any) => item.id !== id); 
        this.cartService.updateUserCart(this.activeUserId, this.cartProducts).subscribe();
      }
    });
  }

  qtyplus(i: any, cartQuantity: any) {
    if(this.cartProducts != null) {
      if (cartQuantity < this.cartProducts[i].quantity) {
        cartQuantity = cartQuantity + 1;
        this.cartProducts[i].cartQuantity = cartQuantity;
      }
      else {
        alert("Sorry but we only have " + this.cartProducts[i].quantity + " " + this.cartProducts[i].name + " in stock");
      }
    }
    this.cartService.updateUserCart(this.activeUserId, this.cartProducts).subscribe();
  }

  qtyminus(i: any, cartQuantity: any) {
    if (cartQuantity > 1) cartQuantity = cartQuantity - 1;
    if(this.cartProducts != null) 
      this.cartProducts[i].cartQuantity = cartQuantity;
    this.cartService.updateUserCart(this.activeUserId, this.cartProducts).subscribe();
  }

  onChangeEvent(i: any, event: any) {
    let cartQuantity = event.target.value;
    if(this.cartProducts != null) {
      if (cartQuantity <= this.cartProducts[i].quantity) {
        this.cartProducts[i].cartQuantity = cartQuantity;
        this.cartService.updateUserCart(this.activeUserId, this.cartProducts).subscribe();
      }
      else {
        alert("Sorry but we only have " + this.cartProducts[i].quantity + " " + this.cartProducts[i].name + " in stock");
        this.cartProducts[i].cartQuantity = this.cartProducts[i].quantity;
        this.cartService.updateUserCart(this.activeUserId, this.cartProducts).subscribe();
      }
    }
  }

  loadModalData(id: any) {
    console.log(id);
    this.productsService.getProduct(id).subscribe(data => {
      this.productToReserve = data;
      console.log(data);
    });
    this.userService.getUserById(this.activeUserId).subscribe(data => {
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
      this.reservationService.reserveUserProduct(this.activeUserId, this.reservedProducts).subscribe();

      // Add user email address to the reserved product 
      this.productToReserve.reservedBy.push(this.user.email);
      console.log(this.productToReserve);
      this.productsService.updateProduct(this.productToReserve).subscribe();  

      alert("This product has been successfully reserved");
    }
  }
}
