import { CryptoAsset, TechnicalIndicators, ConsensusVerdict, RAGForecastResult, RAGDocument } from './types';

export const FALLBACK_CATALOG: CryptoAsset[] = [
  // --- MAJORS & HIGH-CAP LAYER 1s ---
  { symbol: 'BTC', name: 'Bitcoin', category: 'Major', currentPrice: 77635.0, change24h: 1.25, high24h: 78500, low24h: 76400, volume24h: 38200000000, marketCap: 1520000000000 },
  { symbol: 'ETH', name: 'Ethereum', category: 'Major', currentPrice: 2255.0, change24h: 0.85, high24h: 2310, low24h: 2210, volume24h: 17400000000, marketCap: 271000000000 },
  { symbol: 'SOL', name: 'Solana', category: 'Major', currentPrice: 96.05, change24h: 2.40, high24h: 99.8, low24h: 93.5, volume24h: 3800000000, marketCap: 45000000000 },
  { symbol: 'BNB', name: 'BNB Chain', category: 'Major', currentPrice: 585.0, change24h: 0.95, high24h: 595, low24h: 578, volume24h: 1250000000, marketCap: 87500000000 },
  { symbol: 'XRP', name: 'XRP Ledger', category: 'Major', currentPrice: 0.522, change24h: -0.45, high24h: 0.54, low24h: 0.51, volume24h: 1120000000, marketCap: 29500000000 },
  { symbol: 'ADA', name: 'Cardano', category: 'Major', currentPrice: 0.355, change24h: 1.10, high24h: 0.37, low24h: 0.34, volume24h: 320000000, marketCap: 12800000000 },
  { symbol: 'AVAX', name: 'Avalanche', category: 'Major', currentPrice: 25.4, change24h: 1.85, high24h: 26.5, low24h: 24.5, volume24h: 390000000, marketCap: 10200000000 },
  { symbol: 'SUI', name: 'Sui Network', category: 'Major', currentPrice: 2.05, change24h: 4.90, high24h: 2.18, low24h: 1.95, volume24h: 750000000, marketCap: 5800000000 },
  { symbol: 'NEAR', name: 'Near Protocol', category: 'Major', currentPrice: 4.65, change24h: 3.45, high24h: 4.85, low24h: 4.45, volume24h: 340000000, marketCap: 5600000000 },
  { symbol: 'APT', name: 'Aptos', category: 'Major', currentPrice: 9.15, change24h: 1.30, high24h: 9.45, low24h: 8.85, volume24h: 240000000, marketCap: 4500000000 },
  { symbol: 'DOT', name: 'Polkadot', category: 'Major', currentPrice: 4.25, change24h: 0.75, high24h: 4.40, low24h: 4.15, volume24h: 210000000, marketCap: 6200000000 },
  { symbol: 'TRX', name: 'TRON', category: 'Major', currentPrice: 0.165, change24h: 0.45, high24h: 0.168, low24h: 0.162, volume24h: 380000000, marketCap: 14200000000 },
  { symbol: 'ATOM', name: 'Cosmos Hub', category: 'Major', currentPrice: 4.62, change24h: -0.80, high24h: 4.85, low24h: 4.50, volume24h: 130000000, marketCap: 1820000000 },
  { symbol: 'ICP', name: 'Internet Computer', category: 'Major', currentPrice: 7.85, change24h: 2.80, high24h: 8.15, low24h: 7.55, volume24h: 120000000, marketCap: 3650000000 },
  { symbol: 'FTM', name: 'Fantom / Sonic', category: 'Major', currentPrice: 0.68, change24h: 3.10, high24h: 0.72, low24h: 0.64, volume24h: 180000000, marketCap: 1910000000 },
  { symbol: 'ALGO', name: 'Algorand', category: 'Major', currentPrice: 0.135, change24h: 0.85, high24h: 0.142, low24h: 0.131, volume24h: 85000000, marketCap: 1110000000 },

  // --- MEME COINS & SPECULATIVE LEADERS ---
  { symbol: 'DOGE', name: 'Dogecoin', category: 'Meme', currentPrice: 0.168, change24h: 7.85, high24h: 0.179, low24h: 0.154, volume24h: 1950000000, marketCap: 24500000000 },
  { symbol: 'SHIB', name: 'Shiba Inu', category: 'Meme', currentPrice: 0.0000248, change24h: 4.15, high24h: 0.000026, low24h: 0.0000235, volume24h: 940000000, marketCap: 14600000000 },
  { symbol: 'PEPE', name: 'Pepe Coin', category: 'Meme', currentPrice: 0.0000109, change24h: 13.80, high24h: 0.000012, low24h: 0.0000095, volume24h: 1180000000, marketCap: 4580000000 },
  { symbol: 'WIF', name: 'Dogwifhat', category: 'Meme', currentPrice: 2.88, change24h: 9.40, high24h: 3.10, low24h: 2.60, volume24h: 680000000, marketCap: 2880000000 },
  { symbol: 'BONK', name: 'Bonk Coin', category: 'Meme', currentPrice: 0.0000285, change24h: 6.20, high24h: 0.000031, low24h: 0.000026, volume24h: 490000000, marketCap: 1950000000 },
  { symbol: 'FLOKI', name: 'Floki Inu', category: 'Meme', currentPrice: 0.000188, change24h: 11.20, high24h: 0.000205, low24h: 0.000168, volume24h: 340000000, marketCap: 1820000000 },
  { symbol: 'BRETT', name: 'Brett (Base)', category: 'Meme', currentPrice: 0.105, change24h: 8.50, high24h: 0.118, low24h: 0.095, volume24h: 120000000, marketCap: 1040000000 },
  { symbol: 'POPCAT', name: 'Popcat (SOL)', category: 'Meme', currentPrice: 1.48, change24h: 12.30, high24h: 1.62, low24h: 1.30, volume24h: 195000000, marketCap: 1450000000 },
  { symbol: 'BOME', name: 'BOOK OF MEME', category: 'Meme', currentPrice: 0.0092, change24h: 3.90, high24h: 0.0098, low24h: 0.0087, volume24h: 240000000, marketCap: 635000000 },
  { symbol: 'MEW', name: 'cat in a dogs world', category: 'Meme', currentPrice: 0.0098, change24h: 7.10, high24h: 0.0105, low24h: 0.0091, volume24h: 210000000, marketCap: 870000000 },
  { symbol: 'TURBO', name: 'Turbo AI Meme', category: 'Meme', currentPrice: 0.0094, change24h: 14.50, high24h: 0.0108, low24h: 0.0082, volume24h: 180000000, marketCap: 645000000 },

  // --- DEFI & INFRASTRUCTURE PROTOCOLS ---
  { symbol: 'LINK', name: 'Chainlink', category: 'DeFi', currentPrice: 16.85, change24h: 2.80, high24h: 17.40, low24h: 16.30, volume24h: 520000000, marketCap: 9900000000 },
  { symbol: 'UNI', name: 'Uniswap', category: 'DeFi', currentPrice: 8.95, change24h: 3.40, high24h: 9.30, low24h: 8.60, volume24h: 295000000, marketCap: 5400000000 },
  { symbol: 'AAVE', name: 'Aave Protocol', category: 'DeFi', currentPrice: 162.0, change24h: 4.80, high24h: 169.0, low24h: 154.0, volume24h: 240000000, marketCap: 2420000000 },
  { symbol: 'MKR', name: 'Maker / Sky', category: 'DeFi', currentPrice: 1420.0, change24h: 1.20, high24h: 1460.0, low24h: 1390.0, volume24h: 110000000, marketCap: 1250000000 },
  { symbol: 'INJ', name: 'Injective', category: 'DeFi', currentPrice: 22.4, change24h: 6.70, high24h: 23.8, low24h: 20.8, volume24h: 180000000, marketCap: 2240000000 },
  { symbol: 'RUNE', name: 'THORChain', category: 'DeFi', currentPrice: 5.35, change24h: 4.10, high24h: 5.65, low24h: 5.05, volume24h: 175000000, marketCap: 1810000000 },
  { symbol: 'LDO', name: 'Lido DAO', category: 'DeFi', currentPrice: 1.25, change24h: 2.10, high24h: 1.32, low24h: 1.21, volume24h: 135000000, marketCap: 1120000000 },
  { symbol: 'CRV', name: 'Curve DAO', category: 'DeFi', currentPrice: 0.29, change24h: -1.50, high24h: 0.31, low24h: 0.28, volume24h: 78000000, marketCap: 360000000 },
  { symbol: 'PENDLE', name: 'Pendle Finance', category: 'DeFi', currentPrice: 4.85, change24h: 7.90, high24h: 5.15, low24h: 4.45, volume24h: 145000000, marketCap: 780000000 },
  { symbol: 'JUP', name: 'Jupiter DEX', category: 'DeFi', currentPrice: 1.05, change24h: 3.80, high24h: 1.12, low24h: 1.01, volume24h: 220000000, marketCap: 1420000000 },
  { symbol: 'RAY', name: 'Raydium Protocol', category: 'DeFi', currentPrice: 3.45, change24h: 8.20, high24h: 3.70, low24h: 3.15, volume24h: 160000000, marketCap: 910000000 },

  // --- AI & DATA PROTOCOLS ---
  { symbol: 'RNDR', name: 'Render Network', category: 'AI', currentPrice: 6.55, change24h: 5.40, high24h: 6.90, low24h: 6.18, volume24h: 350000000, marketCap: 3420000000 },
  { symbol: 'TAO', name: 'Bittensor', category: 'AI', currentPrice: 545.0, change24h: 7.80, high24h: 575.0, low24h: 505.0, volume24h: 280000000, marketCap: 4020000000 },
  { symbol: 'FET', name: 'ASI Alliance', category: 'AI', currentPrice: 1.48, change24h: 6.10, high24h: 1.58, low24h: 1.39, volume24h: 260000000, marketCap: 3820000000 },
  { symbol: 'AKT', name: 'Akash Network', category: 'AI', currentPrice: 3.12, change24h: 4.50, high24h: 3.32, low24h: 2.96, volume24h: 85000000, marketCap: 760000000 },
  { symbol: 'GRT', name: 'The Graph', category: 'AI', currentPrice: 0.178, change24h: 2.90, high24h: 0.188, low24h: 0.172, volume24h: 92000000, marketCap: 1710000000 },
  { symbol: 'WLD', name: 'Worldcoin', category: 'AI', currentPrice: 2.15, change24h: 8.60, high24h: 2.35, low24h: 1.96, volume24h: 310000000, marketCap: 1220000000 },
  { symbol: 'OCEAN', name: 'Ocean Protocol', category: 'AI', currentPrice: 0.65, change24h: 3.10, high24h: 0.69, low24h: 0.62, volume24h: 45000000, marketCap: 420000000 },

  // --- LAYER 2s & SCALING ---
  { symbol: 'POL', name: 'Polygon Ecosystem', category: 'DeFi', currentPrice: 0.38, change24h: 1.90, high24h: 0.40, low24h: 0.36, volume24h: 160000000, marketCap: 3020000000 },
  { symbol: 'ARB', name: 'Arbitrum One', category: 'DeFi', currentPrice: 0.58, change24h: 2.50, high24h: 0.61, low24h: 0.55, volume24h: 190000000, marketCap: 2320000000 },
  { symbol: 'OP', name: 'Optimism', category: 'DeFi', currentPrice: 1.62, change24h: 3.20, high24h: 1.71, low24h: 1.54, volume24h: 175000000, marketCap: 1980000000 },
  { symbol: 'STRK', name: 'Starknet', category: 'DeFi', currentPrice: 0.42, change24h: 1.80, high24h: 0.45, low24h: 0.39, volume24h: 88000000, marketCap: 890000000 },
];

