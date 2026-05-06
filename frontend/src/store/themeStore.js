import { create } from 'zustand';

const initial = (() => {
  if (typeof window === 'undefined') return 'light';
  if (!localStorage.getItem('rck-theme-default-updated')) {
    localStorage.setItem('rck-theme-default-updated', 'true');
    localStorage.setItem('rck-theme', 'light');
    return 'light';
  }
  return localStorage.getItem('rck-theme') || 'light';
})();

export const useThemeStore = create((set) => ({
  theme: initial,
  toggle: () =>
    set((s) => {
      const next = s.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('rck-theme', next); } catch {}
      return { theme: next };
    }),
  setTheme: (theme) => {
    try { localStorage.setItem('rck-theme', theme); } catch {}
    set({ theme });
  },
}));
