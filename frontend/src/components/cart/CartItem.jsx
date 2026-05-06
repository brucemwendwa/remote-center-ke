import { useCartStore } from '@/store/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatKES } from '@/lib/formatKES';

export default function CartItem({ item }) {
  const update = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);
  return (
    <div className="flex gap-3 p-3 glass">
      <img
        src={item.image || `https://picsum.photos/seed/${item.id}/120/120`}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold line-clamp-2 text-sm">{item.name}</div>
        <div className="text-xs text-white/50">{item.brand}</div>
        <div className="mt-1 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 bg-white/5 rounded-2xl px-2 py-1">
            <button onClick={() => update(item.id, item.qty - 1)} className="p-1 hover:text-brand-cyan"><Minus size={12} /></button>
            <span className="text-sm w-6 text-center">{item.qty}</span>
            <button onClick={() => update(item.id, item.qty + 1)} className="p-1 hover:text-brand-cyan"><Plus size={12} /></button>
          </div>
          <div className="font-bold text-sm text-gradient">{formatKES(item.price * item.qty)}</div>
        </div>
      </div>
      <button onClick={() => remove(item.id)} className="text-white/50 hover:text-red-400 p-1">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
