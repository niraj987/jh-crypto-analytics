import { AgentState } from './state.js';
import { AgentInsight, RecommendationAction } from '../types/index.js';

export async function runTechnicalAgent(state: AgentState): Promise<Partial<AgentState>> {
  const start = performance.now();
  const { asset, indicators } = state;
  const price = asset.currentPrice;
  const reasoning: string[] = [];

  let rawScore = 50;

  // 1. Moving Averages Analysis
  if (price > indicators.sma50 && indicators.sma50 > indicators.sma200) {
    rawScore += 18;
    reasoning.push(`Price ($${price}) is in strong macro uptrend trading above ascending 50 SMA ($${indicators.sma50}) & 200 SMA ($${indicators.sma200}).`);
  } else if (price > indicators.sma50) {
    rawScore += 8;
    reasoning.push(`Price is sustaining above 50-day moving average, showing intermediate momentum.`);
  } else if (price < indicators.sma50 && price < indicators.sma200) {
    rawScore -= 18;
    reasoning.push(`Price is trapped below both 50 and 200 daily moving averages, indicating structural bear regime.`);
  }

  if (indicators.goldenCross) {
    rawScore += 12;
    reasoning.push(`Confirmed Golden Cross (50 SMA broke above 200 SMA) signaling multi-month accumulation breakout.`);
  } else if (indicators.deathCross) {
    rawScore -= 15;
    reasoning.push(`Death Cross active (50 SMA crossing below 200 SMA), downside pressure elevated.`);
  }

  // 2. Relative Strength Index (RSI)
  if (indicators.rsi14 < 30) {
    rawScore += 16;
    reasoning.push(`RSI(14) at ${indicators.rsi14} is in deeply oversold territory, signaling extreme seller exhaustion and high mean-reversion probability.`);
  } else if (indicators.rsi14 < 45) {
    rawScore += 6;
    reasoning.push(`RSI(14) at ${indicators.rsi14} is in healthy consolidation zone with ample room for upside expansion.`);
  } else if (indicators.rsi14 > 75) {
    rawScore -= 14;
    reasoning.push(`RSI(14) at ${indicators.rsi14} indicates overheated/overbought conditions; short-term pullbacks likely.`);
  } else {
    reasoning.push(`RSI(14) at ${indicators.rsi14} is neutral-balanced.`);
  }

  // 3. MACD Momentum
  if (indicators.macdHist > 0 && indicators.macd > indicators.macdSignal) {
    rawScore += 10;
    reasoning.push(`MACD histogram is positive (+${indicators.macdHist.toFixed(3)}) with MACD line above signal, confirming accelerating bullish momentum.`);
  } else if (indicators.macdHist < 0) {
    rawScore -= 8;
    reasoning.push(`MACD momentum is negative (${indicators.macdHist.toFixed(3)}), seller volume in control.`);
  }

  // 4. Bollinger Bands & ATR
  const bbSpread = ((indicators.bbUpper - indicators.bbLower) / indicators.bbMid) * 100;
  if (price < indicators.bbLower * 1.01) {
    rawScore += 8;
    reasoning.push(`Price touches lower Bollinger Band ($${indicators.bbLower}), presenting a statistical bounce discount.`);
  } else if (price > indicators.bbUpper * 0.99) {
    rawScore -= 8;
    reasoning.push(`Price is pressing against upper Bollinger Band ($${indicators.bbUpper}), approaching statistical resistance.`);
  }

  // Bound score 5 - 95
  const finalScore = Math.min(Math.max(Math.round(rawScore), 5), 95);

  let recommendation: RecommendationAction = 'HOLD';
  if (finalScore >= 78) recommendation = 'STRONG BUY';
  else if (finalScore >= 62) recommendation = 'BUY';
  else if (finalScore <= 28) recommendation = 'STRONG SELL';
  else if (finalScore <= 42) recommendation = 'SELL';

  const elapsed = Math.round(performance.now() - start);

  const insight: AgentInsight = {
    agentId: 'agent-tech-quant',
    agentName: 'Quantitative Technical Specialist',
    role: 'Multi-Timeframe Trend & Indicator Confluence',
    recommendation,
    score: finalScore,
    confidence: Number((0.75 + (Math.abs(finalScore - 50) / 100) * 0.2).toFixed(2)),
    keyMetrics: {
      rsi14: indicators.rsi14,
      sma50: indicators.sma50,
      sma200: indicators.sma200,
      macdHist: indicators.macdHist,
      bbSpreadPct: Number(bbSpread.toFixed(2)),
      atrVolatility: indicators.atr14,
    },
    reasoning,
    executionTimeMs: elapsed,
  };

  return {
    technicalInsight: insight,
    logs: [`[Technical Agent] Computed score ${finalScore}/100 (${recommendation}) based on RSI, Moving Averages, and MACD.`],
  };
}

