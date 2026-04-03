'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, X, Star, Pause } from 'lucide-react';
import { VideoReview } from '@/types';

interface VideoReviewsSectionProps {
  reviews: VideoReview[];
}

export default function VideoReviewsSection({ reviews }: VideoReviewsSectionProps) {
  const [selectedReview, setSelectedReview] = useState<VideoReview | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (selectedReview && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [selectedReview]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Customer Love
          </span>
          <h2 className="section-title mb-4">
            See What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-dark-500 text-lg max-w-2xl mx-auto">
            Real video reviews from happy parents and kids
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-primary-50 transition-colors -ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-72 cursor-pointer group"
                onClick={() => setSelectedReview(review)}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] bg-dark-900">
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
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-dark-900 mb-1 line-clamp-2">{review.title}</h4>
                <p className="text-dark-500 text-sm">- {review.reviewer}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-lg rounded-full hover:bg-primary-50 transition-colors -mr-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => { setSelectedReview(null); setIsPlaying(true); }}
        >
          <div
            className="relative max-w-md w-full bg-dark-900 rounded-3xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setSelectedReview(null); setIsPlaying(true); }}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {selectedReview.videoUrl ? (
              <div className="relative aspect-[3/4] bg-black">
                <video
                  ref={videoRef}
                  src={selectedReview.videoUrl}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-dark-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Play className="w-8 h-8 text-primary-500 ml-1" fill="currentColor" />
                  </div>
                  <p className="text-white/60 mb-4">Video review by</p>
                  <h3 className="text-white text-xl font-bold mb-2">{selectedReview.reviewer}</h3>
                  <p className="text-white/70">{selectedReview.title}</p>
                </div>
              </div>
            )}

            <div className="p-6 bg-dark-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{selectedReview.reviewer}</h3>
                  <p className="text-white/60 text-sm">{selectedReview.title}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < selectedReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
