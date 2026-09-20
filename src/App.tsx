import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { ToastProvider } from '@/components/Toast';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { Login } from '@/views/Login';
import { Dashboard } from '@/views/Dashboard';
import { Locations } from '@/views/Locations';
import { ParkingSlots } from '@/views/ParkingSlots';
import { Reservations } from '@/views/Reservations';
import { UsersView } from '@/views/UsersView';
import { Reports } from '@/views/Reports';
import { Settings } from '@/views/Settings';
import type { ViewId } from '@/types';

const TITLES: Record<ViewId, { en: string; np: string }> = {
  dashboard: { en: 'Dashboard', np: 'ड्यासबोर्ड' },
  locations: { en: 'Parking Locations', np: 'पार्किङ स्थानहरू' },
  slots: { en: 'Parking Slots', np: 'पार्किङ स्लट' },
  reservations: { en: 'Reservations', np: 'बुकिङ / आरक्षण' },
  users: { en: 'Users', np: 'प्रयोगकर्ताहरू' },
  reports: { en: 'Reports', np: 'रिपोर्ट' },
  settings: { en: 'Settings', np: 'सेटिङ' },
};

function AppInner() {
  const { loggedIn, setSelectedLocationId } = useApp();
  const [view, setView] = useState<ViewId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!loggedIn) return <Login />;

  const title = TITLES[view];

  const openLocation = (id: string) => {
    setSelectedLocationId(id);
    setView('slots');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate2-50">
      <Sidebar view={view} onChange={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={title.en} titleNp={title.np} onMenu={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div key={view} className="animate-fade-in">
            {view === 'dashboard' && <Dashboard onNavigate={setView} onOpenLocation={openLocation} />}
            {view === 'locations' && <Locations onOpenLocation={openLocation} onNavigate={setView} />}
            {view === 'slots' && <ParkingSlots onNavigateToReservations={() => setView('reservations')} />}
            {view === 'reservations' && <Reservations />}
            {view === 'users' && <UsersView />}
            {view === 'reports' && <Reports />}
            {view === 'settings' && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </ToastProvider>
  );
}
