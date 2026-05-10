import { Instagram } from 'lucide-react';

const posts = [
  {
    src: 'https://samsungparts.com/cdn/shop/products/imageDisplay_79ca8a02-7296-43e7-bc34-7878c023fc1d_1024x1024.jpg?v=1681233493',
    alt: 'Samsung curved TV remote',
  },
  {
    src: 'https://www.intercyprus.com/cdn/shop/files/Se892555d6ccf4ce0915d5a65243267b7U.webp?v=1755852897',
    alt: 'Samsung Bluetooth voice remote',
  },
  {
    src: 'https://tilvon.com/wp-content/uploads/2025/11/tcl-smart-remote-1000x1000.webp',
    alt: 'TCL smart remote',
  },
  {
    src: 'https://simplecellshop.com/cdn/shop/files/sc-r6894-5_b1761933-51df-42c3-80b5-f8304870df06_1024x.jpg?v=1754510718',
    alt: 'Hisense smart remote',
  },
  {
    src: 'https://www.lg.com/content/dam/channel/wcms/au/images/tv-accessories/akb76036204_au_c/gallery/D-01.jpg',
    alt: 'LG Magic Remote',
  },
  {
    src: 'https://pictures-kenya.jijistatic.com/70242796_NjIwLTgyNy01NTVlNzJlMjgz.webp',
    alt: 'Amtec GLD Royal smart remote',
  },
];

export default function InstagramGallery() {
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
        {posts.map((post) => (
          <a
            key={post.src} href="https://instagram.com/remote_center.ke" target="_blank" rel="noreferrer"
            className="block aspect-square rounded-2xl overflow-hidden relative group"
          >
            <img src={post.src} alt={post.alt} className="w-full h-full object-cover transition group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Instagram size={22} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
