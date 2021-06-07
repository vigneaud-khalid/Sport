import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  url="../../assets/img/";
  products: Products[]|null = null;
  currentSlide = 0;
  moveSlide: any;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.moveSlide = setInterval(() => this.onNextClick(), 3000);
  }

  ngOnDestroy() {
    if (this.moveSlide) {
      clearInterval(this.moveSlide);
    }
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    if (this.products) this.currentSlide = previous < 0 ? this.products.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    if (this.products) this.currentSlide = next === this.products.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }
}
