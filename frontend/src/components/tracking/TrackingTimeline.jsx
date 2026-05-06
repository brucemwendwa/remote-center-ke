import { motion } from 'framer-motion';
import { Check, Package, CreditCard, Truck, Box, MapPin, Home, Cog } from 'lucide-react';

const STATUSES = [
  { key: 'placed', label: 'Order Placed', icon: Package },
  { key: 'paid', label: 'Payment Received', icon: CreditCard },
  { key: 'processing', label: 'Processing', icon: Cog },
  { key: 'packed', label: 'Packed', icon: Box },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'in_transit', label: 'In Transit', icon: MapPin },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

export default function TrackingTimeline({ currentStatus = 'placed', history = [] }) {
  const idx = STATUSES.findIndex((s) => s.key === currentStatus);
  const histMap = Object.fromEntries(history.map((h) => [h.status, h.at]));

  return (
    <ol className="relative space-y-6 pl-10">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10" />
      <motion.div
        className="absolute left-4 top-2 w-px bg-gradient-to-b from-brand-blue to-brand-cyan"
        initial={{ height: 0 }}
        animate={{ height: `${(idx / (STATUSES.length - 1)) * 100}%` }}
        transition={{ duration: 1 }}
      />
      {STATUSES.map((s, i) => {
        const done = i <= idx;
        const Icon = s.icon;
        return (
          <motion.li
            key={s.key}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <div className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              done ? 'bg-gradient-to-br from-brand-blue to-brand-cyan border-brand-cyan shadow-glow' : 'bg-white/5 border-white/10'
            }`}>
              {done ? <Check size={16} /> : <Icon size={14} className="text-white/50" />}
            </div>
            <div className={`glass p-4 ${done ? '' : 'opacity-60'}`}>
              <div className="font-semibold">{s.label}</div>
              {histMap[s.key] && (
                <div className="text-xs text-white/60 mt-0.5">
                  {new Date(histMap[s.key]).toLocaleString('en-KE')}
                </div>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