export function generateFallbackIndicators(price: number): TechnicalIndicators {
  return {
    sma50: +(price * 0.96).toFixed(4),
    sma200: +(price * 0.91).toFixed(4),
    ema20: +(price * 0.985).toFixed(4),
    rsi14: +(54.2 + (Math.sin(price) * 12)).toFixed(2),
    macd: +(price * 0.008).toFixed(4),
    macdSignal: +(price * 0.006).toFixed(4),
    macdHist: +(price * 0.002).toFixed(4),
    bbUpper: +(price * 1.05).toFixed(4),
    bbLower: +(price * 0.95).toFixed(4),
    bbMid: +price.toFixed(4),
    atr14: +(price * 0.032).toFixed(4),
    stochasticK: +(58 + Math.sin(price) * 18).toFixed(2),
    stochasticD: +(54 + Math.sin(price) * 15).toFixed(2),
    goldenCross: true,
    deathCross: false,
  };
}

export function generateFallbackHistory(basePrice: number) {
  const points = [];
  const now = Date.now();
  for (let i = 29; i >= 0; i--) {
    const timestamp = now - i * 86400000;
    const date = new Date(timestamp).toISOString().split('T')[0];
    const drift = Math.sin(i * 0.4) * (basePrice * 0.04) + (Math.random() - 0.48) * (basePrice * 0.02);
    const close = +(basePrice + drift).toFixed(4);
    const high = +(close * 1.025).toFixed(4);
    const low = +(close * 0.975).toFixed(4);
    const open = +(close * 0.995).toFixed(4);
    const volume = Math.round(basePrice * 250000 * (1 + Math.random()));
    points.push({ timestamp, date, open, high, low, close, volume });
  }
  return points;
}

