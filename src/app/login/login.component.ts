import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.logIn(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      console.log('Erreur de login !');
    }
  }
}
