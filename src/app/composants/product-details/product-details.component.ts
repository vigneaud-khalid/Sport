import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { CartService } from '../../shared/cart.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';
import { UsersService } from 'src/app/shared/users.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  activeUserId?: any;
  url="../../../assets/img/";
  size?: number;
  qty: any[] = [];
  // products: Products[]|null = null;
  @Input() products: Products[] = [];
  productToAdd?: any;
  cartProducts: any[] = [];

  constructor(private productsService: ProductsService, 
              private cartService: CartService,
              private userService: UsersService,
              private tokenService: TokenStorageService,
              private dataService: DataService) { 

  }

  ngOnInit(): void {
    this.loadUserId();
    this.loadProducts();
    this.loadUserCartProducts();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  loadUserCartProducts() {
    this.userService.getAllUserData(this.activeUserId).subscribe(data => {
      this.cartProducts = data.cart;
    });
  }

  addProductToCart(id: any) {
    if (this.cartProducts.some(item => item.id === id)) {
      alert("This product has already been added to the cart");
    }
    else if(this.products != null && this.cartProducts != undefined) {
      this.productToAdd = this.products.filter((item: any) => item.id === id)[0];
      this.cartProducts.push(Object.assign(this.productToAdd, {cartQuantity: 1})); 
    }
    console.log(this.cartProducts);
    this.cartService.addUserCartProduct(this.activeUserId, this.cartProducts).subscribe();
    this.dataService.cartProductsNumber.next(this.cartProducts.length);
  }
}