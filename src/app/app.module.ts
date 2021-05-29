import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './composants/contact/contact.component';
import { HomeComponent } from './composants/home/home.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorComponent } from './composants/error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from './composants/admi/administration/administration.component';
import { SuppCommentComponent } from './composants/admi/supp-comment/supp-comment.component';
import { ModifArticleComponent } from './composants/admi/modif-article/modif-article.component';
import { EditArticleComponent } from './composants/admi/edit-article/edit-article.component';

import { MarketComponent } from './composants/market/market.component';
import { ProductComponent } from './composants/product/product.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { LoginComponent } from './composants/login/login.component';
import { CartComponent } from './composants/cart/cart.component';
import { RegisterComponent } from './composants/register/register.component';
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
    AdministrationComponent,
    SuppCommentComponent,
    ModifArticleComponent,
    EditArticleComponent,
    ReservationComponent,
    ErrorComponent,
    PurchasesComponent,
    DeliveryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    console.log("App-module");
  }
}
