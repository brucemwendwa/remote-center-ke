import { useCartStore } from '@/store/cartStore';
export const useCart = () => useCartStore((s) => s);
