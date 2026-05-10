const brandLogos = [
  { name: 'Samsung', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Samsung_wordmark.svg' },
  { name: 'LG', src: 'https://cdn.simpleicons.org/lg/A50034' },
  { name: 'Sony', src: 'https://cdn.simpleicons.org/sony/000000' },
  { name: 'TCL', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_of_the_TCL_Corporation.svg' },
  { name: 'Hisense', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hisense.svg' },
  { name: 'Xiaomi', src: 'https://cdn.simpleicons.org/xiaomi/FF6900' },
  { name: 'Skyworth', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_Skyworth.svg' },
  { name: 'Vision Plus', src: 'https://visionplus.co.ke/wp-content/uploads/2023/05/vision_black_logo.png' },
  { name: 'Vitron', src: 'https://vitronappliances.co.ke/wp-content/uploads/2025/12/vitronappliances-logo-01.webp' },
  { name: 'JBL', src: 'https://cdn.simpleicons.org/jbl/FF3300' },
  { name: 'Fire TV Stick', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Amazon_Fire_TV_Stick_logo.png' },
  { name: 'DStv', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/DStv_Logo_(2023).svg' },
  { name: 'Amtec', mark: 'AMTEC', markClassName: 'bg-slate-950 text-white' },
  { name: 'GLD', mark: 'GLD', markClassName: 'bg-zinc-900 text-amber-300' },
  { name: 'Royal', mark: 'ROYAL', markClassName: 'bg-purple-950 text-amber-200' },
];

export default function BrandsMarquee() {
  const list = [...brandLogos, ...brandLogos];

  return (
    <section className="py-8 border-y border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="flex animate-marquee items-center whitespace-nowrap">
        {list.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="mx-3 flex h-16 w-40 shrink-0 items-center justify-center rounded-lg bg-white px-6 shadow-sm ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-lg"
            title={brand.name}
          >
            {brand.src ? (
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                className="max-h-9 max-w-28 object-contain"
                loading="lazy"
              />
            ) : (
              <span
                className={`flex h-10 min-w-24 items-center justify-center rounded px-4 text-sm font-black tracking-[0.18em] ${brand.markClassName}`}
                aria-label={`${brand.name} logo`}
              >
                {brand.mark}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
