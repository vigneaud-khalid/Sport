import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/app/shared/cart.service';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  url="../../../assets/img/";
  products: Products[]|null = null;
  productToAdd?: any;
  cartProducts?: any;

  constructor(private productsService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  addProductToCart(id: any) {
    if(this.products != null) {
      this.productToAdd = this.products.filter((item: any) => item.id === id)[0];
      this.cartProducts.push(this.productToAdd); 
    }
    console.log(this.cartProducts);
    this.cartService.addCartProduct(this.cartProducts).subscribe();
  }
 
}
