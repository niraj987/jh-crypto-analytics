'use client';

import React, { useEffect, useRef, useState } from 'react';
import { OHLCV } from '@/lib/types';
import { formatINR, formatINRCompact } from '@/lib/currency';
import { Layers, Eye, EyeOff, BarChart3, SlidersHorizontal } from 'lucide-react';

interface CandlestickChartProps {
  candles: OHLCV[];
  symbol: string;
  sma50Val?: number;
  sma200Val?: number;
}

export default function CandlestickChart({ candles, symbol, sma50Val, sma200Val }: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSMA50, setShowSMA50] = useState(true);
  const [showSMA200, setShowSMA200] = useState(true);
  const [timeframe, setTimeframe] = useState<'1H' | '4H' | '1D' | '1W'>('1D');
  const [strategyPreset, setStrategyPreset] = useState<'TREND' | 'REVERSION' | 'BREAKOUT'>('TREND');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !candles || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Padding
    const padTop = 24;
    const padBottom = 42;
    const padRight = 70;
    const padLeft = 14;
    const chartHeight = height - padTop - padBottom;
    const chartWidth = width - padLeft - padRight;

    // Use latest 65 candles for clear visibility
    const visibleCandles = candles.slice(-65);
    const count = visibleCandles.length;
    if (count === 0) return;

    // Find price min and max
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVol = 0;

    visibleCandles.forEach((c) => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    const priceRange = maxPrice - minPrice || 1;
    minPrice -= priceRange * 0.05;
    maxPrice += priceRange * 0.05;
    const adjustedRange = maxPrice - minPrice;

    const getY = (price: number) => {
      return padTop + chartHeight - ((price - minPrice) / adjustedRange) * chartHeight;
    };

    const candleStep = chartWidth / count;
    const candleWidth = Math.max(candleStep * 0.72, 3.5);

    // Subtle horizontal grid lines & price labels
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';

    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padTop + (chartHeight / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + chartWidth, y);
      ctx.stroke();

      const priceLevel = maxPrice - (adjustedRange / gridLines) * i;
      ctx.fillText(
        formatINRCompact(priceLevel),
        padLeft + chartWidth + 8,
        y + 3
      );
    }

    // Volume bars at bottom (calm tints)
    const volHeight = chartHeight * 0.22;
    visibleCandles.forEach((c, idx) => {
      const x = padLeft + idx * candleStep + candleStep / 2;
      const vH = (c.volume / (maxVol || 1)) * volHeight;
      const isUp = c.close >= c.open;
      ctx.fillStyle = isUp ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
      ctx.fillRect(x - candleWidth / 2, padTop + chartHeight - vH, candleWidth, vH);
    });

    // Draw Candlesticks with calm natural colors
    visibleCandles.forEach((c, idx) => {
      const x = padLeft + idx * candleStep + candleStep / 2;
      const isUp = c.close >= c.open;
      const color = isUp ? '#059669' : '#e11d48'; // Rich Emerald / Crimson

      const yOpen = getY(c.open);
      const yClose = getY(c.close);
      const yHigh = getY(c.high);
      const yLow = getY(c.low);

      // Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Body with crisp edges
      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);
      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });

    // Draw SMA 50 Line (Sky Blue)
    if (showSMA50) {
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      visibleCandles.forEach((_, idx) => {
        const fullIndex = candles.length - count + idx;
        const windowSlice = candles.slice(Math.max(0, fullIndex - 49), fullIndex + 1);
        const sma = windowSlice.reduce((acc, val) => acc + val.close, 0) / windowSlice.length;
        const x = padLeft + idx * candleStep + candleStep / 2;
        const y = getY(sma);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Draw SMA 200 Line (Golden Amber)
    if (showSMA200) {
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      visibleCandles.forEach((_, idx) => {
        const fullIndex = candles.length - count + idx;
        const windowSlice = candles.slice(Math.max(0, fullIndex - 199), fullIndex + 1);
        const sma = windowSlice.reduce((acc, val) => acc + val.close, 0) / windowSlice.length;
        const x = padLeft + idx * candleStep + candleStep / 2;
        const y = getY(sma);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Date labels on bottom axis
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    const dateInterval = Math.ceil(count / 6);
    visibleCandles.forEach((c, idx) => {
      if (idx % dateInterval === 0 || idx === count - 1) {
        const x = padLeft + idx * candleStep + candleStep / 2;
        ctx.fillText(c.date.slice(5), x, height - 14);
      }
    });

  }, [candles, showSMA50, showSMA200]);

  return (
    <div ref={containerRef} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] flex flex-col space-y-4">
      {/* Chart Top Bar with Options */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {symbol} / INR Institutional Candlesticks
            </h2>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              {(['1H', '4H', '1D', '1W'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    timeframe === tf
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">Multi-timeframe price discovery, volume channels & dynamic moving averages</p>
        </div>

        {/* Indicators Overlay Toggles & Preset Strategy */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSMA50(!showSMA50)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                showSMA50
                  ? 'bg-sky-50 text-sky-800 border-sky-300 font-bold'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              <span>50 SMA</span>
              {showSMA50 ? <Eye className="w-3.5 h-3.5 text-sky-700" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowSMA200(!showSMA200)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                showSMA200
                  ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span>200 SMA</span>
              {showSMA200 ? <Eye className="w-3.5 h-3.5 text-amber-700" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Wrapper with Crisp Warm Light Background */}
      <div className="relative w-full h-[410px] bg-slate-50/60 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* Candlestick Legend with Calm Natural Palette */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-emerald-800">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-sm" /> Bullish Candle
          </span>
          <span className="flex items-center gap-1.5 font-bold text-rose-800">
            <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm" /> Bearish Candle
          </span>
          <span className="flex items-center gap-1.5 font-bold text-sky-800">
            <span className="w-3.5 h-1 bg-sky-600 rounded" /> 50 SMA ({sma50Val ? formatINR(sma50Val) : 'Calc'})
          </span>
          <span className="flex items-center gap-1.5 font-bold text-amber-800">
            <span className="w-3.5 h-1 bg-amber-600 rounded" /> 200 SMA ({sma200Val ? formatINR(sma200Val) : 'Calc'})
          </span>
        </div>
        <span className="text-slate-500 font-medium">65-Day Window • High-Resolution Render</span>
      </div>
    </div>
  );
}
