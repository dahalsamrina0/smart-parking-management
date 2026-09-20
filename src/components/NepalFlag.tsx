// A small, tasteful Nepal flag rendered with SVG (double-pennant shape)
export function NepalFlag({ className = '', size = 28 }: { className?: string; size?: number }) {
  const w = size;
  const h = size * 0.9;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 90"
      className={className}
      aria-label="Nepal flag"
    >
      <defs>
        <clipPath id="nepalClip">
          <polygon points="0,0 100,0 100,25 55,25 100,50 55,50 100,75 0,90" />
        </clipPath>
      </defs>
      <g clipPath="url(#nepalClip)">
        <rect x="0" y="0" width="100" height="90" fill="#003893" />
        <rect x="0" y="0" width="100" height="45" fill="#dc143c" />
        <rect x="0" y="45" width="100" height="45" fill="#003893" />
        {/* sun (white) */}
        <circle cx="40" cy="22" r="6" fill="#fff" />
        {/* moon (white) */}
        <path d="M34 62 a6 6 0 0 0 12 0 a6 6 0 0 1 -12 0" fill="#fff" />
      </g>
      <polygon points="0,0 100,0 100,25 55,25 100,50 55,50 100,75 0,90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
    </svg>
  );
}
