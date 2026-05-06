import { Truck, Store, Plane } from 'lucide-react';

const options = [
  { id: 'nairobi-same-day', name: 'Same-day Nairobi', desc: 'Within Nairobi · Order before 3PM', price: 250, icon: Truck },
  { id: 'pickup', name: 'Pickup at store', desc: 'Mithoo Business Center, Moi Ave', price: 0, icon: Store },
  { id: 'countrywide', name: 'Countrywide courier', desc: 'Easy Coach / G4S · 1-2 days', price: 450, icon: Plane },
];

export default function DeliveryOptions({ value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o.id}
          className={`flex gap-3 p-4 rounded-2xl border cursor-pointer transition ${
            value === o.id ? 'border-brand-cyan bg-brand-cyan/10' : 'border-white/10 hover:bg-white/5'
          }`}
        >
          <input type="radio" name="delivery" className="sr-only" checked={value === o.id} onChange={() => onChange(o.id, o.price)} />
          <o.icon className="text-brand-cyan" />
          <div className="flex-1">
            <div className="font-semibold">{o.name}</div>
            <div className="text-xs text-white/60">{o.desc}</div>
          </div>
          <div className="font-bold">{o.price === 0 ? 'Free' : `KES ${o.price}`}</div>
        </label>
      ))}
    </div>
  );
}
