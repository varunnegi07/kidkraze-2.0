import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const SHEETDB_URL = 'https://sheetdb.io/api/v1/h402yhgh1iblo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, items, customer, total } = body;

    const generatedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const order = {
      id: `KK${Date.now()}`,
      items,
      total,
      customer,
      paymentMethod: 'razorpay',
      paymentStatus: 'completed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    await fetch(SHEETDB_URL, {
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
          'Razorpay Payment ID': order.razorpayPaymentId,
          'Order Status': order.status,
        }],
      }),
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
