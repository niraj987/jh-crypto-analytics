'use client';

import React from 'react';
import { ConsensusVerdict } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import GaugeMeter from '../common/GaugeMeter';
import { Target, ShieldAlert, ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';

interface ConsensusCardProps {
  verdict: ConsensusVerdict;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function ConsensusCard({ verdict, onRefresh, isLoading }: ConsensusCardProps) {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800';
      case 'MODERATE':
        return 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-400 border-sky-300 dark:border-sky-800';
      case 'HIGH':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-800';
      case 'CRITICAL':
        return 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="rounded-3xl bg-white/95 dark:bg-[#121721] backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 p-8 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.08)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)]">
      
      {/* Top Header with Generous Spacing & Balanced Typography */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              QUANT REASONING
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Institutional Algorithmic Desk</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            Quantitative Buy/Sell Consensus Matrix
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Weighted algorithmic consensus signal dynamically computed with live volatility bands, orderflow pressure, and mathematical target coordinates.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-medium text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Recalculate Quantitative Consensus"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline font-bold">Recalculate</span>
        </button>
      </div>

      {/* Main Gauge Visualizer */}
      <div className="py-4 flex justify-center">
        <GaugeMeter
          score={verdict.aggregateScore}
          action={verdict.finalAction}
          confidence={verdict.confidenceScore}
        />
      </div>

      {/* Key Order Strategy Levels with Distinct Colored Background Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-5 text-xs">
        {/* Optimal Entry */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-[#0f141d] dark:to-slate-950 border border-slate-300/80 dark:border-slate-800 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <span className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider font-bold">Optimal Entry</span>
          <span className="text-slate-950 dark:text-white font-black text-base sm:text-lg block mt-1.5 font-mono">{formatINR(verdict.entryTarget)}</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">Recommended Fill</span>
        </div>

        {/* Target 1 (TP1) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-100/90 via-emerald-50 to-white dark:from-emerald-950/40 dark:via-[#0e1818] dark:to-slate-950 border border-emerald-300/90 dark:border-emerald-800/80 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <span className="text-emerald-900 dark:text-emerald-300 block text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Target 1 (TP1)
          </span>
          <span className="text-emerald-800 dark:text-emerald-400 font-black text-base sm:text-lg block mt-1.5 font-mono">{formatINR(verdict.takeProfit1)}</span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-500 block mt-1 font-semibold">+6.5% Expected Move</span>
        </div>

        {/* Target 2 (TP2) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-100/90 via-sky-50 to-white dark:from-sky-950/40 dark:via-[#0e1520] dark:to-slate-950 border border-sky-300/90 dark:border-sky-800/80 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <span className="text-sky-900 dark:text-sky-300 block text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Target 2 (TP2)
          </span>
          <span className="text-sky-800 dark:text-sky-400 font-black text-base sm:text-lg block mt-1.5 font-mono">{formatINR(verdict.takeProfit2)}</span>
          <span className="text-[10px] text-sky-700 dark:text-sky-500 block mt-1 font-semibold">+12.4% Extended Runner</span>
        </div>

        {/* Stop Loss (SL) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-100/90 via-rose-50 to-white dark:from-rose-950/40 dark:via-[#180e14] dark:to-slate-950 border border-rose-300/90 dark:border-rose-800/80 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <span className="text-rose-900 dark:text-rose-300 block text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
            <ArrowDownRight className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Stop Loss (SL)
          </span>
          <span className="text-rose-800 dark:text-rose-400 font-black text-base sm:text-lg block mt-1.5 font-mono">{formatINR(verdict.stopLoss)}</span>
          <span className="text-[10px] text-rose-700 dark:text-rose-500 block mt-1 font-semibold">-4.5% Hard Invalidation</span>
        </div>
      </div>

      {/* Risk & Horizon Metadata */}
      <div className="flex flex-wrap items-center justify-between text-xs py-4 px-2 border-t border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Time Horizon:</span>
          <span className="text-slate-900 dark:text-slate-200 font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {verdict.primaryTimeHorizon.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Risk Profile:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskBadge(verdict.riskLevel)}`}>
            {verdict.riskLevel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Risk/Reward:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            {verdict.riskRewardRatio}R
          </span>
        </div>
      </div>

      {/* Executive Summary Thesis - Spacious and Highly Readable */}
      <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-[#0c1017] dark:to-emerald-950/20 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Executive Multi-Agent Consensus Thesis
          </h4>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {verdict.executiveSummary}
        </p>
      </div>

    </div>
  );
}
