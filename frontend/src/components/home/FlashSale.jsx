import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

export default function FlashSale() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, endOfToday() - now);
  const h = Math.floor(remaining / 3.6e6);
  const m = Math.floor((remaining % 3.6e6) / 6e4);
  const s = Math.floor((remaining % 6e4) / 1000);

  const pad = (n) => String(n).padStart(2, '0');
  const Cell = ({ v, label }) => (
    <div className="glass px-4 py-3 text-center min-w-[68px]">
      <div className="text-2xl font-extrabold text-gradient tabular-nums">{pad(v)}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/60">{label}</div>
    </div>
  );

  return (
    <section className="container-page py-8">
      <div className="glass p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center animate-glow">
            <Flame size={26} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Flash Sale — Today Only</h3>
            <p className="text-white/60 text-sm">Up to 30% off select remotes & covers.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Cell v={h} label="hrs" /><Cell v={m} label="min" /><Cell v={s} label="sec" />
        </div>
      </div>
    </section>
  );
}
