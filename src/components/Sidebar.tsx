import { Logo } from '@/components/Logo';
import { NepalFlag } from '@/components/NepalFlag';
import { HimalayaRidge, TempleSilhouette } from '@/components/Decorations';
import { useApp } from '@/context/AppContext';
import type { ViewId } from '@/types';
import {
  LayoutDashboard, MapPinned, Grid3x3, CalendarCheck, Users, BarChart3,
  Settings, LogOut, X,
} from 'lucide-react';

interface SidebarProps {
  view: ViewId;
  onChange: (v: ViewId) => void;
  open: boolean;
  onClose: () => void;
}

const NAV: { id: ViewId; en: string; np: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', en: 'Dashboard', np: 'ड्यासबोर्ड', icon: LayoutDashboard },
  { id: 'locations', en: 'Parking Locations', np: 'पार्किङ स्थानहरू', icon: MapPinned },
  { id: 'slots', en: 'Parking Slots', np: 'पार्किङ स्लट', icon: Grid3x3 },
  { id: 'reservations', en: 'Reservations', np: 'बुकिङ / आरक्षण', icon: CalendarCheck },
  { id: 'users', en: 'Users', np: 'प्रयोगकर्ताहरू', icon: Users },
  { id: 'reports', en: 'Reports', np: 'रिपोर्ट', icon: BarChart3 },
  { id: 'settings', en: 'Settings', np: 'सेटिङ', icon: Settings },
];

export function Sidebar({ view, onChange, open, onClose }: SidebarProps) {
  const { logout } = useApp();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-himal-990/50 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-himal-980 text-slate2-200 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* temple pattern decoration */}
        <div className="pointer-events-none absolute inset-0 temple-pattern opacity-60" />

        {/* Header */}
        <div className="relative flex h-16 items-center justify-between gap-2 border-b border-white/5 px-5">
          <Logo variant="light" />
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate2-400 hover:bg-white/5 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate2-500">Menu</p>
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onChange(item.id); onClose(); }}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                  active ? 'bg-himal-600 text-white shadow-glow' : 'text-slate2-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={19} className={active ? 'text-white' : 'text-slate2-400 group-hover:text-white'} />
                <div className="flex-1 text-left leading-tight">
                  <p className="text-sm font-600">{item.en}</p>
                  <p className={`deva text-[10px] ${active ? 'text-white/70' : 'text-slate2-500'}`}>{item.np}</p>
                </div>
                {active && <span className="h-1.5 w-1.5 rounded-full bg-white/80" />}
              </button>
            );
          })}
        </nav>

        {/* Decorative temple + himalaya bottom */}
        <div className="relative mt-auto">
          <div className="relative h-24 overflow-hidden">
            <HimalayaRidge className="absolute bottom-0 left-0 w-full h-full opacity-30" color="#070f24" />
            <TempleSilhouette className="absolute bottom-2 left-6 h-16 w-16" color="#ffffff" opacity={0.10} />
            <TempleSilhouette className="absolute bottom-2 right-8 h-20 w-20" color="#ffffff" opacity={0.08} />
          </div>
          <div className="relative flex items-center justify-between gap-2 border-t border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <NepalFlag size={22} />
              <span className="deva text-[10px] text-slate2-400">काठमाडौं, नेपाल</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-600 text-slate2-300 hover:bg-sindur-500/20 hover:text-sindur-400 transition-colors"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
