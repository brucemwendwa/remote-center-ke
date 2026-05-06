import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'Do you deliver same day in Nairobi?', a: 'Yes — orders placed before 3PM are delivered the same day within Nairobi.' },
  { q: 'Are your remotes original?', a: 'All our remotes are genuine and come with a 1-year warranty.' },
  { q: 'Can I pay with M-Pesa?', a: 'Yes. We accept M-Pesa STK push at checkout, plus Visa, Mastercard and cash on delivery.' },
  { q: 'Do you ship outside Nairobi?', a: 'Yes — we ship countrywide via Easy Coach, Modern Coast and G4S courier.' },
  { q: 'How do I pair a universal remote?', a: 'Each universal remote ships with codes & instructions. Our team is also on WhatsApp 0757541507 to help.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="container-page py-12">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <div key={i} className="glass overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-semibold">{f.q}</span>
              <ChevronDown size={18} className={`transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-white/70 text-sm">{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
