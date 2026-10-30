'use client';

import React from 'react';
import { TechnicalIndicators } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import { TrendingUp, Flame, Zap, Wind } from 'lucide-react';

interface IndicatorsGridProps {
  indicators: TechnicalIndicators;
  currentPrice: number;
}

export default function IndicatorsGrid({ indicators, currentPrice }: IndicatorsGridProps) {
  const isAboveSma50 = currentPrice > indicators.sma50;
  const isAboveSma200 = currentPrice > indicators.sma200;

  // RSI status
  const rsi = indicators.rsi14;
  let rsiState = 'Balanced Neutral';
  let rsiColor = 'text-sky-700';
  let rsiBg = 'bg-sky-50 border-sky-200';
  if (rsi < 30) {
    rsiState = 'Oversold (Discount)';
    rsiColor = 'text-emerald-700';
    rsiBg = 'bg-emerald-50 border-emerald-200';
  } else if (rsi > 70) {
    rsiState = 'Overbought (Exhaustion)';
    rsiColor = 'text-rose-700';
    rsiBg = 'bg-rose-50 border-rose-200';
  }

  // MACD status
  const isMacdPositive = indicators.macdHist >= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
      {/* 1. Trend Line (SMA) - Sky Blue Gradient Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-50 via-sky-100/40 to-white border border-sky-200/90 shadow-[0_8px_20px_-6px_rgba(2,132,199,0.08)] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-sky-800 font-bold uppercase tracking-wider">Primary Trend</span>
          <div className={`p-2 rounded-xl ${isAboveSma50 ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-300' : 'text-rose-800 bg-rose-100/80 border border-rose-300'}`}>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <span className={`text-base font-black tracking-tight ${isAboveSma50 ? 'text-emerald-800' : 'text-rose-800'}`}>
            {isAboveSma50 && isAboveSma200 ? 'Bull Macro Regime' : isAboveSma50 ? 'Interim Upside' : 'Bear Channel'}
          </span>
          <p className="text-[11px] text-slate-600 mt-1 font-medium">
            50 SMA: <span className="text-slate-950 font-black">{formatINR(indicators.sma50)}</span>
          </p>
        </div>
      </div>

      {/* 2. RSI - Emerald / Mint Gradient Tile */}
      <div className={`p-5 rounded-3xl border shadow-[0_8px_20px_-6px_rgba(16,185,129,0.08)] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px] ${
        rsi > 70 
          ? 'bg-gradient-to-br from-rose-50 via-rose-100/30 to-white border-rose-200/90' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-emerald-200/90'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider">RSI (14) Momentum</span>
          <div className={`p-2 rounded-xl border ${rsiBg} ${rsiColor}`}>
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${rsiColor}`}>{indicators.rsi14}</span>
            <span className="text-xs text-slate-500 font-bold">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-700 truncate mt-1 font-bold">{rsiState}</p>
        </div>
      </div>

      {/* 3. MACD Momentum - Indigo / Blue Gradient Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-blue-50/40 to-white border border-indigo-200/90 shadow-[0_8px_20px_-6px_rgba(99,102,241,0.08)] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-indigo-800 font-bold uppercase tracking-wider">MACD Velocity</span>
          <div className={`p-2 rounded-xl border ${isMacdPositive ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300' : 'bg-rose-100/80 text-rose-800 border-rose-300'}`}>
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <span className={`text-base font-black ${isMacdPositive ? 'text-emerald-800' : 'text-rose-800'}`}>
            {isMacdPositive ? '+ Accelerating Bull' : '- Seller Pressure'}
          </span>
          <p className="text-[11px] text-slate-600 mt-1 font-medium">
            Hist: <span className="text-slate-950 font-black">{indicators.macdHist.toFixed(3)}</span>
          </p>
        </div>
      </div>

      {/* 4. ATR Volatility - Purple / Amethyst Gradient Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-50 via-fuchsia-50/30 to-white border border-purple-200/90 shadow-[0_8px_20px_-6px_rgba(168,85,247,0.08)] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-purple-800 font-bold uppercase tracking-wider">ATR (14) Spread</span>
          <div className="p-2 rounded-xl bg-purple-100/80 text-purple-800 border border-purple-300">
            <Wind className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <span className="text-base font-black text-slate-950">±{formatINR(indicators.atr14)}</span>
          <p className="text-[11px] text-slate-600 mt-1 font-medium">
            Volatility: <span className="text-purple-800 font-black">{((indicators.atr14 / currentPrice) * 100).toFixed(1)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
