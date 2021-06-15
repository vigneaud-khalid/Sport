import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public cartProductsNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);

}
