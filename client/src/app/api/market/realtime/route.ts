import { NextRequest, NextResponse } from 'next/server';
import { getFallbackRealtimeTick } from '@/lib/offlineFallback';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = (searchParams.get('symbol') || 'BTC').toUpperCase();
  const cmcKey = process.env.COINMARKETCAP_API_KEY || process.env.CMC_API_KEY;

  // 1. Try CoinMarketCap Pro API first
  if (cmcKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2500);

      const cmcRes = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
        {
          signal: controller.signal,
          headers: {
            'X-CMC_PRO_API_KEY': cmcKey,
            'Accept': 'application/json',
          },
          cache: 'no-store',
        }
      );
      clearTimeout(timeout);

      if (cmcRes.ok) {
        const json = await cmcRes.json();
        const quote = json?.data?.[symbol]?.quote?.USD;
        if (quote && typeof quote.price === 'number' && quote.price > 0) {
          const base = getFallbackRealtimeTick(symbol);
          base.currentPrice = quote.price;
          return NextResponse.json({
            ...base,
            source: 'coinmarketcap-pro',
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch {
      // Fallback
    }
  }

  // 2. Fallback to Binance
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
        return NextResponse.json({
          ...base,
          source: 'binance-realtime',
          timestamp: new Date().toISOString(),
        });
      }
    }
  } catch {
    // fallback gracefully
  }

  return NextResponse.json(getFallbackRealtimeTick(symbol));
}
