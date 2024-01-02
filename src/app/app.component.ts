import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = 'Application de gestion de devoirs (Assignement)';
  nomProf = 'Michel Buffa';
  x = 3;
  opened=false;

  constructor (private authService: AuthService, private router: Router){}
  login() {
    this.router.navigate(['/login']);
  }

}




