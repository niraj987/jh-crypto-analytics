export type RecommendationAction = 
  | 'STRONG BUY' 
  | 'BUY' 
  | 'HOLD' 
  | 'SELL' 
  | 'STRONG SELL';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type TimeHorizon = 'SCALP_24H' | 'SWING_7D' | 'POSITION_30D';

export interface OHLCV {
  timestamp: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  category: 'Major' | 'Meme' | 'DeFi' | 'Layer 1' | 'AI';
  currentPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply?: number;
  history: OHLCV[];
}

export interface TechnicalIndicators {
  sma50: number;
  sma200: number;
  ema20: number;
  rsi14: number;
  macd: number;
  macdSignal: number;
  macdHist: number;
  bbUpper: number;
  bbLower: number;
  bbMid: number;
  atr14: number;
  stochasticK: number;
  stochasticD: number;
  goldenCross: boolean;
  deathCross: boolean;
}

export interface AgentInsight {
  agentId: string;
  agentName: string;
  role: string;
  recommendation: RecommendationAction;
  score: number; // 0 (extreme bear) to 100 (extreme bull)
  confidence: number; // 0.0 to 1.0
  keyMetrics: Record<string, string | number | boolean>;
  reasoning: string[];
  executionTimeMs: number;
}

export interface ConsensusVerdict {
  symbol: string;
  assetName: string;
  currentPrice: number;
  finalAction: RecommendationAction;
  aggregateScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100%
  riskLevel: RiskLevel;
  primaryTimeHorizon: TimeHorizon;
  entryTarget: number;
  takeProfit1: number;
  takeProfit2: number;
  stopLoss: number;
  riskRewardRatio: number;
  executiveSummary: string;
  agentInsights: AgentInsight[];
  computedAt: string;
}

export interface RAGDocument {
  id: string;
  title: string;
  category: 'HALVING_CYCLE' | 'ONCHAIN_METRICS' | 'MACRO_REGIME' | 'TECHNICAL_PATTERN' | 'SENTIMENT_CATALYST';
  content: string;
  similarityScore?: number;
  tags: string[];
}

export interface PriceScenario {
  name: 'Bull Case' | 'Base Case' | 'Bear Case';
  probability: number; // e.g. 0.65
  targetPrice: number;
  percentageChange: number;
  catalysts: string[];
  invalidationLevel: number;
}

export interface RAGForecastResult {
  symbol: string;
  currentPrice: number;
  generatedAt: string;
  timeframeForecasts: {
    '24h': { min: number; max: number; expected: number; confidence: number };
    '7d': { min: number; max: number; expected: number; confidence: number };
    '30d': { min: number; max: number; expected: number; confidence: number };
  };
  scenarios: PriceScenario[];
  ragInsights: {
    analogsFound: number;
    topMatches: { title: string; category: string; similarity: number; summary: string }[];
    macroRegimeSummary: string;
    historicalPatternContext: string;
  };
}

