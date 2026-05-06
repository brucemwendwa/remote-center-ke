import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { productId } from '@/lib/products';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      has: (product) => get().items.some((item) => productId(item) === productId(product)),
      toggle: (product) => {
        const id = productId(product);
        if (!id) return false;
        if (get().items.some((item) => productId(item) === id)) {
          set({ items: get().items.filter((item) => productId(item) !== id) });
          return false;
        }
        set({ items: [...get().items, product] });
        return true;
      },
      remove: (id) => set({ items: get().items.filter((item) => productId(item) !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: 'rck-wishlist', partialize: (state) => ({ items: state.items }) }
  )
);

