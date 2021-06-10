import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  getAllReservedProducts():Observable<any> {
    let host = environment.host;
    return this.http.get<any>(host + "/users/1");
  }

  reserveProduct(data: any):Observable<any> {
    let host = environment.host;
    return this.http.patch<any>(host + "/users/1", { "reservations": data });
  }
}
