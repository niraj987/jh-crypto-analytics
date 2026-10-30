import { Router, Request, Response } from 'express';
import { vectorStore } from '../rag/vectorStore.js';
import { MarketService } from '../services/marketService.js';
import { IndicatorService } from '../services/indicatorService.js';
import { runForecastAgent } from '../agents/forecastAgent.js';
import { runSentimentRagAgent } from '../agents/sentimentRagAgent.js';

const router = Router();

// Search knowledge base documents
router.get('/documents', (req: Request, res: Response) => {
  try {
    const query = req.query.q as string || '';
    const category = req.query.category as string || undefined;
    
    if (query) {
      const results = vectorStore.search(query, category, 10);
      res.json({ success: true, count: results.length, data: results });
    } else {
      const allDocs = vectorStore.getAll();
      res.json({ success: true, count: allDocs.length, data: allDocs });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Dedicated RAG forecasting pipeline endpoint
router.get('/forecast', async (req: Request, res: Response) => {
  try {
    const symbol = (req.query.symbol as string || 'BTC').toUpperCase();
    const asset = MarketService.getAsset(symbol);
    const indicators = IndicatorService.computeLatestIndicators(asset.history);

    const baseState: any = {
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

    // First retrieve RAG context
    const ragState = await runSentimentRagAgent(baseState);
    const mergedState = { ...baseState, ...ragState };

    // Then model probabilistic scenarios
    const forecastState = await runForecastAgent(mergedState);

    res.json({
      success: true,
      symbol,
      currentPrice: asset.currentPrice,
      forecast: forecastState.forecastResult,
      ragInsight: mergedState.sentimentInsight,
      retrievedDocuments: mergedState.ragDocuments,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

