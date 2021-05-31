import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './composants/admi/administration/administration.component';
import { EditArticleComponent } from './composants/admi/edit-article/edit-article.component';
import { ModifArticleComponent } from './composants/admi/modif-article/modif-article.component';
import { SuppCommentComponent } from './composants/admi/supp-comment/supp-comment.component';
import { LoginComponent } from './composants/login/login.component';
import { RegisterComponent } from './composants/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './composants/home/home.component';
import { ProductComponent } from './composants/product/product.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { ContactComponent } from './composants/contact/contact.component';
import { CartComponent } from './composants/cart/cart.component';
import { ErrorComponent } from './composants/error/error.component';
import { PurchasesComponent } from './composants/purchases/purchases.component';
import { DeliveryComponent } from './composants/delivery/delivery.component';
import { PaymentComponent } from './composants/payment/payment.component';


const routes: Routes = [
    // localhost:4200/
    { path: 'home', component: HomeComponent },
    // localhost:4200/register
    { path: 'register', component: RegisterComponent },   
    // localhost:4200/login 
    { path: 'login', component: LoginComponent },            
    { path: 'administration', component: AdministrationComponent, canActivate: [AdminGuard] },
    { path: 'supp-comment', component: SuppCommentComponent, canActivate: [AdminGuard] },
    { path: 'modif-article', component: ModifArticleComponent, canActivate: [AdminGuard] },
    { path: 'edit-article', component: EditArticleComponent, canActivate: [AdminGuard] },
    // localhost:4200/product
    { path: 'product', component: ProductComponent },
    // localhost:4200/reservation
    { path: 'reservation', component: ReservationComponent },
    // localhost:4200/contact
    { path: 'contact', component: ContactComponent },
 // localhost:4200/cart
    { path: 'cart', component: CartComponent },
    // localhost:4200/purchases
    { path: 'purchases', component: PurchasesComponent },
    // localhost:4200/delivery
    { path: 'delivery', component: DeliveryComponent },
    // localhost:4200/delivery
    { path: 'payment', component: PaymentComponent },
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
