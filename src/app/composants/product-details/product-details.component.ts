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

  size?: number;
  qty: any[] = [];
  products: Products[]|null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  // addCart(product: Product): void{
  //   this.cartService.addProductToCard(product);
  // }



}
