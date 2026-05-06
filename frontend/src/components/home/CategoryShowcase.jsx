import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import * as Icons from 'lucide-react';

export default function CategoryShowcase() {
  return (
    <section className="container-page py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="text-white/60">Find the right remote in seconds.</p>
        </div>
        <Link to="/shop" className="text-sm text-brand-cyan hover:underline">View all →</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => {
          const Icon = Icons[c.icon] || Icons.Package;
          return (
            <Link
              key={c.slug} to={`/shop?category=${c.slug}`}
              className="glass p-5 group hover:border-brand-cyan/40 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Icon size={20} />
              </div>
              <div className="font-bold">{c.name}</div>
              <div className="text-xs text-white/60">{c.desc}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
