import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/app/shared/cart.service';
import { ProductsService } from 'src/app/shared/products.service';
import { ReservationService } from 'src/app/shared/reservation.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  url="../../../assets/img/";
  products: Products[]|null = null;
  productToAdd?: any;
  productToReserve?: any;
  user?: any;
  cartProducts: any[] = [];
  reservedProducts: any[] = [];

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

  addProductToCart(id: any) {
    if (this.cartProducts.some(item => item.id === id)) {
      alert("This product has already been added to the cart");
    }
    else if(this.products && this.cartProducts != null) {
      this.productToAdd = this.products.filter((item: any) => item.id === id)[0];
      this.cartProducts.push(Object.assign(this.productToAdd, {cartQuantity: 1})); 
    }
    this.cartService.addCartProduct(this.cartProducts).subscribe();
  }

  loadModalData(id: any) {
    this.productsService.getProduct(id).subscribe(data => {
      this.productToReserve = data;
    });
    this.userService.getUserById(1).subscribe(data => {
      this.user = data;
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
      this.productsService.updateProduct(this.productToReserve).subscribe();  

      alert("This product has been successfully reserved");
    }
  }
}
