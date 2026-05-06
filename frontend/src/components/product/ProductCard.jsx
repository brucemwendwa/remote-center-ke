import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import PriceTag from '@/components/ui/PriceTag';
import Rating from '@/components/ui/Rating';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const add = useCartStore((s) => s.add);
  const open = useCartStore((s) => s.open);
  const inWishlist = useWishlistStore((s) => s.has(product));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const lowStock = product.stock != null && product.stock > 0 && product.stock <= 5;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass overflow-hidden group flex flex-col"
    >
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden">
        <img
          src={product.image || `https://picsum.photos/seed/${product.id}/600/600`}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge variant="cyan">NEW</Badge>}
          {product.isBestseller && <Badge variant="yellow">BESTSELLER</Badge>}
          {lowStock && <Badge variant="red">Only {product.stock} left</Badge>}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const added = toggleWishlist(product);
            toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 text-slate-950 backdrop-blur opacity-100 sm:opacity-0 group-hover:opacity-100 transition dark:bg-black/60 dark:text-white"
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} className={inWishlist ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="text-xs text-white/50 uppercase tracking-wide">{product.brand}</div>
        <Link to={`/product/${product.slug}`} className="font-semibold leading-snug line-clamp-2 hover:text-gradient">
          {product.name}
        </Link>
        <Rating value={product.rating || 0} count={product.reviews} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
          <button
            onClick={() => { add(product, 1); open(); toast.success('Added to cart'); }}
            className="p-2.5 rounded-2xl btn-gradient hover:scale-105 transition"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
