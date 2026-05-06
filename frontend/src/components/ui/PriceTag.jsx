import { formatKES } from '@/lib/formatKES';
import { cn } from '@/lib/cn';

export default function PriceTag({ price, originalPrice, className, size = 'md' }) {
  const sizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };
  const hasDiscount = originalPrice && originalPrice > price;
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('font-extrabold text-gradient', sizes[size])}>{formatKES(price)}</span>
      {hasDiscount && (
        <span className="text-sm line-through text-white/40">{formatKES(originalPrice)}</span>
      )}
    </div>
  );
}
