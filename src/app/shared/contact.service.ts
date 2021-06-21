import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  postUserMessage(id: any, data: any):Observable<any> {
    let host = environment.host;
    return this.http.patch<any>(host + "/users/" + id, {
      "messages": [data]
    });
  }

  subscribeToNewsLetter(data: any):Observable<any> {
    let host = environment.host;
    return this.http.patch<any>(host + "/newsLetter/1", {
      "email": data
    });
  }
}
