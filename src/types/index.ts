export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  category: string;
  subCategory?: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  discount: number;
  videoReviews?: VideoReview[];
  gender?: 'boys' | 'girls' | 'unisex';
  inStock?: boolean;
}

export interface VideoReview {
  id: string;
  thumbnail: string;
  videoUrl: string;
  reviewer: string;
  rating: number;
  title: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'razorpay' | 'cod';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
