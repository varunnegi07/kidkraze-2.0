import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, items, customer } = body;

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: 'INR',
        receipt: `kidkraze_${Date.now()}`,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.description }, { status: 400 });
    }

    return NextResponse.json({ orderId: data.id, amount: data.amount, currency: data.currency });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
