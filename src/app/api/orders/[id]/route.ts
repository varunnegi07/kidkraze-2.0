import { NextRequest, NextResponse } from 'next/server';

const SHEETDB_URL = 'https://sheetdb.io/api/v1/h402yhgh1iblo';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status } = body;

    await fetch(`${SHEETDB_URL}/search?Order%20ID=${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { 'Order Status': status },
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
