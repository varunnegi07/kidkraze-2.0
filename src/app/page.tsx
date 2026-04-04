import HeroSection from '@/components/HeroSection';
import VideoReviewsSection from '@/components/VideoReviewsSection';
import ProductGrid from '@/components/ProductGrid';
import CategorySection from '@/components/CategorySection';
import { getBestSellers, getProductsByCategory, videoReviews } from '@/data/products';

export default function Home() {
  const bestSellers = getBestSellers();
  const newArrivals = getProductsByCategory('stationery');

  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductGrid
        title="Best Sellers"
        products={bestSellers}
        viewAllHref="/products"
      />
      <VideoReviewsSection reviews={videoReviews} />
      <ProductGrid
        title="New Arrivals"
        products={newArrivals}
        viewAllHref="/products?category=stationery"
      />

      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Order via WhatsApp
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Fast response &amp; easy ordering - Chat with us directly!
          </p>
          <a
            href="https://wa.me/917889231302"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors text-lg"
          >
            Chat Now
          </a>
        </div>
      </section>
    </>
  );
}
