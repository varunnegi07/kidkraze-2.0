'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Truck, RotateCcw, Shield, ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { VideoReview } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<VideoReview | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const product = getProductById(Number(params.id));

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [selectedVideo]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-dark-900 mb-4">Product not found</h1>
        <Link href="/products" className="btn-primary inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.image];
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-50 mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                className="p-2 bg-dark-100 rounded-full hover:bg-dark-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                className="p-2 bg-dark-100 rounded-full hover:bg-dark-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div>
          <p className="text-dark-400 uppercase tracking-wider text-sm mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-200'}`}
                  />
                ))}
              </div>
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-dark-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-dark-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-dark-400 line-through">₹{product.originalPrice}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-dark-600 mb-8 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-dark-700 font-medium">Quantity:</span>
            <div className="flex items-center border border-dark-200 rounded-xl">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 hover:bg-dark-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 hover:bg-dark-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                inCart
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'btn-primary'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                router.push('/checkout');
              }}
              className="btn-secondary flex-1"
            >
              Buy Now
            </button>
          </div>

          <div className="space-y-4 p-6 bg-dark-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-primary-600" />
              <span className="text-dark-700">Free shipping on orders above ₹499</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-primary-600" />
              <span className="text-dark-700">7-day easy return policy</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="text-dark-700">100% secure payment</span>
            </div>
          </div>
        </div>
      </div>

      {product.videoReviews && product.videoReviews.length > 0 && (
        <div className="mt-20">
          <h2 className="section-title mb-8">Video Reviews</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.videoReviews.map((review) => (
              <div
                key={review.id}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(review)}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 bg-dark-900">
                  {review.videoUrl ? (
                    <video
                      src={review.videoUrl}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={review.thumbnail}
                      alt={review.reviewer}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-primary-600 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="font-medium text-dark-900 line-clamp-2">{review.title}</p>
                <p className="text-dark-500 text-sm">- {review.reviewer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative max-w-md w-full bg-dark-900 rounded-3xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {selectedVideo.videoUrl ? (
              <div className="relative aspect-[3/4] bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-dark-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Play className="w-8 h-8 text-primary-500 ml-1" fill="currentColor" />
                  </div>
                  <p className="text-white/60 mb-4">Video review by</p>
                  <h3 className="text-white text-xl font-bold mb-2">{selectedVideo.reviewer}</h3>
                  <p className="text-white/70">{selectedVideo.title}</p>
                </div>
              </div>
            )}

            <div className="p-6 bg-dark-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{selectedVideo.reviewer}</h3>
                  <p className="text-white/60 text-sm">{selectedVideo.title}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < selectedVideo.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
