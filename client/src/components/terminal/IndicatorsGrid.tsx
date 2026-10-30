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
      {/* 1. Trend Line (SMA) */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">Primary Trend</span>
          <div className={`p-2 rounded-xl ${isAboveSma50 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'}`}>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <span className={`text-base font-black tracking-tight ${isAboveSma50 ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isAboveSma50 && isAboveSma200 ? 'Bull Macro Regime' : isAboveSma50 ? 'Interim Upside' : 'Bear Channel'}
          </span>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            50 SMA: <span className="text-slate-900 font-bold">{formatINR(indicators.sma50)}</span>
          </p>
        </div>
      </div>

      {/* 2. RSI */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">RSI (14) Momentum</span>
          <div className={`p-2 rounded-xl border ${rsiBg} ${rsiColor}`}>
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${rsiColor}`}>{indicators.rsi14}</span>
            <span className="text-xs text-slate-400 font-bold">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-600 truncate mt-1 font-medium">{rsiState}</p>
        </div>
      </div>

      {/* 3. MACD Momentum */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">MACD Velocity</span>
          <div className={`p-2 rounded-xl border ${isMacdPositive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <span className={`text-base font-black ${isMacdPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isMacdPositive ? '+ Accelerating Bull' : '- Seller Pressure'}
          </span>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Hist: <span className="text-slate-900 font-bold">{indicators.macdHist.toFixed(3)}</span>
          </p>
        </div>
      </div>

      {/* 4. ATR Volatility */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[148px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">ATR (14) Spread</span>
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            <Wind className="w-4 h-4" />
          </div>
        </div>
        <div className="font-mono">
          <span className="text-base font-black text-slate-900">±{formatINR(indicators.atr14)}</span>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Volatility: <span className="text-purple-700 font-bold">{((indicators.atr14 / currentPrice) * 100).toFixed(1)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
