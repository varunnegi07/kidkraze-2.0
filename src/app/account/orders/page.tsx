'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, Mail, Phone } from 'lucide-react';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/h402yhgh1iblo';

interface SheetOrder {
  'Order ID': string;
  Date: string;
  Customer: string;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  City: string;
  State: string;
  Pincode: string;
  Items: string;
  Total: string | number;
  'Payment Method': string;
  'Payment Status': string;
  'Razorpay Payment ID': string;
  'Order Status': string;
}

const statusIcons: Record<string, typeof Package> = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<SheetOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<SheetOrder | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(SHEETDB_URL, { cache: 'no-store' });
      const data: SheetOrder[] = await res.json();
      const userOrders = (data || []).filter(
        o => o.Email?.toLowerCase() === user?.email?.toLowerCase()
      );
      setOrders(userOrders.reverse());
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-10 bg-dark-100 rounded w-48 mx-auto mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-dark-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">My Orders</h1>
        <p className="text-dark-500">Track and manage your orders</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-5 bg-dark-100 rounded w-32" />
                <div className="h-5 bg-dark-100 rounded w-20" />
              </div>
              <div className="h-4 bg-dark-100 rounded w-48" />
            </div>
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => {
            const StatusIcon = statusIcons[order['Order Status']] || Package;
            return (
              <div
                key={order['Order ID']}
                className="card p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${statusColors[order['Order Status']] || 'bg-dark-100'}`}>
                      <StatusIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-mono font-semibold text-dark-900">{order['Order ID']}</p>
                      <p className="text-dark-500 text-sm">
                        {order.Date ? new Date(order.Date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }) : '-'}
                      </p>
                      <p className="text-dark-600 text-sm mt-1">{order.Items}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <span className="text-xl font-bold text-dark-900">₹{order.Total}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order['Order Status']] || 'bg-dark-100 text-dark-600'}`}>
                      {order['Order Status']}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <Package className="w-16 h-16 text-dark-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-900 mb-2">No orders yet</h3>
          <p className="text-dark-500 mb-6">Start shopping to see your orders here</p>
          <button
            onClick={() => router.push('/products')}
            className="btn-primary inline-flex items-center gap-2"
          >
            Browse Products
          </button>
        </div>
      )}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-dark-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Order Details</h2>
                <p className="font-mono text-sm text-dark-500">{selectedOrder['Order ID']}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-dark-100 rounded-full"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusColors[selectedOrder['Order Status']] || 'bg-dark-100'}`}>
                  {selectedOrder['Order Status']}
                </span>
                <span className="text-2xl font-bold">₹{selectedOrder.Total}</span>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <p className="text-dark-600 bg-dark-50 p-4 rounded-xl">{selectedOrder.Items}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Shipping Address</h3>
                <div className="bg-dark-50 p-4 rounded-xl space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{selectedOrder.Customer || selectedOrder.Name}</p>
                      <p className="text-dark-600 text-sm">{selectedOrder.Address}</p>
                      <p className="text-dark-600 text-sm">{selectedOrder.City}, {selectedOrder.State} - {selectedOrder.Pincode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-dark-600 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{selectedOrder.Phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-600 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{selectedOrder.Email}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-dark-500 text-sm">Payment Method</p>
                  <p className="font-semibold capitalize">{selectedOrder['Payment Method']}</p>
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Payment Status</p>
                  <p className="font-semibold capitalize">{selectedOrder['Payment Status']}</p>
                </div>
              </div>

              {selectedOrder['Razorpay Payment ID'] && (
                <div>
                  <p className="text-dark-500 text-sm">Payment ID</p>
                  <p className="font-mono text-sm">{selectedOrder['Razorpay Payment ID']}</p>
                </div>
              )}

              <div>
                <p className="text-dark-500 text-sm">Order Date</p>
                <p className="font-semibold">
                  {selectedOrder.Date ? new Date(selectedOrder.Date).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
