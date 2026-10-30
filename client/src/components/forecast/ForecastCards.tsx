'use client';

import React from 'react';
import { RAGForecastResult } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import { Clock, TrendingUp, Calendar } from 'lucide-react';

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
      accentColor: 'text-sky-700',
      accentBg: 'bg-sky-50 border-sky-200',
      cardBg: 'bg-gradient-to-br from-sky-50/80 via-blue-50/30 to-white border-sky-200/90 shadow-[0_10px_25px_-5px_rgba(2,132,199,0.06)]',
      corridorGrad: 'from-rose-500 via-amber-400 to-sky-500',
    },
    {
      horizon: '7-Day Horizon',
      sub: 'Swing Momentum Corridor',
      icon: TrendingUp,
      data: tf['7d'],
      accentColor: 'text-emerald-700',
      accentBg: 'bg-emerald-50 border-emerald-200',
      cardBg: 'bg-gradient-to-br from-emerald-50/80 via-teal-50/30 to-white border-emerald-200/90 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.06)]',
      corridorGrad: 'from-rose-500 via-amber-400 to-emerald-500',
    },
    {
      horizon: '30-Day Horizon',
      sub: 'Regime Macro Projection',
      icon: Calendar,
      data: tf['30d'],
      accentColor: 'text-purple-700',
      accentBg: 'bg-purple-50 border-purple-200',
      cardBg: 'bg-gradient-to-br from-purple-50/80 via-indigo-50/30 to-white border-purple-200/90 shadow-[0_10px_25px_-5px_rgba(168,85,247,0.06)]',
      corridorGrad: 'from-rose-500 via-amber-400 to-purple-500',
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
            className={`p-8 rounded-3xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between ${card.cardBg}`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${card.accentBg}`}>
                    <Icon className={`w-6 h-6 ${card.accentColor}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{card.horizon}</h4>
                    <p className="text-[11px] font-mono text-slate-500 font-medium">{card.sub}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-extrabold shadow-inner">
                  {Math.round(card.data.confidence * 100)}% Conf
                </span>
              </div>

              {/* Expected Price Target in INR */}
              <div className="my-5 font-mono">
                <span className="text-xs text-slate-500 block font-bold uppercase">Expected Target (₹):</span>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {formatINR(card.data.expected)}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isBullish ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-rose-800 bg-rose-50 border border-rose-200'
                    }`}
                  >
                    {isBullish ? '+' : ''}{diffPct.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Range Corridor */}
            <div className="pt-5 border-t border-slate-100 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>Lower Bound (Floor):</span>
                <span className="text-rose-700 font-bold">{formatINR(card.data.min)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>Upper Bound (Ceiling):</span>
                <span className="text-emerald-700 font-bold">{formatINR(card.data.max)}</span>
              </div>

              {/* Corridor Visualizer */}
              <div className="w-full h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden mt-3 p-[1px]">
                <div
                  className={`h-full bg-gradient-to-r ${card.corridorGrad} rounded-full shadow-sm`}
                  style={{ width: `${card.data.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
