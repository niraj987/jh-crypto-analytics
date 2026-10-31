import { NextRequest, NextResponse } from 'next/server';
import { getFallbackTicker } from '@/lib/offlineFallback';

export const revalidate = 5;

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = (params.symbol || 'BTC').toUpperCase();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 5 }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const match = await res.json();
      const livePrice = parseFloat(match.lastPrice);
      const changePercent = parseFloat(match.priceChangePercent);
      const high24h = parseFloat(match.highPrice);
      const low24h = parseFloat(match.lowPrice);
      const volumeUsd = parseFloat(match.quoteVolume);

      const base = getFallbackTicker(symbol);
      if (!isNaN(livePrice) && livePrice > 0) {
        base.asset.currentPrice = livePrice;
        base.asset.change24h = Number(changePercent.toFixed(2));
        base.asset.high24h = isNaN(high24h) ? base.asset.high24h : high24h;
        base.asset.low24h = isNaN(low24h) ? base.asset.low24h : low24h;
        base.asset.volume24h = isNaN(volumeUsd) ? base.asset.volume24h : volumeUsd;
      }
      return NextResponse.json(base);
    }
  } catch (err) {
    // fallback gracefully
  }

  return NextResponse.json(getFallbackTicker(symbol));
}

