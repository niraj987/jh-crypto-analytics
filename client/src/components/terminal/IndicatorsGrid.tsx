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
  let rsiColor = 'text-sky-700 dark:text-sky-400';
  let rsiBg = 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
  if (rsi < 30) {
    rsiState = 'Oversold (Discount)';
    rsiColor = 'text-emerald-700 dark:text-emerald-400';
    rsiBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  } else if (rsi > 70) {
    rsiState = 'Overbought (Exhaustion)';
    rsiColor = 'text-rose-700 dark:text-rose-400';
    rsiBg = 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  }

  // MACD status
  const isMacdPositive = indicators.macdHist >= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch font-mono">
      {/* 1. Trend Line (SMA) - Sky Blue Gradient Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-50 via-sky-100/40 to-white dark:from-sky-950/40 dark:via-[#0c1420] dark:to-slate-950 border border-sky-200/90 dark:border-sky-800/80 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-sky-800 dark:text-sky-300 font-bold uppercase tracking-wider">Primary Trend</span>
          <div className={`p-2 rounded-xl ${isAboveSma50 ? 'bg-emerald-100/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' : 'text-rose-800 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-900/60 border border-rose-300 dark:border-rose-700'}`}>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className={`text-base font-black tracking-tight ${isAboveSma50 ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-800 dark:text-rose-400'}`}>
            {isAboveSma50 && isAboveSma200 ? 'Bull Macro Regime' : isAboveSma50 ? 'Interim Upside' : 'Bear Channel'}
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
            50 SMA: <span className="text-slate-950 dark:text-white font-black">{formatINR(indicators.sma50)}</span>
          </p>
        </div>
      </div>

      {/* 2. RSI - Emerald / Mint Gradient Tile */}
      <div className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px] ${
        rsi > 70 
          ? 'bg-gradient-to-br from-rose-50 via-rose-100/30 to-white dark:from-rose-950/40 dark:via-[#180e14] dark:to-slate-950 border-rose-200/90 dark:border-rose-800/80' 
          : 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white dark:from-emerald-950/40 dark:via-[#0c1818] dark:to-slate-950 border-emerald-200/90 dark:border-emerald-800/80'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">Momentum RSI(14)</span>
          <div className="p-2 rounded-xl bg-emerald-100/80 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-950 dark:text-white">{rsi.toFixed(1)}</span>
            <span className={`text-[11px] font-bold ${rsiColor}`}>{rsiState}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full ${rsi > 70 ? 'bg-rose-500' : rsi < 30 ? 'bg-emerald-500' : 'bg-sky-500'}`} 
              style={{ width: `${Math.min(100, Math.max(0, rsi))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. MACD - Indigo / Purple Gradient Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50/40 to-white dark:from-purple-950/40 dark:via-[#140e20] dark:to-slate-950 border border-purple-200/90 dark:border-purple-800/80 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-purple-800 dark:text-purple-300 font-bold uppercase tracking-wider">MACD Histogram</span>
          <div className="p-2 rounded-xl bg-purple-100/80 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className={`text-base font-black ${isMacdPositive ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-800 dark:text-rose-400'}`}>
            {isMacdPositive ? 'Positive Acceleration' : 'Bearish Pressure'}
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Hist: <span className="text-slate-950 dark:text-white font-black">{indicators.macdHist.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* 4. Volatility (ATR) - Amber Gradient Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-white dark:from-amber-950/40 dark:via-[#18120c] dark:to-slate-950 border border-amber-200/90 dark:border-amber-800/80 shadow-sm flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">Volatility (14 ATR)</span>
          <div className="p-2 rounded-xl bg-amber-100/80 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            <Wind className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-base font-black text-slate-950 dark:text-white">
            {formatINR(indicators.atr14)}
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Band: <span className="text-amber-800 dark:text-amber-400 font-bold">±{((indicators.atr14 / currentPrice) * 100).toFixed(2)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
