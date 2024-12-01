import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const item = localStorage.getItem('item'); // Get 'item' value from localStorage

    if (!item || item === 'null' || item === 'undefined' || item === '0' || item.trim() === '') {
      // Redirect to login if the item is invalid
      this.router.navigate(['/login']);
      return false;
    }

    if (route.routeConfig?.path === 'admin' && item === 'ADMIN') {
      // Allow access to AdminDashboardComponent if item is ADMIN
      return true;
    }

    if (route.routeConfig?.path === 'dashboard' && item) {
      // Allow access to DashboardComponent if item has any valid value
      return true;
    }

    // Redirect to login by default for other cases
    this.router.navigate(['/login']);
    return false;
  }

}
