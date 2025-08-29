import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('mhbs_token');
    return token ? this.router.parseUrl('/dashboard') : true;
  }
}