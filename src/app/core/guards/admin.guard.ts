import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean | UrlTree {
    const raw = localStorage.getItem('mhbs_user');
    const user = raw ? JSON.parse(raw) : null;
    const isAdmin = user?.role?.toUpperCase?.() === 'ADMIN';
    return isAdmin ? true : this.router.parseUrl('/');
  }
}