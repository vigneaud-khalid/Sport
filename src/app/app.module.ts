import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './composants/cart/cart.component';
import { ContactComponent } from './composants/contact/contact.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginComponent } from './composants/login/login.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { MarketComponent } from './composants/market/market.component';
import { ProductComponent } from './composants/product/product.component';
import { RegisterComponent } from './composants/register/register.component';
import { ErrorComponent } from './composants/error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from './composants/admi/administration/administration.component';
import { SuppCommentComponent } from './composants/admi/supp-comment/supp-comment.component';
import { ModifArticleComponent } from './composants/admi/modif-article/modif-article.component';
import { EditArticleComponent } from './composants/admi/edit-article/edit-article.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
   LoginComponent,
   RegisterComponent,
    CartComponent,
    AppComponent,
    MarketComponent,
    ProductComponent,
    ErrorComponent,
    AdministrationComponent,
    SuppCommentComponent,
    ModifArticleComponent,
    EditArticleComponent,
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
