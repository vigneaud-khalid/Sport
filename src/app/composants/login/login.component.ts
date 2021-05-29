import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenStorageService } from 'src/app/shared/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;

  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, 
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }
 // Se connecte si les credentials (email+password) sont corrects et redirige 
  // vers le composant personne, sinon affiche le message d'erreur (.html)
  isAuthenticated(){
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        console.log('LoginComponent_1');
        console.log('data = '+data.value);
        console.log('data.role = '+data.role);
        console.log('data = '+JSON.stringify(data));
        console.log('data.role = '+JSON.stringify(data.role));

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveRole(data.role);
        
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigateByUrl('/home');
      },
      err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    )

  }
  register(){
    this.router.navigateByUrl('/register');
  }
}
