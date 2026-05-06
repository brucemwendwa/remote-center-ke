import EmptyState from '@/components/ui/EmptyState';
import { Heart } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';
import { useWishlistStore } from '@/store/wishlistStore';

export default function Wishlist({ embedded = false }) {
  const items = useWishlistStore((s) => s.items);
  const clear = useWishlistStore((s) => s.clear);
  return (
    <div className={embedded ? '' : 'container-page py-8'}>
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        {items.length > 0 && <Button variant="outline" onClick={clear}>Clear</Button>}
      </div>
      {items.length ? (
        <ProductGrid products={items} />
      ) : (
        <EmptyState icon={Heart} title="Your wishlist is empty" description="Save items you love for later." />
      )}
    </div>
  );
}
