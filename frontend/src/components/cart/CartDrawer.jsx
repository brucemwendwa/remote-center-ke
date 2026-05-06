import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, close, items, total } = useCartStore();
  const subtotal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50 bg-white text-slate-900 border-l border-slate-200 flex flex-col dark:bg-slate-950 dark:text-white dark:border-white/10"
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between dark:border-white/10">
              <h3 className="font-bold flex items-center gap-2"><ShoppingBag size={18} /> Your Cart</h3>
              <button onClick={close} className="p-1 hover:bg-slate-100 rounded-lg dark:hover:bg-white/10"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-auto scrollbar-thin p-3 space-y-2">
              {items.length === 0 ? (
                <EmptyState
                  title="Cart is empty"
                  description="Browse our collection and add a few favourites."
                  action={<Link to="/shop" onClick={close}><Button>Shop now</Button></Link>}
                />
              ) : (
                items.map((it) => <CartItem key={it.id} item={it} />)
              )}
            </div>
            {items.length > 0 && (
              <div className="p-4 border-t border-slate-200 space-y-3 dark:border-white/10">
                <CartSummary subtotal={subtotal} />
                <Link to="/checkout" onClick={close} className="block"><Button className="w-full" size="lg">Checkout</Button></Link>
                <Link to="/cart" onClick={close} className="block text-center text-sm text-slate-600 hover:text-slate-950 dark:text-white/60 dark:hover:text-white">View full cart →</Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
