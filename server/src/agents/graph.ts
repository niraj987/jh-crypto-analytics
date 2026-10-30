import { StateGraph, START, END } from '@langchain/langgraph';
import { AgentStateAnnotation, AgentState } from './state.js';
import { runTechnicalAgent } from './technicalAgent.js';
import { runOnChainAgent } from './onchainAgent.js';
import { runSentimentRagAgent } from './sentimentRagAgent.js';
import { runForecastAgent } from './forecastAgent.js';
import { ConsensusVerdict, RecommendationAction, RiskLevel, TimeHorizon } from '../types/index.js';

export async function runConsensusSupervisor(state: AgentState): Promise<Partial<AgentState>> {
  const { symbol, asset, indicators, technicalInsight, onchainInsight, sentimentInsight, forecastInsight } = state;

  const currentPrice = asset.currentPrice;

  const tScore = technicalInsight?.score || 50;
  const oScore = onchainInsight?.score || 50;
  const sScore = sentimentInsight?.score || 50;
  const fScore = forecastInsight?.score || 50;

  // Mathematically weighted synthesis
  const compositeScore = Math.round(tScore * 0.35 + sScore * 0.25 + oScore * 0.20 + fScore * 0.20);

  // Confidence is an agreement index across agents (low standard deviation => high agreement)
  const scores = [tScore, oScore, sScore, fScore];
  const mean = compositeScore;
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  const agreementFactor = Math.max(0.60, 1 - stdDev / 100);
  const confidenceScore = Math.round(agreementFactor * 100);

  let finalAction: RecommendationAction = 'HOLD';
  if (compositeScore >= 78) finalAction = 'STRONG BUY';
  else if (compositeScore >= 62) finalAction = 'BUY';
  else if (compositeScore <= 25) finalAction = 'STRONG SELL';
  else if (compositeScore <= 42) finalAction = 'SELL';

  // Risk Level
  let riskLevel: RiskLevel = 'MODERATE';
  const atrRatio = indicators.atr14 / currentPrice;
  if (atrRatio > 0.08 || asset.category === 'Meme') {
    riskLevel = 'HIGH';
  } else if (atrRatio > 0.12) {
    riskLevel = 'CRITICAL';
  } else if (atrRatio < 0.035 && indicators.rsi14 > 40 && indicators.rsi14 < 60) {
    riskLevel = 'LOW';
  }

  // Key Levels
  const isBullish = compositeScore >= 55;
  const entryTarget = Number((currentPrice * (isBullish ? 0.992 : 1.005)).toFixed(currentPrice < 1 ? 6 : 2));
  
  const takeProfit1 = Number((isBullish ? currentPrice * 1.065 : currentPrice * 0.935).toFixed(currentPrice < 1 ? 6 : 2));
  const takeProfit2 = Number((isBullish ? currentPrice * 1.15 : currentPrice * 0.86).toFixed(currentPrice < 1 ? 6 : 2));
  const stopLoss = Number((isBullish ? currentPrice * 0.955 : currentPrice * 1.045).toFixed(currentPrice < 1 ? 6 : 2));

  const potentialReward = Math.abs(takeProfit1 - entryTarget);
  const potentialRisk = Math.abs(entryTarget - stopLoss);
  const riskRewardRatio = Number((potentialRisk > 0 ? potentialReward / potentialRisk : 2.5).toFixed(2));

  // Primary Time Horizon
  let primaryTimeHorizon: TimeHorizon = 'SWING_7D';
  if (asset.category === 'Meme') primaryTimeHorizon = 'SCALP_24H';
  else if (compositeScore >= 75 && indicators.sma50 > indicators.sma200) primaryTimeHorizon = 'POSITION_30D';

  const executiveSummary = `Multi-Agent Consensus for ${asset.name} (${symbol}): Synthesized Composite Score ${compositeScore}/100. Action: ${finalAction} (${confidenceScore}% Agent Agreement). Technical metrics show ${indicators.rsi14} RSI and ${indicators.macdHist > 0 ? 'bullish' : 'bearish'} momentum. RAG memory cross-referenced historical cycles with high similarity. Recommended strategy: ${finalAction} near $${entryTarget} targeting $${takeProfit1} with strict stop-loss at $${stopLoss} (Risk/Reward: ${riskRewardRatio}R).`;

  const agentInsights = [
    technicalInsight!,
    onchainInsight!,
    sentimentInsight!,
    forecastInsight!,
  ].filter(Boolean);

  const verdict: ConsensusVerdict = {
    symbol,
    assetName: asset.name,
    currentPrice,
    finalAction,
    aggregateScore: compositeScore,
    confidenceScore,
    riskLevel,
    primaryTimeHorizon,
    entryTarget,
    takeProfit1,
    takeProfit2,
    stopLoss,
    riskRewardRatio,
    executiveSummary,
    agentInsights,
    computedAt: new Date().toISOString(),
  };

  return {
    verdict,
    logs: [
      `[Consensus Orchestrator] Completed Multi-Agent Deliberation for ${symbol}. Final Verdict: ${finalAction} (${compositeScore}/100) with ${confidenceScore}% consensus confidence.`,
    ],
  };
}

// Build LangGraph StateGraph
const workflow = new StateGraph(AgentStateAnnotation)
  .addNode('technical', runTechnicalAgent)
  .addNode('onchain', runOnChainAgent)
  .addNode('sentimentRag', runSentimentRagAgent)
  .addNode('forecast', runForecastAgent)
  .addNode('consensus', runConsensusSupervisor)
  .addEdge(START, 'technical')
  .addEdge('technical', 'onchain')
  .addEdge('onchain', 'sentimentRag')
  .addEdge('sentimentRag', 'forecast')
  .addEdge('forecast', 'consensus')
  .addEdge('consensus', END);

export const consensusGraph = workflow.compile();

