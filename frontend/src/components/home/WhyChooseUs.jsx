import { ShieldCheck, Truck, BadgeCheck, Smartphone } from 'lucide-react';

const items = [
  { icon: BadgeCheck, title: '100% Authentic', desc: 'Genuine remotes from official brand sources.' },
  { icon: ShieldCheck, title: '1-Year Warranty', desc: 'Hassle-free replacements within warranty period.' },
  { icon: Truck, title: 'Same-Day Nairobi', desc: 'Order before 3PM for same-day delivery.' },
  { icon: Smartphone, title: 'M-Pesa Accepted', desc: 'Pay seamlessly via STK push or Pay Bill.' },
];

export default function WhyChooseUs() {
  return (
    <section className="container-page py-12">
      <h2 className="text-3xl font-bold mb-2">Why Remote Center Kenya</h2>
      <p className="text-white/60 mb-6">Quality, speed and trust — every order.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.title} className="glass p-5">
            <div className="w-12 h-12 rounded-2xl btn-gradient flex items-center justify-center mb-3">
              <it.icon size={20} />
            </div>
            <div className="font-bold">{it.title}</div>
            <div className="text-sm text-white/60">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
