import { NextRequest, NextResponse } from 'next/server';
import { getFallbackTicker } from '@/lib/offlineFallback';

export const revalidate = 5;

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = (params.symbol || 'BTC').toUpperCase();
  const cmcKey = process.env.COINMARKETCAP_API_KEY || process.env.CMC_API_KEY;

  // 1. Try CoinMarketCap Pro API first if API key is configured
  if (cmcKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);

      const cmcRes = await fetch(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
        {
          signal: controller.signal,
          headers: {
            'X-CMC_PRO_API_KEY': cmcKey,
            'Accept': 'application/json',
          },
          next: { revalidate: 5 },
        }
      );
      clearTimeout(timeout);

      if (cmcRes.ok) {
        const json = await cmcRes.json();
        const coin = json?.data?.[symbol];
        const quote = coin?.quote?.USD;

        if (quote && typeof quote.price === 'number' && quote.price > 0) {
          const base = getFallbackTicker(symbol);
          base.asset.currentPrice = quote.price;
          base.asset.change24h = Number((quote.percent_change_24h || 0).toFixed(2));
          base.asset.volume24h = quote.volume_24h || base.asset.volume24h;
          base.asset.marketCap = quote.market_cap || base.asset.marketCap;

          return NextResponse.json({
            ...base,
            source: 'coinmarketcap-pro',
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch {
      // Fall through to Binance fallback
    }
  }

  // 2. Fallback to Binance public ticker if CMC fails or is rate-limited
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
      return NextResponse.json({
        ...base,
        source: 'binance-realtime',
        timestamp: new Date().toISOString(),
      });
    }
  } catch {
    // fallback gracefully
  }

  // 3. Graceful offline fallback
  return NextResponse.json(getFallbackTicker(symbol));
}
