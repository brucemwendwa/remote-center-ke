import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import Logo from '@/components/logo/Logo';

function MpesaIcon() {
  return (
    <svg viewBox="0 0 64 24" className="h-6">
      <rect width="64" height="24" rx="4" fill="#22C55E" />
      <text x="32" y="16" fontSize="11" fontWeight="800" fill="white" textAnchor="middle" fontFamily="Inter">M-PESA</text>
    </svg>
  );
}
function VisaIcon() {
  return (
    <svg viewBox="0 0 64 24" className="h-6">
      <rect width="64" height="24" rx="4" fill="#1A1F71" />
      <text x="32" y="16" fontSize="11" fontWeight="800" fill="white" textAnchor="middle" fontFamily="Inter" fontStyle="italic">VISA</text>
    </svg>
  );
}
function MasterIcon() {
  return (
    <svg viewBox="0 0 64 24" className="h-6">
      <rect width="64" height="24" rx="4" fill="#000" />
      <circle cx="27" cy="12" r="7" fill="#EB001B" />
      <circle cx="37" cy="12" r="7" fill="#F79E1B" opacity="0.9" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <div className="container-page py-12 grid gap-10 md:grid-cols-4">
        <div>
          <Logo withText />
          <p className="text-slate-600 text-sm mt-3 max-w-xs dark:text-white/60">
            Kenya's premium destination for TV remotes, smart accessories and covers. Same-day Nairobi delivery.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <MpesaIcon /><VisaIcon /><MasterIcon />
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-white/70">
            <li><Link to="/shop" className="hover:text-slate-950 dark:hover:text-white">All Products</Link></li>
            <li><Link to="/shop?category=tv-remotes" className="hover:text-slate-950 dark:hover:text-white">TV Remotes</Link></li>
            <li><Link to="/shop?category=smart-remotes" className="hover:text-slate-950 dark:hover:text-white">Smart Remotes</Link></li>
            <li><Link to="/shop?category=covers" className="hover:text-slate-950 dark:hover:text-white">Covers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Help</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-white/70">
            <li><Link to="/track" className="hover:text-slate-950 dark:hover:text-white">Track Order</Link></li>
            <li><Link to="/faq" className="hover:text-slate-950 dark:hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-slate-950 dark:hover:text-white">Contact</Link></li>
            <li><Link to="/about" className="hover:text-slate-950 dark:hover:text-white">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Visit Us</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-white/70">
            <li className="flex gap-2"><MapPin size={16} className="shrink-0 mt-0.5" /> Mithoo Business Center, Moi Avenue (opp. Bazaar), 1st Floor Shop F84, Nairobi</li>
            <li className="flex gap-2"><Phone size={16} /> 0757541507</li>
            <li>
              <a href="https://wa.me/254757541507" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-slate-950 dark:hover:text-white">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com/remote_center.ke" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-slate-950 dark:hover:text-white">
                <Instagram size={16} /> @remote_center.ke
              </a>
            </li>
            <li className="flex gap-2"><Mail size={16} /> hello@remotecenter.co.ke</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500 dark:border-white/10 dark:text-white/50">
        © {new Date().getFullYear()} Remote Center Kenya. All rights reserved.
      </div>
    </footer>
  );
}
