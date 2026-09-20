// Himalayan mountain ridge silhouette — decorative SVG
export function HimalayaRidge({ className = '', color = '#0a1430' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="ridgeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d="M0 200 L0 140 L80 110 L160 130 L220 90 L280 120 L340 70 L400 100 L460 60 L520 95 L580 50 L640 85 L700 65 L760 100 L820 75 L880 110 L940 80 L1000 120 L1060 95 L1120 130 L1200 105 L1200 200 Z"
        fill="url(#ridgeGrad)"
      />
      <path
        d="M0 200 L0 170 L100 150 L180 165 L260 140 L340 160 L420 135 L500 155 L580 140 L660 160 L740 145 L820 165 L900 150 L980 170 L1060 155 L1140 175 L1200 160 L1200 200 Z"
        fill={color}
        fillOpacity="0.85"
      />
    </svg>
  );
}

// Temple pagoda silhouette — decorative SVG
export function TempleSilhouette({ className = '', color = '#ffffff', opacity = 0.08 }: { className?: string; color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden fill={color} fillOpacity={opacity}>
      {/* base */}
      <rect x="60" y="120" width="80" height="20" />
      {/* tier 1 */}
      <path d="M50 110 L150 110 L140 100 L60 100 Z" />
      <rect x="65" y="95" width="70" height="5" />
      {/* tier 2 */}
      <path d="M58 92 L142 92 L132 82 L68 82 Z" />
      <rect x="70" y="77" width="60" height="5" />
      {/* tier 3 */}
      <path d="M66 74 L134 74 L124 64 L76 64 Z" />
      <rect x="78" y="59" width="44" height="5" />
      {/* roof top */}
      <path d="M74 56 L126 56 L100 30 Z" />
      {/* finial */}
      <rect x="98" y="18" width="4" height="14" />
      <circle cx="100" cy="16" r="4" />
    </svg>
  );
}

// Prayer flags string
export function PrayerFlags({ className = '' }: { className?: string }) {
  const colors = ['#dc143c', '#f59e0b', '#16a34a', '#3366f0', '#9333ea'];
  return (
    <div className={`flex items-end gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="h-0 w-0"
          style={{
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderBottom: `9px solid ${colors[i % colors.length]}80`,
            marginBottom: `${(i % 4) * 3}px`,
          }}
        />
      ))}
    </div>
  );
}
