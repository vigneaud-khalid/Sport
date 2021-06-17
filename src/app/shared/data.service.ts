import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public cartProductsNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userRole: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public activeUserId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public activeUserRole: BehaviorSubject<any> = new BehaviorSubject<any>('');
}
