import ProductGrid from './ProductGrid';

export default function RelatedProducts({ products }) {
  if (!products?.length) return null;
  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold mb-4">You might also like</h3>
      <ProductGrid products={products.slice(0, 4)} cols="md:grid-cols-3 lg:grid-cols-4" />
    </section>
  );
}
