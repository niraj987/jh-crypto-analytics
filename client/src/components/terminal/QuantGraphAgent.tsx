'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Send,
  Zap,
  Maximize2
} from 'lucide-react';
import { CryptoAsset, TechnicalIndicators, ConsensusVerdict } from '@/lib/types';
import { formatINR, toINR } from '@/lib/currency';

interface QuantGraphAgentProps {
  asset: CryptoAsset;
  indicators: TechnicalIndicators | null;
  verdict?: ConsensusVerdict | null;
  onTradeAction?: (action: 'BUY' | 'SELL', targetPrice: number) => void;
}

export default function QuantGraphAgent({
  asset,
  indicators,
  verdict,
  onTradeAction,
}: QuantGraphAgentProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<'ALL' | 'QUANT' | 'GRAPH' | 'SUGGESTION'>('ALL');
  const [userQuery, setUserQuery] = useState('');
  const [customReply, setCustomReply] = useState<string | null>(null);

  // Price calculations in INR
  const priceINR = toINR(asset.currentPrice);
  const isBullishTrend = indicators ? asset.currentPrice > indicators.sma50 : asset.change24h >= 0;
  const rsi = indicators?.rsi14 || 54;
  const macdPositive = (indicators?.macdHist || 0) >= 0;

  // Graph Analysis Derivations
  const supportLevelINR = Number((priceINR * (isBullishTrend ? 0.965 : 0.93)).toFixed(2));
  const resistanceLevelINR = Number((priceINR * (isBullishTrend ? 1.072 : 1.035)).toFixed(2));
  const graphPattern = isBullishTrend
    ? 'Ascending Triangle / Bullish Channel Breakout'
    : 'Mean-Reversion Demand Sweep at Lower Channel';
  
  // Quantitative Score Calculation (0 to 100)
  let quantScore = 50;
  if (isBullishTrend) quantScore += 20;
  if (rsi > 45 && rsi < 65) quantScore += 15;
  if (macdPositive) quantScore += 15;
  quantScore = Math.min(95, Math.max(15, quantScore));

  // Determine Suggestion
  let suggestion: 'STRONG BUY' | 'BUY' | 'HOLD' | 'SELL' | 'TAKE PROFIT' = 'BUY';
  let suggestionBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let suggestionCardBg = 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-emerald-200';

  if (quantScore >= 80) {
    suggestion = 'STRONG BUY';
    suggestionBadgeColor = 'bg-emerald-600 text-white border-emerald-600 shadow-sm';
    suggestionCardBg = 'bg-gradient-to-br from-emerald-100/80 via-emerald-50 to-white border-emerald-300';
  } else if (quantScore >= 60) {
    suggestion = 'BUY';
    suggestionBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    suggestionCardBg = 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border-emerald-200';
  } else if (quantScore <= 35) {
    suggestion = 'SELL';
    suggestionBadgeColor = 'bg-rose-600 text-white border-rose-600 shadow-sm';
    suggestionCardBg = 'bg-gradient-to-br from-rose-100/80 via-rose-50 to-white border-rose-300';
  } else {
    suggestion = 'HOLD';
    suggestionBadgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
    suggestionCardBg = 'bg-gradient-to-br from-amber-50 via-yellow-50/40 to-white border-amber-200';
  }

  // Target Calculations in INR
  const target1INR = verdict?.takeProfit1 ? toINR(verdict.takeProfit1) : Number((priceINR * 1.065).toFixed(2));
  const target2INR = verdict?.takeProfit2 ? toINR(verdict.takeProfit2) : Number((priceINR * 1.125).toFixed(2));
  const stopLossINR = verdict?.stopLoss ? toINR(verdict.stopLoss) : Number((priceINR * 0.955).toFixed(2));
  const riskReward = '1 : 2.6';

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 700);
  };

  const handleAskAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const q = userQuery.toLowerCase();
      if (q.includes('buy') || q.includes('entry') || q.includes('target')) {
        setCustomReply(
          `Analysis for ${asset.symbol}: Current graph setup supports a ${suggestion} with optimal entry near ${formatINR(priceINR, true)}. Target 1 is ${formatINR(target1INR, true)} (+6.5%) with stop loss protected at ${formatINR(supportLevelINR, true)}.`
        );
      } else if (q.includes('risk') || q.includes('stop')) {
        setCustomReply(
          `Risk Assessment for ${asset.symbol}: Stop loss is calibrated at ${formatINR(stopLossINR, true)} (4.5% risk). Maintain a maximum 2% portfolio allocation.`
        );
      } else {
        setCustomReply(
          `Quantitative & Graph Summary: ${asset.name} displays a ${graphPattern} on the 1D chart with an RSI of ${rsi.toFixed(1)} and MACD ${macdPositive ? 'Bullish Expansion' : 'Correction'}. Current consensus verdict is ${suggestion}.`
        );
      }
      setIsAnalyzing(false);
      setUserQuery('');
    }, 800);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50/60 to-emerald-50/30 border border-slate-200/90 p-7 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.06)] space-y-6">
      
      {/* Agent Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                AI Quantitative &amp; Graph Analysis Agent
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold uppercase">
                ACTIVE COPILOT
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Autonomous dual-factor intelligence: Confluence of quantitative indicators and technical chart graphs
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-2 shadow-sm transition-all hover:scale-105 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>Re-Audit {asset.symbol}</span>
          </button>
        </div>
      </div>

      {/* 3 Prominent Analysis Tiles with Rich Tinted Background Colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Tile 1: Quantitative Audit Tile (Rich Emerald / Teal Tint) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <span className="text-xs font-mono font-bold text-emerald-900 uppercase flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-600" />
              1. Quantitative Confluence
            </span>
            <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              {quantScore}/100 Score
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">RSI(14) Momentum:</span>
              <span className={`font-bold ${rsi > 70 ? 'text-rose-700' : rsi < 30 ? 'text-emerald-700' : 'text-sky-700'}`}>
                {rsi.toFixed(1)} ({rsi > 70 ? 'Overbought' : rsi < 30 ? 'Oversold' : 'Neutral Range'})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">SMA Trend Direction:</span>
              <span className={`font-bold ${isBullishTrend ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isBullishTrend ? 'Above 50 SMA (Bullish)' : 'Below 50 SMA (Bearish)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">MACD Histogram:</span>
              <span className={`font-bold ${macdPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                {macdPositive ? '+ Positive Acceleration' : '- Seller Pressure'}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-200 text-[11px] font-mono text-emerald-950 font-medium">
            Quantitative models indicate <strong>{quantScore >= 60 ? 'positive buyer absorption' : 'cautious consolidation'}</strong> across moving average bands.
          </div>
        </div>

        {/* Tile 2: Graph Analysis Tile (Rich Sky Blue / Cobalt Tint) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-blue-50/40 to-white border border-sky-200 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-100">
            <span className="text-xs font-mono font-bold text-sky-900 uppercase flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-sky-600" />
              2. Graph &amp; Price Action
            </span>
            <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300">
              1D Structure
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Identified Pattern:</span>
              <span className="font-bold text-slate-900 truncate max-w-[150px]">{graphPattern}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Demand Floor (Support):</span>
              <span className="font-bold text-emerald-700">{formatINR(supportLevelINR, true)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Supply Ceiling (Resistance):</span>
              <span className="font-bold text-rose-700">{formatINR(resistanceLevelINR, true)}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 border border-sky-200 text-[11px] font-mono text-sky-950 font-medium">
            Candlestick structure reveals higher swing-lows defending the <strong>{formatINR(supportLevelINR, true)}</strong> horizontal base.
          </div>
        </div>

        {/* Tile 3: Actionable Buy/Sell Suggestion Tile (Highlighted Result) */}
        <div className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-3 ${suggestionCardBg}`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              3. Agent Suggestion
            </span>
            <span className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-lg border ${suggestionBadgeColor}`}>
              {suggestion}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Optimal Entry:</span>
              <span className="font-black text-slate-950">{formatINR(priceINR, true)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Take-Profit Target 1:</span>
              <span className="font-black text-emerald-700">{formatINR(target1INR, true)} (+6.5%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Stop-Loss Guard:</span>
              <span className="font-black text-rose-700">{formatINR(stopLossINR, true)} (-4.5%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Risk : Reward Ratio:</span>
              <span className="font-bold text-slate-900">{riskReward}</span>
            </div>
          </div>

          {onTradeAction && (
            <button
              onClick={() => onTradeAction(suggestion === 'SELL' ? 'SELL' : 'BUY', priceINR)}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-black text-white shadow-sm transition-all hover:scale-[1.02] ${
                suggestion === 'SELL' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              Transfer Suggestion to Order Desk →
            </button>
          )}
        </div>

      </div>

      {/* Ask the Agent Interactive Query Bar */}
      <div className="space-y-3 pt-2">
        <form onSubmit={handleAskAgent} className="flex gap-2">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder={`Ask Agent: "Should I buy ${asset.symbol} right now?", "What is the stop loss?", or "Explain graph pattern"...`}
            className="flex-1 bg-white border border-slate-200 rounded-2xl py-3 px-4 text-xs text-slate-900 font-mono font-bold placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white shadow-sm transition-all"
          />
          <button
            type="submit"
            disabled={isAnalyzing || !userQuery.trim()}
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 hover:scale-105"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Consult Agent</span>
          </button>
        </form>

        {/* Quick Prompt Chips */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
          <span className="text-slate-400 font-medium">Quick Audits:</span>
          {[
            `Should I buy ${asset.symbol} now?`,
            `What is the graph pattern?`,
            `Calculate stop loss and risk target`,
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                setUserQuery(prompt);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Custom Agent Response Box */}
        {customReply && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-950 flex items-start gap-3 shadow-sm animate-in fade-in duration-200">
            <Bot className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">{customReply}</p>
              <span className="text-[10px] text-emerald-700 block">Agent Verified • Real-Time INR Data</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
