import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const orderId = `ord_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    return NextResponse.json({
      success: true,
      order_id: orderId,
      message: `Simulated order ${body.side?.toUpperCase() || 'BUY'} ${body.quantity || 1} ${body.symbol || 'BTC'} recorded via local gateway.`,
      data: {
        status: 'PENDING_CONFIRMATION',
        executedQty: body.quantity || 1,
        symbol: body.symbol,
        side: body.side,
        type: body.type,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process order' },
      { status: 500 }
    );
  }
}

