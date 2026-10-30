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
    <div className="w-full rounded-3xl bg-white/95 dark:bg-[#121721] backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 p-7 sm:p-9 shadow-xl flex flex-col justify-between transition-all duration-300">
      
      {/* Top Header with Generous Spacing & Balanced Typography */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5 max-w-2xl">
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
      <div className="py-6 flex justify-center">
        <GaugeMeter
          score={verdict.aggregateScore}
          action={verdict.finalAction}
          confidence={verdict.confidenceScore}
        />
      </div>

      {/* Key Order Strategy Levels with Multi-Chromatic Alignment & Vibrant Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-6 w-full">
        
        {/* Optimal Entry (Cyan & Amber Jewel) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-50/90 via-amber-50/30 to-white dark:from-[#061e29] dark:via-[#04141c] dark:to-[#020a0e] border border-cyan-300/90 dark:border-cyan-700/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between min-h-[130px] overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" /> Optimal Entry
            </span>
            <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700">
              FILL
            </span>
          </div>
          <div className="my-2.5">
            <span className="text-lg sm:text-xl md:text-2xl font-black font-mono tracking-tight text-gradient-cyan block truncate" title={formatINR(verdict.entryTarget)}>
              {formatINR(verdict.entryTarget)}
            </span>
          </div>
          <div className="pt-2 border-t border-cyan-100 dark:border-cyan-900/50 flex items-center justify-between">
            <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-300">
              Recommended Fill
            </span>
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
              Limit
            </span>
          </div>
        </div>

        {/* Target 1 (TP1) (Spring Lime & Emerald) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-lime-50/90 via-emerald-50/40 to-white dark:from-[#0a2310] dark:via-[#07170a] dark:to-[#030d05] border border-lime-300/90 dark:border-lime-700/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between min-h-[130px] overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-lime-800 dark:text-lime-300 flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" /> Target 1 (TP1)
            </span>
            <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-700">
              TAKE PROFIT
            </span>
          </div>
          <div className="my-2.5">
            <span className="text-lg sm:text-xl md:text-2xl font-black font-mono tracking-tight text-gradient-lime block truncate" title={formatINR(verdict.takeProfit1)}>
              {formatINR(verdict.takeProfit1)}
            </span>
          </div>
          <div className="pt-2 border-t border-lime-100 dark:border-lime-900/50 flex items-center justify-between">
            <span className="text-[11px] font-bold text-lime-700 dark:text-lime-300">
              +6.5% Expected Move
            </span>
            <span className="text-[10px] font-mono text-lime-600 dark:text-lime-400 font-semibold">
              TP1
            </span>
          </div>
        </div>

        {/* Target 2 (TP2) (Neon Berry & Orchid Amethyst) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-fuchsia-50/90 via-pink-50/40 to-white dark:from-[#250926] dark:via-[#19061a] dark:to-[#0f0310] border border-fuchsia-300/90 dark:border-fuchsia-700/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between min-h-[130px] overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-fuchsia-800 dark:text-fuchsia-300 flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-fuchsia-600 dark:text-fuchsia-400" /> Target 2 (TP2)
            </span>
            <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-800 dark:text-fuchsia-300 border border-fuchsia-300 dark:border-fuchsia-700">
              RUNNER
            </span>
          </div>
          <div className="my-2.5">
            <span className="text-lg sm:text-xl md:text-2xl font-black font-mono tracking-tight text-gradient-berry block truncate" title={formatINR(verdict.takeProfit2)}>
              {formatINR(verdict.takeProfit2)}
            </span>
          </div>
          <div className="pt-2 border-t border-fuchsia-100 dark:border-fuchsia-900/50 flex items-center justify-between">
            <span className="text-[11px] font-bold text-fuchsia-700 dark:text-fuchsia-300">
              +12.4% Extended Runner
            </span>
            <span className="text-[10px] font-mono text-fuchsia-600 dark:text-fuchsia-400 font-semibold">
              TP2
            </span>
          </div>
        </div>

        {/* Stop Loss (SL) (Fiery Coral & Sunset Ruby) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/90 via-orange-50/40 to-white dark:from-[#290a12] dark:via-[#1a050a] dark:to-[#0f0205] border border-rose-300/90 dark:border-rose-700/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between min-h-[130px] overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Stop Loss (SL)
            </span>
            <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
              PROTECTION
            </span>
          </div>
          <div className="my-2.5">
            <span className="text-lg sm:text-xl md:text-2xl font-black font-mono tracking-tight text-gradient-sunset block truncate" title={formatINR(verdict.stopLoss)}>
              {formatINR(verdict.stopLoss)}
            </span>
          </div>
          <div className="pt-2 border-t border-rose-100 dark:border-rose-900/50 flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400">
              -4.5% Hard Invalidation Target
            </span>
            <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold">
              SL
            </span>
          </div>
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
