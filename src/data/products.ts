import { Product, VideoReview } from '@/types';

export const videoReviews: VideoReview[] = [
  {
    id: 'vr1',
    thumbnail: '/products/IMG-20260403-WA0002.jpg',
    videoUrl: '/videos/VID-20260328-WA0003.mp4',
    reviewer: 'Priya Sharma',
    rating: 5,
    title: 'My kids absolutely loved this stationery set!',
  },
  {
    id: 'vr2',
    thumbnail: '/products/IMG-20260403-WA0005.jpg',
    videoUrl: '/videos/VID-20260328-WA0004.mp4',
    reviewer: 'Anita Verma',
    rating: 5,
    title: 'Best art supplies for creative kids',
  },
  {
    id: 'vr3',
    thumbnail: '/products/IMG-20260403-WA0008.jpg',
    videoUrl: '/videos/VID-20260328-WA0005.mp4',
    reviewer: 'Meera Patel',
    rating: 4,
    title: 'Great quality notebooks, fast delivery',
  },
  {
    id: 'vr4',
    thumbnail: '/products/IMG-20260403-WA0010.jpg',
    videoUrl: '/videos/VID-20260328-WA0006.mp4',
    reviewer: 'Rahul Gupta',
    rating: 5,
    title: 'Perfect gift for my daughter\'s birthday',
  },
  {
    id: 'vr5',
    thumbnail: '/products/IMG-20260403-WA0013.jpg',
    videoUrl: '/videos/VID-20260328-WA0007.mp4',
    reviewer: 'Sneha Reddy',
    rating: 5,
    title: 'Amazing combo packs, great value!',
  },
  {
    id: 'vr6',
    thumbnail: '/products/IMG-20260403-WA0014.jpg',
    videoUrl: '/videos/VID-20260328-WA0008.mp4',
    reviewer: 'Amit Singh',
    rating: 4,
    title: 'School supplies collection is fantastic',
  },
  {
    id: 'vr7',
    thumbnail: '/products/IMG-20260403-WA0019.jpg',
    videoUrl: '/videos/VID-20260328-WA0009.mp4',
    reviewer: 'Kavita Joshi',
    rating: 5,
    title: 'Beautiful art supplies, my son loves them',
  },
  {
    id: 'vr8',
    thumbnail: '/products/IMG-20260403-WA0022.jpg',
    videoUrl: '/videos/VID-20260328-WA0010.mp4',
    reviewer: 'Deepa Nair',
    rating: 5,
    title: 'Best stationery shop for kids',
  },
  {
    id: 'vr9',
    thumbnail: '/products/IMG-20260403-WA0025.jpg',
    videoUrl: '/videos/VID-20260328-WA0011.mp4',
    reviewer: 'Ritu Agarwal',
    rating: 4,
    title: 'Great quality and fast delivery',
  },
  {
    id: 'vr10',
    thumbnail: '/products/IMG-20260403-WA0028.jpg',
    videoUrl: '/videos/VID-20260328-WA0012.mp4',
    reviewer: 'Pooja Mehta',
    rating: 5,
    title: 'Highly recommend for school supplies',
  },
];

const img = (n: number) => `/products/IMG-20260403-WA00${String(n).padStart(2, '0')}.jpg`;

