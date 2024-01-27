// admin-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.authService.isLogged()) {
      // If not logged in, redirect to login
      return this.router.createUrlTree(['/login']);
    } else if (this.authService.isAdmin()) {
      // If logged in and is admin, allow access
      return true;
    } else {
      // If logged in but not admin, redirect to home
      return this.router.createUrlTree(['/home']);
    }
  }
}