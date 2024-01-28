import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authservice:AuthService, private router:Router){}

  titre = 'Application de gestion de devoirs';
  nomProf = 'Michel Buffa';
  x = 3;

  opened= false;

  isLogged() {
    return this.authservice.isLogged();
  }

  logOut() {
    this.authservice.logOut();
  }
}