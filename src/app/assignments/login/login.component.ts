import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const isLoggedIn = this.authService.logIn(this.username, this.password);
    if (isLoggedIn) {
      this.router.navigate(['/']);
    } else {
      // Show error message
    }
  }
}