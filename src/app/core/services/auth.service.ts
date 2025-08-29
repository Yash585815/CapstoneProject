import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = environment.apiBaseUrl + '/auth';
  private readonly tokenKey = 'mhbs_token';
  private readonly userKey = 'mhbs_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(payload: Partial<User> & { password: string }): Observable<User> {
    return this.http.post<User>(`${this.api}/register`, payload).pipe(
      tap(user => {
        // Backend returns user object directly, not AuthResponse
        console.log('Registration successful:', user);
      })
    );
  }

  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.api}/login`, credentials).pipe(
      tap(res => {
        // Create user object with better defaults based on username
        const isAdmin = credentials.username.toLowerCase() === 'admin';
        const user: User = {
          id: 0,
          username: credentials.username,
          email: credentials.username + '@example.com', // Default email
          role: isAdmin ? 'ADMIN' : 'USER',
          firstName: isAdmin ? 'Admin' : 'User',
          lastName: isAdmin ? 'User' : 'Name',
          phoneNumber: '1234567890'
        };
        const authResponse: AuthResponse = { token: res.token, user };
        this.handleAuth(authResponse);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isAdmin(): boolean {
    const role = this.currentUser?.role?.toUpperCase();
    return role === 'ADMIN';
  }

  autoLogin(): void {
    const token = this.token;
    const user = this.getStoredUser();
    if (token && user) {
      this.currentUserSubject.next(user);
    }
  }

  private handleAuth(res: AuthResponse): void {
    localStorage.setItem(this.tokenKey, res.token);
    localStorage.setItem(this.userKey, JSON.stringify(res.user));
    this.currentUserSubject.next(res.user);
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }
}