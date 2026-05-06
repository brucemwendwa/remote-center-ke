import { MapPin, MessageCircle, Phone, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function StoreLocation() {
  return (
    <section className="container-page py-12">
      <h2 className="text-3xl font-bold mb-2">Visit our store</h2>
      <p className="text-white/60 mb-6">Walk-ins welcome — we'll help you find the perfect remote.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass p-6 space-y-4">
          <div className="flex gap-3">
            <MapPin className="text-brand-cyan shrink-0" />
            <div>
              <div className="font-bold">Mithoo Business Center</div>
              <div className="text-white/70 text-sm">Moi Avenue (opposite Bazaar), 1st Floor Shop F84, Nairobi</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="text-brand-cyan shrink-0" />
            <a href="tel:0757541507" className="hover:text-white">0757541507</a>
          </div>
          <div className="flex gap-3">
            <Clock className="text-brand-cyan shrink-0" />
            <div className="text-white/70 text-sm">Mon–Sat: 9:00 – 18:30 · Sun: 10:00 – 16:00</div>
          </div>
          <a href="https://wa.me/254757541507" target="_blank" rel="noreferrer">
            <Button size="lg" className="mt-2"><MessageCircle size={18} /> Chat on WhatsApp</Button>
          </a>
        </div>
        <div className="glass overflow-hidden p-0">
          <iframe
            title="Store map"
            src="https://www.google.com/maps?q=Mithoo+Business+Center+Moi+Avenue+Nairobi&output=embed"
            className="w-full h-72 lg:h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
