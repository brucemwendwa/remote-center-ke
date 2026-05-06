import { cn } from '@/lib/cn';
export default function Card({ children, className, ...props }) {
  return (
    <div className={cn('glass p-6 shadow-xl', className)} {...props}>
      {children}
    </div>
  );
}
