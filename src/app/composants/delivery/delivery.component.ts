import { Component, OnInit } from '@angular/core';
import { DeliveriesService } from 'src/app/shared/deliveries.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})

export class DeliveryComponent implements OnInit {

  activeUserId?: any;

  form = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    phone: new FormControl(''),
    remarks: new FormControl(''),
  });

  constructor(private tokenService: TokenStorageService, 
              private deliveriesService: DeliveriesService, 
              public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadUserId();
  }

  loadUserId() {
    this.activeUserId = this.tokenService.getUser().id;
    console.log(this.activeUserId);
  }

  onSubmit() {
      this.deliveriesService.postUserDeliveryAddress(this.activeUserId, this.form.value).subscribe();
      location.href='payment';
  }
}
