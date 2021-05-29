import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Product } from "../interfaces/products";

@Injectable({providedIn:"root"})
export class ProductsService {

    constructor(private http: HttpClient) {
    }

    getAllProducts():Observable<Product[]> {
        let host = environment.host;
        return this.http.get<Product[]>(host + "/products");
    }

    deleteProduct(id: any): Observable<Product[]> {
        let host = environment.host;
        return this.http.delete<Product[]>(host + "/products/" + id + "/");
    }

    updateQuantity(id: number, data: any): Observable<Product[]>{
        let host = environment.host;
        return this.http.patch<Product[]>(host + "/products/" + id + "/", data);
    }
}