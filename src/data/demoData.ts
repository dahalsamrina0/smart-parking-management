import type { ParkingLocation, ParkingSlot, Reservation, User } from '@/types';

export const IMAGES = {
  loginBg: 'https://images.pexels.com/photos/38902559/pexels-photo-38902559.jpeg?auto=compress&cs=tinysrgb&w=1600',
  valley: 'https://images.pexels.com/photos/36524167/pexels-photo-36524167.jpeg?auto=compress&cs=tinysrgb&w=1600',
  newRoad: 'https://images.pexels.com/photos/36564693/pexels-photo-36564693.jpeg?auto=compress&cs=tinysrgb&w=940',
  jamal: 'https://images.pexels.com/photos/32343708/pexels-photo-32343708.jpeg?auto=compress&cs=tinysrgb&w=940',
  bagBazar: 'https://images.pexels.com/photos/33675501/pexels-photo-33675501.jpeg?auto=compress&cs=tinysrgb&w=940',
  swayambhu: 'https://images.pexels.com/photos/28831414/pexels-photo-28831414.jpeg?auto=compress&cs=tinysrgb&w=940',
  boudhanath: 'https://images.pexels.com/photos/38532241/pexels-photo-38532241.jpeg?auto=compress&cs=tinysrgb&w=940',
  patan: 'https://images.pexels.com/photos/36526508/pexels-photo-36526508.jpeg?auto=compress&cs=tinysrgb&w=940',
  street: 'https://images.pexels.com/photos/37584999/pexels-photo-37584999.jpeg?auto=compress&cs=tinysrgb&w=940',
  templeGold: 'https://images.pexels.com/photos/36053351/pexels-photo-36053351.jpeg?auto=compress&cs=tinysrgb&w=940',
};

export const LOCATIONS: ParkingLocation[] = [
  {
    id: 'new-road',
    name: 'New Road',
    nameNp: 'नयाँ सडक',
    area: 'New Road Gate, Kathmandu',
    image: IMAGES.newRoad,
    total: 50,
    reserved: 32,
    available: 18,
    occupied: 0,
    ratePerHour: 25,
    openHours: '6:00 AM – 9:00 PM',
  },
  {
    id: 'jamal',
    name: 'Jamal',
    nameNp: 'जमल',
    area: 'Jamal Chowk, Kathmandu',
    image: IMAGES.jamal,
    total: 40,
    reserved: 25,
    available: 15,
    occupied: 0,
    ratePerHour: 20,
    openHours: '6:00 AM – 8:00 PM',
  },
  {
    id: 'bag-bazar',
    name: 'Bag Bazar',
    nameNp: 'बागबजार',
    area: 'Bag Bazar, Kathmandu',
    image: IMAGES.bagBazar,
    total: 35,
    reserved: 20,
    available: 15,
    occupied: 0,
    ratePerHour: 15,
    openHours: '7:00 AM – 8:00 PM',
  },
];

// Overall demo stats (from spec)
export const OVERALL = {
  total: 125,
  reserved: 77,
  available: 48,
  occupied: 29,
};

function buildSlots(locId: string, rows: string[], perRow: number): ParkingSlot[] {
  const slots: ParkingSlot[] = [];
  // precomputed reserved indices to match location data
  const reservedCount = LOCATIONS.find((l) => l.id === locId)?.reserved ?? 0;
  const occupiedCount = Math.floor(reservedCount * 0.38); // ~29 occupied spread
  const reservedSet = new Set<number>();
  const occupiedSet = new Set<number>();
  let idx = 0;
  const total = rows.length * perRow;
  // deterministic pseudo-random
  const seed = locId.charCodeAt(0);
  for (let i = 0; i < reservedCount; i++) {
    const n = (seed * (i + 3) * 7) % total;
    reservedSet.add(n);
  }
  // remove overlap
  for (let i = 0; i < occupiedCount; i++) {
    const n = (seed * (i + 11) * 13) % total;
    if (!reservedSet.has(n)) occupiedSet.add(n);
  }
  for (const row of rows) {
    for (let n = 1; n <= perRow; n++) {
      const status =
        occupiedSet.has(idx) ? 'occupied' :
        reservedSet.has(idx) ? 'reserved' :
        'available';
      slots.push({
        id: `${locId}-${row}${n}`,
        locationId: locId,
        label: `${row}${n}`,
        row,
        status,
      });
      idx++;
    }
  }
  return slots;
}

