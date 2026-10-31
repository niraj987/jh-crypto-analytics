'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatINR, formatINRLarge } from '@/lib/currency';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator, 
  Clock, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  TrendingUp,
  BarChart3,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface TradingFirmWorkflowProps {
  currentSymbol?: string;
  currentPriceINR?: number;
}

export default function TradingFirmWorkflow({
  currentSymbol = 'BTC',
  currentPriceINR = 7894796,
}: TradingFirmWorkflowProps) {
  const [activeTab, setActiveTab] = useState<'alpha' | 'risk' | 'execution' | 'portfolio'>('alpha');

  // Kelly Calculator State (in INR)
  const [portfolioCapital, setPortfolioCapital] = useState<number>(2500000); // ₹25 Lakhs
  const [winRate, setWinRate] = useState<number>(62); // 62%
  const [payoffRatio, setPayoffRatio] = useState<number>(2.2); // 2.2:1
  const [kellyFraction, setKellyFraction] = useState<number>(0.25); // Quarter Kelly

  // Calculated Kelly Optimal Fraction
  const p = winRate / 100;
  const q = 1 - p;
  const b = payoffRatio;
  const rawKelly = Math.max(0, (p * b - q) / b);
  const adjustedKelly = rawKelly * kellyFraction;
  const recommendedPositionINR = portfolioCapital * adjustedKelly;
  const riskAmountINR = recommendedPositionINR * 0.05; // 5% stop loss

  // TWAP / VWAP Order Slicer State
  const [orderSizeINR, setOrderSizeINR] = useState<number>(1000000); // ₹10 Lakhs
  const [twapMinutes, setTwapMinutes] = useState<number>(30); // 30 minutes
  const [sliceCount, setSliceCount] = useState<number>(10); // 10 slices
  const sliceSizeINR = orderSizeINR / sliceCount;
  const intervalSeconds = (twapMinutes * 60) / sliceCount;

  // Delta-Neutral State
  const [longAssetINR, setLongAssetINR] = useState<number>(500000); // ₹5 Lakhs
  const [betaValue, setBetaValue] = useState<number>(1.35); // Beta = 1.35
  const shortHedgeINR = longAssetINR * betaValue;

  return (
    <div className="rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200/90 dark:border-slate-800 p-5 sm:p-8 shadow-xl space-y-6 sm:space-y-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-extrabold uppercase shadow-sm">
              QUANTITATIVE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent">
              Proprietary Quantitative Execution Framework
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl font-medium">
            A disciplined multi-phase methodology integrating alpha formulation, capital risk boundaries, precision order execution, and continuous portfolio supervision.
          </p>
        </div>

        {/* Quick Phase Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {[
            { id: 'alpha', label: '1. Alpha Formulation', icon: Zap },
            { id: 'risk', label: '2. Capital Risk Sizing', icon: ShieldCheck },
            { id: 'execution', label: '3. Smart Execution', icon: SlidersHorizontal },
            { id: 'portfolio', label: '4. Portfolio Supervision', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400 dark:text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: HOW FIRMS SUGGEST (ALPHA GENERATION) */}
      {activeTab === 'alpha' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                Phase 1: Multi-Factor Alpha Discovery
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                How Trading Firms Formulate High-Conviction Signals
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Trading firms do not gamble or rely on hunches. They decompose the market into independent quantitative factors:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Technical Factor (30%)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Momentum (RSI), Trend (SMA 50/200), and Mean-Reversion (Bollinger Band width) to gauge exhaustion levels.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black mb-1">
                    <BarChart3 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Microstructure (25%)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Volume velocity, bid-ask spread liquidity, and centralized exchange net reserve outflow spikes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black mb-1">
                    <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>RAG &amp; Macro (25%)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Semantic vector matches against historical post-halving supply contractions and global liquidity expansion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Risk Calibration (20%)</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Probabilistic scenario validation, volatility boundaries, and dynamic ATR invalidation levels.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-900 dark:text-emerald-300">
                <strong>Consensus Formula:</strong> Aggregate Score = (Technical × 0.30) + (Microstructure × 0.25) + (RAG × 0.25) + (Risk × 0.20).
                If Aggregate Score &gt; +35, publish a <strong>STRONG BUY</strong> signal with calculated targets.
              </div>
            </div>

            {/* Right Column: Visual Trading Screen */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Real Trading Screen &amp; Indicator Monitors
              </span>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px] group">
                <img
                  src="/photos/behnam-norouzi-hScr17JG74Q-unsplash.jpg"
                  alt="Real Institutional Trading Screen"
                  className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                  style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Alpha Factor Engine
                  </span>
                  <span className="text-emerald-400 font-bold">Consensus: BUY</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
                Our quants observe live confluence across multi-timeframe candle envelopes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOW FIRMS MANAGE RISK (KELLY SIZING) */}
      {activeTab === 'risk' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Kelly Sizing Simulator */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Phase 2: Capital Risk Sizing
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  How Top Trading Desks Calculate Exact Trade Sizing
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                  Amateur traders bet arbitrary sums. Our firm applies disciplined mathematical risk scaling downscaled to conservative fractions to maximize compounding growth while strictly preventing drawdown ruin.
                </p>
              </div>

              {/* Calculator Box */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4">
                
                {/* Capital Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Desk Trading Capital:</span>
                    <span className="text-slate-950 dark:text-white font-black text-sm">{formatINR(portfolioCapital, true)}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="250000"
                    value={portfolioCapital}
                    onChange={(e) => setPortfolioCapital(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Win Probability Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Win Rate Probability (p):</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">{winRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="85"
                    value={winRate}
                    onChange={(e) => setWinRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Payoff Ratio (Reward-to-Risk) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Payoff Ratio (b = Win Size / Loss Size):</span>
                    <span className="text-sky-700 dark:text-sky-400 font-black text-sm">{payoffRatio}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.1"
                    value={payoffRatio}
                    onChange={(e) => setPayoffRatio(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>

                {/* Safety Fraction (Quarter Kelly) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Risk Boundary Sizing:</span>
                    <span className="text-purple-700 dark:text-purple-400 font-black text-sm">
                      {kellyFraction === 0.25 ? 'Quarter Kelly (0.25x - Conservative)' : 'Half Kelly (0.50x)'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setKellyFraction(0.25)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
                        kellyFraction === 0.25 ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      0.25x Quarter Kelly (Recommended)
                    </button>
                    <button
                      onClick={() => setKellyFraction(0.50)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
                        kellyFraction === 0.50 ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      0.50x Half Kelly
                    </button>
                  </div>
                </div>

              </div>

              {/* Kelly Output Card */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 font-mono text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-900 dark:text-emerald-300 font-bold">Optimal Calculated Position Allocation:</span>
                  <span className="text-emerald-950 dark:text-emerald-200 font-black text-base">
                    {(adjustedKelly * 100).toFixed(1)}% of Capital
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-200 dark:border-emerald-800">
                  <span className="text-emerald-900 dark:text-emerald-300 font-bold">Recommended Order Size in INR:</span>
                  <span className="text-emerald-800 dark:text-emerald-200 font-black text-lg">
                    {formatINR(recommendedPositionINR, true)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-emerald-800 dark:text-emerald-400 pt-1">
                  <span>Max Capital at Risk (5% ATR Stop Loss):</span>
                  <span className="font-bold">{formatINR(riskAmountINR, true)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Quantitative Math Graphic */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Proprietary Risk Formulas &amp; Stochastic Blackboard
              </span>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950 flex items-center justify-center min-h-[280px] group">
                <img
                  src="/photos/gettyimages-2270333130-612x612.jpg"
                  alt="Quantitative Risk Mathematics Blackboard"
                  className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                  style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    Kelly Staking Criterion
                  </span>
                  <span className="text-amber-300 font-bold">f* = 0.25 × (bp - q) / b</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Why this is critical:</strong> Full Kelly sizing has a 33% chance of experiencing a 50% capital drawdown. By enforcing Quarter-Kelly (0.25x), trading desks achieve ~75% of maximum growth with only a 2% risk of a serious drawdown.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: HOW FIRMS BUY & SELL (TWAP/VWAP EXECUTION) */}
      {activeTab === 'execution' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: TWAP / VWAP Order Slicer Simulator */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  Phase 3: Smart Order Slicing &amp; Anti-Slippage
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  How Trading Firms Buy and Sell Large Block Orders
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                  If a desk buys ₹10,00,000 of crypto at market, the order sweeps the book, moves the price against them, and incurs massive slippage. Instead, our firm uses <strong>TWAP (Time-Weighted)</strong> and <strong>VWAP (Volume-Weighted)</strong> order slicing with <strong>Iceberg orders</strong>.
                </p>
              </div>

              {/* Slicer Simulator */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 font-mono text-xs">
                
                {/* Block Order Size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Total Block Order Size (INR):</span>
                    <span className="text-amber-800 dark:text-amber-300 font-black text-sm">{formatINR(orderSizeINR, true)}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="100000"
                    value={orderSizeINR}
                    onChange={(e) => setOrderSizeINR(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {/* Execution Duration */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Execution Window:</span>
                    <span className="text-amber-800 dark:text-amber-300 font-black">{twapMinutes} Minutes</span>
                  </div>
                  <div className="flex gap-2">
                    {[15, 30, 60, 120].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setTwapMinutes(mins)}
                        className={`px-3 py-1 rounded-lg border font-bold ${
                          twapMinutes === mins ? 'bg-amber-600 text-white border-amber-600' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slices count */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Child Order Slices:</span>
                    <span className="text-slate-950 dark:text-white font-black">{sliceCount} Sub-Orders</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={sliceCount}
                    onChange={(e) => setSliceCount(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {/* Slicer Output Telemetry */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Each Child Order Size:</span>
                    <span className="text-slate-950 dark:text-white font-black">{formatINR(sliceSizeINR, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Execution Frequency:</span>
                    <span className="text-slate-950 dark:text-white font-black">Every {intervalSeconds.toFixed(0)} seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Iceberg Stealth Queue:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-black">90% Hidden / 10% Visible</span>
                  </div>
                  <div className="flex justify-between text-emerald-800 dark:text-emerald-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Est. Slippage Reduction:</span>
                    <span>94.2% Lower Market Impact</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Execution Flow Graphic */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Full Execution Routing Flow &amp; Exchange Ticker Tape
              </span>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950 flex items-center justify-center min-h-[260px] group">
                <img
                  src="/photos/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg"
                  alt="Stock Exchange Ticker Tape"
                  className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                  style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    High-Frequency Smart Router
                  </span>
                  <span className="text-sky-300 font-bold">Zero Market Impact</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Why this matters:</strong> Professional quants at our firm never submit raw market orders. They execute via algorithmic routing engines that distribute volume across decentralized pools and centralized order books to achieve the volume-weighted average price (VWAP).
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: HOW FIRMS MANAGE ALL (DELTA-NEUTRAL HEDGING) */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Delta-Neutral Hedging Simulator */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                  Phase 4: Portfolio &amp; Risk Management
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  How Trading Firms Manage Market Risk (Delta-Neutral Hedging)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                  Trading firms don&apos;t care if Bitcoin drops 20% or rallies 50%. They hedge directional market risk (Beta ≈ 0) so they only profit from relative outperformance (pure alpha).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-4 font-mono text-xs">
                
                {/* Long Altcoin Position */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">1. Long High-Alpha Token (INR):</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">{formatINR(longAssetINR, true)} (SOL/INR)</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={longAssetINR}
                    onChange={(e) => setLongAssetINR(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                {/* Asset Beta to Market */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">2. Token Relative Beta (vs BTC):</span>
                    <span className="text-sky-700 dark:text-sky-400 font-black text-sm">{betaValue}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.05"
                    value={betaValue}
                    onChange={(e) => setBetaValue(Number(e.target.value))}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">
                    Beta &gt; 1 means token moves faster than BTC. To hedge, the firm shorts Beta × Position.
                  </p>
                </div>

                {/* Short BTC Hedge Output */}
                <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-900 dark:text-purple-300 font-bold">Required Short BTC Perpetual Hedge:</span>
                    <span className="text-purple-950 dark:text-purple-200 font-black text-sm">{formatINR(shortHedgeINR, true)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Total Net Portfolio Beta:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-black">0.00 (Market Neutral)</span>
                  </div>
                </div>

                {/* Stress Test Simulation */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">Stress Test Scenario: If BTC Drops 15%</span>
                  <div className="flex justify-between text-rose-700 dark:text-rose-400">
                    <span>Loss on Altcoin (Beta {betaValue}x):</span>
                    <span>-{formatINR(longAssetINR * 0.15 * betaValue, true)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Gain on Short BTC Perp:</span>
                    <span>+{formatINR(shortHedgeINR * 0.15, true)}</span>
                  </div>
                  <div className="flex justify-between text-slate-950 dark:text-white font-black pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Net Market Drawdown:</span>
                    <span className="text-emerald-700 dark:text-emerald-400">₹0.00 Net Loss (100% Protected)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Strategic Ambition & Chess */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Strategic Portfolio Management &amp; Hedging Desk
              </span>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px] group">
                <img
                  src="/photos/quant-ambition-chess.jpg"
                  alt="Strategic Ambition and Hedging"
                  className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                  style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Delta-Neutral Supervision
                  </span>
                  <span className="text-emerald-300 font-bold">Dynamic Beta Hedging</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Real-Time P&amp;L Attribution</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Trading desks continuously track Sharpe ratio, funding rate arbitrage yield, and liquidation distance to ensure capital security 24 hours a day, 7 days a week.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
