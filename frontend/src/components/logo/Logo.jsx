export default function Logo({ className = 'w-9 h-9', withText = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rck-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="20" y="18" width="24" height="40" rx="8" fill="none" stroke="url(#rck-grad)" strokeWidth="3" />
        <circle cx="32" cy="30" r="2.5" fill="url(#rck-grad)" />
        <rect x="26" y="38" width="12" height="3" rx="1.5" fill="url(#rck-grad)" />
        <rect x="26" y="44" width="12" height="3" rx="1.5" fill="url(#rck-grad)" />
        <rect x="26" y="50" width="12" height="3" rx="1.5" fill="url(#rck-grad)" />
        <path d="M22 12 Q32 4 42 12" fill="none" stroke="url(#rck-grad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M26 8 Q32 3 38 8" fill="none" stroke="url(#rck-grad)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="32" cy="14" r="1.5" fill="url(#rck-grad)" />
      </svg>
      {withText && (
        <span className="font-extrabold tracking-tight">
          <span className="text-gradient">Remote</span>
          <span className="text-slate-950 dark:text-white"> Center</span>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ className = 'w-8 h-8' }) {
  return <Logo className={className} />;
}
