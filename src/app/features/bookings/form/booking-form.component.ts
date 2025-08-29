import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { HallService } from '../../../core/services/hall.service';
import { Booking } from '../../../core/models/booking.model';
import { Hall } from '../../../core/models/hall.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  id: number | null = null;
  halls: Hall[] = [];
  selectedHall: Hall | null = null;
  
  form = this.fb.group({
    hallId: [0, Validators.required],
    customerName: ['', Validators.required],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: ['', Validators.required],
    eventDate: ['', Validators.required],
    eventType: ['', Validators.required],
    numberOfGuests: [1, [Validators.required, Validators.min(1)]],
    totalAmount: [{ value: 0, disabled: true }], // Make read-only
    bookingStatus: [{ value: 'PENDING', disabled: true }] // Make read-only
  });

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private bookingService: BookingService,
    private hallService: HallService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null;
    if (this.id) {
      this.bookingService.getById(this.id).subscribe(b => this.form.patchValue(b));
    }
    const hallIdQP = this.route.snapshot.queryParamMap.get('hallId');
    if (hallIdQP) {
      this.form.patchValue({ hallId: +hallIdQP });
      this.calculateAmount();
    }
  }

  ngOnInit() {
    // Load all halls first
    this.hallService.getAll().subscribe(halls => {
      this.halls = halls;
      console.log('Halls loaded:', halls);
      
      // Calculate amount after halls are loaded
      this.calculateAmount();
    });
    
    // Watch for hall changes to calculate amount
    this.form.get('hallId')?.valueChanges.subscribe(() => {
      console.log('Hall selection changed');
      this.calculateAmount();
    });
  }

  calculateAmount() {
    const hallId = this.form.get('hallId')?.value;
    console.log('Calculating amount for hallId:', hallId);
    console.log('Available halls:', this.halls);
    
    if (hallId && hallId !== 0 && this.halls.length > 0) {
      this.selectedHall = this.halls.find(h => h.id == hallId) || null; // Use == for type coercion
      console.log('Selected hall:', this.selectedHall);
      
      if (this.selectedHall) {
        console.log('Setting amount to:', this.selectedHall.pricePerDay);
        this.form.patchValue({ totalAmount: this.selectedHall.pricePerDay });
      } else {
        console.log('No hall found for ID:', hallId);
      }
    } else {
      console.log('Cannot calculate: hallId=' + hallId + ', halls.length=' + this.halls.length);
    }
  }

  save() {
    if (this.form.invalid) return;
    
    // Get form values including disabled fields
    const formValue = this.form.getRawValue();
    const payload: Partial<Booking> = {
      hallId: formValue.hallId || 0,
      customerName: formValue.customerName || '',
      customerEmail: formValue.customerEmail || '',
      customerPhone: formValue.customerPhone || '',
      eventDate: formValue.eventDate || '',
      eventType: formValue.eventType || '',
      numberOfGuests: formValue.numberOfGuests || 1,
      totalAmount: formValue.totalAmount || 0,
      bookingStatus: 'PENDING'
    };
    
    const obs = this.id ? this.bookingService.update(this.id, payload) : this.bookingService.create(payload);
    obs.subscribe({
      next: (savedBooking) => {
        console.log('Booking saved:', savedBooking);
        // Add to cache if it's a new booking
        if (!this.id) {
          this.bookingService.addToCache(savedBooking);
        }
        alert('Booking saved successfully!');
        this.router.navigate(['/bookings/my']);
      },
      error: (err) => {
        console.error('Booking save failed:', err);
        alert('Failed to save booking. Please try again.');
      }
    });
  }
}