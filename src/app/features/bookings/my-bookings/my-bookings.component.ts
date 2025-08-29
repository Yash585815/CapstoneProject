import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  error: string | null = null;
  // Track rows processing to disable buttons
  processingIds: Set<number> = new Set();
  
  constructor(private bookingService: BookingService) {}
  
  ngOnInit(): void { 
    this.loadBookings();
  }
  
  loadBookings(): void {
    this.loading = true;
    this.error = null;
    
    console.log('Loading bookings...');
    console.log('Auth token exists:', !!localStorage.getItem('mhbs_token'));
    console.log('Token value:', localStorage.getItem('mhbs_token')?.substring(0, 20) + '...');
    
    // Prefer loading only current user's bookings if backend supports it
    this.bookingService.getMine().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
        console.log('My bookings loaded successfully:', bookings);
        console.log('Number of bookings:', bookings.length);
        
        if (bookings.length === 0) {
          this.tryFallbackMethod();
        }
      },
      error: (err) => {
        console.warn('Failed to load my bookings, falling back to all bookings:', err);
        // Fallback to loading all (in case API doesn't have /my)
        this.bookingService.getAll().subscribe({
          next: (all) => {
            this.bookings = all;
            this.loading = false;
          },
          error: (errAll) => {
            console.error('Failed to load bookings from API:', errAll);
            this.tryFallbackMethod();
          }
        });
      }
    });
  }
  
  refresh(): void {
    this.loadBookings();
  }

  // Whether the booking can be cancelled (not already cancelled and event date not past)
  canCancel(b: Booking): boolean {
    if (!b || !b.eventDate) return false;
    const status = (b.bookingStatus || '').toUpperCase();
    if (status === 'CANCELLED') return false;
    const eventDate = new Date(b.eventDate);
    const today = new Date();
    // Normalize to date-only comparison
    eventDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return eventDate >= today;
  }

  // Allow delete if already cancelled OR the event has not happened yet
  canDelete(b: Booking): boolean {
    if (!b || !b.eventDate) return false;
    const status = (b.bookingStatus || '').toUpperCase();
    const eventDate = new Date(b.eventDate);
    const today = new Date();
    eventDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return status === 'CANCELLED' || eventDate >= today;
  }

  cancel(b: Booking): void {
    if (!b.id) return;
    if (!this.canCancel(b)) return;
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.processingIds.add(b.id);
    this.bookingService.update(b.id, { bookingStatus: 'CANCELLED' }).subscribe({
      next: (updated) => {
        // Update local list
        const idx = this.bookings.findIndex(x => x.id === b.id);
        if (idx > -1) this.bookings[idx] = { ...this.bookings[idx], ...updated };
      },
      error: (err) => {
        console.error('Cancel failed', err);
        alert('Failed to cancel the booking. Please try again.');
      },
      complete: () => {
        if (b.id) this.processingIds.delete(b.id);
      }
    });
  }

  remove(b: Booking): void {
    if (!b.id) return;
    if (!this.canDelete(b)) return;
    if (!confirm('Delete this booking permanently? This action cannot be undone.')) return;

    this.processingIds.add(b.id);
    this.bookingService.delete(b.id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(x => x.id !== b.id);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete the booking. Please try again.');
      },
      complete: () => {
        if (b.id) this.processingIds.delete(b.id);
      }
    });
  }
  
  private tryFallbackMethod(): void {
    console.log('Trying fallback method (cached bookings)...');
    
    this.bookingService.getCachedBookings().subscribe({
      next: (cachedBookings) => {
        this.bookings = cachedBookings;
        this.loading = false;
        
        if (cachedBookings.length === 0) {
          this.error = 'No bookings found. The backend requires authentication to view all bookings. Create a booking first!';
        } else {
          console.log('Loaded cached bookings:', cachedBookings.length);
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Unable to load bookings. Backend authentication is required.';
      }
    });
  }
}
