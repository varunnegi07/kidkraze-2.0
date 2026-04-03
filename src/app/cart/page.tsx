'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 499 ? 0 : 49;
  const finalTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="w-24 h-24 text-dark-200 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-dark-900 mb-4">Your cart is empty</h1>
          <p className="text-dark-500 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-2">
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark-900">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="card p-4 flex gap-4">
              <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="font-semibold text-dark-900 hover:text-primary-600 transition-colors line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-dark-400 text-sm mt-1">{item.product.category}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-dark-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-dark-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-dark-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">₹{item.product.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-dark-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-dark-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-dark-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-sm text-primary-600">
                  Add ₹{499 - totalPrice} more for free shipping
                </p>
              )}
              <div className="border-t border-dark-200 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-6 space-y-3 text-sm text-dark-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Multiple payment options</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
