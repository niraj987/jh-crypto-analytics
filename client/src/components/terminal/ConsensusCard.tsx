'use client';

import React from 'react';
import { ConsensusVerdict } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import GaugeMeter from '../common/GaugeMeter';
import { Target, ShieldAlert, ArrowUpRight, ArrowDownRight, RefreshCw, Sparkles } from 'lucide-react';

interface ConsensusCardProps {
  verdict: ConsensusVerdict;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function ConsensusCard({ verdict, onRefresh, isLoading }: ConsensusCardProps) {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'MODERATE':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'HIGH':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2.5">
            <span>Executive Buy/Sell Consensus Matrix</span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              LANGGRAPH REASONING
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Multi-agent weighted quantitative signal with execution parameters</p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm transition-all hover:scale-105 disabled:opacity-50"
          title="Recalculate Multi-Agent Consensus"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Main Gauge Visualizer */}
      <div className="py-2 flex justify-center">
        <GaugeMeter
          score={verdict.aggregateScore}
          action={verdict.finalAction}
          confidence={verdict.confidenceScore}
        />
      </div>

      {/* Key Order Strategy Levels with Crisp White Pop-Up Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:-translate-y-1 hover:shadow-sm transition-all duration-200">
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Optimal Entry</span>
          <span className="text-slate-900 font-black text-sm block mt-1">{formatINR(verdict.entryTarget)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 hover:-translate-y-1 hover:shadow-sm transition-all duration-200">
          <span className="text-emerald-800 block text-[10px] font-bold uppercase flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Target 1 (TP1)
          </span>
          <span className="text-emerald-700 font-black text-sm block mt-1">{formatINR(verdict.takeProfit1)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 hover:-translate-y-1 hover:shadow-sm transition-all duration-200">
          <span className="text-sky-800 block text-[10px] font-bold uppercase flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Target 2 (TP2)
          </span>
          <span className="text-sky-700 font-black text-sm block mt-1">{formatINR(verdict.takeProfit2)}</span>
        </div>
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 hover:-translate-y-1 hover:shadow-sm transition-all duration-200">
          <span className="text-rose-800 block text-[10px] font-bold uppercase flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5" /> Stop Loss (SL)
          </span>
          <span className="text-rose-700 font-black text-sm block mt-1">{formatINR(verdict.stopLoss)}</span>
        </div>
      </div>

      {/* Risk & Horizon Metadata */}
      <div className="flex flex-wrap items-center justify-between text-xs font-mono py-3.5 px-1 border-t border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Time Horizon:</span>
          <span className="text-slate-900 font-bold">{verdict.primaryTimeHorizon.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Risk Profile:</span>
          <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${getRiskBadge(verdict.riskLevel)}`}>
            {verdict.riskLevel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Risk/Reward:</span>
          <span className="text-emerald-700 font-black text-sm">{verdict.riskRewardRatio}R</span>
        </div>
      </div>

      {/* Executive Summary Thesis */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed shadow-sm">
        <p className="text-emerald-800 font-black mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Executive Multi-Agent Thesis:
        </p>
        <p className="leading-relaxed">{verdict.executiveSummary}</p>
      </div>
    </div>
  );
}
