'use client';

import React from 'react';
import { PriceScenario } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import { CheckCircle2, TrendingUp, MinusCircle, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ScenarioTableProps {
  scenarios: PriceScenario[];
}

export default function ScenarioTable({ scenarios }: ScenarioTableProps) {
  const getScenarioTheme = (name: string) => {
    switch (name) {
      case 'Bull Case':
        return {
          icon: TrendingUp,
          border: 'border-emerald-300 dark:border-emerald-800/80',
          cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-slate-50 dark:from-[#091a18] dark:via-[#071313] dark:to-[#050e0e]',
          badge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-sm',
          priceColor: 'text-emerald-700 dark:text-emerald-400',
          dot: 'text-emerald-600',
        };
      case 'Base Case':
        return {
          icon: MinusCircle,
          border: 'border-sky-300 dark:border-sky-800/80',
          cardBg: 'bg-gradient-to-br from-sky-50/90 via-white to-slate-50 dark:from-[#0c1626] dark:via-[#09101d] dark:to-[#070b14]',
          badge: 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800 shadow-sm',
          priceColor: 'text-sky-700 dark:text-sky-400',
          dot: 'text-sky-600',
        };
      case 'Bear Case':
        return {
          icon: AlertTriangle,
          border: 'border-rose-300 dark:border-rose-800/80',
          cardBg: 'bg-gradient-to-br from-rose-50/90 via-white to-slate-50 dark:from-[#1c0c11] dark:via-[#14080c] dark:to-[#0d0407]',
          badge: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800 shadow-sm',
          priceColor: 'text-rose-700 dark:text-rose-400',
          dot: 'text-rose-600',
        };
      default:
        return {
          icon: TrendingUp,
          border: 'border-slate-200 dark:border-slate-800',
          cardBg: 'bg-white dark:bg-slate-900',
          badge: 'bg-slate-100 text-slate-800',
          priceColor: 'text-slate-900 dark:text-white',
          dot: 'text-slate-600',
        };
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
      <div className="mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Predictive Scenario Probability Matrix
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((sc) => {
          const theme = getScenarioTheme(sc.name);
          const Icon = theme.icon;

          return (
            <div
              key={sc.name}
              className={`p-7 rounded-3xl border ${theme.border} ${theme.cardBg} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-5`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <Icon className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                    </div>
                    <span className="text-base font-black text-slate-900 dark:text-white">{sc.name}</span>
                  </div>
                  <span className={`text-xs font-mono font-black px-3 py-1 rounded-full border ${theme.badge}`}>
                    {Math.round(sc.probability * 100)}% Prob
                  </span>
                </div>

                {/* Target Price in INR */}
                <div className="my-4 font-mono">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold uppercase">
                    Calculated Target (₹):
                  </span>
                  <span className={`text-xl sm:text-2xl lg:text-3xl font-black ${theme.priceColor} tracking-tight block truncate`} title={formatINR(sc.targetPrice)}>
                    {formatINR(sc.targetPrice)}
                  </span>
                </div>

                {/* Invalidation Level */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invalidation Level:</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{formatINR(sc.invalidationLevel)}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-4">
                  {sc.catalysts && sc.catalysts.length > 0 ? sc.catalysts.join(' • ') : 'Macro liquidity and post-halving supply confluence.'}
                </p>
              </div>

              {/* Rationale Checklist */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono space-y-1.5">
                <div className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">Key Drivers:</div>
                <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Halving supply restriction</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Spot ETF accumulation flow</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
