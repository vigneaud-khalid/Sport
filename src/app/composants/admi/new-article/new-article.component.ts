import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Products } from 'src/app/interfaces/products';
import { Products } from './../../../interfaces/products';
import { ProductsService } from './../../../shared/products.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  product: Products= {};
  form: any = {
    
  };

  
  isSuccessfull = false;
  isSignUpFailed = false;

  errorMessage = '';

  constructor(private router: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.product = {
      quantity: 10
    }
  }

  onSubmit(): void {

    // const { this.product } = this.form;
    // this.productsService.saveProduct(this.product).subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSuccessfull = true;
    //     this.isSignUpFailed = false;
    //     alert("You have successfully registered a new product !");
    //     this.router.navigateByUrl('/modif-article');
    //   },
    //   err => {
    //     this.errorMessage = err.error;
    //     this.isSignUpFailed = true;
    //   }
    // )
    const { name, description, reference, category, price, quantity, selected, available} = this.form;
    this.productsService.save(name, description, reference, category, price, quantity, selected, available).subscribe(
      data => {
        console.log(data);
        this.isSuccessfull = true;
        this.isSignUpFailed = false;
        alert("You have successfully registered a new product !");
        this.router.navigateByUrl('/modif-article');
      },
      err => {
        this.errorMessage = err.error;
        this.isSignUpFailed = true;
      }
    )

  }
}
