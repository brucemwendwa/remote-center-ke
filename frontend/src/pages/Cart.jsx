import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse our shop to add items."
          action={<Link to="/shop"><Button>Shop now</Button></Link>}
        />
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-2">
            {items.map((it) => <CartItem key={it.id} item={it} />)}
          </div>
          <div className="space-y-3">
            <CartSummary subtotal={total} />
            <Link to="/checkout"><Button size="lg" className="w-full">Proceed to Checkout</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
