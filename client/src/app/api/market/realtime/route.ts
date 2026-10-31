import { NextRequest, NextResponse } from 'next/server';
import { getFallbackRealtimeTick, getFallbackTicker } from '@/lib/offlineFallback';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get('symbol') || 'BTC').toUpperCase();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`, {
      signal: controller.signal,
      cache: 'no-store'
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const livePrice = parseFloat(data.price);
      if (!isNaN(livePrice) && livePrice > 0) {
        const base = getFallbackRealtimeTick(symbol);
        base.currentPrice = livePrice;
        return NextResponse.json(base);
      }
    }
  } catch (err) {
    // fallback gracefully
  }

  return NextResponse.json(getFallbackRealtimeTick(symbol));
}

