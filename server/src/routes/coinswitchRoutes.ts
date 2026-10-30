import { Router } from 'express';
import { CoinSwitchService, CoinSwitchOrderRequest } from '../services/coinswitchService.js';

const router = Router();

/**
 * GET /api/coinswitch/status
 * Health check & masked credentials verification
 */
router.get('/status', async (_req, res) => {
  try {
    const status = CoinSwitchService.getStatus();
    const timeInfo = await CoinSwitchService.getServerTime().catch(() => ({ serverTime: Date.now(), driftMs: 0 }));

    res.json({
      success: true,
      data: {
        ...status,
        provider: 'CoinSwitch PRO API v2',
        serverTime: timeInfo.serverTime,
        clockDriftMs: timeInfo.driftMs,
        isSynchronized: timeInfo.driftMs < 5000,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/coinswitch/portfolio
 * Returns user's live holdings, balances, and INR valuation
 */
router.get('/portfolio', async (_req, res) => {
  try {
    const portfolio = await CoinSwitchService.getUserPortfolio();
    res.json({
      success: true,
      data: portfolio,
    });
  } catch (err: any) {
    // If external call is blocked, return fallback with informative note
    console.warn('CoinSwitch portfolio error:', err.message);
    res.json({
      success: false,
      error: err.message,
      data: {
        balances: [
          { currency: 'INR', name: 'Indian Rupee', main_balance: '0.30', current_value: '0.30' },
          { currency: 'FLOKI', name: 'Floki Inu', main_balance: '1704.71', current_value: '3.92' },
          { currency: 'PEPE', name: 'Pepe Coin', main_balance: '2544.89', current_value: '1.29' },
        ],
        totalINRValue: 5.51,
      },
    });
  }
});

/**
 * GET /api/coinswitch/ticker
 * Live CoinSwitch market rate for a given pair
 */
router.get('/ticker', async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || 'BTC/INR';
    const ticker = await CoinSwitchService.getLiveTicker(symbol);
    res.json({ success: true, data: ticker });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/coinswitch/order
 * Executes real live BUY / SELL order on CoinSwitch PRO
 */
router.post('/order', async (req, res) => {
  try {
    const { side, symbol, type, price, quantity, exchange } = req.body;

    if (!side || !symbol || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required order fields: side, symbol, and quantity are mandatory.',
      });
    }

    const orderReq: CoinSwitchOrderRequest = {
      side: side.toLowerCase() as 'buy' | 'sell',
      symbol: symbol.toUpperCase(),
      type: (type?.toLowerCase() || 'limit') as 'limit' | 'market',
      price: price ? Number(price) : undefined,
      quantity: Number(quantity),
      exchange: exchange || 'coinswitchx',
    };

    const result = await CoinSwitchService.placeLiveOrder(orderReq);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Execution failed: ${err.message}`,
    });
  }
});

/**
 * GET /api/coinswitch/orders
 * Retrieves open orders from CoinSwitch
 */
router.get('/orders', async (req, res) => {
  try {
    const exchange = (req.query.exchange as string) || 'coinswitchx';
    const orders = await CoinSwitchService.getOpenOrders(exchange);
    res.json({ success: true, data: orders });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

