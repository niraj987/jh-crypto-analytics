import { CryptoAsset, OHLCV } from '../types/index.js';

interface SeedAsset {
  symbol: string;
  name: string;
  category: 'Major' | 'Meme' | 'DeFi' | 'Layer 1' | 'AI';
  basePrice: number;
  volatility: number;
  dailyVolume: number;
  marketCap: number;
}

const SEED_CATALOG: SeedAsset[] = [
  // --- MAJORS & HIGH-CAP LAYER 1s ---
  { symbol: 'BTC', name: 'Bitcoin', category: 'Major', basePrice: 67850.0, volatility: 0.025, dailyVolume: 34200000000, marketCap: 1335000000000 },
  { symbol: 'ETH', name: 'Ethereum', category: 'Major', basePrice: 3540.0, volatility: 0.035, dailyVolume: 18900000000, marketCap: 426000000000 },
  { symbol: 'SOL', name: 'Solana', category: 'Major', basePrice: 182.5, volatility: 0.055, dailyVolume: 5100000000, marketCap: 84500000000 },
  { symbol: 'BNB', name: 'BNB Chain', category: 'Major', basePrice: 595.0, volatility: 0.028, dailyVolume: 1350000000, marketCap: 88500000000 },
  { symbol: 'XRP', name: 'XRP Ledger', category: 'Major', basePrice: 0.545, volatility: 0.038, dailyVolume: 1420000000, marketCap: 30800000000 },
  { symbol: 'ADA', name: 'Cardano', category: 'Major', basePrice: 0.485, volatility: 0.048, dailyVolume: 430000000, marketCap: 17400000000 },
  { symbol: 'AVAX', name: 'Avalanche', category: 'Major', basePrice: 28.5, volatility: 0.052, dailyVolume: 490000000, marketCap: 11200000000 },
  { symbol: 'SUI', name: 'Sui Network', category: 'Major', basePrice: 2.15, volatility: 0.075, dailyVolume: 820000000, marketCap: 6100000000 },
  { symbol: 'NEAR', name: 'Near Protocol', category: 'Major', basePrice: 5.12, volatility: 0.062, dailyVolume: 390000000, marketCap: 6200000000 },
  { symbol: 'APT', name: 'Aptos', category: 'Major', basePrice: 9.85, volatility: 0.068, dailyVolume: 280000000, marketCap: 4900000000 },
  { symbol: 'DOT', name: 'Polkadot', category: 'Major', basePrice: 7.25, volatility: 0.042, dailyVolume: 310000000, marketCap: 10400000000 },
  { symbol: 'TRX', name: 'TRON', category: 'Major', basePrice: 0.168, volatility: 0.022, dailyVolume: 410000000, marketCap: 14600000000 },
  { symbol: 'ATOM', name: 'Cosmos Hub', category: 'Major', basePrice: 5.92, volatility: 0.049, dailyVolume: 160000000, marketCap: 2320000000 },
  { symbol: 'ICP', name: 'Internet Computer', category: 'Major', basePrice: 8.85, volatility: 0.058, dailyVolume: 140000000, marketCap: 4150000000 },
  { symbol: 'FTM', name: 'Fantom / Sonic', category: 'Major', basePrice: 0.74, volatility: 0.072, dailyVolume: 220000000, marketCap: 2080000000 },
  { symbol: 'ALGO', name: 'Algorand', category: 'Major', basePrice: 0.145, volatility: 0.045, dailyVolume: 95000000, marketCap: 1190000000 },

  // --- MEME COINS & SPECULATIVE LEADERS ---
  { symbol: 'DOGE', name: 'Dogecoin', category: 'Meme', basePrice: 0.168, volatility: 0.082, dailyVolume: 1950000000, marketCap: 24500000000 },
  { symbol: 'SHIB', name: 'Shiba Inu', category: 'Meme', basePrice: 0.0000248, volatility: 0.092, dailyVolume: 940000000, marketCap: 14600000000 },
  { symbol: 'PEPE', name: 'Pepe Coin', category: 'Meme', basePrice: 0.0000109, volatility: 0.125, dailyVolume: 1180000000, marketCap: 4580000000 },
  { symbol: 'WIF', name: 'Dogwifhat', category: 'Meme', basePrice: 2.88, volatility: 0.142, dailyVolume: 680000000, marketCap: 2880000000 },
  { symbol: 'BONK', name: 'Bonk Coin', category: 'Meme', basePrice: 0.0000285, volatility: 0.132, dailyVolume: 490000000, marketCap: 1950000000 },
  { symbol: 'FLOKI', name: 'Floki Inu', category: 'Meme', basePrice: 0.000188, volatility: 0.118, dailyVolume: 340000000, marketCap: 1820000000 },
  { symbol: 'BRETT', name: 'Brett (Base)', category: 'Meme', basePrice: 0.105, volatility: 0.135, dailyVolume: 120000000, marketCap: 1040000000 },
  { symbol: 'POPCAT', name: 'Popcat (SOL)', category: 'Meme', basePrice: 1.48, volatility: 0.145, dailyVolume: 195000000, marketCap: 1450000000 },
  { symbol: 'BOME', name: 'BOOK OF MEME', category: 'Meme', basePrice: 0.0092, volatility: 0.155, dailyVolume: 240000000, marketCap: 635000000 },
  { symbol: 'MEW', name: 'cat in a dogs world', category: 'Meme', basePrice: 0.0098, volatility: 0.148, dailyVolume: 210000000, marketCap: 870000000 },
  { symbol: 'TURBO', name: 'Turbo AI Meme', category: 'Meme', basePrice: 0.0094, volatility: 0.162, dailyVolume: 180000000, marketCap: 645000000 },

  // --- DEFI & INFRASTRUCTURE PROTOCOLS ---
  { symbol: 'LINK', name: 'Chainlink', category: 'DeFi', basePrice: 16.85, volatility: 0.045, dailyVolume: 520000000, marketCap: 9900000000 },
  { symbol: 'UNI', name: 'Uniswap', category: 'DeFi', basePrice: 8.95, volatility: 0.052, dailyVolume: 295000000, marketCap: 5400000000 },
  { symbol: 'AAVE', name: 'Aave Protocol', category: 'DeFi', basePrice: 162.0, volatility: 0.058, dailyVolume: 240000000, marketCap: 2420000000 },
  { symbol: 'MKR', name: 'Maker / Sky', category: 'DeFi', basePrice: 1420.0, volatility: 0.048, dailyVolume: 110000000, marketCap: 1250000000 },
  { symbol: 'INJ', name: 'Injective', category: 'DeFi', basePrice: 22.4, volatility: 0.072, dailyVolume: 180000000, marketCap: 2240000000 },
  { symbol: 'RUNE', name: 'THORChain', category: 'DeFi', basePrice: 5.35, volatility: 0.078, dailyVolume: 175000000, marketCap: 1810000000 },
  { symbol: 'LDO', name: 'Lido DAO', category: 'DeFi', basePrice: 1.25, volatility: 0.062, dailyVolume: 135000000, marketCap: 1120000000 },
  { symbol: 'CRV', name: 'Curve DAO', category: 'DeFi', basePrice: 0.29, volatility: 0.065, dailyVolume: 78000000, marketCap: 360000000 },
  { symbol: 'PENDLE', name: 'Pendle Finance', category: 'DeFi', basePrice: 4.85, volatility: 0.082, dailyVolume: 145000000, marketCap: 780000000 },
  { symbol: 'JUP', name: 'Jupiter DEX', category: 'DeFi', basePrice: 1.05, volatility: 0.075, dailyVolume: 220000000, marketCap: 1420000000 },
  { symbol: 'RAY', name: 'Raydium Protocol', category: 'DeFi', basePrice: 3.45, volatility: 0.095, dailyVolume: 160000000, marketCap: 910000000 },

  // --- AI & DATA PROTOCOLS ---
  { symbol: 'RNDR', name: 'Render Network', category: 'AI', basePrice: 6.55, volatility: 0.075, dailyVolume: 350000000, marketCap: 3420000000 },
  { symbol: 'TAO', name: 'Bittensor', category: 'AI', basePrice: 545.0, volatility: 0.088, dailyVolume: 280000000, marketCap: 4020000000 },
  { symbol: 'FET', name: 'ASI Alliance', category: 'AI', basePrice: 1.48, volatility: 0.082, dailyVolume: 260000000, marketCap: 3820000000 },
  { symbol: 'AKT', name: 'Akash Network', category: 'AI', basePrice: 3.12, volatility: 0.085, dailyVolume: 85000000, marketCap: 760000000 },
  { symbol: 'GRT', name: 'The Graph', category: 'AI', basePrice: 0.178, volatility: 0.065, dailyVolume: 92000000, marketCap: 1710000000 },
  { symbol: 'WLD', name: 'Worldcoin', category: 'AI', basePrice: 2.15, volatility: 0.092, dailyVolume: 310000000, marketCap: 1220000000 },
  { symbol: 'OCEAN', name: 'Ocean Protocol', category: 'AI', basePrice: 0.65, volatility: 0.078, dailyVolume: 45000000, marketCap: 420000000 },

  // --- LAYER 2s & SCALING ---
  { symbol: 'POL', name: 'Polygon Ecosystem', category: 'DeFi', basePrice: 0.38, volatility: 0.052, dailyVolume: 160000000, marketCap: 3020000000 },
  { symbol: 'ARB', name: 'Arbitrum One', category: 'DeFi', basePrice: 0.58, volatility: 0.058, dailyVolume: 190000000, marketCap: 2320000000 },
  { symbol: 'OP', name: 'Optimism', category: 'DeFi', basePrice: 1.62, volatility: 0.064, dailyVolume: 175000000, marketCap: 1980000000 },
  { symbol: 'STRK', name: 'Starknet', category: 'DeFi', basePrice: 0.42, volatility: 0.075, dailyVolume: 88000000, marketCap: 890000000 },
];

