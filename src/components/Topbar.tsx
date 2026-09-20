import { useEffect, useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { ADMIN_USER } from '@/data/demoData';

interface TopbarProps {
  title: string;
  titleNp: string;
  onMenu: () => void;
}

export function Topbar({ title, titleNp, onMenu }: TopbarProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  const dateNp = now.toLocaleDateString('ne-NP', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate2-100 bg-white/85 px-4 backdrop-blur-md lg:px-6">
      <button onClick={onMenu} className="rounded-lg p-2 text-slate2-500 hover:bg-slate2-100 lg:hidden" aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-lg font-700 text-slate2-900">{title}</h1>
        <p className="deva hidden truncate text-xs text-slate2-400 sm:block">{titleNp}</p>
      </div>

      <div className="hidden items-center gap-2 rounded-xl border border-slate2-200 bg-slate2-50 px-3 py-2 text-sm text-slate2-500 md:flex">
        <Search size={16} className="text-slate2-400" />
        <input placeholder="Search…" className="w-40 bg-transparent text-sm text-slate2-800 placeholder:text-slate2-400 focus:outline-none" />
      </div>

      <div className="hidden flex-col items-end text-right sm:flex">
        <span className="flex items-center gap-1.5 text-sm font-600 text-slate2-700">
          <span className="dot bg-park-available animate-pulse-soft" />
          <span className="font-mono tabular-nums">{timeStr}</span>
        </span>
        <span className="text-[11px] text-slate2-400">{dateStr}</span>
      </div>

      <button className="relative rounded-lg p-2 text-slate2-500 hover:bg-slate2-100" aria-label="Notifications">
        <Bell size={20} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sindur-500 ring-2 ring-white" />
      </button>

      <div className="flex items-center gap-3">
        <div className="hidden text-right md:block">
          <p className="text-sm font-700 text-slate2-900">{ADMIN_USER.name}</p>
          <p className="text-[11px] text-slate2-400">{ADMIN_USER.role}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-himal-500 to-himal-700 text-sm font-bold text-white shadow-sm">
          {ADMIN_USER.avatar}
        </div>
      </div>
    </header>
  );
}
