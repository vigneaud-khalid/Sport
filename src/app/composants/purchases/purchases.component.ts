import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  products: Products[]|null = null;
  totalPrice = 0;

  constructor(private productsService: ProductsService) { }
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      for(let product of this.products) {
        if (product.price != undefined && product.quantity != undefined) 
          this.totalPrice = this.totalPrice + (product.price * product.quantity); 
      }
    });
  }
}
