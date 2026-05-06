import ProductCard from '@/components/product/ProductCard';
import { Sparkles } from 'lucide-react';

export default function RecommendationStrip({ products = [], title = 'Recommended for you' }) {
  if (!products.length) return null;
  return (
    <section className="container-page py-8">
      <h3 className="font-bold flex items-center gap-2 mb-4">
        <Sparkles className="text-brand-cyan" size={18} /> {title}
      </h3>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin pb-2">
        {products.map((p) => (
          <div key={p.id || p.slug} className="min-w-[220px] max-w-[220px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
