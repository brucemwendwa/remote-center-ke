import { brands } from '@/data/brands';

export default function BrandsMarquee() {
  const list = [...brands, ...brands];
  return (
    <section className="py-8 border-y border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {list.map((b, i) => (
          <span key={i} className="mx-8 text-2xl font-extrabold text-white/40 hover:text-white transition">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
