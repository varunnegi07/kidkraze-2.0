'use client';

import Link from 'next/link';
import { ArrowRight, Truck, RotateCcw, MessageCircle, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">New Collection Available</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Everything for
              <span className="block gradient-text">Your Little One</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg">
              Stationery, Toys, Gifts & School Books - All in one place with amazing deals!
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary flex items-center gap-2 text-lg">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/products?category=combos" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                View Combos
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl rotate-6 opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600"
                alt="KidKraze Products"
                className="relative rounded-3xl shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹499' },
            { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy' },
            { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Chat with us' },
            { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <feature.icon className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
