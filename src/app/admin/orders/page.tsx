'use client';

import { useState, useEffect } from 'react';
import { Download, Search, Filter, Package, XCircle } from 'lucide-react';

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

const SHEETDB_URL = 'https://sheetdb.io/api/v1/h402yhgh1iblo';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const paymentStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<SheetOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<SheetOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(SHEETDB_URL, { cache: 'no-store' });
      const data = await res.json();
      setOrders((data || []).reverse());
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    try {
      await fetch(`${SHEETDB_URL}/Order ID/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { 'Order Status': status } }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setUpdating(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const total = String(order.Total || '');
    const matchesSearch =
      String(order['Order ID'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.Customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.Email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(order.Phone || '').includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order['Order Status'] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter(o => o['Payment Status'] === 'completed')
    .reduce((sum, o) => sum + Number(o.Total || 0), 0);

  const exportToCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Phone', 'Address', 'City', 'State', 'Pincode', 'Items', 'Total', 'Payment Method', 'Payment Status', 'Razorpay Payment ID', 'Order Status'];
    const rows = orders.map(order => [
      order['Order ID'],
      order.Date,
      order.Customer,
      order.Email,
      order.Phone,
      order.Address,
      order.City,
      order.State,
      order.Pincode,
      order.Items,
      order.Total,
      order['Payment Method'],
      order['Payment Status'],
      order['Razorpay Payment ID'],
      order['Order Status'],
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kidkraze-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-dark-100 rounded w-48" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-dark-100 rounded-xl" />
            ))}
          </div>
          <div className="h-96 bg-dark-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Orders</h1>
        <button
          onClick={exportToCSV}
          className="btn-secondary flex items-center gap-2 mt-4 md:mt-0"
        >
          <Download className="w-4 h-4" />
          Export to CSV
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-dark-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-dark-900">{orders.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-dark-500 text-sm">Revenue</p>
          <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card p-4">
          <p className="text-dark-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{orders.filter(o => o['Order Status'] === 'pending').length}</p>
        </div>
        <div className="card p-4">
          <p className="text-dark-500 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-green-600">{orders.filter(o => o['Order Status'] === 'delivered').length}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search by order ID, name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-dark-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-dark-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Items</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Total</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Payment</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-dark-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order['Order ID']} className="hover:bg-dark-50 transition-colors">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="font-mono text-primary-600 hover:text-primary-700 font-medium"
                      >
                        {order['Order ID']}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-dark-900">{order.Customer || order.Name}</p>
                      <p className="text-dark-500 text-sm">{order.Phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-dark-600 text-sm max-w-xs truncate">{order.Items}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{order.Total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${paymentStatusColors[order['Payment Status']] || 'bg-dark-100 text-dark-600'}`}>
                        {order['Payment Status']}
                      </span>
                      <p className="text-dark-500 text-xs mt-1 capitalize">{order['Payment Method']}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order['Order Status']}
                        onChange={(e) => updateOrderStatus(order['Order ID'], e.target.value)}
                        disabled={updating === order['Order ID']}
                        className={`px-2 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[order['Order Status']] || 'bg-dark-100 text-dark-600'}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-dark-500 text-sm">
                      {order.Date ? new Date(order.Date).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-dark-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-dark-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-dark-100 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-dark-500 text-sm">Order ID</p>
                  <p className="font-mono font-semibold">{selectedOrder['Order ID']}</p>
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Date</p>
                  <p className="font-semibold">{selectedOrder.Date ? new Date(selectedOrder.Date).toLocaleString() : '-'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Customer Details</h3>
                <div className="bg-dark-50 p-4 rounded-xl space-y-1">
                  <p className="font-medium">{selectedOrder.Customer || selectedOrder.Name}</p>
                  <p className="text-dark-600">{selectedOrder.Email}</p>
                  <p className="text-dark-600">{selectedOrder.Phone}</p>
                  <p className="text-dark-600">{selectedOrder.Address}</p>
                  <p className="text-dark-600">{selectedOrder.City}, {selectedOrder.State} - {selectedOrder.Pincode}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <p className="text-dark-600 bg-dark-50 p-4 rounded-xl">{selectedOrder.Items}</p>
                <div className="flex justify-between pt-4 font-bold text-lg">
                  <span>Total</span>
                  <span>₹{selectedOrder.Total}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-dark-500 text-sm">Payment Method</p>
                  <p className="font-semibold capitalize">{selectedOrder['Payment Method']}</p>
                </div>
                <div>
                  <p className="text-dark-500 text-sm">Payment Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${paymentStatusColors[selectedOrder['Payment Status']] || 'bg-dark-100'}`}>
                    {selectedOrder['Payment Status']}
                  </span>
                </div>
              </div>

              {selectedOrder['Razorpay Payment ID'] && (
                <div>
                  <p className="text-dark-500 text-sm">Razorpay Payment ID</p>
                  <p className="font-mono text-sm">{selectedOrder['Razorpay Payment ID']}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
