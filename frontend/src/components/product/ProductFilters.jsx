import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

export default function ProductFilters({ filters, setFilters }) {
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  return (
    <aside className="glass p-5 space-y-5 sticky top-24">
      <div>
        <h4 className="font-bold mb-2">Category</h4>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" checked={!filters.category} onChange={() => set({ category: '' })} /> All
          </label>
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={filters.category === c.slug}
                onChange={() => set({ category: c.slug })}
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-2">Brand</h4>
        <div className="space-y-1.5 max-h-56 overflow-auto scrollbar-thin pr-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" checked={!filters.brand} onChange={() => set({ brand: '' })} /> All
          </label>
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm">
              <input
                type="radio" checked={filters.brand === b}
                onChange={() => set({ brand: b })}
              />
              {b}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-2">Price (KES)</h4>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={filters.min || ''} onChange={(e) => set({ min: e.target.value })} className="w-full px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm" />
          <input type="number" placeholder="Max" value={filters.max || ''} onChange={(e) => set({ max: e.target.value })} className="w-full px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm" />
        </div>
      </div>
      <button onClick={() => setFilters({})} className="w-full text-sm text-white/60 hover:text-white">
        Clear filters
      </button>
    </aside>
  );
}
