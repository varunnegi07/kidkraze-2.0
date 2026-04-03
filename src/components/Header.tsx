'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';

export default function Header() {
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'New Arrivals', href: '/products?category=new-arrivals' },
    { label: 'Stationery', href: '/products?category=stationery' },
    { label: 'Art & Craft', href: '/products?category=art-craft' },
    { label: 'Accessories', href: '/products?category=accessories' },
    { label: 'Combos', href: '/products?category=combos' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-black gradient-text">KidKraze</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-dark-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-dark-600" />
            </button>

            <Link href="/cart" className="relative p-2 hover:bg-dark-100 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5 text-dark-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="lg:hidden p-2 hover:bg-dark-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-dark-100 bg-white animate-slide-down">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
