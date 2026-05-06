import { cn } from '@/lib/cn';
export default function Badge({ children, className, variant = 'default' }) {
  const variants = {
    default: 'bg-white/10 text-white',
    blue: 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30',
    cyan: 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30',
    green: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    red: 'bg-red-500/20 text-red-400 border border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  );
}
