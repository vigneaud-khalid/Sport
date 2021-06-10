import { Component, OnInit } from '@angular/core';
import { DeliveriesService } from 'src/app/shared/deliveries.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})

export class DeliveryComponent implements OnInit {
  form = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    phone: new FormControl(''),
    remarks: new FormControl(''),
  });

  constructor(private deliveriesService: DeliveriesService, public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
      this.deliveriesService.postDeliveryAddress(this.form.value).subscribe();
      location.href='payment';
  }
}
