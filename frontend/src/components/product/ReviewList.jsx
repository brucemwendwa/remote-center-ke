import Rating from '@/components/ui/Rating';
import { dateFmt } from '@/lib/dateFmt';

export default function ReviewList({ reviews = [] }) {
  if (!reviews.length) return <div className="text-white/60 text-sm">No reviews yet — be the first!</div>;
  return (
    <ul className="space-y-4">
      {reviews.map((r, i) => (
        <li key={i} className="glass p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">{r.name || 'Customer'}</div>
            <span className="text-xs text-white/50">{dateFmt(r.createdAt || r.date || Date.now())}</span>
          </div>
          <Rating value={r.rating || 5} />
          <p className="text-sm text-white/80 mt-2">{r.comment}</p>
        </li>
      ))}
    </ul>
  );
}
