import { NextRequest, NextResponse } from 'next/server';
import { getFallbackTicker } from '@/lib/offlineFallback';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawSymbol = searchParams.get('symbol') || 'BTC/INR';
  const cleanSymbol = rawSymbol.replace(/\/.*$/, '').toUpperCase();
  const ticker = getFallbackTicker(cleanSymbol);

  return NextResponse.json({
    success: true,
    data: {
      symbol: `${cleanSymbol.toLowerCase()}inr`,
      last_price: ticker.asset.currentPrice,
      high: ticker.asset.high24h,
      low: ticker.asset.low24h,
      volume: ticker.asset.volume24h,
    },
  });
}
