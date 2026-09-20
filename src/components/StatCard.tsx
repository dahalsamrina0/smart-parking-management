import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  labelNp?: string;
  value: string | number;
  icon: LucideIcon;
  accent: 'blue' | 'red' | 'green' | 'orange';
  pct?: string;
  delay?: number;
}

const ACCENTS = {
  blue: { iconBg: 'bg-himal-50 text-himal-600', bar: 'from-himal-500 to-himal-700', glow: 'from-himal-500/10' },
  red: { iconBg: 'bg-red-50 text-sindur-600', bar: 'from-sindur-400 to-sindur-700', glow: 'from-sindur-500/10' },
  green: { iconBg: 'bg-green-50 text-park-available', bar: 'from-green-400 to-green-600', glow: 'from-green-500/10' },
  orange: { iconBg: 'bg-orange-50 text-park-occupied', bar: 'from-orange-400 to-orange-600', glow: 'from-orange-500/10' },
};

export function StatCard({ label, labelNp, value, icon: Icon, accent, pct, delay = 0 }: StatCardProps) {
  const a = ACCENTS[accent];
  return (
    <div
      className="card relative overflow-hidden p-5 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-b ${a.glow} to-transparent blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          {labelNp && <p className="deva text-[11px] text-slate2-400 -mt-0.5">{labelNp}</p>}
          <p className="mt-2 font-display text-3xl font-800 tracking-tight text-slate2-900">{value}</p>
          {pct && (
            <div className="mt-2 flex items-center gap-2">
              <span className="chip bg-slate2-100 text-slate2-600">{pct}</span>
            </div>
          )}
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${a.iconBg}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate2-100">
        <div className={`h-full rounded-full bg-gradient-to-r ${a.bar} transition-all duration-700`} style={{ width: pct ?? '100%' }} />
      </div>
    </div>
  );
}
