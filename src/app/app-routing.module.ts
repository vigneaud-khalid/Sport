import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './composants/admi/administration/administration.component';
import { EditArticleComponent } from './composants/admi/edit-article/edit-article.component';
import { ModifArticleComponent } from './composants/admi/modif-article/modif-article.component';
import { SuppCommentComponent } from './composants/admi/supp-comment/supp-comment.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginComponent } from './composants/login/login.component';
import { RegisterComponent } from './composants/register/register.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    // localhost:4200/
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'administration', component: AdministrationComponent, canActivate: [AdminGuard] },
    { path: 'supp-comment', component: SuppCommentComponent, canActivate: [AdminGuard] },
    { path: 'modif-article', component: ModifArticleComponent, canActivate: [AdminGuard] },
    { path: 'edit-article', component: EditArticleComponent, canActivate: [AdminGuard] },
   
    // localhost:4200/admi-supcomment   ?????
  // On associe un resolver et une guard à cette route car ADMI
  //{ path: 'admi-supcomment', runGuardsAndResolvers: 'always', component: PersonneComponent, resolve: { routeResolver: PersonResolver },
  //  canActivate: [AuthGuard]  },
  
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
