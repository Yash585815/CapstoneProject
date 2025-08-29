import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('mhbs_token');
    console.log('Auth interceptor:', {
      url: req.url,
      hasToken: !!token,
      tokenPrefix: token?.substring(0, 20) + '...'
    });
    
    if (token) {
      const cloned = req.clone({ 
        setHeaders: { Authorization: `Bearer ${token}` } 
      });
      console.log('Adding auth header to request');
      return next.handle(cloned);
    }
    
    console.log('No token, sending request without auth header');
    return next.handle(req);
  }
}