export class MarketService {
  private static assetCache: Map<string, CryptoAsset> = new Map();

  /**
   * Generates 220 historical daily candles simulating institutional geometric Brownian motion with mean-reversion
   */
  private static generateHistoricalCandles(basePrice: number, volatility: number, days: number = 220): OHLCV[] {
    const candles: OHLCV[] = [];
    const now = Date.now();
    const dayMs = 86400000;
    let currentClose = basePrice * 0.74; // Start from 220 days ago at baseline

    for (let i = days; i >= 0; i--) {
      const timestamp = now - i * dayMs;
      const date = new Date(timestamp).toISOString().split('T')[0];

      // Trend factor with noise
      const trendFactor = 1 + (0.32 / days); 
      const shock = (Math.random() - 0.485) * volatility * 1.4;
      const change = currentClose * shock;
      
      const open = currentClose;
      let close = Math.max(open + change * trendFactor, basePrice * 0.08);
      if (i === 0) close = basePrice; // Pin last candle close to current price

      const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.6);
      const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.6);
      const volume = Math.round(basePrice * 100000 * (0.8 + Math.random() * 0.6));

      candles.push({
        timestamp,
        date,
        open: Number(open.toFixed(open < 1 ? 6 : 2)),
        high: Number(high.toFixed(high < 1 ? 6 : 2)),
        low: Number(low.toFixed(low < 1 ? 6 : 2)),
        close: Number(close.toFixed(close < 1 ? 6 : 2)),
        volume,
      });

