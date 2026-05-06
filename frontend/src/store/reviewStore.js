import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useReviewStore = create(
  persist(
    (set, get) => ({
      bySlug: {},
      addLocalReview: (slug, review) => {
        const nextReview = { ...review, createdAt: new Date().toISOString() };
        set({ bySlug: { ...get().bySlug, [slug]: [nextReview, ...(get().bySlug[slug] || [])] } });
      },
    }),
    { name: 'rck-local-reviews' }
  )
);
