'use client';

import React from 'react';
import { RAGForecastResult } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import { Clock, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ForecastCardsProps {
  forecast: RAGForecastResult;
}

export default function ForecastCards({ forecast }: ForecastCardsProps) {
  const currentPrice = forecast.currentPrice;
  const tf = forecast.timeframeForecasts;

  const cards = [
    {
      horizon: '24-Hour Horizon',
      sub: 'Intraday Scalp Envelope',
      icon: Clock,
      data: tf['24h'],
      accentColor: 'text-sky-600 dark:text-sky-400',
      accentBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
      cardBg: 'bg-gradient-to-br from-sky-50/90 via-white to-slate-50 dark:from-[#0c1626] dark:via-[#09101d] dark:to-[#070b14] border-sky-200/90 dark:border-slate-800 shadow-xl',
      borderGlow: 'border-sky-300 dark:border-sky-800/80',
    },
    {
      horizon: '7-Day Horizon',
      sub: 'Swing Momentum Corridor',
      icon: TrendingUp,
      data: tf['7d'],
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
      cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-slate-50 dark:from-[#091a18] dark:via-[#071313] dark:to-[#050e0e] border-emerald-200/90 dark:border-slate-800 shadow-xl',
      borderGlow: 'border-emerald-300 dark:border-emerald-800/80',
    },
    {
      horizon: '30-Day Horizon',
      sub: 'Regime Macro Projection',
      icon: Calendar,
      data: tf['30d'],
      accentColor: 'text-purple-600 dark:text-purple-400',
      accentBg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
      cardBg: 'bg-gradient-to-br from-purple-50/90 via-white to-slate-50 dark:from-[#170d24] dark:via-[#11091b] dark:to-[#0a0511] border-purple-200/90 dark:border-slate-800 shadow-xl',
      borderGlow: 'border-purple-300 dark:border-purple-800/80',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const diffPct = (((card.data.expected - currentPrice) / currentPrice) * 100);
        const isBullish = diffPct >= 0;

        return (
          <div
            key={card.horizon}
            className={`p-7 sm:p-8 rounded-3xl border ${card.borderGlow} ${card.cardBg} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${card.accentBg}`}>
                    <Icon className={`w-6 h-6 ${card.accentColor}`} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">{card.horizon}</h4>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">{card.sub}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold shadow-inner">
                  {Math.round(card.data.confidence * 100)}% Conf
                </span>
              </div>

              {/* Expected Price Target in INR */}
              <div className="my-5 font-mono">
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold uppercase">Expected Target (₹):</span>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {formatINR(card.data.expected)}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 ${
                      isBullish 
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800' 
                        : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {isBullish ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {isBullish ? '+' : ''}{diffPct.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Range Corridor */}
            <div className="pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>Lower Bound (Floor):</span>
                <span className="text-rose-700 dark:text-rose-400 font-bold">{formatINR(card.data.min)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>Upper Bound (Ceiling):</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">{formatINR(card.data.max)}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2 relative">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(10, ((card.data.expected - card.data.min) / (card.data.max - card.data.min)) * 100))}%`
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
