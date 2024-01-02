import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (route.data['admin'] && !this.authService.isAdmin()) {
      // Redirect to a "not authorized" page or something similar
      return false;
    }
    return true;
  }
}
