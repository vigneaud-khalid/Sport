import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router    } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
@Component({
  selector: 'app-modif-article',
  templateUrl: './modif-article.component.html',
  styleUrls: ['./modif-article.component.css']
})
export class ModifArticleComponent implements OnInit {
  products$!: Observable<AppDataState<Products[]>>;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onGetAllProducts();
  }
  
  onGetAllProducts(){
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data)=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }
  onGetSelectedProducts(){
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data)=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }
  onGetAvailableProducts(){
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data)=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }
  onSearch(value:any){
    this.products$ = this.productsService.searchProducts(value.keyword).pipe(
      map((data)=>({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }
  onSelect(p: Products){
    this.productsService.select(p).subscribe(data=>{
      p.selected=data.selected;
    })
  }
 productEdit(id: any){
  console.log("id =" +id);
 this.router.navigate(['edit-article', id]); 
 //this.router.navigateByUrl("edit-article", id);
}
  productDelete(p: Products){
    let v=confirm("Are you really willing to delete this product?");
    if(v==true)
    this.productsService.deleteProduct(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }
  onNewProduct(){
    this.router.navigateByUrl("/new-article")
  }
}