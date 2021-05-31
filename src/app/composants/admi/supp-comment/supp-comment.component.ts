import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/shared/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-supp-comment',
  templateUrl: './supp-comment.component.html',
  styleUrls: ['./supp-comment.component.css']
})
export class SuppCommentComponent implements OnInit {
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
 
  
  

}