'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!formData.name.trim()) { setError('Name is required'); setLoading(false); return; }
        if (!formData.email.trim()) { setError('Email is required'); setLoading(false); return; }
        if (!formData.phone.trim()) { setError('Phone is required'); setLoading(false); return; }
        if (formData.password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }

        const result = await signUp(formData.name, formData.email, formData.phone, formData.password);
        if (!result.success) { setError(result.error || 'Sign up failed'); }
        else { router.push('/'); }
      } else {
        if (!formData.email.trim()) { setError('Email is required'); setLoading(false); return; }
        if (!formData.password.trim()) { setError('Password is required'); setLoading(false); return; }

        const result = await signIn(formData.email, formData.password);
        if (!result.success) { setError(result.error || 'Sign in failed'); }
        else { router.push('/'); }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full pl-11 pr-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
      error ? 'border-red-300 bg-red-50/50' : 'border-dark-200'
    }`;

  return (
    <div className="min-h-[calc(100vh-80px)] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="KidKraze" className="h-10 w-auto brightness-0 invert" />
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            {isSignUp ? 'Join the KidKraze Family' : 'Welcome Back!'}
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-md">
            {isSignUp
              ? 'Create an account to track orders, save favorites, and get exclusive deals on stationery, art supplies, and more.'
              : 'Sign in to access your orders, wishlist, and a seamless shopping experience.'}
          </p>

          <div className="space-y-6">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹499' },
              { icon: '↩️', title: 'Easy Returns', desc: '7-day return policy' },
              { icon: '💬', title: 'WhatsApp Support', desc: 'Chat with us anytime' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-white/50 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <img src="/logo.png" alt="KidKraze" className="h-10 w-auto" />
          </div>

          <div className="flex gap-1 p-1 bg-dark-100 rounded-xl mb-8">
            <button
              onClick={() => { setIsSignUp(false); setError(''); }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isSignUp ? 'bg-white text-dark-900 shadow-sm' : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(''); }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isSignUp ? 'bg-white text-dark-900 shadow-sm' : 'text-dark-500 hover:text-dark-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-bold text-dark-900 mb-2">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h1>
          <p className="text-dark-500 mb-8">
            {isSignUp ? 'Fill in your details to get started' : 'Enter your credentials to continue'}
          </p>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass('name')}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass('password')} pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-dark-500 mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          <p className="text-center text-dark-400 text-xs mt-8">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-dark-600">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="underline hover:text-dark-600">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
