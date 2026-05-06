import { formatKES } from '@/lib/formatKES';

export default function CartSummary({ subtotal, shipping = 0, discount = 0 }) {
  const total = subtotal + shipping - discount;
  return (
    <div className="glass p-5 space-y-2">
      <div className="flex justify-between text-sm"><span className="text-white/70">Subtotal</span><span>{formatKES(subtotal)}</span></div>
      <div className="flex justify-between text-sm"><span className="text-white/70">Shipping</span><span>{shipping ? formatKES(shipping) : 'Calculated at checkout'}</span></div>
      {discount > 0 && (
        <div className="flex justify-between text-sm text-emerald-400"><span>Discount</span><span>-{formatKES(discount)}</span></div>
      )}
      <div className="border-t border-white/10 pt-2 flex justify-between font-bold">
        <span>Total</span><span className="text-gradient">{formatKES(total)}</span>
      </div>
    </div>
  );
}
