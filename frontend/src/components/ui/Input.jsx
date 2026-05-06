import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const Input = forwardRef(({ className, label, error, ...props }, ref) => (
  <label className="block w-full">
    {label && <span className="block text-sm font-medium text-slate-700 mb-1.5 dark:text-white/80">{label}</span>}
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-950 placeholder-slate-400 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/40',
        'focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition',
        error && 'border-red-500/60', className
      )}
      {...props}
    />
    {error && <span className="block text-xs text-red-400 mt-1">{error}</span>}
  </label>
));
export default Input;
