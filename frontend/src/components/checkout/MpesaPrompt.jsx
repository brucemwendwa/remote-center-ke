import Modal from '@/components/ui/Modal';
import { Loader2, Smartphone } from 'lucide-react';

export default function MpesaPrompt({ open, onClose, phone }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm M-Pesa Payment">
      <div className="text-center py-6 space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Smartphone className="text-emerald-400" />
        </div>
        <p className="text-white/80">
          We've sent an STK push to <span className="font-bold">{phone}</span>.
          Enter your M-Pesa PIN to complete payment.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-white/60">
          <Loader2 className="animate-spin" size={16} /> Waiting for confirmation…
        </div>
      </div>
    </Modal>
  );
}
