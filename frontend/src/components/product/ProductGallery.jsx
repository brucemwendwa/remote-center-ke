import { useState } from 'react';

export default function ProductGallery({ images = [], name }) {
  const safe = images.length ? images : [`https://picsum.photos/seed/${name || 'p'}/800/800`];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-square glass overflow-hidden cursor-zoom-in"
        onClick={() => setZoom((z) => !z)}
      >
        <img
          src={safe[active]} alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${zoom ? 'scale-150' : ''}`}
        />
      </div>
      {safe.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {safe.map((src, i) => (
            <button
              key={i} onClick={() => setActive(i)}
              className={`aspect-square rounded-xl overflow-hidden border ${i === active ? 'border-brand-cyan' : 'border-white/10'}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
