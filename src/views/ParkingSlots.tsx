import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/Toast';
import { Modal } from '@/components/Modal';
import type { ParkingSlot, SlotStatus } from '@/types';
import {
  CircleCheck, ShieldX, Car, MapPin, Clock, Calendar, Hash, ArrowRight, Filter,
} from 'lucide-react';

const STATUS_META: Record<SlotStatus, { label: string; labelNp: string; cls: string; ring: string; dot: string; text: string }> = {
  available: { label: 'Available', labelNp: 'उपलब्ध', cls: 'bg-green-500 hover:bg-green-600', ring: 'ring-green-300', dot: 'bg-park-available', text: 'text-green-700' },
  reserved: { label: 'Reserved', labelNp: 'आरक्षित', cls: 'bg-red-500 hover:bg-red-600', ring: 'ring-red-300', dot: 'bg-sindur-500', text: 'text-sindur-700' },
  occupied: { label: 'Occupied', labelNp: 'व्यस्त', cls: 'bg-orange-500 hover:bg-orange-600', ring: 'ring-orange-300', dot: 'bg-park-occupied', text: 'text-orange-700' },
};

interface SlotsProps {
  onNavigateToReservations: () => void;
}

export function ParkingSlots({ onNavigateToReservations }: SlotsProps) {
  const { locations, slots, selectedLocationId, setSelectedLocationId, reserveSlot, setSlotStatus } = useApp();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | SlotStatus>('all');
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [reservationTarget, setReservationTarget] = useState<ParkingSlot | null>(null);

  // reservation form
  const [vehicle, setVehicle] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-GB').replace(/\//g, '/'));
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('12:00');

  const loc = locations.find((l) => l.id === selectedLocationId) ?? locations[0];
  const locSlots = useMemo(
    () => slots.filter((s) => s.locationId === loc?.id),
    [slots, loc?.id]
  );

  const rows = useMemo(() => {
    const rowMap = new Map<string, ParkingSlot[]>();
    for (const s of locSlots) {
      (rowMap.get(s.row) ?? rowMap.set(s.row, []).get(s.row)!).push(s);
    }
    return Array.from(rowMap.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [locSlots]);

  const filtered = filter === 'all' ? locSlots : locSlots.filter((s) => s.status === filter);

  const counts = {
    all: locSlots.length,
    available: locSlots.filter((s) => s.status === 'available').length,
    reserved: locSlots.filter((s) => s.status === 'reserved').length,
    occupied: locSlots.filter((s) => s.status === 'occupied').length,
  };

  function handleSlotClick(slot: ParkingSlot) {
    setSelectedSlot(slot);
    if (slot.status === 'available') {
      setReservationTarget(slot);
      setVehicle('');
      setUserName('');
      setStartTime('10:00');
      setEndTime('12:00');
    }
  }

  function confirmReservation() {
    if (!reservationTarget) return;
    if (!vehicle.trim() || !userName.trim()) {
      toast('कृपया नाम र सवारी नम्बर भर्नुहोस् (Please enter name and vehicle number)', 'error');
      return;
    }
    const timeLabel = `${formatTime12(startTime)} – ${formatTime12(endTime)}`;
    reserveSlot(reservationTarget.id, { user: userName.trim(), vehicle: vehicle.trim().toUpperCase(), date, time: timeLabel });
    toast(`बुकिङ पुष्टि भयो! Slot ${reservationTarget.label} reserved for ${userName.trim()}.`, 'success');
    setReservationTarget(null);
    setSelectedSlot(null);
  }

  function releaseSlot(slot: ParkingSlot) {
    setSlotStatus(slot.id, 'available');
    toast(`Slot ${slot.label} released — now available.`, 'success');
    setSelectedSlot(null);
  }

  return (
    <div className="space-y-6">
      {/* Location selector */}
      <div className="flex flex-wrap gap-2">
        {locations.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelectedLocationId(l.id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-700 transition-all ${
              l.id === loc?.id
                ? 'border-himal-400 bg-himal-50 text-himal-700 ring-2 ring-himal-400/30'
                : 'border-slate2-200 bg-white text-slate2-600 hover:bg-slate2-50'
            }`}
          >
            <MapPin size={16} /> {l.name}
            <span className="deva text-xs font-500 opacity-70">{l.nameNp}</span>
          </button>
        ))}
      </div>

      {/* Location header card */}
      <div className="card relative overflow-hidden animate-slide-up">
        <div className="relative h-32">
          <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-himal-990/90 via-himal-990/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-white">
              <h2 className="font-display text-2xl font-800">{loc.name} Parking</h2>
              <p className="deva text-sm text-slate2-200">{loc.nameNp} पार्किङ</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-slate2-300">
                <MapPin size={12} /> {loc.area} · <Clock size={12} /> {loc.openHours}
              </p>
            </div>
            <div className="hidden rounded-xl bg-white/15 px-4 py-2 text-white backdrop-blur-sm sm:block">
              <p className="text-xs text-slate2-200">Rate</p>
              <p className="font-display text-lg font-800">Rs {loc.ratePerHour}<span className="text-xs font-500">/hr</span></p>
            </div>
          </div>
        </div>

        {/* stats bar */}
        <div className="grid grid-cols-3 divide-x divide-slate2-100 border-t border-slate2-100">
          <LocStat label="Total Spaces" labelNp="कुल स्थान" value={counts.all} icon={Hash} cls="text-slate2-900" />
          <LocStat label="Reserved" labelNp="आरक्षित" value={counts.reserved} icon={ShieldX} cls="text-sindur-600" />
          <LocStat label="Available" labelNp="उपलब्ध" value={counts.available} icon={CircleCheck} cls="text-park-available" />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-600 text-slate2-400"><Filter size={14} /> Filter:</span>
        <FilterPill label="All" count={counts.all} active={filter === 'all'} onClick={() => setFilter('all')} />
        <FilterPill label="Available" count={counts.available} active={filter === 'available'} onClick={() => setFilter('available')} color="green" />
        <FilterPill label="Reserved" count={counts.reserved} active={filter === 'reserved'} onClick={() => setFilter('reserved')} color="red" />
        <FilterPill label="Occupied" count={counts.occupied} active={filter === 'occupied'} onClick={() => setFilter('occupied')} color="orange" />
      </div>

      {/* Slot grid */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate2-100 px-5 py-4">
          <h3 className="font-display text-base font-700 text-slate2-900">Parking Grid</h3>
          <p className="text-xs text-slate2-400">Tap an available (green) slot to make a reservation</p>
        </div>
        <div className="space-y-4 p-5">
          {rows.map(([row, rowSlots]) => (
            <div key={row}>
              <p className="mb-2 text-xs font-700 uppercase tracking-wide text-slate2-400">Row {row}</p>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
                {rowSlots
                  .filter((s) => filter === 'all' || s.status === filter)
                  .map((slot) => {
                    const meta = STATUS_META[slot.status];
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotClick(slot)}
                        className={`group relative aspect-square rounded-lg ${meta.cls} text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardlg ring-2 ring-transparent hover:${meta.ring} animate-fade-in`}
                        title={`${slot.label} — ${meta.label}`}
                      >
                        <span className="font-mono text-[11px] font-bold">{slot.label}</span>
                        {slot.status === 'occupied' && (
                          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse-soft" />
                        )}
                        {slot.status === 'available' && (
                          <span className="absolute inset-0 flex items-end justify-center pb-0.5 text-[8px] font-bold uppercase opacity-0 group-hover:opacity-90 transition-opacity">
                            Book
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 border-t border-slate2-100 bg-slate2-50/50 px-5 py-3 text-xs font-600 text-slate2-600">
          <LegendItem dot="bg-park-available" label="Available" labelNp="उपलब्ध" />
          <LegendItem dot="bg-sindur-500" label="Reserved" labelNp="आरक्षित" />
          <LegendItem dot="bg-park-occupied" label="Occupied" labelNp="व्यस्त" />
          <button onClick={onNavigateToReservations} className="ml-auto flex items-center gap-1 text-xs font-700 text-himal-600 hover:text-himal-700">
            View Reservations <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Slot info / reservation modal */}
      <Modal
        open={!!selectedSlot && !reservationTarget}
        onClose={() => setSelectedSlot(null)}
        title={selectedSlot ? `Slot ${selectedSlot.label}` : ''}
        subtitle={selectedSlot ? STATUS_META[selectedSlot.status].labelNp : ''}
        maxWidth="max-w-sm"
        footer={
          selectedSlot && (
            <>
              <button className="btn-ghost" onClick={() => setSelectedSlot(null)}>Close</button>
              {selectedSlot.status === 'available' && (
                <button className="btn-primary" onClick={() => setReservationTarget(selectedSlot)}>
                  Reserve This Slot
                </button>
              )}
              {selectedSlot.status === 'reserved' && (
                <button className="btn-danger" onClick={() => releaseSlot(selectedSlot)}>
                  Release Slot
                </button>
              )}
            </>
          )
        }
      >
        {selectedSlot && (
          <div className="space-y-3">
            <div className={`flex items-center gap-3 rounded-xl p-4 ${STATUS_META[selectedSlot.status].text} bg-slate2-50`}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white">
                <Car size={24} />
              </div>
              <div>
                <p className="font-display text-base font-700">Status: {STATUS_META[selectedSlot.status].label}</p>
                <p className="deva text-xs opacity-80">{STATUS_META[selectedSlot.status].labelNp}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Location" value={loc?.name ?? '—'} />
              <Info label="Slot" value={selectedSlot.label} />
              <Info label="Rate" value={`Rs ${loc?.ratePerHour}/hr`} />
              <Info label="Row" value={selectedSlot.row} />
            </div>
          </div>
        )}
      </Modal>

      {/* Reservation form modal */}
      <Modal
        open={!!reservationTarget}
        onClose={() => { setReservationTarget(null); setSelectedSlot(null); }}
        title="Confirm Reservation"
        subtitle="बुकिङ पुष्टि गर्नुहोस्"
        maxWidth="max-w-md"
        footer={
          <>
            <button className="btn-ghost" onClick={() => { setReservationTarget(null); setSelectedSlot(null); }}>
              Cancel · रद्द गर्नुहोस्
            </button>
            <button className="btn-primary" onClick={confirmReservation}>
              <CalendarCheck size={16} /> Confirm Reservation
            </button>
          </>
        }
      >
        {reservationTarget && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-himal-50 p-4">
              <Info icon={MapPin} label="Location" value={loc?.name ?? '—'} />
              <Info icon={Hash} label="Slot" value={reservationTarget.label} />
            </div>
            <div>
              <label className="label">User Name · नाम</label>
              <input className="input" placeholder="e.g. Ram Shrestha" value={userName} onChange={(e) => setUserName(e.target.value)} autoFocus />
            </div>
            <div>
              <label className="label">Vehicle Number · सवारी नम्बर</label>
              <input className="input font-mono uppercase tracking-wider" placeholder="BA 12 PA 3456" value={vehicle} onChange={(e) => setVehicle(e.target.value)} maxLength={14} />
            </div>
            <div>
              <label className="label">Date · मिति</label>
              <input className="input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Start Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate2-400" />
                  <input type="time" className="input pl-9" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label">End Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate2-400" />
                  <input type="time" className="input pl-9" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function formatTime12(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`;
}

function LocStat({ label, labelNp, value, icon: Icon, cls }: { label: string; labelNp: string; value: number; icon: typeof Hash; cls: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <Icon size={20} className="text-slate2-300" />
      <div>
        <p className={`font-display text-2xl font-800 ${cls}`}>{value}</p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate2-400">{label}</p>
        <p className="deva text-[10px] text-slate2-400">{labelNp}</p>
      </div>
    </div>
  );
}

function FilterPill({ label, count, active, onClick, color = 'brand' }: { label: string; count: number; active: boolean; onClick: () => void; color?: 'brand' | 'green' | 'red' | 'orange' }) {
  const activeCls = { brand: 'bg-himal-600', green: 'bg-park-available', red: 'bg-sindur-500', orange: 'bg-park-occupied' }[color];
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${active ? `${activeCls} text-white` : 'bg-slate2-100 text-slate2-600 hover:bg-slate2-200'}`}>
      {label} <span className={`rounded-full px-1.5 text-[10px] ${active ? 'bg-white/25' : 'bg-white'}`}>{count}</span>
    </button>
  );
}

function LegendItem({ dot, label, labelNp }: { dot: string; label: string; labelNp: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`dot ${dot}`} />
      {label} <span className="deva text-slate2-400">· {labelNp}</span>
    </span>
  );
}

function Info({ icon: Icon, label, value }: { icon?: typeof MapPin; label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate2-400">{label}</p>
      <p className="mt-0.5 flex items-center gap-1.5 font-600 text-slate2-800">
        {Icon && <Icon size={14} className="text-slate2-400" />} {value}
      </p>
    </div>
  );
}

// import CalendarCheck for footer button
import { CalendarCheck } from 'lucide-react';
