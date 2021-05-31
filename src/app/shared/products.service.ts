import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Products } from "../interfaces/products";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({providedIn:"root"})
export class ProductsService {

    constructor(private http:HttpClient){
    }
//let host= environment.host;    //  le repository  environment  rajoute //localhost:4200   à l'URL stocké dans la variable host
reachableHost:string= "http://localhost:3000";
unreachableHost:string= "http://localhost:9000";
    getAllProducts():Observable<Products[]>{
        let host=(Math.random()<0.8)?this.reachableHost:this.unreachableHost;
        return this.http.get<Products[]>(host+"/products");
        //return this.http.get<Product[]>("http://localhost:3000/products");
    }
    getProduct(id :number): Observable<any>{
        let host= this.reachableHost;
        return this.http.get<Products>(host+"/products/"+id);
       }

    getSelectedProducts():Observable<Products[]>{
        let host= this.reachableHost;
        return this.http.get<Products[]>(host+"/products?selected=true");
    }
    getAvailableProducts():Observable<Products[]>{
        let host= this.reachableHost;
        return this.http.get<Products[]>(host+"/products?available=true");
    }
    searchProducts(keyword:string):Observable<Products[]>{
        let host= this.reachableHost;
        return this.http.get<Products[]>(host+"/products?name_like="+keyword);
    }
    select(product:Products):Observable<Products>{
        let host= this.reachableHost;
        product.selected = !product.selected;
        return this.http.put<Products>(host+"/products/"+product.id,product);
    }
    deleteProduct(product:Products):Observable<void>{
        let host= this.reachableHost;
        product.selected = !product.selected;
        return this.http.delete<void>(host+"/products/"+product.id);
    }
    updateProduct(product:Products): Observable<Products>{
        let host= this.reachableHost;
        return this.http.put<Products>(host+"/products/"+product.id,product);
    }
    //   updateProduct(id: number, data: Products): Observable<Products>{
    //     let API_URL = `${this.url}/update/${id}`;
    //     return this.http.put(API_URL, data)
    //       .pipe(
    //         map((res: any) => {
    //           return console.log("service :" + res);
    //         }),
    //         catchError(this.errorMgmt)
    //       );
    //   }
        

    saveProduct(product:Products):Observable<Products>{
        let host= this.reachableHost;
        return this.http.post<Products>(host+"/products/",product);
    }

    save(name: string, description: string,  reference: string, category: number, price: number,
        quantity:number, selected: boolean, available: boolean):Observable<any>{
        let host= this.reachableHost;
        selected = false;
        available = true;
        return this.http.post(host+"/products/",{
            name, description, reference, category, price, quantity, selected, available  
        }, httpOptions);
    }
}