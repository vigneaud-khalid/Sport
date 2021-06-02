import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url="../../assets/img/";
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

}
