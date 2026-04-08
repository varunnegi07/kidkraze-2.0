import { NextRequest, NextResponse } from 'next/server';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/h402yhgh1iblo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, userId } = body;

    await fetch(SHEETDB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          'Type': 'New Signup',
          'User ID': userId,
          'Name': name,
          'Email': email,
          'Phone': phone,
          'Signed Up At': new Date().toISOString(),
        }],
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup sheet error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save signup data' }, { status: 500 });
  }
}
