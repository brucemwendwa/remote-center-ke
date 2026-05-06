import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 14 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex">
        {stars.map((s) => (
          <Star
            key={s}
            size={size}
            className={s <= Math.round(value) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}
          />
        ))}
      </div>
      {count != null && <span className="text-xs text-white/60 ml-1">({count})</span>}
    </div>
  );
}
