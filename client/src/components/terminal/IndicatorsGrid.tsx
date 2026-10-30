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
      {/* 1. Trend Line (SMA) - Ocean Cyan & Aquamarine Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-50/90 via-sky-50/40 to-white dark:from-[#051722] dark:via-[#031018] dark:to-[#02080d] border border-cyan-300/90 dark:border-cyan-700/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-cyan-800 dark:text-cyan-300 font-bold uppercase tracking-wider">Primary Trend</span>
          <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-base font-black tracking-tight text-gradient-cyan block truncate">
            {isAboveSma50 && isAboveSma200 ? 'Bull Macro Regime' : isAboveSma50 ? 'Interim Upside' : 'Bear Channel'}
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
            50 SMA: <span className="text-slate-950 dark:text-white font-black">{formatINR(indicators.sma50)}</span>
          </p>
        </div>
      </div>

      {/* 2. RSI - Sunset Coral & Tangerine Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-50/90 via-orange-50/40 to-white dark:from-[#26070e] dark:via-[#190409] dark:to-[#0d0205] border border-rose-300/90 dark:border-rose-700/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-rose-800 dark:text-rose-300 font-bold uppercase tracking-wider">Momentum RSI(14)</span>
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gradient-sunset">{rsi.toFixed(1)}</span>
            <span className={`text-[11px] font-bold ${rsiColor}`}>{rsiState}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 rounded-full" 
              style={{ width: `${Math.min(100, Math.max(0, rsi))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. MACD - Neon Fuchsia & Purple Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-fuchsia-50/90 via-purple-50/40 to-white dark:from-[#22071d] dark:via-[#170413] dark:to-[#0d020a] border border-fuchsia-300/90 dark:border-fuchsia-700/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-fuchsia-800 dark:text-fuchsia-300 font-bold uppercase tracking-wider">MACD Histogram</span>
          <div className="p-2 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-800 dark:text-fuchsia-300 border border-fuchsia-300 dark:border-fuchsia-700">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-base font-black text-gradient-berry block truncate">
            {isMacdPositive ? '+ Positive Acceleration' : '- Bearish Pressure'}
          </span>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Hist: <span className="text-slate-950 dark:text-white font-black">{indicators.macdHist.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* 4. Volatility (ATR) - Sunburst Amber Gold Tile */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50/90 via-yellow-50/40 to-white dark:from-[#211204] dark:via-[#160b02] dark:to-[#0c0501] border border-amber-300/90 dark:border-amber-700/80 shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">Volatility (14 ATR)</span>
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            <Wind className="w-4 h-4" />
          </div>
        </div>
        <div>
          <span className="text-base font-black text-gradient-gold block truncate">
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
