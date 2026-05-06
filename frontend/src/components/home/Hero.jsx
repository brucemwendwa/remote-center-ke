import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { Sparkles, Truck, ArrowRight } from 'lucide-react';

function RemoteMockup() {
  return (
    <svg viewBox="0 0 200 360" className="w-44 sm:w-56 drop-shadow-2xl">
      <defs>
        <linearGradient id="rem-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="acc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="320" rx="36" fill="url(#rem-grad)" stroke="url(#acc-grad)" strokeWidth="2" />
      <circle cx="100" cy="70" r="22" fill="url(#acc-grad)" />
      <circle cx="100" cy="70" r="9" fill="#fff" opacity="0.85" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`${row}-${col}`} x={42 + col * 40} y={140 + row * 44} width="32" height="32" rx="10" fill="#0b1220" stroke="#1f2937" />
        ))
      )}
      <rect x="60" y="320" width="80" height="6" rx="3" fill="url(#acc-grad)" opacity="0.5" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-brand-blue/30 blur-3xl animate-blob" />
        <div className="absolute top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-cyan/30 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container-page py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold mb-5">
            <Sparkles size={14} className="text-brand-cyan" /> #1 Remote Store in Kenya
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            The remote you need, <span className="text-gradient">delivered today.</span>
          </h1>
          <p className="text-white/70 mt-5 max-w-xl text-lg">
            Genuine TV remotes for Samsung, LG, Sony, TCL, Hisense and more. Plus smart, voice, Android,
            soundbar remotes, silicone covers and rechargeable models — backed by a 1-year warranty.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/shop"><Button size="lg">Shop Now <ArrowRight size={16} /></Button></Link>
            <Link to="/track"><Button size="lg" variant="outline">Track Order</Button></Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2"><Truck size={16} className="text-brand-cyan" /> Same-day Nairobi delivery</div>
            <div className="flex items-center gap-2"><Sparkles size={16} className="text-brand-cyan" /> M-Pesa accepted</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="animate-float">
            <RemoteMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
