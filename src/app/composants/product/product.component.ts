import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  size?: number;
  qty: any[] = [];
  products: Product[]|null = null;
  currentPage = 0;
  pages = [0,1,2,3,4,5,6];

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
 
}
