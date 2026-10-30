import { Router, Request, Response } from 'express';
import { MarketService } from '../services/marketService.js';
import { IndicatorService } from '../services/indicatorService.js';
import { consensusGraph } from '../agents/graph.js';

const router = Router();

// Endpoint for executing full multi-agent consensus
router.get('/consensus', async (req: Request, res: Response) => {
  try {
    const symbol = (req.query.symbol as string || 'BTC').toUpperCase();
    const asset = MarketService.getAsset(symbol);
    const indicators = IndicatorService.computeLatestIndicators(asset.history);

    const initialState = {
      symbol,
      asset,
      indicators,
      technicalInsight: null,
      onchainInsight: null,
      sentimentInsight: null,
      forecastInsight: null,
      ragDocuments: [],
      forecastResult: null,
      verdict: null,
      logs: [`Initiating LangGraph Multi-Agent Consensus for ${symbol}...`],
    };

    const resultState = await consensusGraph.invoke(initialState);

    res.json({
      success: true,
      symbol,
      verdict: resultState.verdict,
      forecast: resultState.forecastResult,
      ragDocuments: resultState.ragDocuments,
      logs: resultState.logs,
    });
  } catch (error: any) {
    console.error('Consensus route error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal Agent Consensus Error' });
  }
});

// SSE endpoint for streaming multi-agent deliberation step-by-step
router.get('/stream', async (req: Request, res: Response) => {
  const symbol = (req.query.symbol as string || 'BTC').toUpperCase();
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    sendEvent('start', { message: `Initializing LangGraph Multi-Agent Network for ${symbol}...` });
    
    const asset = MarketService.getAsset(symbol);
    const indicators = IndicatorService.computeLatestIndicators(asset.history);

    sendEvent('market_loaded', { price: asset.currentPrice, change24h: asset.change24h });

    const initialState = {
      symbol,
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

    // Execute graph
    const resultState = await consensusGraph.invoke(initialState);

    sendEvent('technical_done', resultState.technicalInsight);
    sendEvent('onchain_done', resultState.onchainInsight);
    sendEvent('rag_done', { insight: resultState.sentimentInsight, docs: resultState.ragDocuments });
    sendEvent('forecast_done', { insight: resultState.forecastInsight, forecast: resultState.forecastResult });
    sendEvent('consensus_done', resultState.verdict);
    sendEvent('complete', { success: true });
    
    res.end();
  } catch (error: any) {
    sendEvent('error', { error: error.message });
    res.end();
  }
});

export default router;

