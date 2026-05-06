import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import { fetchProducts } from '@/api/products';
import { sampleProducts } from '@/data/brands';
import SEO from '@/components/common/SEO';

export default function Shop() {
  const [params] = useSearchParams();
  const initial = {
    category: params.get('category') || '',
    brand: params.get('brand') || '',
    q: params.get('q') || '',
  };
  const [filters, setFilters] = useState(initial);

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });

  const list = (data && data.length ? data : sampleProducts);
  const filtered = useMemo(() => {
    return list.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      if (filters.min && p.price < +filters.min) return false;
      if (filters.max && p.price > +filters.max) return false;
      if (filters.q && !p.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
      return true;
    });
  }, [list, filters]);

  return (
    <>
      <SEO title="Shop" />
      <div className="container-page py-8">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <ProductFilters filters={filters} setFilters={setFilters} />
          <div>
            <div className="text-sm text-white/60 mb-3">{filtered.length} products</div>
            <ProductGrid products={filtered} loading={isLoading && !filtered.length} />
          </div>
        </div>
      </div>
    </>
  );
}
