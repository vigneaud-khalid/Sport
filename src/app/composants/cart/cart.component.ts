import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  size?: number;
  qty: any[] = [];
  products: Product[]|null = null;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
      this.size = data.length;
      for (let i=0; i < this.size; i++) {
        this.qty.push(1);
      }
    });
  }

  onDeleteProduct(id: any) {
    this.productsService.deleteProduct(id).subscribe(data => {
      console.log(this.products);
      this.loadProducts();
    })
  }

  qtyplus(i: any) {
    return this.qty[i] = this.qty[i] + 1;
  }

  qtyminus(i: any) {
    return this.qty[i] > 1 ? this.qty[i] = this.qty[i] - 1 : this.qty[i]; 
  }
}
