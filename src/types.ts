export type SlotStatus = 'available' | 'reserved' | 'occupied';
export type ReservationStatus = 'active' | 'reserved' | 'completed' | 'cancelled';
export type ViewId = 'dashboard' | 'locations' | 'slots' | 'reservations' | 'users' | 'reports' | 'settings';

export interface ParkingLocation {
  id: string;
  name: string;
  nameNp: string;
  area: string;
  image: string;
  total: number;
  reserved: number;
  available: number;
  occupied: number;
  ratePerHour: number;
  openHours: string;
}

export interface ParkingSlot {
  id: string;
  locationId: string;
  label: string;
  row: string;
  status: SlotStatus;
}

export interface Reservation {
  id: string;
  user: string;
  location: string;
  slot: string;
  vehicle: string;
  date: string;
  time: string;
  status: ReservationStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  role: 'Admin' | 'Operator' | 'User';
  joined: string;
  avatar: string;
}
