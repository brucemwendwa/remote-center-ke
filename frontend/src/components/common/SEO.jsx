import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image }) {
  const t = title ? `${title} · Remote Center Kenya` : 'Remote Center Kenya — TV Remotes & Smart Accessories';
  const d = description || "Kenya's #1 store for TV remotes, smart remotes, covers and accessories.";
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
