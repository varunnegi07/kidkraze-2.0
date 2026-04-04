import { Product, VideoReview } from '@/types';

export const videoReviews: VideoReview[] = [
  { id: 'vr1', thumbnail: '/products/IMG-20260403-WA0002.jpg', videoUrl: '/videos/VID-20260328-WA0003.mp4', reviewer: 'Priya Sharma', rating: 5, title: 'My kids absolutely loved this!' },
  { id: 'vr2', thumbnail: '/products/IMG-20260403-WA0005.jpg', videoUrl: '/videos/VID-20260328-WA0004.mp4', reviewer: 'Anita Verma', rating: 5, title: 'Best art supplies for creative kids' },
  { id: 'vr3', thumbnail: '/products/IMG-20260403-WA0008.jpg', videoUrl: '/videos/VID-20260328-WA0005.mp4', reviewer: 'Meera Patel', rating: 4, title: 'Great quality, fast delivery' },
  { id: 'vr4', thumbnail: '/products/IMG-20260403-WA0010.jpg', videoUrl: '/videos/VID-20260328-WA0006.mp4', reviewer: 'Rahul Gupta', rating: 5, title: 'Perfect gift for birthday' },
  { id: 'vr5', thumbnail: '/products/IMG-20260403-WA0013.jpg', videoUrl: '/videos/VID-20260328-WA0007.mp4', reviewer: 'Sneha Reddy', rating: 5, title: 'Amazing combo packs, great value!' },
];

export const products: Product[] = [];

export const categories = [
  { id: 'new-arrivals', name: 'New Arrivals', image: '' },
  { id: 'stationery', name: 'Stationery', image: '' },
  { id: 'art-craft', name: 'Art & Craft', image: '' },
  { id: 'accessories', name: 'Accessories', image: '' },
  { id: 'toys', name: 'Toys', image: '' },
  { id: 'combos', name: 'Combos', image: '' },
];

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'new-arrivals') return products.filter(p => p.badge === 'New');
  return products.filter(p => p.category === category);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.badge === 'Best Seller' || p.rating >= 4.8).slice(0, 8);
}
