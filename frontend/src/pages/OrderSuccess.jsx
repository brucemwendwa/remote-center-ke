import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div className="container-page py-16">
      <div className="glass p-10 max-w-xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-500/20">
          <CheckCircle2 className="text-emerald-400" size={48} />
        </div>
        <h1 className="text-3xl font-bold">Thank you!</h1>
        <p className="text-white/70 mt-2">Your order has been placed successfully.</p>
        <div className="mt-4 glass p-3 inline-block font-mono">{id}</div>
        <div className="mt-6 flex justify-center gap-3">
          <Link to={`/track/${id}`}><Button>Track Order</Button></Link>
          <Link to="/shop"><Button variant="outline">Continue Shopping</Button></Link>
        </div>
      </div>
    </div>
  );
}
