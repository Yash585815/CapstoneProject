import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly api = environment.apiBaseUrl + '/bookings';
  private cachedBookings: Booking[] = [];
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Booking[]> { return this.http.get<Booking[]>(this.api); }
  getMine(): Observable<Booking[]> { return this.http.get<Booking[]>(`${this.api}/my`); }
  getById(id: number): Observable<Booking> { return this.http.get<Booking>(`${this.api}/${id}`); }
  create(payload: Partial<Booking>): Observable<Booking> { 
    return this.http.post<Booking>(this.api, payload).pipe(
      tap(booking => {
        // Add to cache when created
        this.cachedBookings.push(booking);
        console.log('Booking cached:', booking);
      })
    );
  }
  update(id: number, payload: Partial<Booking>): Observable<Booking> { return this.http.put<Booking>(`${this.api}/${id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
  
  // Fallback method to get cached bookings
  getCachedBookings(): Observable<Booking[]> {
    console.log('Getting cached bookings:', this.cachedBookings);
    return new Observable(observer => {
      observer.next([...this.cachedBookings]);
      observer.complete();
    });
  }
  
  // Method to manually add booking to cache (for when created via form)
  addToCache(booking: Booking): void {
    const exists = this.cachedBookings.find(b => b.id === booking.id);
    if (!exists) {
      this.cachedBookings.push(booking);
      console.log('Manual cache add:', booking);
    }
  }
}
