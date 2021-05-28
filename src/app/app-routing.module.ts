import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './composants/home/home.component';
import { MarketComponent } from './composants/market/market.component';
import { ProductComponent } from './composants/product/product.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { ContactComponent } from './composants/contact/contact.component';
import { LoginComponent } from './composants/login/login.component';
import { CartComponent } from './composants/cart/cart.component';
import { RegisterComponent } from './composants/register/register.component';
import { ErrorComponent } from './composants/error/error.component';
import { OrderComponent } from './composants/order/order.component';


const routes: Routes = [
    // localhost:4200/
    { path: 'home', component: HomeComponent },
    // localhost:4200/market
    { path: 'market', component: MarketComponent },
    // localhost:4200/product
    { path: 'product', component: ProductComponent },
    // localhost:4200/reservation
    { path: 'reservation', component: ReservationComponent },
    // localhost:4200/contact
    { path: 'contact', component: ContactComponent },
    // localhost:4200/login
    { path: 'login', component: LoginComponent },
    // localhost:4200/cart
    { path: 'cart', component: CartComponent },
    // localhost:4200/order
    { path: 'order', component: OrderComponent },
    // localhost:4200/register
    { path: 'register', component: RegisterComponent },
    // localhost:4200/error
    { path: 'error', component: ErrorComponent },
    // pathMatch = "full" signifie que tout chemin d'url doit correspondre
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // On affichera error.component en cas de chemin inexistant
    { path: '**', redirectTo: '/error' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
