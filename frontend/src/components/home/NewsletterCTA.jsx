import Button from '@/components/ui/Button';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Subscribed! Watch for offers in your inbox.');
    setEmail('');
  };
  return (
    <section className="container-page py-12">
      <div className="glass p-8 md:p-12 text-center bg-gradient-to-br from-brand-blue/15 to-brand-cyan/15">
        <Mail className="mx-auto mb-3 text-brand-cyan" size={32} />
        <h3 className="text-2xl font-bold">Get exclusive deals</h3>
        <p className="text-white/60 mt-1">Join the RCK newsletter — early flash-sale alerts and 10% off your first order.</p>
        <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 focus:outline-none"
          />
          <Button type="submit" size="lg">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