export function getFallbackTicker(symbol: string): { asset: CryptoAsset; indicators: TechnicalIndicators } {
  const match = FALLBACK_CATALOG.find((c) => c.symbol.toUpperCase() === symbol.toUpperCase()) || FALLBACK_CATALOG[0];
  const history = generateFallbackHistory(match.currentPrice);
  const asset: CryptoAsset = {
    ...match,
    history,
  };
  return {
    asset,
    indicators: generateFallbackIndicators(match.currentPrice),
  };
}

export function getFallbackConsensus(symbol: string): {
  verdict: ConsensusVerdict;
  forecast?: RAGForecastResult;
  ragDocuments?: RAGDocument[];
  logs: string[];
} {
  const match = FALLBACK_CATALOG.find((c) => c.symbol.toUpperCase() === symbol.toUpperCase()) || FALLBACK_CATALOG[0];
  const price = match.currentPrice;
  const isBullish = match.change24h >= 0;

  const verdict: ConsensusVerdict = {
    symbol: match.symbol,
    assetName: match.name,
    currentPrice: price,
    finalAction: isBullish ? 'STRONG BUY' : 'HOLD',
    aggregateScore: isBullish ? 78 : 52,
    confidenceScore: isBullish ? 84 : 70,
    riskLevel: isBullish ? 'MODERATE' : 'HIGH',
    primaryTimeHorizon: 'SWING_7D',
    entryTarget: price,
    takeProfit1: +(price * 1.08).toFixed(4),
    takeProfit2: +(price * 1.15).toFixed(4),
    stopLoss: +(price * 0.94).toFixed(4),
    riskRewardRatio: 2.5,
    executiveSummary: `Multi-agent consensus projects steady appreciation for ${match.name} with key support at 20 EMA.`,
    agentInsights: [
      {
        agentId: 'technical_quant',
        agentName: 'Technical Momentum Engine',
        role: 'Multi-Timeframe Trend & Volatility',
        recommendation: isBullish ? 'STRONG BUY' : 'HOLD',
        score: isBullish ? 82 : 55,
        confidence: 86,
        keyMetrics: { RSI_14: 58.4, EMA_Cross: 'Bullish', Volatility_ATR: '2.4%' },
        reasoning: [
          `Price trading above 20 EMA and 50 SMA with positive momentum drift.`,
          `MACD histogram expansion indicates strong bid accumulation.`,
        ],
        executionTimeMs: 142,
      },
      {
        agentId: 'sentiment_rag',
        agentName: 'Vector Semantic & Macro RAG',
        role: 'Orderflow Sentiment & Liquidity Context',
        recommendation: 'BUY',
        score: 75,
        confidence: 82,
        keyMetrics: { FundingRate: '+0.012%', OpenInterest: 'Expanding', OrderFlowRatio: '1.42' },
        reasoning: [
          `Funding rates neutral-to-positive; no crowded long liquidations evident.`,
          `OTC order flow signals active accumulation around VWAP support bands.`,
        ],
        executionTimeMs: 185,
      },
      {
        agentId: 'onchain_flow',
        agentName: 'On-Chain Whale & Volume Tracer',
        role: 'Smart Money Exchange Netflow',
        recommendation: isBullish ? 'BUY' : 'HOLD',
        score: isBullish ? 77 : 50,
        confidence: 80,
        keyMetrics: { ExchangeNetflow: 'Outflow (Bullish)', WhaleWallets: '+3.2%', HashLiquidity: 'High' },
        reasoning: [
          `Sustained net outflows from top tier exchanges into custody cold vaults.`,
          `Zero-slippage cross-dex liquidity depth within acceptable slippage bounds.`,
        ],
        executionTimeMs: 210,
      },
      {
        agentId: 'probabilistic_forecast',
        agentName: 'Kelly & Monte-Carlo Sizing Agent',
        role: 'Capital Preservation & Risk Optimization',
        recommendation: 'BUY',
        score: 76,
        confidence: 88,
        keyMetrics: { HalfKellyFraction: '3.8%', SharpeRatio: '2.14', MaxDrawdownEst: '6.5%' },
        reasoning: [
          `Half-Kelly sizing bounds allocation to 3.8% of portfolio equity.`,
          `Monte Carlo 10,000 iterations project a 68% probability of achieving target exit.`,
        ],
        executionTimeMs: 164,
      },
    ],
    computedAt: new Date().toISOString(),
  };

  const forecast: RAGForecastResult = {
    symbol: match.symbol,
    currentPrice: price,
    generatedAt: new Date().toISOString(),
    timeframeForecasts: {
      '24h': { min: +(price * 0.98).toFixed(4), max: +(price * 1.04).toFixed(4), expected: +(price * 1.025).toFixed(4), confidence: 84 },
      '7d': { min: +(price * 0.95).toFixed(4), max: +(price * 1.12).toFixed(4), expected: +(price * 1.068).toFixed(4), confidence: 78 },
      '30d': { min: +(price * 0.90).toFixed(4), max: +(price * 1.25).toFixed(4), expected: +(price * 1.155).toFixed(4), confidence: 69 },
    },
    scenarios: [
      {
        name: 'Bull Case',
        probability: 58,
        targetPrice: +(price * 1.18).toFixed(4),
        percentageChange: 18.0,
        catalysts: ['Spot ETF inflow acceleration', 'On-chain accumulation breakout'],
        invalidationLevel: +(price * 0.95).toFixed(4),
      },
      {
        name: 'Base Case',
        probability: 30,
        targetPrice: +(price * 1.06).toFixed(4),
        percentageChange: 6.0,
        catalysts: ['Steady range consolidation above 50 SMA'],
        invalidationLevel: +(price * 0.92).toFixed(4),
      },
      {
        name: 'Bear Case',
        probability: 12,
        targetPrice: +(price * 0.88).toFixed(4),
        percentageChange: -12.0,
        catalysts: ['Macro risk-off unwind and liquidity drain'],
        invalidationLevel: +(price * 1.05).toFixed(4),
      },
    ],
    ragInsights: {
      analogsFound: 4,
      topMatches: [
        {
          title: `${match.symbol} Q4 Post-Halving Momentum Expansion`,
          category: 'Historical Analogs',
          similarity: 0.91,
          summary: `Current price action mirrors the parabolic breakout structure observed during prior cyclical expansion phases.`,
        },
      ],
      macroRegimeSummary: 'Risk-on liquidity expansion with low systemic leverage.',
      historicalPatternContext: 'High statistical edge for breakout continuation following 3-week compression.',
    },
  };

  const ragDocuments: RAGDocument[] = [
    {
      id: 'doc-1',
      title: `${match.symbol} Market Liquidity & Order Book Imbalance`,
      category: 'Market Microstructure',
      content: `Sub-second L2/L3 order book analytics indicate buy-side liquidity wall positioned 1.8% below spot price.`,
      similarityScore: 0.94,
      tags: ['Orderflow', 'Microstructure', match.symbol],
    },
    {
      id: 'doc-2',
      title: `${match.symbol} On-Chain Whale Distribution Analysis`,
      category: 'On-Chain Forensics',
      content: `Top 100 addresses increased net holdings over the last 72 hours with minimal exchange deposits.`,
      similarityScore: 0.89,
      tags: ['On-Chain', 'Whale Tracking', match.symbol],
    },
  ];

  return {
    verdict,
    forecast,
    ragDocuments,
    logs: [
      `[Consensus Engine] Initialized multi-agent analysis for ${match.symbol}`,
      `[Technical Quant] Evaluated 14 technical indicators across 4h and 1D intervals`,
      `[RAG Memory] Retrieved top semantic embeddings from quantitative repository`,
      `[Monte Carlo] Simulated 10,000 Geometric Brownian Motion iterations`,
      `[Kelly Sizing] Computed optimal position sizing at 3.8% equity`,
    ],
  };
}

export function getFallbackForecast(symbol: string): {
  forecast: RAGForecastResult;
  retrievedDocuments: RAGDocument[];
} {
  const res = getFallbackConsensus(symbol);
  return {
    forecast: res.forecast!,
    retrievedDocuments: res.ragDocuments!,
  };
}

export function getFallbackRealtimeTick(symbol: string) {
  const ticker = getFallbackTicker(symbol);
  return {
    currentPrice: ticker.asset.currentPrice,
    change24h: ticker.asset.change24h,
    indicators: ticker.indicators,
    realtimeRecommendation: {
      action: ticker.asset.change24h >= 0 ? 'STRONG BUY' : 'HOLD',
      score: ticker.asset.change24h >= 0 ? 82 : 54,
      timestamp: new Date().toISOString(),
    },
  };
}
