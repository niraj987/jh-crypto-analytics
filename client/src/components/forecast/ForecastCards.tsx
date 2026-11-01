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
      icon: Clock,
      data: tf['24h'],
      accentColor: 'text-amber-600 dark:text-amber-400',
      accentBg: 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700',
      cardBg: 'bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white dark:from-[#211204] dark:via-[#160b02] dark:to-[#0c0501] shadow-xl',
      borderGlow: 'border-amber-300 dark:border-amber-700/80',
      priceGradient: 'text-gradient-sunset',
    },
    {
      horizon: '7-Day Horizon',
      icon: TrendingUp,
      data: tf['7d'],
      accentColor: 'text-lime-600 dark:text-lime-400',
      accentBg: 'bg-lime-100 dark:bg-lime-950/60 border-lime-300 dark:border-lime-700',
      cardBg: 'bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white dark:from-[#0a2310] dark:via-[#07170a] dark:to-[#030d05] shadow-xl',
      borderGlow: 'border-lime-300 dark:border-lime-700/80',
      priceGradient: 'text-gradient-lime',
    },
    {
      horizon: '30-Day Horizon',
      icon: Calendar,
      data: tf['30d'],
      accentColor: 'text-fuchsia-600 dark:text-fuchsia-400',
      accentBg: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 border-fuchsia-300 dark:border-fuchsia-700',
      cardBg: 'bg-gradient-to-br from-fuchsia-50/90 via-pink-50/40 to-white dark:from-[#250926] dark:via-[#19061a] dark:to-[#0f0310] shadow-xl',
      borderGlow: 'border-fuchsia-300 dark:border-fuchsia-700/80',
      priceGradient: 'text-gradient-berry',
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
                  </div>
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold shadow-inner">
                  {Math.round(card.data.confidence * 100)}% Conf
                </span>
              </div>

              {/* Expected Price Target in INR */}
              <div className="my-5 font-mono">
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold uppercase">Expected Target (₹):</span>
                <div className="flex flex-wrap items-baseline gap-2 mt-1">
                  <span className={`text-xl sm:text-2xl lg:text-3xl font-black ${card.priceGradient} tracking-tight block truncate`} title={formatINR(card.data.expected)}>
                    {formatINR(card.data.expected)}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 shrink-0 ${
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
