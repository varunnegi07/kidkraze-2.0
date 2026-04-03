'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="card p-8 md:p-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-dark-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-dark-500 text-lg mb-2">Thank you for shopping with KidKraze</p>
        {orderId && (
          <p className="text-dark-600 font-mono bg-dark-50 px-4 py-2 rounded-lg inline-block mb-6">
            Order ID: {orderId}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 p-4 bg-primary-50 rounded-xl mb-8">
          <Package className="w-5 h-5 text-primary-600" />
          <span className="text-primary-700 font-medium">We&apos;ll send you order updates on WhatsApp</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://wa.me/917889231302"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
