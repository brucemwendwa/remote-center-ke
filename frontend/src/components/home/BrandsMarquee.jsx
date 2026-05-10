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
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 sm:py-8">
      <div className="flex animate-marquee items-center gap-2 whitespace-nowrap sm:gap-6">
        {list.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex h-10 w-20 shrink-0 items-center justify-center rounded-md bg-white px-3 shadow-sm ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-lg sm:h-16 sm:w-40 sm:rounded-lg sm:px-6"
            title={brand.name}
          >
            {brand.src ? (
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                className="max-h-6 max-w-14 object-contain sm:max-h-9 sm:max-w-28"
                loading="lazy"
              />
            ) : (
              <span
                className={`flex h-7 min-w-14 items-center justify-center rounded px-2 text-[10px] font-black tracking-[0.14em] sm:h-10 sm:min-w-24 sm:px-4 sm:text-sm sm:tracking-[0.18em] ${brand.markClassName}`}
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
