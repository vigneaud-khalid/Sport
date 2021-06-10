import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  url="../../../assets/img/";
  size?: number;
  qty: any[] = [];
  // products: Products[]|null = null;
  @Input() products: Products[] = [];
  productToAdd?: any;
  cartProducts: any[] = [];

  constructor(private productsService: ProductsService, private cartService: CartService) { 

  }

  ngOnInit(): void {
    this.loadProducts();
    this.cartService.getAllCartProducts().subscribe(data => {
      this.cartProducts = data.cart;
    });
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  addProductToCart(id: any) {
    if (this.cartProducts.some(item => item.id === id)) {
      alert("Ce produit a déjà été ajouté au panier");
    }
    else if(this.products != null && this.cartProducts != undefined) {
      this.productToAdd = this.products.filter((item: any) => item.id === id)[0];
      this.cartProducts.push(Object.assign(this.productToAdd, {cartQuantity: 1})); 
    }
    console.log(this.cartProducts);
    this.cartService.addCartProduct(this.cartProducts).subscribe();
  }
  addToCart(product: Products): void{
    this.cartService.addCartProduct(product);
  }

}