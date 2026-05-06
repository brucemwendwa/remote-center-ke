import { useQuery } from '@tanstack/react-query';
import Hero from '@/components/home/Hero';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import FlashSale from '@/components/home/FlashSale';
import BrandsMarquee from '@/components/home/BrandsMarquee';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';
import FAQ from '@/components/home/FAQ';
import StoreLocation from '@/components/home/StoreLocation';
import NewsletterCTA from '@/components/home/NewsletterCTA';
import { fetchFeatured } from '@/api/products';
import { sampleProducts } from '@/data/brands';
import SEO from '@/components/common/SEO';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured'],
    queryFn: fetchFeatured,
  });
  const products = (data && data.length ? data : sampleProducts);

  return (
    <>
      <SEO />
      <Hero />
      <CategoryShowcase />
      <FeaturedGrid products={products} loading={isLoading && !products.length} />
      <FlashSale />
      <BrandsMarquee />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <FAQ />
      <StoreLocation />
      <NewsletterCTA />
    </>
  );
}
