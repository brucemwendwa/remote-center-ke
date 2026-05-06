import { AlertTriangle } from 'lucide-react';
import { sampleProducts } from '@/data/brands';

export default function LowStockList() {
  const low = sampleProducts.filter((p) => p.stock <= 10);
  return (
    <div className="glass p-5">
      <h4 className="font-bold mb-3 flex items-center gap-2"><AlertTriangle className="text-yellow-400" size={18} /> Low stock</h4>
      <ul className="space-y-2">
        {low.map((p) => (
          <li key={p.id} className="flex items-center justify-between text-sm">
            <span className="line-clamp-1">{p.name}</span>
            <span className="text-yellow-400 font-bold">{p.stock} left</span>
          </li>
        ))}
        {!low.length && <li className="text-slate-500 text-sm dark:text-white/60">All products well-stocked.</li>}
      </ul>
    </div>
  );
}
