import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/StatCard';
import { NepalFlag } from '@/components/NepalFlag';
import { IMAGES } from '@/data/demoData';
import type { ViewId } from '@/types';
import {
  ParkingCircle, ShieldX, CircleCheck, Car, MapPin, ArrowRight, Clock, TrendingUp,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (v: ViewId) => void;
  onOpenLocation: (id: string) => void;
}

const STATUS_BADGE: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  reserved: 'bg-red-100 text-sindur-700',
  completed: 'bg-himal-100 text-himal-700',
  cancelled: 'bg-slate2-200 text-slate2-600',
};

export function Dashboard({ onNavigate, onOpenLocation }: DashboardProps) {
  const { stats, locations, reservations } = useApp();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-himal-800 via-himal-900 to-himal-980 p-6 shadow-cardlg animate-slide-up">
        <div className="absolute inset-0 opacity-20 temple-pattern" />
        <img
          src={IMAGES.valley}
          alt="Kathmandu Valley"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-25"
        />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-himal-980 to-transparent" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <NepalFlag size={22} />
              <span className="chip bg-white/10 text-white">Kathmandu Valley</span>
            </div>
            <h2 className="font-display text-2xl font-800 text-white">नमस्ते, Welcome Admin</h2>
            <p className="deva mt-1 text-sm text-slate2-200">व्यवस्थित पार्किङ, स्मार्ट काठमाडौं</p>
            <p className="mt-2 max-w-md text-sm text-slate2-300">
              Smart Parking for a Better Kathmandu — monitor all parking locations in real time.
            </p>
          </div>
          <button onClick={() => onNavigate('slots')} className="btn-gold">
            <Car size={16} /> Manage Parking Slots
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Parking Spaces" labelNp="कुल पार्किङ स्थान" value={stats.total} icon={ParkingCircle} accent="blue" pct="100%" delay={0} />
        <StatCard label="Reserved Spaces" labelNp="आरक्षित स्थान" value={stats.reserved} icon={ShieldX} accent="red" pct={`${Math.round((stats.reserved / stats.total) * 100)}%`} delay={80} />
        <StatCard label="Available Spaces" labelNp="उपलब्ध स्थान" value={stats.available} icon={CircleCheck} accent="green" pct={`${Math.round((stats.available / stats.total) * 100)}%`} delay={160} />
        <StatCard label="Occupied Spaces" labelNp="व्यस्त स्थान" value={stats.occupied} icon={Car} accent="orange" pct={`${Math.round((stats.occupied / stats.total) * 100)}%`} delay={240} />
      </div>

      {/* Locations + Chart */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Location cards */}
        <div className="xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-700 text-slate2-900">Parking Locations</h2>
              <p className="deva text-xs text-slate2-400">पार्किङ स्थानहरू</p>
            </div>
            <button onClick={() => onNavigate('locations')} className="btn-ghost text-xs">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                onClick={() => onOpenLocation(loc.id)}
                className="group card overflow-hidden text-left animate-slide-up hover:shadow-cardlg transition-all"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-28 overflow-hidden">
                  <img src={loc.image} alt={loc.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-himal-990/80 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <p className="font-display text-sm font-800 text-white">{loc.name}</p>
                    <p className="deva text-[11px] text-slate2-200">{loc.nameNp}</p>
                  </div>
                  <span className="absolute right-2 top-2 chip bg-white/90 text-slate2-700">
                    Rs {loc.ratePerHour}/hr
                  </span>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <MiniStat label="Total" value={loc.total} cls="text-slate2-900" />
                    <MiniStat label="Reserved" value={loc.reserved} cls="text-sindur-600" />
                    <MiniStat label="Available" value={loc.available} cls="text-park-available" />
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-himal-50 py-2 text-xs font-700 text-himal-700 group-hover:bg-himal-100 transition-colors">
                    View Details <ArrowRight size={13} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Occupancy chart */}
        <div className="card p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="mb-4">
            <h3 className="font-display text-base font-700 text-slate2-900">Occupancy by Location</h3>
            <p className="deva text-xs text-slate2-400">स्थानअनुसार पार्किङ अवस्था</p>
          </div>
          <div className="space-y-5">
            {locations.map((loc) => {
              const reservedPct = Math.round((loc.reserved / loc.total) * 100);
              const availPct = Math.round((loc.available / loc.total) * 100);
              return (
                <div key={loc.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-700 text-slate2-700">{loc.name}</span>
                    <span className="font-600 text-slate2-400">{loc.total} spaces</span>
                  </div>
                  <div className="flex h-6 overflow-hidden rounded-lg bg-slate2-100">
                    <div
                      className="flex items-center justify-center bg-gradient-to-r from-sindur-400 to-sindur-600 text-[10px] font-bold text-white transition-all duration-700"
                      style={{ width: `${reservedPct}%` }}
                    >
                      {reservedPct > 12 && `${reservedPct}%`}
                    </div>
                    <div
                      className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-[10px] font-bold text-white transition-all duration-700"
                      style={{ width: `${availPct}%` }}
                    >
                      {availPct > 12 && `${availPct}%`}
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center gap-4 text-[11px] font-600 text-slate2-500">
                    <span className="flex items-center gap-1"><span className="dot bg-sindur-500" /> Reserved {loc.reserved}</span>
                    <span className="flex items-center gap-1"><span className="dot bg-park-available" /> Available {loc.available}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-himal-50 p-3 text-xs font-600 text-himal-700">
            <TrendingUp size={15} /> Overall occupancy: {Math.round(((stats.reserved + stats.occupied) / stats.total) * 100)}% across Kathmandu
          </div>
        </div>
      </div>

      {/* Recent reservations */}
      <div className="card overflow-hidden animate-slide-up" style={{ animationDelay: '280ms' }}>
        <div className="flex items-center justify-between border-b border-slate2-100 px-5 py-4">
          <div>
            <h3 className="font-display text-base font-700 text-slate2-900">Recent Reservations</h3>
            <p className="deva text-xs text-slate2-400">हालका बुकिङहरू</p>
          </div>
          <button onClick={() => onNavigate('reservations')} className="btn-ghost text-xs">
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate2-100 bg-slate2-50/60 text-left text-xs font-semibold uppercase tracking-wide text-slate2-400">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3 hidden md:table-cell">Location</th>
                <th className="px-5 py-3 hidden sm:table-cell">Slot</th>
                <th className="px-5 py-3 hidden lg:table-cell">Vehicle</th>
                <th className="px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 hidden xl:table-cell">Time</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate2-100">
              {reservations.slice(0, 6).map((r) => (
                <tr key={r.id} className="hover:bg-slate2-50/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-slate2-500">{r.id}</td>
                  <td className="px-5 py-3 font-600 text-slate2-900">{r.user}</td>
                  <td className="px-5 py-3 hidden md:table-cell text-slate2-600">{r.location}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="rounded-md bg-slate2-100 px-2 py-0.5 font-mono text-xs font-700 text-slate2-700">{r.slot}</span>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <span className="rounded-md bg-himal-990 px-2 py-0.5 font-mono text-xs font-700 text-white">{r.vehicle}</span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-slate2-500">{r.date}</td>
                  <td className="px-5 py-3 hidden xl:table-cell text-slate2-500">{r.time}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`chip capitalize ${STATUS_BADGE[r.status]}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, cls }: { label: string; value: number; cls: string }) {
  return (
    <div className="rounded-lg bg-slate2-50 py-2">
      <p className={`font-display text-lg font-800 ${cls}`}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate2-400">{label}</p>
    </div>
  );
}
