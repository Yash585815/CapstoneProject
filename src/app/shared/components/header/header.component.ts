import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit() {
    // Initialize auth state on app startup
    this.authService.autoLogin();
  }

  get isAuthenticated(): boolean { 
    const token = localStorage.getItem('mhbs_token');
    return !!token;
  }

  get isAdmin(): boolean {
    try {
      const raw = localStorage.getItem('mhbs_user');
      if (!raw) return false;
      const user = JSON.parse(raw);
      return user && user.role && user.role.toUpperCase() === 'ADMIN';
    } catch (e) {
      return false;
    }
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
