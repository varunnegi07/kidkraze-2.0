'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Wallet, Truck, CheckCircle, Lock, Shield } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
    }
  }, [user, isLoading, router]);

  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 499 ? 0 : 49;
  const finalTotal = totalPrice + shipping;

  if (isLoading) return null;
  if (!user) return null;
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      if (paymentMethod === 'razorpay') {
        const res = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: finalTotal,
            items: items.map(item => ({
              productId: item.product.id,
              productName: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            customer: formData,
          }),
        });

        const data = await res.json();

        if (data.orderId) {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: finalTotal * 100,
            currency: 'INR',
            name: 'KidKraze Mall',
            description: 'Order Payment',
            order_id: data.orderId,
            handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...response,
                  items: items.map(item => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                  })),
                  customer: formData,
                  total: finalTotal,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                clearCart();
                router.push(`/checkout/success?orderId=${verifyData.order.id}`);
              }
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: '#dc2626',
            },
          };

          const razorpay = new (window as any).Razorpay(options);
          razorpay.open();
        }
      } else {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(item => ({
              productId: item.product.id,
              productName: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
            })),
            customer: formData,
            total: finalTotal,
            paymentMethod: 'cod',
          }),
        });

        const data = await res.json();
        if (data.success) {
          clearCart();
          router.push(`/checkout/success?orderId=${data.order.id}`);
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
      errors[field] ? 'border-red-500 bg-red-50' : 'border-dark-200'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-dark-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-dark-900 mb-6">Shipping Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark-700 mb-1">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass('name')} placeholder="Enter your full name" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass('phone')} placeholder="10-digit mobile number" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-dark-700 mb-1">Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass('address')} placeholder="House no, Street, Landmark" />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass('city')} placeholder="City" />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className={inputClass('state')} placeholder="State" />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={inputClass('pincode')} placeholder="6-digit pincode" />
                  {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold text-dark-900 mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === 'razorpay' ? 'border-primary-600 bg-primary-50' : 'border-dark-200 hover:border-dark-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <CreditCard className="w-5 h-5 text-dark-600" />
                  <div>
                    <p className="font-semibold text-dark-900">Online Payment (Razorpay)</p>
                    <p className="text-dark-500 text-sm">UPI, Credit/Debit Card, Net Banking, Wallets</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-dark-200 hover:border-dark-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-primary-600"
                  />
                  <Truck className="w-5 h-5 text-dark-600" />
                  <div>
                    <p className="font-semibold text-dark-900">Cash on Delivery</p>
                    <p className="text-dark-500 text-sm">Pay when you receive</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-dark-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-dark-900 line-clamp-2">{item.product.name}</p>
                      <p className="text-dark-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-dark-200 pt-4">
                <div className="flex justify-between text-dark-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-dark-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-dark-200 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ₹{finalTotal}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-dark-400 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure checkout powered by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
