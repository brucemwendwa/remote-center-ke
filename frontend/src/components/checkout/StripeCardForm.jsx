import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Lock } from 'lucide-react';

export default function StripeCardForm({ onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }} className="space-y-3">
      <Input label="Card number" placeholder="4242 4242 4242 4242" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Expiry" placeholder="MM/YY" />
        <Input label="CVC" placeholder="123" />
      </div>
      <Input label="Name on card" />
      <Button size="lg" className="w-full"><Lock size={16} /> Pay securely</Button>
      <p className="text-xs text-white/50 text-center">Stripe placeholder — wire your publishable key in .env to enable real charges.</p>
    </form>
  );
}
