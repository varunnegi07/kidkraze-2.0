'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, Menu, X, Search, User, LogOut, Package, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';

export default function Header() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const totalItems = getTotalItems();

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (productId: number) => {
    setSearchOpen(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="KidKraze" className="h-48 md:h-56 w-auto" />
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
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-dark-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-dark-600" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-dark-100 p-3 z-50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-dark-50 border border-dark-100 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500"
                      autoFocus
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-3 border-t border-dark-100 pt-3">
                      {searchResults.map(product => (
                        <button
                          key={product.id}
                          onClick={() => handleSearch(product.id)}
                          className="flex items-center gap-3 w-full p-2 hover:bg-dark-50 rounded-lg transition-colors text-left"
                        >
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark-900 truncate">{product.name}</p>
                            <p className="text-xs text-dark-500">₹{product.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link href="/cart" className="relative p-2 hover:bg-dark-100 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5 text-dark-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-dark-100 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-600" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-dark-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-dark-100 overflow-hidden animate-scale-in z-50">
                    <div className="p-4 border-b border-dark-100">
                      <p className="font-semibold text-dark-900">{user.name}</p>
                      <p className="text-dark-500 text-sm">{user.email}</p>
                      <p className="text-dark-500 text-sm">{user.phone}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/account/orders"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-dark-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 text-dark-500" />
                        <span className="text-dark-700 font-medium">My Orders</span>
                      </Link>
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span className="text-red-600 font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-dark-900 text-white rounded-full hover:bg-dark-800 transition-colors text-sm font-medium"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

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
            {!user && (
              <Link
                href="/auth"
                className="px-4 py-3 bg-dark-900 text-white rounded-xl font-medium text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            )}
            {user && (
              <>
                <Link
                  href="/account/orders"
                  className="px-4 py-3 text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium text-left"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
