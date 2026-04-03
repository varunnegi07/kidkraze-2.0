'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  return (
    <div className="card group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-dark-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-dark-400 text-xs uppercase tracking-wider mb-1">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-dark-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-dark-400 text-sm">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-dark-900">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-dark-400 line-through text-sm">₹{product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-200 ${
            inCart
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'btn-primary'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
