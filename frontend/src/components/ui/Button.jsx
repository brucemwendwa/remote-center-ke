import { cn } from '@/lib/cn';

export default function Button({
  children, className, variant = 'primary', size = 'md', as: Tag = 'button', ...props
}) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variants = {
    primary: 'btn-gradient hover:brightness-110 shadow-glow',
    outline: 'border border-slate-300 hover:bg-slate-100 text-slate-900 dark:border-white/20 dark:hover:bg-white/10 dark:text-white',
    ghost: 'hover:bg-slate-100 text-slate-900 dark:hover:bg-white/10 dark:text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        sizes[size], variants[variant], className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
