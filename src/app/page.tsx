import HeroSection from '@/components/HeroSection';
import VideoReviewsSection from '@/components/VideoReviewsSection';
import { videoReviews } from '@/data/products';

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            New Products Coming Soon
          </h2>
          <p className="text-dark-500 text-lg mb-8">
            We&apos;re updating our catalog with exciting new items. Stay tuned!
          </p>
          <a
            href="https://wa.me/917889231302"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <VideoReviewsSection reviews={videoReviews} />

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