      currentClose = close;
    }

    return candles;
  }

  public static getAsset(symbol: string): CryptoAsset {
    const upper = symbol.toUpperCase().replace('-USD', '').replace('-INR', '');
    
    // Check if in cache
    if (this.assetCache.has(upper)) {
      const cached = this.assetCache.get(upper)!;
      // Introduce micro-fluctuation to simulate live ticks
      const delta = (Math.random() - 0.49) * 0.003;
      cached.currentPrice = Number((cached.currentPrice * (1 + delta)).toFixed(cached.currentPrice < 1 ? 6 : 2));
      const lastCandle = cached.history[cached.history.length - 1];
      lastCandle.close = cached.currentPrice;
      lastCandle.high = Math.max(lastCandle.high, cached.currentPrice);
      lastCandle.low = Math.min(lastCandle.low, cached.currentPrice);
      return cached;
    }

    const seed = SEED_CATALOG.find((s) => s.symbol === upper);
    const basePrice = seed ? seed.basePrice : 100.0;
    const volatility = seed ? seed.volatility : 0.05;
    const name = seed ? seed.name : `${upper} Protocol`;
    const category = seed ? seed.category : 'DeFi';
    const dailyVolume = seed ? seed.dailyVolume : 150000000;
    const marketCap = seed ? seed.marketCap : basePrice * 10000000;

    const history = this.generateHistoricalCandles(basePrice, volatility, 220);
    const lastCandle = history[history.length - 1];
    const prevCandle = history[history.length - 2];
    const change24h = Number((((lastCandle.close - prevCandle.close) / prevCandle.close) * 100).toFixed(2));

    const asset: CryptoAsset = {
      symbol: upper,
      name,
      category,
      currentPrice: lastCandle.close,
      change24h,
      high24h: lastCandle.high,
      low24h: lastCandle.low,
      volume24h: dailyVolume,
      marketCap,
      history,
    };

    this.assetCache.set(upper, asset);
    return asset;
  }

  public static getCatalog(): CryptoAsset[] {
    return SEED_CATALOG.map((item) => this.getAsset(item.symbol));
  }
}
