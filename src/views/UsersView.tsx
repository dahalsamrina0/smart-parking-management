import { useMemo, useState } from 'react';
import { USERS } from '@/data/demoData';
import { Search, Users as UsersIcon, X, Mail, Phone, Car } from 'lucide-react';

const ROLE_BADGE: Record<string, string> = {
  Admin: 'bg-pujari-100 text-pujari-700',
  Operator: 'bg-himal-100 text-himal-700',
  User: 'bg-slate2-200 text-slate2-600',
};

export function UsersView() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return USERS;
    return USERS.filter((u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.vehicle.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-800 text-slate2-900">Users</h2>
        <p className="deva text-sm text-slate2-500">प्रयोगकर्ताहरू</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total Users" labelNp="कुल प्रयोगकर्ता" value={USERS.length} icon={UsersIcon} />
        <SummaryCard label="Active Today" labelNp="आज सक्रिय" value={5} icon={UsersIcon} />
        <SummaryCard label="New This Month" labelNp="यो महिना" value={8} icon={UsersIcon} />
      </div>

      <div className="card flex items-center gap-2 rounded-xl border border-slate2-200 bg-slate2-50 px-3 py-2.5">
        <Search size={16} className="text-slate2-400" />
        <input
          placeholder="Search users by name, email, or vehicle…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-slate2-800 placeholder:text-slate2-400 focus:outline-none"
        />
        {query && <button onClick={() => setQuery('')}><X size={15} className="text-slate2-400" /></button>}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate2-100 bg-slate2-50/60 text-left text-xs font-semibold uppercase tracking-wide text-slate2-400">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3 hidden md:table-cell">Email</th>
                <th className="px-5 py-3 hidden lg:table-cell">Phone</th>
                <th className="px-5 py-3 hidden sm:table-cell">Vehicle</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3 hidden xl:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate2-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate2-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-himal-500 to-himal-700 text-xs font-bold text-white">
                        {u.avatar}
                      </div>
                      <div>
                        <p className="font-600 text-slate2-900">{u.name}</p>
                        <p className="text-xs text-slate2-400 sm:hidden flex items-center gap-1"><Mail size={11} /> {u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-slate2-600">{u.email}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-slate2-500">{u.phone}</td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="rounded-md bg-himal-990 px-2 py-0.5 font-mono text-xs font-700 text-white">{u.vehicle}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`chip ${ROLE_BADGE[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3 hidden xl:table-cell text-slate2-500">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, labelNp, value, icon: Icon }: { label: string; labelNp: string; value: number; icon: typeof UsersIcon }) {
  return (
    <div className="card p-5 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="deva text-[11px] text-slate2-400">{labelNp}</p>
          <p className="mt-1.5 font-display text-2xl font-800 text-slate2-900">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-himal-50 text-himal-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
