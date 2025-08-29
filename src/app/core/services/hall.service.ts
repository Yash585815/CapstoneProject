import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hall } from '../models/hall.model';

@Injectable({ providedIn: 'root' })
export class HallService {
  private readonly api = environment.apiBaseUrl + '/halls';
  constructor(private http: HttpClient) {}

  // Public endpoints
  getAll(): Observable<Hall[]> { return this.http.get<Hall[]>(this.api); }
  getById(id: number): Observable<Hall> { return this.http.get<Hall>(`${this.api}/${id}`); }
  search(params: Record<string, string | number | boolean>): Observable<Hall[]> {
    const query = new URLSearchParams(params as any).toString();
    return this.http.get<Hall[]>(`${this.api}?${query}`);
  }

  // Admin endpoints
  create(hall: Hall): Observable<Hall> { return this.http.post<Hall>(this.api, hall); }
  update(id: number, hall: Hall): Observable<Hall> { return this.http.put<Hall>(`${this.api}/${id}`, hall); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }

  // Availability
  checkAvailability(id: number, date: string): Observable<{ available: boolean }>{
    return this.http.get<{ available: boolean }>(`${this.api}/${id}/availability`, { params: { date } });
  }
}