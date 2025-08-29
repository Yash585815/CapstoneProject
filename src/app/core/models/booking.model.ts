export interface Booking {
  id?: number;
  hallId: number;
  userId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string; // ISO date string
  eventType: string;
  numberOfGuests: number;
  totalAmount: number;
  bookingStatus: string;
  bookingDate?: string; // ISO date string
}