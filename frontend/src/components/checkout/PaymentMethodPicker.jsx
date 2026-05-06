import { Smartphone, CreditCard, Banknote } from 'lucide-react';

const methods = [
  { id: 'mpesa', name: 'M-Pesa', desc: 'STK push to your phone', icon: Smartphone },
  { id: 'card', name: 'Card', desc: 'Visa / Mastercard via Stripe', icon: CreditCard },
  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay on receipt (Nairobi only)', icon: Banknote },
];

export default function PaymentMethodPicker({ value, onChange }) {
  return (
    <div className="grid sm:grid-cols-3 gap-2">
      {methods.map((m) => (
        <label
          key={m.id}
          className={`p-4 rounded-2xl border cursor-pointer transition ${
            value === m.id ? 'border-brand-cyan bg-brand-cyan/10' : 'border-white/10 hover:bg-white/5'
          }`}
        >
          <input type="radio" className="sr-only" name="pay" checked={value === m.id} onChange={() => onChange(m.id)} />
          <m.icon className="text-brand-cyan mb-2" />
          <div className="font-semibold">{m.name}</div>
          <div className="text-xs text-white/60">{m.desc}</div>
        </label>
      ))}
    </div>
  );
}
