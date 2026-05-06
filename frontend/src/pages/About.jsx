import SEO from '@/components/common/SEO';

export default function About() {
  return (
    <div className="container-page py-12 prose prose-invert max-w-3xl">
      <SEO title="About Us" />
      <h1 className="text-4xl font-bold">About Remote Center Kenya</h1>
      <p className="text-white/70">
        Remote Center Kenya is Nairobi's #1 destination for genuine TV remotes, smart accessories, silicone covers
        and rechargeable controls. Located at Mithoo Business Center on Moi Avenue, we serve thousands of customers
        across Kenya every month with same-day delivery, M-Pesa convenience and a 1-year warranty on every item.
      </p>
      <p className="text-white/70">
        Our mission is simple: get you back to your shows fast. Whether you've lost your Samsung remote, need a Magic
        Voice replacement for your LG, or want to upgrade your living room with a premium silicone cover — we've got you covered.
      </p>
    </div>
  );
}
