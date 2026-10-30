import { Router, Request, Response } from 'express';
import { MarketService } from '../services/marketService.js';
import { IndicatorService } from '../services/indicatorService.js';

const router = Router();

// Get catalog of all assets
router.get('/catalog', (_req: Request, res: Response) => {
  try {
    const catalog = MarketService.getCatalog();
    res.json({
      success: true,
      data: catalog.map((asset) => ({
        symbol: asset.symbol,
        name: asset.name,
        category: asset.category,
        currentPrice: asset.currentPrice,
        change24h: asset.change24h,
        high24h: asset.high24h,
        low24h: asset.low24h,
        volume24h: asset.volume24h,
        marketCap: asset.marketCap,
      })),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single ticker details with indicators & candle history
router.get('/ticker/:symbol', (req: Request, res: Response) => {
  try {
    const rawSymbol = req.params.symbol;
    const symbol = (Array.isArray(rawSymbol) ? rawSymbol[0] : rawSymbol).toUpperCase();
    const asset = MarketService.getAsset(symbol);
    const indicators = IndicatorService.computeLatestIndicators(asset.history);

    res.json({
      success: true,
      asset,
      indicators,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fast real-time tick endpoint with immediate buy/sell indicator calculation
router.get('/realtime', (req: Request, res: Response) => {
  try {
    const symbol = (req.query.symbol as string || 'BTC').toUpperCase();
    const asset = MarketService.getAsset(symbol);
    const indicators = IndicatorService.computeLatestIndicators(asset.history);

    // Fast heuristic recommendation for sub-second tick feeds
    const rsi = indicators.rsi14;
    const macdHist = indicators.macdHist;
    const price = asset.currentPrice;

    let quickAction = 'HOLD';
    let quickScore = 50;

    if (price > indicators.sma50 && rsi > 45 && rsi < 70 && macdHist > 0) {
      quickAction = 'BUY';
      quickScore = 72;
    } else if (price > indicators.sma50 && indicators.goldenCross) {
      quickAction = 'STRONG BUY';
      quickScore = 85;
    } else if (price < indicators.sma50 && (rsi < 40 || macdHist < 0)) {
      quickAction = 'SELL';
      quickScore = 35;
    } else if (price < indicators.sma200 && rsi < 30) {
      quickAction = 'OVERSOLD WATCH (BUY)';
      quickScore = 65;
    }

    res.json({
      success: true,
      symbol,
      currentPrice: asset.currentPrice,
      change24h: asset.change24h,
      high24h: asset.high24h,
      low24h: asset.low24h,
      volume24h: asset.volume24h,
      indicators,
      realtimeRecommendation: {
        action: quickAction,
        score: quickScore,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
