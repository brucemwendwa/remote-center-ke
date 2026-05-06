import ProductGrid from '@/components/product/ProductGrid';
import { Link } from 'react-router-dom';

export default function FeaturedGrid({ products = [], loading }) {
  return (
    <section className="container-page py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <p className="text-white/60">Hand-picked bestsellers.</p>
        </div>
        <Link to="/shop" className="text-sm text-brand-cyan hover:underline">Browse all →</Link>
      </div>
      <ProductGrid products={products.slice(0, 8)} loading={loading} />
    </section>
  );
}
