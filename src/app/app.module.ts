import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MarketComponent } from './composants/market/market.component';
import { ProductComponent } from './composants/product/product.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { HomeComponent } from './composants/home/home.component';
import { ContactComponent } from './composants/contact/contact.component';
import { LoginComponent } from './composants/login/login.component';
import { CartComponent } from './composants/cart/cart.component';
import { RegisterComponent } from './composants/register/register.component';
import { ErrorComponent } from './composants/error/error.component';
import { PurchasesComponent } from './composants/purchases/purchases.component';
import { DeliveryComponent } from './composants/delivery/delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    MarketComponent,
    ProductComponent,
    ReservationComponent,
    ErrorComponent,
    PurchasesComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
