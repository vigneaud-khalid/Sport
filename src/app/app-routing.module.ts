import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './composants/home/home.component';
import { ReservationComponent } from './composants/reservation/reservation.component';


const routes: Routes = [
    // localhost:4200/
    { path: 'home', component: HomeComponent },
    // localhost:4200/reservation 
    { path: 'reservation', component: ReservationComponent },
    // pathMatch = "full" signifie que tout chemin d'url doit correspondre
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // On affichera error.component en cas de chemin inexistant
    { path: '**', redirectTo: '/error' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
