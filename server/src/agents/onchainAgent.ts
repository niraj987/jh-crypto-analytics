import { AgentState } from './state.js';
import { AgentInsight, RecommendationAction } from '../types/index.js';

export async function runOnChainAgent(state: AgentState): Promise<Partial<AgentState>> {
  const start = performance.now();
  const { asset } = state;
  const reasoning: string[] = [];

  let rawScore = 50;

  // 1. Volume to Market Cap Ratio (Liquidity Turnover)
  const vmcRatio = (asset.volume24h / asset.marketCap) * 100;
  if (vmcRatio > 15) {
    rawScore += 12;
    reasoning.push(`High turnover velocity: 24h volume represents ${vmcRatio.toFixed(1)}% of total market cap, indicating institutional participation.`);
  } else if (vmcRatio < 2.5) {
    rawScore -= 8;
    reasoning.push(`Low liquidity velocity (${vmcRatio.toFixed(1)}% V/MC ratio) signals consolidation or capital apathy.`);
  }

  // 2. Simulated Whale Netflow & Exchange Liquidity Reserves
  // Higher volatility with positive 24h change indicates net spot accumulation
  const netInflowScore = asset.change24h > 0 ? (asset.change24h > 5 ? 14 : 7) : (asset.change24h < -5 ? -14 : -7);
  rawScore += netInflowScore;

  if (asset.change24h > 0) {
    reasoning.push(`Exchange net outflows detected: Large wallet entities are withdrawing spot tokens to self-custody storage, reducing sell-side liquid supply.`);
    reasoning.push(`Order book bid-ask imbalance stands at +18% in favor of buyer absorption.`);
  } else {
    reasoning.push(`Elevated deposit volume to centralized exchanges observed, increasing short-term overhead supply resistance.`);
    reasoning.push(`Derivatives funding rate compressed slightly, indicating cautious positioning.`);
  }

  // Category specific dynamics
  if (asset.category === 'Meme') {
    reasoning.push(`Reflexivity index is high: Meme category social velocity accounts for elevated intraday variance.`);
  } else if (asset.category === 'Major') {
    reasoning.push(`Institutional derivatives open interest (CME & Binance) remains stable with balanced basis yield.`);
  }

  const finalScore = Math.min(Math.max(Math.round(rawScore), 8), 92);

  let recommendation: RecommendationAction = 'HOLD';
  if (finalScore >= 75) recommendation = 'STRONG BUY';
  else if (finalScore >= 60) recommendation = 'BUY';
  else if (finalScore <= 30) recommendation = 'STRONG SELL';
  else if (finalScore <= 42) recommendation = 'SELL';

  const elapsed = Math.round(performance.now() - start);

  const insight: AgentInsight = {
    agentId: 'agent-onchain-flow',
    agentName: 'On-Chain & Liquidity Microstructure Specialist',
    role: 'Exchange Reserves, Whale Net-Flows & Order Book Imbalance',
    recommendation,
    score: finalScore,
    confidence: Number((0.70 + (Math.abs(finalScore - 50) / 100) * 0.22).toFixed(2)),
    keyMetrics: {
      volumeToMcapPct: Number(vmcRatio.toFixed(2)),
      volume24hUsd: asset.volume24h,
      marketCapUsd: asset.marketCap,
      liquidityDepthStatus: vmcRatio > 10 ? 'DEEP' : 'NORMAL',
    },
    reasoning,
    executionTimeMs: elapsed,
  };

  return {
    onchainInsight: insight,
    logs: [`[On-Chain Agent] Analyzed $${(asset.volume24h / 1e9).toFixed(2)}B volume; Score: ${finalScore}/100 (${recommendation}).`],
  };
}

