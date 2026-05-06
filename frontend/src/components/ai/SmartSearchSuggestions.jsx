import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SmartSearchSuggestions({ query = '', items = [] }) {
  if (!query || !items.length) return null;
  return (
    <div className="glass p-3 absolute mt-2 w-full z-20">
      <div className="text-xs text-white/50 mb-2 flex items-center gap-1"><Sparkles size={12} /> Smart suggestions</div>
      <ul className="space-y-1">
        {items.slice(0, 5).map((p) => (
          <li key={p.id || p.slug}>
            <Link
              to={`/product/${p.slug}`}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/10 text-sm"
            >
              <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
              <span className="line-clamp-1">{p.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
