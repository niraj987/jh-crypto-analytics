import { OHLCV, TechnicalIndicators } from '../types/index.js';

export class IndicatorService {
  /**
   * Calculates Simple Moving Average
   */
  public static calculateSMA(data: number[], window: number): number[] {
    const sma: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < window - 1) {
        sma.push(data[i]);
      } else {
        const sum = data.slice(i - window + 1, i + 1).reduce((acc, val) => acc + val, 0);
        sma.push(sum / window);
      }
    }
    return sma;
  }

  /**
   * Calculates Exponential Moving Average
   */
  public static calculateEMA(data: number[], window: number): number[] {
    const ema: number[] = [];
    const k = 2 / (window + 1);
    
    // First value is initialized with SMA of that window
    let currentEma = data.slice(0, window).reduce((a, b) => a + b, 0) / window;
    
    for (let i = 0; i < data.length; i++) {
      if (i < window) {
        ema.push(data[i]);
      } else {
        currentEma = data[i] * k + currentEma * (1 - k);
        ema.push(currentEma);
      }
    }
    return ema;
  }

  /**
   * Calculates Relative Strength Index (RSI 14)
   */
  public static calculateRSI(closes: number[], period: number = 14): number[] {
    const rsi: number[] = [];
    if (closes.length < period + 1) return closes.map(() => 50);

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
      const diff = closes[i] - closes[i - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    for (let i = 0; i < closes.length; i++) {
      if (i < period) {
        rsi.push(50);
        continue;
      }

      if (i > period) {
        const diff = closes[i] - closes[i - 1];
        const gain = diff > 0 ? diff : 0;
        const loss = diff < 0 ? -diff : 0;

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
      }

      if (avgLoss === 0) {
        rsi.push(100);
      } else {
        const rs = avgGain / avgLoss;
        rsi.push(100 - 100 / (1 + rs));
      }
    }

    return rsi;
  }

  /**
   * Calculates MACD (12, 26, 9)
   */
  public static calculateMACD(
    closes: number[],
    fast: number = 12,
    slow: number = 26,
    signalPeriod: number = 9
  ): { macd: number[]; signal: number[]; hist: number[] } {
    const emaFast = this.calculateEMA(closes, fast);
    const emaSlow = this.calculateEMA(closes, slow);

    const macdLine: number[] = [];
    for (let i = 0; i < closes.length; i++) {
      macdLine.push(emaFast[i] - emaSlow[i]);
    }

    const signalLine = this.calculateEMA(macdLine, signalPeriod);
    const hist: number[] = [];
    for (let i = 0; i < closes.length; i++) {
      hist.push(macdLine[i] - signalLine[i]);
    }

    return { macd: macdLine, signal: signalLine, hist };
  }

  /**
   * Calculates Bollinger Bands (20, 2 std)
   */
  public static calculateBollingerBands(
    closes: number[],
    window: number = 20,
    numStd: number = 2.0
  ): { upper: number[]; lower: number[]; mid: number[] } {
    const mid = this.calculateSMA(closes, window);
    const upper: number[] = [];
    const lower: number[] = [];

    for (let i = 0; i < closes.length; i++) {
      if (i < window - 1) {
        upper.push(closes[i]);
        lower.push(closes[i]);
      } else {
        const slice = closes.slice(i - window + 1, i + 1);
        const mean = mid[i];
        const variance = slice.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / window;
        const std = Math.sqrt(variance);
        upper.push(mean + std * numStd);
        lower.push(mean - std * numStd);
      }
    }

    return { upper, lower, mid };
  }

  /**
   * Calculates Average True Range (ATR 14)
   */
  public static calculateATR(candles: OHLCV[], period: number = 14): number[] {
    const tr: number[] = [];

    for (let i = 0; i < candles.length; i++) {
      if (i === 0) {
        tr.push(candles[i].high - candles[i].low);
      } else {
        const hl = candles[i].high - candles[i].low;
        const hpc = Math.abs(candles[i].high - candles[i - 1].close);
        const lpc = Math.abs(candles[i].low - candles[i - 1].close);
        tr.push(Math.max(hl, hpc, lpc));
      }
    }

    return this.calculateEMA(tr, period);
  }

  /**
   * Computes latest indicator snapshot for a series of historical OHLCV candles
   */
  public static computeLatestIndicators(candles: OHLCV[]): TechnicalIndicators {
    if (candles.length < 50) {
      throw new Error('Insufficient candlestick history to compute multi-frame indicators');
    }

    const closes = candles.map((c) => c.close);
    const sma50Series = this.calculateSMA(closes, 50);
    const sma200Series = this.calculateSMA(closes, Math.min(200, closes.length));
    const ema20Series = this.calculateEMA(closes, 20);
    const rsiSeries = this.calculateRSI(closes, 14);
    const macdSeries = this.calculateMACD(closes, 12, 26, 9);
    const bbSeries = this.calculateBollingerBands(closes, 20, 2.0);
    const atrSeries = this.calculateATR(candles, 14);

    const lastIdx = closes.length - 1;
    const prevIdx = lastIdx - 1;

    // Stochastic
    const lookback = 14;
    const sliceHighs = candles.slice(lastIdx - lookback + 1, lastIdx + 1).map((c) => c.high);
    const sliceLows = candles.slice(lastIdx - lookback + 1, lastIdx + 1).map((c) => c.low);
    const highestHigh = Math.max(...sliceHighs);
    const lowestLow = Math.min(...sliceLows);
    const currentClose = closes[lastIdx];
    const stochK = highestHigh === lowestLow ? 50 : ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
    const stochD = stochK * 0.8 + 10; // Smoothed approx

    const currentSma50 = sma50Series[lastIdx];
    const prevSma50 = sma50Series[prevIdx];
    const currentSma200 = sma200Series[lastIdx];
    const prevSma200 = sma200Series[prevIdx];

    const goldenCross = prevSma50 <= prevSma200 && currentSma50 > currentSma200;
    const deathCross = prevSma50 >= prevSma200 && currentSma50 < currentSma200;

    return {
      sma50: Number(currentSma50.toFixed(4)),
      sma200: Number(currentSma200.toFixed(4)),
      ema20: Number(ema20Series[lastIdx].toFixed(4)),
      rsi14: Number(rsiSeries[lastIdx].toFixed(2)),
      macd: Number(macdSeries.macd[lastIdx].toFixed(4)),
      macdSignal: Number(macdSeries.signal[lastIdx].toFixed(4)),
      macdHist: Number(macdSeries.hist[lastIdx].toFixed(4)),
      bbUpper: Number(bbSeries.upper[lastIdx].toFixed(4)),
      bbLower: Number(bbSeries.lower[lastIdx].toFixed(4)),
      bbMid: Number(bbSeries.mid[lastIdx].toFixed(4)),
      atr14: Number(atrSeries[lastIdx].toFixed(4)),
      stochasticK: Number(stochK.toFixed(2)),
      stochasticD: Number(stochD.toFixed(2)),
      goldenCross,
      deathCross,
    };
  }
}

