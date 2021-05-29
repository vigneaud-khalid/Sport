import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Products[]|null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  onDeleteProduct(id: any) {
    this.productsService.deleteProduct(id).subscribe(data => {
      console.log(this.products);
      this.loadProducts();
    })
  }

  qtyplus(id: any, quantity: any) {
    quantity = quantity + 1;
    console.log(quantity);
    this.productsService.updateQuantity(id, {"quantity": quantity}).subscribe(data => {
      console.log(this.products);
    });
    this.loadProducts();
  }

  qtyminus(id: any, quantity: any) {
    if (quantity > 1) quantity = quantity - 1;
    console.log(quantity);
    this.productsService.updateQuantity(id, {"quantity": quantity}).subscribe(data => {
      console.log(this.products);
    });
    this.loadProducts();
  }
}
