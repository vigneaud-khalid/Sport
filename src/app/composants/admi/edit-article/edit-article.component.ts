import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  
  id!: number;    // id!: any;
  product: Products = {};

  constructor(private productService: ProductsService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.id = params['idd'];
    // });
    this.id = this.route.snapshot.params['id'];
    console.log("edit-article__id :" + this.id);
    this.productService.getProduct(this.id).subscribe(data => {
      console.log("On init :" + data.id);
      this.product = data;
      console.log("product = " + this.product.id);
    })
  }

  // Met a jour un objet personne selon son identifiant par l'appel de la methode updatePerson initiliasée 
  // dans le service personne.service -> appel du chemin et de la methode POST
  editProduct() {
    let v=confirm("Are you really willing to edit this product?");
    if(v==true){
    this.productService.updateProduct(this.product).subscribe(data => {
      console.log("Edit product :" + data);
    })
    this.router.navigateByUrl('modif-article');
  }
  }

}