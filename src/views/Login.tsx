import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/Toast';
import { Logo } from '@/components/Logo';
import { NepalFlag } from '@/components/NepalFlag';
import { HimalayaRidge, PrayerFlags } from '@/components/Decorations';
import { IMAGES, LOCATIONS } from '@/data/demoData';
import {
  Mail, Lock, Eye, EyeOff, LogIn, MapPin, ShieldCheck, Sparkles, Car,
} from 'lucide-react';

export function Login() {
  const { login } = useApp();
  const { toast } = useToast();
  const [email, setEmail] = useState('admin@smartparking.np');
  const [password, setPassword] = useState('demo1234');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [busy, setBusy] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast('Please enter email and password', 'error');
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      login(email, password);
      toast('Welcome back! प्रवेश गर्नुभयो।', 'success');
    }, 700);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-himal-990">
      {/* Background image */}
      <img
        src={IMAGES.loginBg}
        alt="Himalayan mountains over Kathmandu"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-himal-990/85 via-himal-950/70 to-himal-990/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-himal-990/90 via-transparent to-himal-990/40" />

      {/* Prayer flags top */}
      <div className="absolute left-0 right-0 top-8 flex justify-center">
        <PrayerFlags className="opacity-70" />
      </div>

      {/* Himalayan ridge bottom */}
      <HimalayaRidge className="absolute bottom-0 left-0 w-full h-32 opacity-60" color="#070f24" />

      {/* Content layout */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-20">
        {/* Left brand panel (desktop) */}
        <div className="hidden max-w-md text-white lg:block animate-slide-right">
          <div className="mb-6 flex items-center gap-3">
            <NepalFlag size={36} />
            <div className="h-8 w-px bg-white/20" />
            <Logo variant="light" />
          </div>
          <h1 className="font-display text-4xl font-800 leading-tight">
            Smart Parking<br />Management System
          </h1>
          <p className="deva mt-2 text-lg text-slate2-200">स्मार्ट पार्किङ व्यवस्थापन प्रणाली</p>
          <p className="mt-5 text-sm leading-relaxed text-slate2-300">
            A modern digital parking platform designed for Kathmandu Valley —
            managing New Road, Jamal, and Bag Bazar with real-time slot tracking,
            reservations, and smart-city analytics.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Real-time Slots', 'Digital Reservations', 'Smart City'].map((t) => (
              <span key={t} className="chip bg-white/10 text-white backdrop-blur-sm">
                <Sparkles size={12} className="text-pujari-400" /> {t}
              </span>
            ))}
          </div>
          <p className="mt-8 font-display text-xl font-700 text-pujari-300">
            Smart Parking for a Better Kathmandu
          </p>
          <p className="deva text-sm text-slate2-300">व्यवस्थित पार्किङ, स्मार्ट काठमाडौं</p>
        </div>

        {/* Login card */}
        <div className="w-full max-w-md animate-slide-up">
          <div className="glass rounded-xl3 shadow-cardlg overflow-hidden">
            {/* Card header with accent bar */}
            <div className="relative">
              <div className="h-1.5 bg-gradient-to-r from-himal-600 via-sindur-500 to-pujari-500" />
              <div className="px-7 pt-6 pb-2 text-center">
                <div className="mb-3 flex items-center justify-center gap-2.5">
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-himal-500 to-himal-700 shadow-glow">
                    <Car size={24} className="text-white" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-sm bg-sindur-500 ring-2 ring-white" />
                  </div>
                </div>
                <h2 className="font-display text-xl font-800 text-slate2-900">Smart Parking</h2>
                <p className="deva text-sm font-600 text-slate2-500">स्मार्ट पार्किङ व्यवस्थापन प्रणाली</p>
                <div className="mx-auto mt-3 mb-1 flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-slate2-200" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate2-400">Welcome Back</p>
                  <span className="h-px w-8 bg-slate2-200" />
                </div>
                <p className="deva text-xs text-slate2-400">प्रवेश गर्नुहोस्</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="px-7 pb-6 pt-3">
              <div className="space-y-4">
                <div>
                  <label className="label">Email Address <span className="deva font-400 normal-case text-slate2-400">· इमेल ठेगाना</span></label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate2-400" />
                    <input
                      type="email"
                      className="input pl-10"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Password <span className="deva font-400 normal-case text-slate2-400">· पासवर्ड</span></label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate2-400" />
                    <input
                      type={show ? 'text' : 'password'}
                      className="input pl-10 pr-10"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate2-400 hover:text-slate2-700"
                      aria-label={show ? 'Hide password' : 'Show password'}
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-slate2-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded border-slate2-300 text-himal-600 focus:ring-himal-400"
                    />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="font-semibold text-himal-600 hover:text-himal-700">
                    Forgot Password?
                  </button>
                </div>

                <button type="submit" className="btn-primary w-full" disabled={busy}>
                  {busy ? (
                    <><span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin-slow" /> Logging in…</>
                  ) : (
                    <><LogIn size={18} /> Login <span className="deva font-500">· प्रवेश</span></>
                  )}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <span className="h-px flex-1 bg-slate2-200" />
                  <span className="text-xs text-slate2-400">or</span>
                  <span className="h-px flex-1 bg-slate2-200" />
                </div>

                <button type="button" className="btn-outline w-full" onClick={() => toast('Google login is a demo placeholder', 'info')}>
                  <GoogleIcon /> Continue with Google
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-green-50 py-2 text-xs font-semibold text-green-700">
                <ShieldCheck size={14} /> Demo mode — any credentials will log you in
              </div>
            </form>
          </div>

          {/* Slogan */}
          <div className="mt-5 text-center">
            <p className="font-display text-base font-700 text-white">Smart Parking for a Better Kathmandu</p>
            <p className="deva text-sm text-slate2-300">सुरक्षित पार्किङ • व्यवस्थित शहर</p>
          </div>
        </div>
      </div>

      {/* Location branding bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-himal-990/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-4 py-3 text-white sm:gap-10">
          {LOCATIONS.map((loc) => (
            <div key={loc.id} className="flex items-center gap-1.5 text-center">
              <MapPin size={14} className="text-pujari-400" />
              <div className="leading-tight">
                <p className="text-xs font-700 sm:text-sm">{loc.name}</p>
                <p className="deva text-[10px] text-slate2-300 sm:text-xs">{loc.nameNp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.6 34.5 27 35.5 24 35.5c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.5l6.6 5.6C41.9 36.5 44 30.8 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}
