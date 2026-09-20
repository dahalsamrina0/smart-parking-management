import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { LOCATIONS, INITIAL_SLOTS, INITIAL_RESERVATIONS, OVERALL } from '@/data/demoData';
import type { ParkingLocation, ParkingSlot, Reservation, SlotStatus } from '@/types';

interface AppState {
  // auth
  loggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // data
  locations: ParkingLocation[];
  slots: ParkingSlot[];
  reservations: Reservation[];

  // stats derived
  stats: { total: number; reserved: number; available: number; occupied: number };

  // actions
  reserveSlot: (slotId: string, info: { user: string; vehicle: string; date: string; time: string }) => void;
  cancelReservation: (id: string) => void;
  setSlotStatus: (slotId: string, status: SlotStatus) => void;

  // selected location for slots page
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
}

const Ctx = createContext<AppState | null>(null);

let resCounter = 1043;

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [slots, setSlots] = useState<ParkingSlot[]>(INITIAL_SLOTS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('new-road');

  const login = useCallback((_email: string, _password: string) => {
    // demo: accept any non-empty credentials
    setLoggedIn(true);
    return true;
  }, []);

  const logout = useCallback(() => setLoggedIn(false), []);

  const stats = useMemo(() => {
    // recompute from live slots
    const reserved = slots.filter((s) => s.status === 'reserved').length;
    const occupied = slots.filter((s) => s.status === 'occupied').length;
    const total = slots.length;
    const available = slots.filter((s) => s.status === 'available').length;
    return { total, reserved, available, occupied };
  }, [slots]);

  const locations = useMemo(() => {
    return LOCATIONS.map((loc) => {
      const locSlots = slots.filter((s) => s.locationId === loc.id);
      const reserved = locSlots.filter((s) => s.status === 'reserved').length;
      const occupied = locSlots.filter((s) => s.status === 'occupied').length;
      const available = locSlots.filter((s) => s.status === 'available').length;
      return { ...loc, total: locSlots.length, reserved, occupied, available };
    });
  }, [slots]);

  const reserveSlot = useCallback(
    (slotId: string, info: { user: string; vehicle: string; date: string; time: string }) => {
      const slot = slots.find((s) => s.id === slotId);
      if (!slot) return;
      const loc = LOCATIONS.find((l) => l.id === slot.locationId);
      setSlots((prev) =>
        prev.map((s) => (s.id === slotId ? { ...s, status: 'reserved' as SlotStatus } : s))
      );
      const newRes: Reservation = {
        id: `R-${resCounter++}`,
        user: info.user,
        location: loc?.name ?? '—',
        slot: slot.label,
        vehicle: info.vehicle,
        date: info.date,
        time: info.time,
        status: 'reserved',
      };
      setReservations((prev) => [newRes, ...prev]);
    },
    [slots]
  );

  const cancelReservation = useCallback((id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
    );
  }, []);

  const setSlotStatus = useCallback((slotId: string, status: SlotStatus) => {
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, status } : s)));
  }, []);

  const value: AppState = {
    loggedIn,
    login,
    logout,
    locations,
    slots,
    reservations,
    stats,
    reserveSlot,
    cancelReservation,
    setSlotStatus,
    selectedLocationId,
    setSelectedLocationId,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
