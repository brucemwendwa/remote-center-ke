import { Instagram } from 'lucide-react';

export default function InstagramGallery() {
  const tiles = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <section className="container-page py-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-3xl font-bold">@remote_center.ke</h2>
          <p className="text-white/60">Follow us on Instagram for daily deals.</p>
        </div>
        <a
          href="https://instagram.com/remote_center.ke" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-brand-cyan hover:underline"
        >
          <Instagram size={16} /> Follow
        </a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {tiles.map((i) => (
          <a
            key={i} href="https://instagram.com/remote_center.ke" target="_blank" rel="noreferrer"
            className="block aspect-square rounded-2xl overflow-hidden relative group"
          >
            <img src={`https://picsum.photos/seed/ig${i}/400/400`} alt="" className="w-full h-full object-cover transition group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Instagram size={22} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
