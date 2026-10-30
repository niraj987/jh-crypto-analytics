'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ApiClient } from '@/lib/api';
import { RAGForecastResult, RAGDocument } from '@/lib/types';
import ForecastCards from '@/components/forecast/ForecastCards';
import ScenarioTable from '@/components/forecast/ScenarioTable';
import RagDocumentsViewer from '@/components/forecast/RagDocumentsViewer';
import { TrendingUp, Sliders, RefreshCw, Search } from 'lucide-react';

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
            expected: Number((forecast.timeframeForecasts['24h'].expected * (1 + macroBias / 100 * 0.15)).toFixed(2)),
          },
          '7d': {
            ...forecast.timeframeForecasts['7d'],
            expected: Number((forecast.timeframeForecasts['7d'].expected * (1 + macroBias / 100 * 0.5)).toFixed(2)),
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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-10">
      
      {/* Top Banner with Company Logo */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-7 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
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
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  AI Predictive Scenario Forecasting
                </h1>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-extrabold shadow-sm">
                  PRICE TARGETS (₹)
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-1 font-medium">
                Historical cycle analogs, halving supply dynamics, and probabilistic Monte Carlo price corridors
              </p>
            </div>
          </div>
        </div>

        {/* Ticker Search Box */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Query Asset (BTC, SOL, SUI)..."
              className="w-56 bg-slate-50 border border-slate-200 rounded-2xl py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 font-mono font-bold focus:outline-none focus:border-slate-800 focus:bg-white transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs font-mono flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Forecast</span>
          </button>
        </form>
      </div>

      {/* Interactive Scenario Adjuster Controls */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 shadow-sm">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">Interactive Macro Scenario Stress-Testing</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Dynamically stress-test price projections against macro liquidity shocks and volatility spikes</p>
            </div>
          </div>
          <button
            onClick={() => { setMacroBias(0); setVolatilityMultiplier(1.0); }}
            className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 underline transition-colors"
          >
            Reset Simulator
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-bold uppercase">Macro Liquidity Shift Bias:</span>
              <span className={`font-black text-sm ${macroBias > 0 ? 'text-emerald-700' : macroBias < 0 ? 'text-rose-700' : 'text-slate-700'}`}>
                {macroBias > 0 ? '+' : ''}{macroBias}% ({macroBias > 0 ? 'Risk-On Expansion' : macroBias < 0 ? 'Tightening Shock' : 'Neutral'})
              </span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={macroBias}
              onChange={(e) => setMacroBias(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer mt-1"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-bold uppercase">Volatility Envelope Multiplier:</span>
              <span className="font-black text-sm text-sky-700">{volatilityMultiplier.toFixed(1)}x (ATR Scaling)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={volatilityMultiplier}
              onChange={(e) => setVolatilityMultiplier(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer mt-1"
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
      <div className="min-h-[60vh] flex items-center justify-center text-slate-800 font-mono text-sm font-bold">
        Initializing RAG Forecasting Engine...
      </div>
    }>
      <ForecastWorkspace />
    </Suspense>
  );
}
