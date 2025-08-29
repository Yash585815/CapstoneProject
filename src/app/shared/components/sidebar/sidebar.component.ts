import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  get isAdmin(): boolean {
    try {
      const raw = localStorage.getItem('mhbs_user');
      if (!raw) return false;
      const user = JSON.parse(raw);
      return user && user.role && user.role.toUpperCase() === 'ADMIN';
    } catch {
      return false;
    }
  }
}