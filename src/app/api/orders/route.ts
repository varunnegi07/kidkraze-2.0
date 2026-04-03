import { NextRequest, NextResponse } from 'next/server';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/h402yhgh1iblo';

async function saveOrderToSheetDB(order: any) {
  try {
    const res = await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          'Order ID': order.id,
          'Date': order.createdAt,
          'Customer': order.customer.name,
          'Name': order.customer.name,
          'Email': order.customer.email,
          'Phone': order.customer.phone,
          'Address': order.customer.address,
          'City': order.customer.city,
          'State': order.customer.state,
          'Pincode': order.customer.pincode,
          'Items': order.items.map((i: any) => `${i.productName} x${i.quantity}`).join(', '),
          'Total': order.total,
          'Payment Method': order.paymentMethod,
          'Payment Status': order.paymentStatus,
          'Razorpay Payment ID': order.razorpayPaymentId || '',
          'Order Status': order.status,
        }],
      }),
    });

    if (!res.ok) {
      console.error('SheetDB save failed:', await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Failed to save to SheetDB:', error);
    return false;
  }
}

async function fetchOrdersFromSheetDB() {
  try {
    const res = await fetch(SHEETDB_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Failed to fetch from SheetDB:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, total, paymentMethod, razorpayOrderId, razorpayPaymentId } = body;

    const order = {
      id: `KK${Date.now()}`,
      items,
      total,
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      razorpayOrderId,
      razorpayPaymentId,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    await saveOrderToSheetDB(order);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  const orders = await fetchOrdersFromSheetDB();
  return NextResponse.json({ orders });
}
