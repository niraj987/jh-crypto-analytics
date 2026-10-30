import { AgentState } from './state.js';
import { AgentInsight, RecommendationAction } from '../types/index.js';
import { vectorStore } from '../rag/vectorStore.js';

export async function runSentimentRagAgent(state: AgentState): Promise<Partial<AgentState>> {
  const start = performance.now();
  const { symbol, asset, indicators } = state;
  const reasoning: string[] = [];

  // Formulate RAG query combining token symbol, category, and technical setup
  const techTrend = indicators.rsi14 < 35 ? 'oversold reversal' : indicators.rsi14 > 70 ? 'overbought breakout' : 'consolidation';
  const query = `${symbol} ${asset.name} ${asset.category} ${techTrend} halving liquidity macro`;

  // Search vector store for top matching intelligence documents
  const retrievedDocs = vectorStore.search(query, undefined, 3);
  const reasoningDocs: string[] = [];

  let rawScore = 52;

  // Evaluate retrieved RAG documents
  for (const doc of retrievedDocs) {
    reasoningDocs.push(`[RAG Analog - ${doc.title} (${Math.round((doc.similarityScore || 0) * 100)}% match)]: ${doc.content.slice(0, 160)}...`);
    
    if (doc.category === 'HALVING_CYCLE' || doc.category === 'MACRO_REGIME') {
      rawScore += 8;
    } else if (doc.category === 'TECHNICAL_PATTERN') {
      rawScore += indicators.rsi14 < 40 ? 10 : -5;
    }
  }

  // Sentiment factors
  if (asset.change24h > 3) {
    rawScore += 9;
    reasoning.push(`Positive market narrative momentum: 24h gain of +${asset.change24h}% reflects strong retail & institutional social sentiment.`);
  } else if (asset.change24h < -3) {
    rawScore -= 9;
    reasoning.push(`Negative sentiment pressure: 24h drawdown of ${asset.change24h}% indicates cautious macro risk appetite.`);
  } else {
    reasoning.push(`Sentiment remains calm and balanced, indicating an accumulation baseline without irrational euphoria.`);
  }

  reasoning.push(...reasoningDocs);

  const finalScore = Math.min(Math.max(Math.round(rawScore), 12), 94);

  let recommendation: RecommendationAction = 'HOLD';
  if (finalScore >= 74) recommendation = 'STRONG BUY';
  else if (finalScore >= 60) recommendation = 'BUY';
  else if (finalScore <= 32) recommendation = 'STRONG SELL';
  else if (finalScore <= 44) recommendation = 'SELL';

  const elapsed = Math.round(performance.now() - start);

  const insight: AgentInsight = {
    agentId: 'agent-sentiment-rag',
    agentName: 'Macro & RAG Narrative Intelligence Specialist',
    role: 'Historical Regime Analogs & Vector Knowledge Retrieval',
    recommendation,
    score: finalScore,
    confidence: Number((0.80 + (Math.abs(finalScore - 50) / 100) * 0.18).toFixed(2)),
    keyMetrics: {
      retrievedDocumentsCount: retrievedDocs.length,
      topSimilarityMatch: retrievedDocs[0]?.similarityScore || 0,
      primaryCategory: retrievedDocs[0]?.category || 'GENERAL',
      sentimentRegime: finalScore > 60 ? 'EXPANSIONARY' : finalScore < 40 ? 'RISK-OFF' : 'NEUTRAL',
    },
    reasoning,
    executionTimeMs: elapsed,
  };

  return {
    sentimentInsight: insight,
    ragDocuments: retrievedDocs,
    logs: [`[RAG Agent] Retrieved ${retrievedDocs.length} knowledge base analogs for ${symbol}; Score: ${finalScore}/100.`],
  };
}

