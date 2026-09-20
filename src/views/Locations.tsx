import { useApp } from '@/context/AppContext';
import type { ViewId } from '@/types';
import { MapPin, Clock, ArrowRight, ParkingCircle, ShieldX, CircleCheck, Car } from 'lucide-react';

interface LocationsProps {
  onOpenLocation: (id: string) => void;
  onNavigate: (v: ViewId) => void;
}

export function Locations({ onOpenLocation, onNavigate }: LocationsProps) {
  const { locations } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-800 text-slate2-900">Parking Locations</h2>
        <p className="deva text-sm text-slate2-500">पार्किङ स्थानहरू — Kathmandu Valley</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {locations.map((loc, i) => {
          const occPct = Math.round(((loc.reserved + loc.occupied) / loc.total) * 100);
          return (
            <div
              key={loc.id}
              className="card overflow-hidden animate-slide-up hover:shadow-cardlg transition-shadow"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-himal-990/90 via-himal-990/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-xl font-800 text-white">{loc.name}</h3>
                    <p className="deva text-sm text-slate2-200">{loc.nameNp}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate2-300">
                      <MapPin size={12} /> {loc.area}
                    </p>
                  </div>
                  <span className="chip bg-white/90 text-slate2-700">Rs {loc.ratePerHour}/hr</span>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-3 gap-3">
                  <Metric icon={ParkingCircle} label="Total" value={loc.total} cls="text-slate2-900" />
                  <Metric icon={ShieldX} label="Reserved" value={loc.reserved} cls="text-sindur-600" />
                  <Metric icon={CircleCheck} label="Available" value={loc.available} cls="text-park-available" />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-600 text-slate2-500">Occupancy</span>
                    <span className="font-700 text-slate2-700">{occPct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate2-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-himal-500 to-himal-700 transition-all duration-700" style={{ width: `${occPct}%` }} />
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate2-500">
                  <Clock size={14} className="text-slate2-400" /> {loc.openHours}
                </div>

                <button
                  onClick={() => { onOpenLocation(loc.id); onNavigate('slots'); }}
                  className="btn-soft mt-4 w-full"
                >
                  <Car size={16} /> View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, cls }: { icon: typeof Car; label: string; value: number; cls: string }) {
  return (
    <div className="rounded-xl bg-slate2-50 py-3 text-center">
      <Icon size={18} className="mx-auto text-slate2-400" />
      <p className={`mt-1 font-display text-xl font-800 ${cls}`}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate2-400">{label}</p>
    </div>
  );
}
