import { useApp } from '@/context/AppContext';
import { IMAGES } from '@/data/demoData';
import { HimalayaRidge } from '@/components/Decorations';
import { StatCard } from '@/components/StatCard';
import { Wallet, TrendingUp, CalendarCheck, Users, Download } from 'lucide-react';

export function Reports() {
  const { locations, reservations, stats } = useApp();

  const totalRevenue = reservations
    .filter((r) => r.status !== 'cancelled')
    .reduce((sum, r) => sum + 30, 0); // demo: ~Rs 30 avg per reservation

  const completed = reservations.filter((r) => r.status === 'completed').length;
  const cancelled = reservations.filter((r) => r.status === 'cancelled').length;

  // weekly demo data
  const weekly = [
    { day: 'Mon', revenue: 450 },
    { day: 'Tue', revenue: 620 },
    { day: 'Wed', revenue: 380 },
    { day: 'Thu', revenue: 720 },
    { day: 'Fri', revenue: 890 },
    { day: 'Sat', revenue: 1100 },
    { day: 'Sun', revenue: 540 },
  ];
  const maxRev = Math.max(...weekly.map((w) => w.revenue));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-800 text-slate2-900">Reports</h2>
          <p className="deva text-sm text-slate2-500">रिपोर्ट — Analytics & Insights</p>
        </div>
        <button
          className="btn-outline text-xs"
          onClick={() => toast('Report exported (demo)')}
        >
          <Download size={14} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" labelNp="कुल आम्दानी" value={`Rs ${totalRevenue}`} icon={Wallet} accent="blue" pct="100%" delay={0} />
        <StatCard label="Reservations" labelNp="कुल बुकिङ" value={reservations.length} icon={CalendarCheck} accent="green" delay={80} />
        <StatCard label="Completed" labelNp="सम्पन्न" value={completed} icon={TrendingUp} accent="orange" delay={160} />
        <StatCard label="Cancelled" labelNp="रद्द" value={cancelled} icon={Users} accent="red" delay={240} />
      </div>

      {/* weekly chart */}
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-700 text-slate2-900">Weekly Revenue</h3>
            <p className="deva text-xs text-slate2-400">साप्ताहिक आम्दानी</p>
          </div>
          <span className="chip bg-green-100 text-green-700"><TrendingUp size={13} /> +18% vs last week</span>
        </div>
        <div className="flex items-end justify-between gap-3 h-48">
          {weekly.map((w, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="group relative w-full rounded-t-lg bg-gradient-to-t from-himal-600 to-himal-400 transition-all duration-500 hover:from-himal-700"
                  style={{ height: `${(w.revenue / maxRev) * 100}%` }}
                  title={`Rs ${w.revenue}`}
                >
                  <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-himal-990 px-1.5 py-0.5 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Rs {w.revenue}
                  </span>
                </div>
              </div>
              <span className="text-xs font-600 text-slate2-500">{w.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* location comparison */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate2-100 px-5 py-4">
          <h3 className="font-display text-base font-700 text-slate2-900">Location Performance</h3>
          <p className="deva text-xs text-slate2-400">स्थानगत प्रदर्शन</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate2-100 bg-slate2-50/60 text-left text-xs font-semibold uppercase tracking-wide text-slate2-400">
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3 text-right">Total</th>
                <th className="px-5 py-3 text-right">Reserved</th>
                <th className="px-5 py-3 text-right">Available</th>
                <th className="px-5 py-3 text-right">Occupancy</th>
                <th className="px-5 py-3 text-right">Est. Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate2-100">
              {locations.map((l) => {
                const occPct = Math.round(((l.reserved + l.occupied) / l.total) * 100);
                const estRev = (l.reserved + l.occupied) * l.ratePerHour;
                return (
                  <tr key={l.id} className="hover:bg-slate2-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={l.image} alt={l.name} className="h-10 w-14 rounded-lg object-cover" />
                        <div>
                          <p className="font-600 text-slate2-900">{l.name}</p>
                          <p className="deva text-xs text-slate2-400">{l.nameNp}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right font-700 text-slate2-900">{l.total}</td>
                    <td className="px-5 py-3 text-right text-sindur-600 font-600">{l.reserved}</td>
                    <td className="px-5 py-3 text-right text-park-available font-600">{l.available}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate2-100">
                          <div className="h-full rounded-full bg-himal-500" style={{ width: `${occPct}%` }} />
                        </div>
                        <span className="font-700 text-slate2-700">{occPct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right font-display font-800 text-slate2-900">Rs {estRev}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* footer banner with himalaya */}
      <div className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-himal-800 to-himal-980 p-6 text-center text-white">
        <HimalayaRidge className="absolute bottom-0 left-0 w-full h-20 opacity-40" color="#070f24" />
        <div className="relative">
          <p className="font-display text-lg font-800">Smart Parking for a Better Kathmandu</p>
          <p className="deva text-sm text-slate2-200">व्यवस्थित पार्किङ, स्मार्ट काठमाडौं</p>
          <p className="mt-2 text-xs text-slate2-300">Overall {stats.total} spaces · {Math.round(((stats.reserved + stats.occupied) / stats.total) * 100)}% occupied</p>
        </div>
      </div>
    </div>
  );
}

// inline toast stub (avoid importing context just for one action)
function toast(msg: string) {
  // lightweight: use console for demo; real toast used elsewhere
  console.log(msg);
}
