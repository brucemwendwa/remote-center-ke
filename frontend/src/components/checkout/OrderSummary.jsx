import { formatKES } from '@/lib/formatKES';

export default function OrderSummary({ items, subtotal, shipping, total }) {
  return (
    <div className="glass p-5 space-y-3">
      <h3 className="font-bold">Order Summary</h3>
      <ul className="space-y-2 max-h-60 overflow-auto scrollbar-thin pr-2">
        {items.map((it) => (
          <li key={it.id} className="flex gap-3 text-sm">
            <img src={it.image || `https://picsum.photos/seed/${it.id}/80/80`} alt="" className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="line-clamp-1 font-medium">{it.name}</div>
              <div className="text-xs text-white/50">x{it.qty}</div>
            </div>
            <div className="font-semibold">{formatKES(it.price * it.qty)}</div>
          </li>
        ))}
      </ul>
      <div className="border-t border-white/10 pt-3 space-y-1 text-sm">
        <div className="flex justify-between"><span className="text-white/60">Subtotal</span><span>{formatKES(subtotal)}</span></div>
        <div className="flex justify-between"><span className="text-white/60">Shipping</span><span>{formatKES(shipping)}</span></div>
        <div className="flex justify-between font-bold pt-2 text-base">
          <span>Total</span><span className="text-gradient">{formatKES(total)}</span>
        </div>
      </div>
    </div>
  );
}
