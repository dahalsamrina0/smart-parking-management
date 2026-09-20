import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/Toast';
import { IMAGES } from '@/data/demoData';
import { ADMIN_USER } from '@/data/demoData';
import { NepalFlag } from '@/components/NepalFlag';
import {
  Bell, Shield, Globe, Moon, Save, User, Car, Clock, MapPin, Database,
} from 'lucide-react';

export function Settings() {
  const { toast } = useToast();
  const { locations } = useApp();
  const [notif, setNotif] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);
  const [lang, setLang] = useState<'en' | 'np' | 'both'>('both');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-800 text-slate2-900">Settings</h2>
        <p className="deva text-sm text-slate2-500">सेटिङ</p>
      </div>

      {/* Admin profile */}
      <div className="card relative overflow-hidden">
        <div className="relative h-24 bg-gradient-to-r from-himal-700 to-himal-900">
          <img src={IMAGES.boudhanath} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-himal-980/80 to-himal-800/40" />
        </div>
        <div className="px-6 pb-5">
          <div className="-mt-10 flex items-end gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-himal-500 to-himal-700 text-xl font-bold text-white shadow-cardlg ring-4 ring-white">
              {ADMIN_USER.avatar}
            </div>
            <div className="pb-1">
              <h3 className="font-display text-lg font-800 text-slate2-900">{ADMIN_USER.name}</h3>
              <p className="text-sm text-slate2-500">{ADMIN_USER.role}</p>
              <p className="text-xs text-slate2-400">{ADMIN_USER.email}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 pb-1">
              <NepalFlag size={26} />
              <span className="deva text-xs text-slate2-400">काठमाडौं, नेपाल</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Preferences */}
        <div className="card overflow-hidden">
          <div className="border-b border-slate2-100 px-5 py-4">
            <h3 className="font-display text-base font-700 text-slate2-900">Preferences</h3>
            <p className="deva text-xs text-slate2-400">प्राथमिकताहरू</p>
          </div>
          <div className="divide-y divide-slate2-100">
            <ToggleRow icon={Bell} label="Notifications" labelNp="सूचना" desc="Real-time alerts for reservations and occupancy" value={notif} onChange={setNotif} />
            <ToggleRow icon={Car} label="Auto-assign Slots" labelNp="स्वतः स्लट बाँडफाँड" desc="Automatically assign nearest available slot" value={autoAssign} onChange={setAutoAssign} />
            <ToggleRow icon={Moon} label="Dark Mode" labelNp="अँध्यारो मोड" desc="Use dark theme (coming soon)" value={darkMode} onChange={setDarkMode} />
          </div>
        </div>

        {/* Language */}
        <div className="card overflow-hidden">
          <div className="border-b border-slate2-100 px-5 py-4">
            <h3 className="font-display text-base font-700 text-slate2-900">Language</h3>
            <p className="deva text-xs text-slate2-400">भाषा</p>
          </div>
          <div className="p-5 space-y-2.5">
            {([
              { id: 'en', label: 'English', desc: 'Primary interface language' },
              { id: 'np', label: 'नेपाली', desc: 'Devanagari interface' },
              { id: 'both', label: 'Bilingual / द्विभाषिक', desc: 'English + Nepali (recommended)' },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setLang(opt.id); toast(`Language set to ${opt.label}`, 'success'); }}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  lang === opt.id ? 'border-himal-400 bg-himal-50 ring-2 ring-himal-400/30' : 'border-slate2-200 hover:bg-slate2-50'
                }`}
              >
                <Globe size={18} className={lang === opt.id ? 'text-himal-600' : 'text-slate2-400'} />
                <div className="flex-1">
                  <p className="text-sm font-700 text-slate2-900">{opt.label}</p>
                  <p className="text-xs text-slate2-400">{opt.desc}</p>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 ${lang === opt.id ? 'border-himal-600 bg-himal-600' : 'border-slate2-300'}`}>
                  {lang === opt.id && <div className="m-auto mt-[3px] h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Location rates */}
        <div className="card overflow-hidden lg:col-span-2">
          <div className="border-b border-slate2-100 px-5 py-4">
            <h3 className="font-display text-base font-700 text-slate2-900">Parking Rates</h3>
            <p className="deva text-xs text-slate2-400">पार्किङ दरहरू</p>
          </div>
          <div className="divide-y divide-slate2-100">
            {locations.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <img src={l.image} alt={l.name} className="h-10 w-14 rounded-lg object-cover" />
                  <div>
                    <p className="font-700 text-slate2-900">{l.name}</p>
                    <p className="deva text-xs text-slate2-400">{l.nameNp} · <Clock size={11} className="inline" /> {l.openHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate2-400">Rs</span>
                    <input className="input w-24 pl-9 text-center font-700" defaultValue={String(l.ratePerHour)} />
                  </div>
                  <span className="text-xs text-slate2-400">/hr</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate2-100 bg-slate2-50/60 px-5 py-4">
            <button className="btn-primary" onClick={() => toast('Rates saved (demo)', 'success')}>
              <Save size={16} /> Save Changes · सेभ गर्नुहोस्
            </button>
          </div>
        </div>

        {/* System info */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-display text-base font-700 text-slate2-900">System Information</h3>
          <p className="deva text-xs text-slate2-400">प्रणाली जानकारी</p>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <SysInfo icon={Database} label="Backend" value="Frontend Demo" />
            <SysInfo icon={Shield} label="Auth" value="Demo Mode" />
            <SysInfo icon={MapPin} label="Locations" value={`${locations.length} active`} />
            <SysInfo icon={User} label="Version" value="v1.0.0" />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-xs font-600 text-green-700">
            <span className="dot bg-park-available animate-pulse-soft" /> All systems operational · सबै प्रणाली सञ्चालनमा
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ icon: Icon, label, labelNp, desc, value, onChange }: {
  icon: typeof Bell; label: string; labelNp: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate2-100 text-slate2-600">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-700 text-slate2-900">{label} <span className="deva font-500 text-slate2-400">· {labelNp}</span></p>
        <p className="text-xs text-slate2-400">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`h-6 w-11 rounded-full p-0.5 transition-colors ${value ? 'bg-park-available' : 'bg-slate2-200'}`}
        aria-label={label}
      >
        <div className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

function SysInfo({ icon: Icon, label, value }: { icon: typeof Database; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate2-50 p-4 text-center">
      <Icon size={20} className="mx-auto text-slate2-400" />
      <p className="mt-1.5 font-display text-sm font-800 text-slate2-900">{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate2-400">{label}</p>
    </div>
  );
}
