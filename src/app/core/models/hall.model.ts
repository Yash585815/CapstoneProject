export interface Hall {
  id?: number;
  name: string;
  capacity: number;
  location: string;
  pricePerDay: number;
  amenities: string;
  available: boolean;
}