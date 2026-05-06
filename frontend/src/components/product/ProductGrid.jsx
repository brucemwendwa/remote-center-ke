import ProductCard from './ProductCard';
import Skeleton from '@/components/ui/Skeleton';

export default function ProductGrid({ products = [], loading, cols = 'md:grid-cols-3 lg:grid-cols-4' }) {
  if (loading) {
    return (
      <div className={`grid grid-cols-2 ${cols} gap-4`}>
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-72" />)}
      </div>
    );
  }
  if (!products.length) return null;
  return (
    <div className={`grid grid-cols-2 ${cols} gap-4`}>
      {products.map((p) => <ProductCard key={p.id || p.slug} product={p} />)}
    </div>
  );
}
