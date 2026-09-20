import { ParkingCircle } from 'lucide-react';

export function Logo({ variant = 'dark', showText = true }: { variant?: 'dark' | 'light'; showText?: boolean }) {
  const text = variant === 'light' ? 'text-white' : 'text-slate2-900';
  const sub = variant === 'light' ? 'text-slate2-300' : 'text-slate2-400';
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-himal-500 to-himal-700 shadow-glow">
        <ParkingCircle size={22} className="text-white" />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-sm bg-sindur-500 ring-2 ring-white/90" />
      </div>
      {showText && (
        <div className="leading-tight">
          <p className={`font-display text-[15px] font-800 tracking-tight ${text}`}>Smart Parking</p>
          <p className={`deva text-[10px] font-600 ${sub}`}>स्मार्ट पार्किङ प्रणाली</p>
        </div>
      )}
    </div>
  );
}
