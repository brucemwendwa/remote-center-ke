import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProduct, fetchRelated, submitReview } from '@/api/products';
import { sampleProducts } from '@/data/brands';
import ProductGallery from '@/components/product/ProductGallery';
import PriceTag from '@/components/ui/PriceTag';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import RelatedProducts from '@/components/product/RelatedProducts';
import ReviewList from '@/components/product/ReviewList';
import ReviewForm from '@/components/product/ReviewForm';
import { useCartStore } from '@/store/cartStore';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useReviewStore } from '@/store/reviewStore';
import { Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from '@/components/common/SEO';
import { productId } from '@/lib/products';

export default function ProductDetail() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const add = useCartStore((s) => s.add);
  const open = useCartStore((s) => s.open);
  const recent = useRecentlyViewedStore((s) => s.add);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlistItems = useWishlistStore((s) => s.items);
  const localReviews = useReviewStore((s) => s.bySlug[slug] || []);
  const addLocalReview = useReviewStore((s) => s.addLocalReview);

  const { data: apiProduct } = useQuery({
    queryKey: ['product', slug], queryFn: () => fetchProduct(slug),
  });
  const product = apiProduct || sampleProducts.find((p) => p.slug === slug) || sampleProducts[0];
  const inWishlist = wishlistItems.some((item) => productId(item) === productId(product));

  const { data: related } = useQuery({
    queryKey: ['related', slug], queryFn: () => fetchRelated(slug), enabled: !!slug,
  });
  const relatedList = related?.length ? related : sampleProducts.filter((p) => p.slug !== slug).slice(0, 4);

  useEffect(() => { if (product) recent(product); }, [product, recent]);

  if (!product) return null;
  const images = product.images || [product.image, `https://picsum.photos/seed/${product.id}b/800/800`, `https://picsum.photos/seed/${product.id}c/800/800`];

  return (
    <>
      <SEO title={product.name} description={`${product.name} — ${product.brand} · KES ${product.price}`} />
      <div className="container-page py-8 grid md:grid-cols-2 gap-8">
        <ProductGallery images={images} name={product.name} />
        <div>
          <div className="text-sm text-white/50 uppercase">{product.brand}</div>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating || 4.7} count={product.reviews || 0} />
            {product.isNew && <Badge variant="cyan">NEW</Badge>}
            {product.isBestseller && <Badge variant="yellow">BESTSELLER</Badge>}
          </div>
          <div className="mt-5">
            <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" />
          </div>
          <p className="mt-4 text-white/70 leading-relaxed">
            {product.description || 'High-quality replacement remote with 1-year warranty. Plug-and-play, no extra setup needed for original-brand TVs. For universal models, programming codes & instructions included.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => { add(product, 1); open(); toast.success('Added to cart'); }}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={() => { add(product, 1); window.location.href = '/checkout'; }}>
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const added = toggleWishlist(product);
                toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
              }}
            >
              <Heart size={18} className={inWishlist ? 'fill-red-500 text-red-500' : ''} />
              Wishlist
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-white/70">
            <div className="glass p-3 flex items-center gap-2"><ShieldCheck size={16} className="text-brand-cyan" /> 1-Yr Warranty</div>
            <div className="glass p-3 flex items-center gap-2"><Truck size={16} className="text-brand-cyan" /> Same-day NRB</div>
            <div className="glass p-3 flex items-center gap-2"><RefreshCw size={16} className="text-brand-cyan" /> 7-day returns</div>
          </div>
        </div>
      </div>

      <div className="container-page py-8 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-4">Reviews</h3>
          <ReviewList reviews={[...localReviews, ...(product.reviewsList || [])]} />
        </div>
        <ReviewForm
          onSubmit={async (d) => {
            const id = productId(apiProduct);
            if (id) {
              await submitReview(id, d);
              addLocalReview(slug, d);
              await queryClient.invalidateQueries({ queryKey: ['product', slug] });
              return;
            }
            addLocalReview(slug, d);
          }}
        />
      </div>

      <div className="container-page">
        <RelatedProducts products={relatedList} />
      </div>
    </>
  );
}
