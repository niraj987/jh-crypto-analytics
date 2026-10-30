import { consensusGraph } from './src/agents/graph.js';
import { MarketService } from './src/services/marketService.js';
import { IndicatorService } from './src/services/indicatorService.js';

async function main() {
  console.log('Testing LangGraph Multi-Agent Consensus...');
  const asset = MarketService.getAsset('BTC');
  const indicators = IndicatorService.computeLatestIndicators(asset.history);
  const state: any = {
    symbol: 'BTC',
    asset,
    indicators,
    technicalInsight: null,
    onchainInsight: null,
    sentimentInsight: null,
    forecastInsight: null,
    ragDocuments: [],
    forecastResult: null,
    verdict: null,
    logs: [],
  };

  const res = await consensusGraph.invoke(state);
  console.log('LangGraph Execution SUCCESS!');
  console.log('Verdict Action:', res.verdict?.finalAction);
  console.log('Score:', res.verdict?.aggregateScore);
  console.log('Confidence:', res.verdict?.confidenceScore + '%');
  console.log('Total Agents Run:', res.verdict?.agentInsights?.length);
  console.log('Forecast 7D Expected:', res.forecastResult?.timeframeForecasts['7d'].expected);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

