'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ApiClient } from '@/lib/api';
import { RAGForecastResult, RAGDocument } from '@/lib/types';
import ForecastCards from '@/components/forecast/ForecastCards';
import ScenarioTable from '@/components/forecast/ScenarioTable';
import RagDocumentsViewer from '@/components/forecast/RagDocumentsViewer';
import { TrendingUp, Sliders, RefreshCw, Search, Activity, Sparkles, BarChart2, Layers } from 'lucide-react';

function ForecastWorkspace() {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get('symbol') || 'BTC';

  const [symbol, setSymbol] = useState(initialSymbol);
  const [inputVal, setInputVal] = useState(initialSymbol);
  const [forecast, setForecast] = useState<RAGForecastResult | null>(null);
  const [retrievedDocs, setRetrievedDocs] = useState<RAGDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Scenario Simulator interactive sliders
  const [macroBias, setMacroBias] = useState<number>(0); // -30% to +30%
  const [volatilityMultiplier, setVolatilityMultiplier] = useState<number>(1.0); // 0.5x to 2.0x

  const loadForecast = useCallback(async (sym: string) => {
    setIsLoading(true);
    try {
      const data = await ApiClient.getForecast(sym);
      setForecast(data.forecast);
      setRetrievedDocs(data.retrievedDocuments || []);
    } catch (err) {
      console.error('Failed to load RAG forecast:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadForecast(symbol);
  }, [symbol, loadForecast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSymbol(inputVal.trim().toUpperCase());
    }
  };

  // Adjust forecast based on scenario simulator sliders
  const simulatedForecast: RAGForecastResult | null = forecast
    ? {
        ...forecast,
        timeframeForecasts: {
          '24h': {
            ...forecast.timeframeForecasts['24h'],
            expected: Number((forecast.timeframeForecasts['24h'].expected * (1 + (macroBias / 100) * 0.15)).toFixed(2)),
          },
          '7d': {
            ...forecast.timeframeForecasts['7d'],
            expected: Number((forecast.timeframeForecasts['7d'].expected * (1 + (macroBias / 100) * 0.5)).toFixed(2)),
          },
          '30d': {
            ...forecast.timeframeForecasts['30d'],
            expected: Number((forecast.timeframeForecasts['30d'].expected * (1 + macroBias / 100)).toFixed(2)),
          },
        },
        scenarios: forecast.scenarios.map((sc) => {
          let adjustedProb = sc.probability;
          if (sc.name === 'Bull Case') {
            adjustedProb = Math.min(0.85, Math.max(0.1, sc.probability + macroBias / 100));
          } else if (sc.name === 'Bear Case') {
            adjustedProb = Math.min(0.85, Math.max(0.1, sc.probability - macroBias / 100));
          }
          return {
            ...sc,
            probability: Number(adjustedProb.toFixed(2)),
            targetPrice: Number((sc.targetPrice * (1 + (macroBias / 100) * 0.5 * (sc.name === 'Bull Case' ? 1 : -0.5))).toFixed(2)),
          };
        }),
      }
    : null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-6 sm:space-y-10">
      
      {/* Top Banner with Company Logo & High Contrast Header */}
      <div className="relative overflow-hidden flex flex-wrap items-center justify-between gap-6 p-6 sm:p-9 rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-[#0c1222] border border-slate-200/90 dark:border-slate-800 p-1.5 flex items-center justify-center shadow-sm shrink-0">
              <Image
                src="/jh-logo.png"
                alt="JH Logo"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                  AI Predictive{' '}
                  <span className="text-gradient-cyan">
                    Scenario Forecasting
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 font-mono mt-1.5 font-medium">
                Historical cycle analogs, halving supply dynamics, and probabilistic boundary corridors
              </p>
            </div>
          </div>
        </div>

        {/* Ticker Search Box */}
        <form onSubmit={handleSubmit} className="relative z-10 flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Query Asset (BTC, ETH, SOL)..."
              className="w-full sm:w-56 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono font-bold focus:outline-none focus:border-slate-800 dark:focus:border-slate-500 transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 hover:from-amber-400 hover:via-rose-400 hover:to-fuchsia-500 text-white font-black text-xs font-mono flex items-center gap-2 shadow-md shadow-rose-500/20 transition-all disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Forecast Asset</span>
          </button>
        </form>
      </div>

      {/* Interactive Scenario Adjuster Controls */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-fuchsia-500/10 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Interactive Macro Scenario Stress-Testing
              </h3>
            </div>
          </div>

          {/* Quick Scenario Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setMacroBias(18); setVolatilityMultiplier(1.3); }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-mono font-bold transition-all"
            >
              +18% Fed Rate Cut
            </button>
            <button
              onClick={() => { setMacroBias(-15); setVolatilityMultiplier(1.6); }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/10 to-coral-500/10 hover:from-rose-500/20 hover:to-coral-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-xs font-mono font-bold transition-all"
            >
              -15% Liquidity Squeeze
            </button>
            <button
              onClick={() => { setMacroBias(0); setVolatilityMultiplier(1.0); }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold transition-all"
            >
              Reset Baseline
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          <div className="bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-white dark:from-[#1b1408] dark:to-slate-900 border border-amber-300/80 dark:border-amber-800/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-amber-900 dark:text-amber-300 font-bold uppercase">Macro Liquidity Shift Bias:</span>
              <span className={`font-black text-sm ${macroBias > 0 ? 'text-emerald-700 dark:text-emerald-400' : macroBias < 0 ? 'text-rose-700 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {macroBias > 0 ? '+' : ''}{macroBias}% ({macroBias > 0 ? 'Risk-On Expansion' : macroBias < 0 ? 'Tightening Shock' : 'Neutral'})
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={macroBias}
              onChange={(e) => setMacroBias(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer mt-1"
            />
          </div>

          <div className="bg-gradient-to-br from-cyan-50/70 via-sky-50/30 to-white dark:from-[#081720] dark:to-slate-900 border border-cyan-300/80 dark:border-cyan-800/60 p-5 rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-cyan-900 dark:text-cyan-300 font-bold uppercase">Volatility Envelope Multiplier:</span>
              <span className="font-black text-sm text-cyan-700 dark:text-cyan-400">{volatilityMultiplier.toFixed(1)}x (ATR Scaling)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={volatilityMultiplier}
              onChange={(e) => setVolatilityMultiplier(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>

      {/* 24h, 7d, 30d Projection Corridor Cards */}
      {simulatedForecast && (
        <ForecastCards forecast={simulatedForecast} />
      )}

      {/* Scenario Probability Distribution Matrix */}
      {simulatedForecast && (
        <ScenarioTable scenarios={simulatedForecast.scenarios} />
      )}

      {/* Retrieved RAG Documents & Analog Matches */}
      <RagDocumentsViewer
        documents={retrievedDocs}
        macroSummary={forecast?.ragInsights.macroRegimeSummary}
      />

    </div>
  );
}

export default function ForecastPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center text-slate-800 dark:text-slate-200 font-mono text-sm font-bold">
        Initializing RAG Forecasting Engine...
      </div>
    }>
      <ForecastWorkspace />
    </Suspense>
  );
}
