// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLogged()) {
      // User is logged in, allow access
      return true;
    } else {
      // User is not logged in, redirect to login
      console.log('Vous n\'êtes pas connecté, navigation interdite');
      return this.router.createUrlTree(['/login']);
    }
  }
}