export const products: Product[] = [
  {
    id: 1, name: 'Unicorn Stationery Gift Box Set', price: 499, originalPrice: 699,
    image: img(2), images: [img(2), img(3), img(4)],
    category: 'combos', description: 'Complete unicorn themed stationery gift box with notebooks, pens, pencils, erasers, and accessories.',
    rating: 4.8, reviews: 234, badge: 'Best Seller', discount: 29, videoReviews: videoReviews.slice(0, 3),
  },
  {
    id: 2, name: 'Kawaii Gel Pen Collection - 12 Pack', price: 349, originalPrice: 449,
    image: img(5), images: [img(5), img(6), img(7)],
    category: 'stationery', description: 'Adorable kawaii-style gel pens in 12 different colors and designs. Smooth writing ink.',
    rating: 4.9, reviews: 189, badge: 'New', discount: 22, videoReviews: videoReviews.slice(1, 4),
  },
  {
    id: 3, name: 'Pastel Sticky Notes Tower Set', price: 199, originalPrice: 249,
    image: img(8), images: [img(8), img(9)],
    category: 'stationery', description: 'Colorful pastel sticky notes tower with 6 different shades. Self-adhesive and repositionable.',
    rating: 4.7, reviews: 156, discount: 20, videoReviews: videoReviews.slice(2, 5),
  },
  {
    id: 4, name: 'Rainbow Highlighter Set - 6 Colors', price: 179, originalPrice: 229,
    image: img(10), images: [img(10), img(11), img(12)],
    category: 'stationery', description: 'Vibrant rainbow highlighter set with chisel tip. Quick-drying, non-toxic ink.',
    rating: 4.6, reviews: 142, discount: 22,
  },
  {
    id: 5, name: 'Doodle Art Kit - Complete Set', price: 599, originalPrice: 799,
    image: img(13), images: [img(13), img(14)],
    category: 'art-craft', description: 'Complete doodle art kit with markers, stencils, and sketchbook.',
    rating: 4.8, reviews: 198, badge: 'Popular', discount: 25, videoReviews: videoReviews.slice(0, 2),
  },
  {
    id: 6, name: 'Watercolor Paint Set - 24 Colors', price: 449, originalPrice: 599,
    image: img(15), images: [img(15), img(16), img(17)],
    category: 'art-craft', description: 'Professional quality watercolor paint set with 24 vibrant colors, brush and mixing palette.',
    rating: 4.9, reviews: 267, badge: 'Best Seller', discount: 25, videoReviews: videoReviews.slice(3, 6),
  },
  {
    id: 7, name: 'DIY Friendship Bracelet Kit', price: 349, originalPrice: 449,
    image: img(18), images: [img(18), img(19)],
    category: 'art-craft', description: 'Make beautiful friendship bracelets with colorful threads, beads, and easy instructions.',
    rating: 4.7, reviews: 134, discount: 22,
  },
  {
    id: 8, name: 'Brush Pen Calligraphy Set - 12 Pack', price: 399, originalPrice: 499,
    image: img(20), images: [img(20), img(21), img(22)],
    category: 'art-craft', description: 'Professional brush pen set with flexible tips for calligraphy, lettering, and illustration.',
    rating: 4.8, reviews: 176, badge: 'New', discount: 20, videoReviews: videoReviews.slice(1, 3),
  },
  {
    id: 9, name: 'Cute Unicorn Pencil Case', price: 249, originalPrice: 349,
    image: img(23), images: [img(23), img(24)],
    category: 'accessories', description: 'Adorable unicorn pencil case with multiple compartments. Holds 30+ pens.',
    rating: 4.6, reviews: 98, discount: 29,
  },
  {
    id: 10, name: 'Pastel School Backpack', price: 799, originalPrice: 999,
    image: img(25), images: [img(25), img(26), img(27)],
    category: 'accessories', description: 'Stylish pastel school backpack with padded straps and multiple pockets. Water-resistant.',
    rating: 4.7, reviews: 145, badge: 'Popular', discount: 20,
  },
  {
    id: 11, name: 'Mega Stationery Combo Pack', price: 899, originalPrice: 1299,
    image: img(28), images: [img(28), img(29), img(30)],
    category: 'combos', description: 'Ultimate stationery combo with notebooks, pens, pencils, erasers, sharpener, ruler and more.',
    rating: 4.9, reviews: 312, badge: 'Best Value', discount: 31, videoReviews: videoReviews.slice(0, 4),
  },
  {
    id: 12, name: 'Premium Art Supplies Gift Box', price: 1299, originalPrice: 1799,
    image: img(31), images: [img(31), img(32)],
    category: 'combos', description: 'Premium art supplies gift box with colored pencils, markers, crayons, watercolors, and sketchbook.',
    rating: 4.9, reviews: 234, badge: 'Gift Pick', discount: 28, videoReviews: videoReviews.slice(2, 6),
  },
  {
    id: 13, name: 'Galaxy Journal Set - 2 Pack', price: 399, originalPrice: 549,
    image: img(33), images: [img(33), img(34)],
    category: 'stationery', description: 'Stunning galaxy-themed journal set with premium paper, elastic closure, and ribbon bookmark.',
    rating: 4.8, reviews: 167, badge: 'New', discount: 27,
  },
  {
    id: 14, name: 'Kids Science Experiment Kit', price: 699, originalPrice: 899,
    image: img(35), images: [img(35), img(36), img(37)],
    category: 'art-craft', description: 'Fun science experiment kit with 20+ experiments. Safe materials, detailed instructions.',
    rating: 4.7, reviews: 123, discount: 22,
  },
  {
    id: 15, name: 'Washi Tape Collection - 24 Rolls', price: 349, originalPrice: 499,
    image: img(38), images: [img(38), img(39)],
    category: 'stationery', description: 'Beautiful washi tape collection with 24 different patterns for scrapbooking and crafts.',
    rating: 4.6, reviews: 89, discount: 30,
  },
  {
    id: 16, name: 'Laptop Sleeve - Pastel Floral', price: 599, originalPrice: 799,
    image: img(40), images: [img(40), img(41)],
    category: 'accessories', description: 'Elegant pastel floral laptop sleeve with soft inner lining. Fits 13-15 inch laptops.',
    rating: 4.7, reviews: 76, badge: 'New', discount: 25,
  },
  {
    id: 17, name: 'Glitter Gel Pen Set - 10 Pack', price: 249, originalPrice: 349,
    image: img(42), images: [img(42), img(43)],
    category: 'stationery', description: 'Sparkly glitter gel pens in 10 vibrant colors. Perfect for journaling and creative writing.',
    rating: 4.5, reviews: 112, discount: 29,
  },
  {
    id: 18, name: '3D Pen for Kids - Creative Drawing', price: 899, originalPrice: 1199,
    image: img(44), images: [img(44), img(45), img(46)],
    category: 'art-craft', description: 'Safe 3D printing pen for kids. Create 3D objects with included filament colors.',
    rating: 4.8, reviews: 89, badge: 'Hot', discount: 25,
  },
  {
    id: 19, name: 'Magnetic Building Blocks Set', price: 699, originalPrice: 899,
    image: img(47), images: [img(47), img(48)],
    category: 'toys', description: 'Colorful magnetic building blocks for creative construction. 50 pieces included.',
    rating: 4.9, reviews: 201, badge: 'Best Seller', discount: 22,
  },
  {
    id: 20, name: 'Slime Making Kit - DIY', price: 399, originalPrice: 549,
    image: img(49), images: [img(49), img(50), img(51)],
    category: 'art-craft', description: 'Complete slime making kit with glue, activator, glitter, and beads. Make 10+ slimes!',
    rating: 4.6, reviews: 178, discount: 27,
  },
  {
    id: 21, name: 'Cute Animal Eraser Collection', price: 149, originalPrice: 199,
    image: img(52), images: [img(52), img(53)],
    category: 'stationery', description: 'Adorable animal-shaped erasers in a set of 12. Soft, non-toxic rubber.',
    rating: 4.4, reviews: 95, discount: 25,
  },
  {
    id: 22, name: 'Origami Paper Kit - 200 Sheets', price: 299, originalPrice: 399,
    image: img(54), images: [img(54), img(55)],
    category: 'art-craft', description: 'Premium origami paper kit with 200 sheets in 20 patterns. Includes instruction booklet.',
    rating: 4.7, reviews: 134, discount: 25,
  },
  {
    id: 23, name: 'Sticker Pack - 500+ Pieces', price: 199, originalPrice: 299,
    image: img(56), images: [img(56), img(57), img(58)],
    category: 'stationery', description: 'Massive sticker collection with 500+ designs. Waterproof vinyl stickers.',
    rating: 4.5, reviews: 223, badge: 'Popular', discount: 33,
  },
  {
    id: 24, name: 'Kids Craft Scissors Set', price: 179, originalPrice: 249,
    image: img(59), images: [img(59), img(60)],
    category: 'art-craft', description: 'Safe craft scissors with decorative edge patterns. Set of 6 different designs.',
    rating: 4.3, reviews: 67, discount: 28,
  },
  {
    id: 25, name: 'Fancy Pencil Sharpener Collection', price: 199, originalPrice: 279,
    image: img(61), images: [img(61), img(62)],
    category: 'stationery', description: 'Cute pencil sharpeners in fun shapes and designs. Set of 4.',
    rating: 4.4, reviews: 78, discount: 29,
  },
  {
    id: 26, name: 'Coloring Book Set - 5 Books', price: 349, originalPrice: 499,
    image: img(63), images: [img(63), img(64), img(65)],
    category: 'art-craft', description: 'Premium coloring book set with 5 themed books. Thick paper, single-sided designs.',
    rating: 4.8, reviews: 189, badge: 'Best Seller', discount: 30,
  },
  {
    id: 27, name: 'Mini Desktop Vacuum Cleaner', price: 449, originalPrice: 599,
    image: img(66), images: [img(66), img(67)],
    category: 'accessories', description: 'Cute mini vacuum for desk cleanup. Battery operated, perfect for eraser shavings.',
    rating: 4.6, reviews: 56, discount: 25,
  },
  {
    id: 28, name: 'Fidget Toy Set - 10 Pack', price: 299, originalPrice: 449,
    image: img(68), images: [img(68), img(69), img(70)],
    category: 'toys', description: 'Variety fidget toy set with pop-its, spinners, and stress balls. Great for focus.',
    rating: 4.7, reviews: 234, badge: 'Hot', discount: 33,
  },
  {
    id: 29, name: 'Fancy Ruler Set - 8 Pieces', price: 149, originalPrice: 199,
    image: img(71), images: [img(71), img(72)],
    category: 'stationery', description: 'Decorative ruler set with different shapes and patterns. Flexible plastic material.',
    rating: 4.3, reviews: 45, discount: 25,
  },
  {
    id: 30, name: 'Clay Modeling Kit - 24 Colors', price: 399, originalPrice: 549,
    image: img(73), images: [img(73), img(74), img(75)],
    category: 'art-craft', description: 'Air-dry clay modeling kit with 24 colors, tools, and instruction guide.',
    rating: 4.8, reviews: 156, badge: 'Popular', discount: 27,
  },
  {
    id: 31, name: 'Bookmark Collection - 20 Pack', price: 149, originalPrice: 199,
    image: img(76), images: [img(76), img(77)],
    category: 'stationery', description: 'Beautiful bookmark collection with motivational quotes and cute designs.',
    rating: 4.4, reviews: 67, discount: 25,
  },
  {
    id: 32, name: 'Kids Drawing Easel - Double Sided', price: 1299, originalPrice: 1799,
    image: img(78), images: [img(78), img(79)],
    category: 'art-craft', description: 'Adjustable double-sided easel with whiteboard and chalkboard. Includes accessories.',
    rating: 4.9, reviews: 89, badge: 'Premium', discount: 28,
  },
  {
    id: 33, name: 'Fancy Correction Tape Set - 6 Pack', price: 199, originalPrice: 279,
    image: img(80), images: [img(80), img(81)],
    category: 'stationery', description: 'Smooth correction tape set in cute designs. Easy to use, no mess.',
    rating: 4.5, reviews: 56, discount: 29,
  },
  {
    id: 34, name: 'Kids Camera - Instant Print', price: 1499, originalPrice: 1999,
    image: img(82), images: [img(82), img(83), img(84)],
    category: 'toys', description: 'Fun instant print camera for kids. Takes black & white photos on thermal paper.',
    rating: 4.8, reviews: 123, badge: 'New', discount: 25,
  },
  {
    id: 35, name: 'Magnetic Drawing Board - Large', price: 599, originalPrice: 799,
    image: img(85), images: [img(85), img(86)],
    category: 'toys', description: 'Large magnetic drawing board with colorful stamps. Erasable, mess-free fun.',
    rating: 4.7, reviews: 178, discount: 25,
  },
  {
    id: 36, name: 'Gel Marker Set - 15 Neon Colors', price: 299, originalPrice: 399,
    image: img(2), images: [img(2), img(5), img(8)],
    category: 'art-craft', description: 'Vibrant neon gel markers that glow on dark paper. Perfect for posters and art projects.',
    rating: 4.6, reviews: 134, discount: 25,
  },
  {
    id: 37, name: 'Fancy Notebook Bundle - 5 Pack', price: 449, originalPrice: 599,
    image: img(10), images: [img(10), img(13), img(15)],
    category: 'stationery', description: 'Collection of 5 premium notebooks with different cover designs. 200 pages each.',
    rating: 4.8, reviews: 201, badge: 'Best Value', discount: 25,
  },
  {
    id: 38, name: 'Kids Puzzle Set - 4 in 1', price: 499, originalPrice: 699,
    image: img(19), images: [img(19), img(22), img(25)],
    category: 'toys', description: 'Educational puzzle set with 4 different difficulty levels. Develops problem-solving skills.',
    rating: 4.7, reviews: 145, discount: 29,
  },
  {
    id: 39, name: 'Decorative Tape Dispenser Set', price: 249, originalPrice: 349,
    image: img(28), images: [img(28), img(31), img(33)],
    category: 'stationery', description: 'Cute tape dispensers in fun animal shapes. Set of 3 with decorative tapes.',
    rating: 4.5, reviews: 78, discount: 29,
  },
  {
    id: 40, name: 'Paint Brush Set - 15 Pieces', price: 299, originalPrice: 399,
    image: img(35), images: [img(35), img(38), img(40)],
    category: 'art-craft', description: 'Professional paint brush set with various sizes. Synthetic bristles, wooden handles.',
    rating: 4.7, reviews: 112, discount: 25,
  },
  {
    id: 41, name: 'Kids Apron - Art Smock', price: 199, originalPrice: 279,
    image: img(42), images: [img(42), img(44), img(47)],
    category: 'accessories', description: 'Waterproof art smock for kids. Long sleeves, easy to clean. Fun prints.',
    rating: 4.4, reviews: 56, discount: 29,
  },
  {
    id: 42, name: 'Stamp Set - 50 Designs', price: 349, originalPrice: 499,
    image: img(49), images: [img(49), img(52), img(54)],
    category: 'stationery', description: 'Wooden stamp set with 50 different designs. Includes ink pad in 4 colors.',
    rating: 4.6, reviews: 89, discount: 30,
  },
  {
    id: 43, name: 'Kids Telescope - Beginner', price: 999, originalPrice: 1399,
    image: img(56), images: [img(56), img(59), img(61)],
    category: 'toys', description: 'Beginner telescope for kids with tripod. Learn about stars and planets.',
    rating: 4.8, reviews: 67, badge: 'Premium', discount: 29,
  },
  {
    id: 44, name: 'Fancy Paper Clips Set - 100 Pack', price: 99, originalPrice: 149,
    image: img(63), images: [img(63), img(66), img(68)],
    category: 'stationery', description: 'Decorative paper clips in fun shapes - hearts, stars, animals. 100 pieces.',
    rating: 4.3, reviews: 45, discount: 34,
  },
  {
    id: 45, name: 'Kids Globe - Interactive', price: 799, originalPrice: 1099,
    image: img(71), images: [img(71), img(73), img(76)],
    category: 'toys', description: 'Interactive globe with LED lights. Learn countries, capitals, and fun facts.',
    rating: 4.9, reviews: 134, badge: 'Educational', discount: 27,
  },
  {
    id: 46, name: 'Sketch Pad - A3 Size, 50 Sheets', price: 249, originalPrice: 349,
    image: img(78), images: [img(78), img(80), img(82)],
    category: 'art-craft', description: 'Premium A3 sketch pad with thick paper. Perfect for pencils, markers, and charcoal.',
    rating: 4.6, reviews: 78, discount: 29,
  },
  {
    id: 47, name: 'Kids Desk Organizer Set', price: 399, originalPrice: 549,
    image: img(85), images: [img(85), img(3), img(6)],
    category: 'accessories', description: 'Complete desk organizer set with pen holder, book stand, and drawer. Cute design.',
    rating: 4.7, reviews: 56, discount: 27,
  },
  {
    id: 48, name: 'Colored Pencil Set - 48 Colors', price: 349, originalPrice: 499,
    image: img(7), images: [img(7), img(9), img(11)],
    category: 'art-craft', description: 'Professional colored pencil set with 48 vibrant colors. Soft core, easy to blend.',
    rating: 4.8, reviews: 234, badge: 'Best Seller', discount: 30,
  },
  {
    id: 49, name: 'Kids Watch - Digital LED', price: 499, originalPrice: 699,
    image: img(12), images: [img(12), img(14), img(16)],
    category: 'accessories', description: 'Fun digital LED watch for kids. Multiple colors, water-resistant, easy to read.',
    rating: 4.5, reviews: 123, discount: 29,
  },
  {
    id: 50, name: 'Magnetic Letters & Numbers Set', price: 299, originalPrice: 399,
    image: img(17), images: [img(17), img(20), img(23)],
    category: 'toys', description: 'Educational magnetic letters and numbers for fridge. 78 pieces, colorful.',
    rating: 4.7, reviews: 167, discount: 25,
  },
];

export const categories = [
  { id: 'new-arrivals', name: 'New Arrivals', image: img(2) },
  { id: 'stationery', name: 'Stationery', image: img(5) },
  { id: 'art-craft', name: 'Art & Craft', image: img(13) },
  { id: 'accessories', name: 'Accessories', image: img(23) },
  { id: 'toys', name: 'Toys', image: img(47) },
  { id: 'combos', name: 'Combos', image: img(28) },
];

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'new-arrivals') {
    return products.filter(p => p.badge === 'New');
  }
  return products.filter(p => p.category === category);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.badge === 'Best Seller' || p.rating >= 4.8).slice(0, 8);
}
