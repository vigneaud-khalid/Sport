import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http:HttpClient) { }

  getAllCartProducts():Observable<any> {
    let host = environment.host;
    return this.http.get<any>(host + "/users/1");
  }

  addCartProduct(data: any):Observable<any> {
    let host = environment.host;
    return this.http.patch<any>(host + "/users/1", { "cart": data });
  }

  updateCartQuantity(data: any): Observable<any>{
      let host = environment.host;
      return this.http.patch<any>(host + "/users/1", {"cart": data});
  }
}
