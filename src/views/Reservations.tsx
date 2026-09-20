import { useMemo, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/Toast';
import type { ReservationStatus } from '@/types';
import { Search, Filter, X, CalendarCheck } from 'lucide-react';

const STATUS_BADGE: Record<ReservationStatus, string> = {
  active: 'bg-green-100 text-green-700',
  reserved: 'bg-red-100 text-sindur-700',
  completed: 'bg-himal-100 text-himal-700',
  cancelled: 'bg-slate2-200 text-slate2-600',
};

export function Reservations() {
  const { reservations, cancelReservation } = useApp();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reservations.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.user.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.slot.toLowerCase().includes(q) ||
        r.vehicle.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    });
  }, [reservations, query, statusFilter]);

  const statusCounts = {
    all: reservations.length,
    active: reservations.filter((r) => r.status === 'active').length,
    reserved: reservations.filter((r) => r.status === 'reserved').length,
    completed: reservations.filter((r) => r.status === 'completed').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-800 text-slate2-900">Reservations</h2>
        <p className="deva text-sm text-slate2-500">बुकिङ / आरक्षण</p>
      </div>

      {/* filters */}
      <div className="card flex flex-wrap items-center gap-3 p-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate2-200 bg-slate2-50 px-3 py-2">
          <Search size={16} className="text-slate2-400" />
          <input
            placeholder="Search by ID, user, location, slot, or vehicle…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate2-800 placeholder:text-slate2-400 focus:outline-none"
          />
          {query && <button onClick={() => setQuery('')}><X size={15} className="text-slate2-400" /></button>}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter size={15} className="text-slate2-400" />
          {(['all', 'active', 'reserved', 'completed', 'cancelled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize transition-all ${
                statusFilter === s ? 'bg-himal-600 text-white' : 'bg-slate2-100 text-slate2-600 hover:bg-slate2-200'
              }`}
            >
              {s} <span className={`ml-0.5 text-[10px] ${statusFilter === s ? 'text-white/80' : 'text-slate2-400'}`}>{statusCounts[s]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* table */}
      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarCheck size={36} className="mx-auto text-slate2-300" />
            <p className="mt-2 text-sm text-slate2-500">No reservations match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate2-100 bg-slate2-50/60 text-left text-xs font-semibold uppercase tracking-wide text-slate2-400">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3 hidden md:table-cell">Location</th>
                  <th className="px-5 py-3">Slot</th>
                  <th className="px-5 py-3 hidden lg:table-cell">Vehicle</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Date</th>
                  <th className="px-5 py-3 hidden xl:table-cell">Time</th>
                  <th className="px-5 py-3 text-right">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate2-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate2-50/50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate2-500">{r.id}</td>
                    <td className="px-5 py-3 font-600 text-slate2-900">{r.user}</td>
                    <td className="px-5 py-3 hidden md:table-cell text-slate2-600">{r.location}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-md bg-slate2-100 px-2 py-0.5 font-mono text-xs font-700 text-slate2-700">{r.slot}</span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="rounded-md bg-himal-990 px-2 py-0.5 font-mono text-xs font-700 text-white">{r.vehicle}</span>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell text-slate2-500">{r.date}</td>
                    <td className="px-5 py-3 hidden xl:table-cell text-slate2-500">{r.time}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`chip capitalize ${STATUS_BADGE[r.status]}`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {(r.status === 'active' || r.status === 'reserved') ? (
                        <button
                          onClick={() => { cancelReservation(r.id); toast(`Reservation ${r.id} cancelled.`, 'info'); }}
                          className="rounded-lg px-2.5 py-1 text-xs font-700 text-sindur-600 hover:bg-sindur-50"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-xs text-slate2-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
