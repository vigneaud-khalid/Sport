import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsComponent } from './market/products/products.component';
import { SingleProductComponent } from './market/single-product/single-product.component';
import { CartComponent } from './market/cart/cart.component';
import { MarketComponent } from './composants/market/market.component';
import { ProductComponent } from './composants/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    MarketComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