export function buildAllSlots(): ParkingSlot[] {
  return [
    ...buildSlots('new-road', ['A', 'B', 'C', 'D', 'E'], 10),
    ...buildSlots('jamal', ['A', 'B', 'C', 'D'], 10),
    ...buildSlots('bag-bazar', ['A', 'B', 'C'], 12),
  ];
}

export const INITIAL_SLOTS = buildAllSlots();

export const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 'R-1042', user: 'Ram Shrestha', location: 'New Road', slot: 'A12', vehicle: 'BA 12 PA 3456', date: '19 Sep 2026', time: '10:00 AM – 12:00 PM', status: 'active' },
  { id: 'R-1041', user: 'Sita Karki', location: 'Jamal', slot: 'B08', vehicle: 'BA 3 CHA 7890', date: '19 Sep 2026', time: '09:30 AM – 11:00 AM', status: 'reserved' },
  { id: 'R-1040', user: 'Bikas Thapa', location: 'Bag Bazar', slot: 'C05', vehicle: 'BA 14 PA 1234', date: '19 Sep 2026', time: '01:00 PM – 03:00 PM', status: 'reserved' },
  { id: 'R-1039', user: 'Anita Gurung', location: 'New Road', slot: 'A05', vehicle: 'BA 7 PA 5678', date: '18 Sep 2026', time: '04:00 PM – 06:00 PM', status: 'completed' },
  { id: 'R-1038', user: 'Deepak Maharjan', location: 'Jamal', slot: 'A03', vehicle: 'BA 9 CHA 2468', date: '18 Sep 2026', time: '11:00 AM – 01:00 PM', status: 'completed' },
  { id: 'R-1037', user: 'Sarita Tamang', location: 'Bag Bazar', slot: 'B02', vehicle: 'BA 2 PA 9012', date: '18 Sep 2026', time: '02:00 PM – 04:00 PM', status: 'cancelled' },
  { id: 'R-1036', user: 'Niraj Rai', location: 'New Road', slot: 'D11', vehicle: 'BA 5 CHA 3456', date: '17 Sep 2026', time: '10:00 AM – 12:30 PM', status: 'completed' },
  { id: 'R-1035', user: 'Pooja Lama', location: 'Jamal', slot: 'C07', vehicle: 'BA 11 PA 7890', date: '17 Sep 2026', time: '03:00 PM – 05:00 PM', status: 'completed' },
];

export const USERS: User[] = [
  { id: 'U-01', name: 'Ram Shrestha', email: 'ram.shrestha@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 12 PA 3456', role: 'User', joined: '12 Aug 2026', avatar: 'RS' },
  { id: 'U-02', name: 'Sita Karki', email: 'sita.karki@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 3 CHA 7890', role: 'User', joined: '20 Aug 2026', avatar: 'SK' },
  { id: 'U-03', name: 'Bikas Thapa', email: 'bikas.thapa@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 14 PA 1234', role: 'User', joined: '03 Sep 2026', avatar: 'BT' },
  { id: 'U-04', name: 'Anita Gurung', email: 'anita.gurung@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 7 PA 5678', role: 'User', joined: '08 Sep 2026', avatar: 'AG' },
  { id: 'U-05', name: 'Deepak Maharjan', email: 'deepak.m@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 9 CHA 2468', role: 'User', joined: '15 Aug 2026', avatar: 'DM' },
  { id: 'U-06', name: 'Niraj Rai', email: 'niraj.rai@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 5 CHA 3456', role: 'User', joined: '01 Sep 2026', avatar: 'NR' },
  { id: 'U-07', name: 'Pooja Lama', email: 'pooja.lama@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 11 PA 7890', role: 'User', joined: '22 Aug 2026', avatar: 'PL' },
  { id: 'U-08', name: 'Sarita Tamang', email: 'sarita.tamang@gmail.com', phone: '+977 98XXXXXXXX', vehicle: 'BA 2 PA 9012', role: 'User', joined: '05 Sep 2026', avatar: 'ST' },
];

export const ADMIN_USER = {
  name: 'Admin',
  role: 'System Administrator',
  email: 'admin@smartparking.np',
  avatar: 'AD',
};
