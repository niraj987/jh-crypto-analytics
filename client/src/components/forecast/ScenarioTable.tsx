'use client';

import React from 'react';
import { PriceScenario } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import { CheckCircle2, TrendingUp, MinusCircle, AlertTriangle } from 'lucide-react';

interface ScenarioTableProps {
  scenarios: PriceScenario[];
}

export default function ScenarioTable({ scenarios }: ScenarioTableProps) {
  const getScenarioTheme = (name: string) => {
    switch (name) {
      case 'Bull Case':
        return {
          icon: TrendingUp,
          border: 'border-emerald-200',
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm',
          priceColor: 'text-emerald-700',
          dot: 'text-emerald-600',
        };
      case 'Base Case':
        return {
          icon: MinusCircle,
          border: 'border-sky-200',
          badge: 'bg-sky-50 text-sky-800 border-sky-300 shadow-sm',
          priceColor: 'text-sky-700',
          dot: 'text-sky-600',
        };
      case 'Bear Case':
        return {
          icon: AlertTriangle,
          border: 'border-rose-200',
          badge: 'bg-rose-50 text-rose-800 border-rose-300 shadow-sm',
          priceColor: 'text-rose-700',
          dot: 'text-rose-600',
        };
      default:
        return {
          icon: TrendingUp,
          border: 'border-slate-200',
          badge: 'bg-slate-100 text-slate-800',
          priceColor: 'text-slate-900',
          dot: 'text-slate-600',
        };
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
      <div className="mb-8 pb-4 border-b border-slate-100">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2.5">
          <span>RAG-Conditioned Scenario Probability Matrix (INR ₹)</span>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-extrabold">
            3 REGIMES
          </span>
        </h3>
        <p className="text-xs text-slate-500 font-mono mt-1 font-medium">
          Dynamic scenario weights synthesized by historical cycle retrieval and real-time INR volatility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((sc) => {
          const theme = getScenarioTheme(sc.name);
          const Icon = theme.icon;

          return (
            <div
              key={sc.name}
              className={`p-7 rounded-3xl bg-slate-50/50 border ${theme.border} hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-5 h-5 ${theme.priceColor}`} />
                    <h4 className="text-sm font-black text-slate-900 tracking-wide">{sc.name}</h4>
                  </div>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${theme.badge}`}>
                    {Math.round(sc.probability * 100)}% Prob
                  </span>
                </div>

                {/* Target Price in INR */}
                <div className="font-mono my-4">
                  <span className="text-[11px] text-slate-500 block font-bold uppercase">Scenario Target (INR):</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className={`text-2xl font-black ${theme.priceColor} tracking-tight`}>
                      {formatINR(sc.targetPrice)}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        sc.percentageChange >= 0 ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' : 'text-rose-800 bg-rose-50 border border-rose-200'
                      }`}
                    >
                      {sc.percentageChange >= 0 ? '+' : ''}{sc.percentageChange}%
                    </span>
                  </div>
                </div>

                {/* Catalytic Conditions */}
                <div className="pt-4 border-t border-slate-200 space-y-2.5">
                  <p className="text-[11px] font-mono text-slate-500 font-bold uppercase">Regime Triggers:</p>
                  <ul className="space-y-2 text-xs text-slate-600 font-mono font-medium">
                    {sc.catalysts.map((cat, i) => (
                      <li key={i} className="flex items-start gap-2 leading-snug bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${theme.dot}`} />
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Invalidation Stop Level */}
              <div className="mt-6 pt-4 border-t border-slate-200 font-mono text-[11px] flex items-center justify-between text-slate-500">
                <span className="font-bold">Invalidation Floor:</span>
                <span className="text-slate-900 font-black text-xs">{formatINR(sc.invalidationLevel)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
