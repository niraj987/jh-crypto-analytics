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
  currentPriceINR = 5801175,
}: TradingFirmWorkflowProps) {
  const [activeTab, setActiveTab] = useState<'alpha' | 'risk' | 'execution' | 'portfolio'>('alpha');

  // Kelly Calculator State (in INR)
  const [portfolioCapital, setPortfolioCapital] = useState<number>(2500000); // ₹25 Lakhs
  const [winRate, setWinRate] = useState<number>(62); // 62%
  const [payoffRatio, setPayoffRatio] = useState<number>(2.2); // 2.2:1
  const [kellyFraction, setKellyFraction] = useState<number>(0.25); // Quarter Kelly

  // Calculated Kelly Optimal Fraction
  // f* = (p * b - q) / b where q = 1 - p
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
    <div className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.95)] space-y-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold uppercase shadow-sm">
              QUANTITATIVE ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-slate-500 font-bold">
              WALL STREET & CRYPTO PROP-DESK WORKFLOW
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            How JH Crypto Analytics Operates Like Top Trading Firms
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl font-medium">
            Explore the 4-phase quantitative engine: How institutional firms formulate signals, calibrate mathematical risk, slice zero-impact block orders, and maintain delta-neutral portfolios.
          </p>
        </div>

        {/* Quick Phase Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          {[
            { id: 'alpha', label: '1. Suggest (Alpha)', icon: Zap },
            { id: 'risk', label: '2. Risk (Kelly Sizing)', icon: ShieldCheck },
            { id: 'execution', label: '3. Buy/Sell (TWAP/VWAP)', icon: SlidersHorizontal },
            { id: 'portfolio', label: '4. Manage (Delta-Neutral)', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
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
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
                Phase 1 // Multi-Factor Alpha Discovery
              </span>
              <h3 className="text-xl font-black text-slate-900">
                How Trading Firms Formulate High-Conviction Signals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Trading firms do not gamble or rely on hunches. They decompose the market into independent quantitative factors:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 font-black mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Technical Factor (30%)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Momentum (RSI), Trend (SMA 50/200), and Mean-Reversion (Bollinger Band width) to gauge exhaustion levels.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 font-black mb-1">
                    <BarChart3 className="w-4 h-4 text-sky-600" />
                    <span>Order Flow Imbalance (25%)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Tracking real-time Bid/Ask depth skew and taker buy/sell ratios across Tier-1 liquidity order books.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 font-black mb-1">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <span>RAG Macro Analogs (25%)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Embedding historical post-halving and global liquidity regimes using vector embeddings to match structural setups.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-2 text-slate-900 font-black mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Supervisor Consensus (20%)</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Resolving conflicting agent signals into a composite score [-100 to +100] with dynamic entry, TP, and SL.
                  </p>
                </div>
              </div>

              {/* Composite Score Rule */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 font-mono text-xs text-emerald-950 flex items-center justify-between">
                <span>Consensus Rule: Score &gt; +35 = <strong>BUY</strong> | Score &gt; +65 = <strong>STRONG BUY</strong></span>
                <span className="font-extrabold text-emerald-700">JH Engine Calibrated</span>
              </div>
            </div>

            {/* Visual Screen Preview */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <Image
                src="/quant-people-trading.svg"
                alt="Institutional Trading Floor"
                width={600}
                height={380}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between">
                <span>Proprietary Trading Floor Screen</span>
                <span className="text-emerald-400 font-bold">Multi-Desk Execution</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOW FIRMS MANAGE RISK (KELLY POSITION SIZING) */}
      {activeTab === 'risk' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Kelly Criterion Sizing in INR */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  Phase 2 // Capital Preservation
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Kelly Criterion Position Sizing Simulator (in ₹)
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Trading firms never risk random amounts. They use the mathematical <strong>Kelly Criterion</strong> to maximize compound growth while eliminating bankruptcy risk.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                
                {/* Total Portfolio Capital (INR) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 font-bold">Total Trading Capital (INR):</span>
                    <span className="text-slate-950 font-black text-sm">{formatINR(portfolioCapital, true)}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1000000, 2500000, 5000000, 10000000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setPortfolioCapital(amt)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                          portfolioCapital === amt
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {formatINRLarge(amt / 85.50)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Win Probability Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 font-bold">Win Rate Probability (p):</span>
                    <span className="text-emerald-700 font-black text-sm">{winRate}%</span>
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
                    <span className="text-slate-600 font-bold">Payoff Ratio (b = Win Size / Loss Size):</span>
                    <span className="text-sky-700 font-black text-sm">{payoffRatio}x</span>
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
                    <span className="text-slate-600 font-bold">Institutional Safety Sizing:</span>
                    <span className="text-purple-700 font-black text-sm">
                      {kellyFraction === 0.25 ? 'Quarter Kelly (0.25x - Institutional)' : 'Half Kelly (0.50x)'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setKellyFraction(0.25)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
                        kellyFraction === 0.25 ? 'bg-purple-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      0.25x Quarter Kelly (Recommended)
                    </button>
                    <button
                      onClick={() => setKellyFraction(0.50)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
                        kellyFraction === 0.50 ? 'bg-purple-600 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      0.50x Half Kelly
                    </button>
                  </div>
                </div>

              </div>

              {/* Kelly Output Card */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 font-mono text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-900 font-bold">Optimal Calculated Position Allocation:</span>
                  <span className="text-emerald-950 font-black text-base">
                    {(adjustedKelly * 100).toFixed(1)}% of Capital
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-emerald-200">
                  <span className="text-emerald-900 font-bold">Recommended Order Size in INR:</span>
                  <span className="text-emerald-800 font-black text-lg">
                    {formatINR(recommendedPositionINR, true)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-emerald-800 pt-1">
                  <span>Max Capital at Risk (5% ATR Stop Loss):</span>
                  <span className="font-bold">{formatINR(riskAmountINR, true)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Quantitative Math Graphic */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Proprietary Risk Formulas
              </span>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
                <Image
                  src="/quant-math.svg"
                  alt="Quantitative Risk Mathematics"
                  width={650}
                  height={420}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                By enforcing <strong>Fractional Kelly sizing</strong> and <strong>Parametric Value at Risk (VaR)</strong> limits, firms maintain positive geometric growth through multi-month crypto market drawdowns.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: HOW FIRMS BUY & SELL (SMART ORDER ROUTING) */}
      {activeTab === 'execution' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: TWAP / VWAP Order Slicer */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
                  Phase 3 // Zero-Impact Execution
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  How Trading Firms Buy & Sell (TWAP & Iceberg Slicing)
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  When a trading firm wants to buy or sell ₹10,00,000+ of cryptocurrency, executing as a single market order causes massive slippage and attracts predatory MEV sandwich bots. Instead, firms slice orders using <strong>TWAP</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
                
                {/* Total Order Amount */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-bold">Total Block Order Size (INR):</span>
                    <span className="text-slate-950 font-black text-sm">{formatINR(orderSizeINR, true)}</span>
                  </div>
                  <div className="flex gap-2">
                    {[500000, 1000000, 2500000, 5000000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setOrderSizeINR(amt)}
                        className={`px-2.5 py-1 rounded-lg border font-bold ${
                          orderSizeINR === amt ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                        }`}
                      >
                        {formatINRLarge(amt / 85.50)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slicing Duration */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-bold">Execution Window:</span>
                    <span className="text-amber-800 font-black">{twapMinutes} Minutes</span>
                  </div>
                  <div className="flex gap-2">
                    {[15, 30, 60, 120].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setTwapMinutes(mins)}
                        className={`px-3 py-1 rounded-lg border font-bold ${
                          twapMinutes === mins ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-700'
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
                    <span className="text-slate-600 font-bold">Child Order Slices:</span>
                    <span className="text-slate-950 font-black">{sliceCount} Sub-Orders</span>
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
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Each Child Order Size:</span>
                    <span className="text-slate-950 font-black">{formatINR(sliceSizeINR, true)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Execution Frequency:</span>
                    <span className="text-slate-950 font-black">Every {intervalSeconds.toFixed(0)} seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Iceberg Stealth Queue:</span>
                    <span className="text-emerald-700 font-black">90% Hidden / 10% Visible</span>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-bold pt-1 border-t border-slate-100">
                    <span>Est. Slippage Reduction:</span>
                    <span>94.2% Lower Market Impact</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Execution Flow Graphic */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Full Execution Routing Flow
              </span>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
                <Image
                  src="/trading-firm-flow.svg"
                  alt="Trading Firm Workflow Pipeline"
                  width={650}
                  height={320}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 leading-relaxed">
                <strong>Why this matters:</strong> Institutional crypto traders never submit raw market orders. They execute via algorithmic routing engines that distribute volume across decentralized pools (Uniswap, Raydium) and centralized order books to achieve the volume-weighted average price (VWAP).
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
                <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">
                  Phase 4 // Portfolio & Risk Management
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  How Trading Firms Manage Market Risk (Delta-Neutral Hedging)
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Trading firms don&apos;t care if Bitcoin drops 20% or rallies 50%. They hedge directional market risk ($\beta = 0$) so they only profit from the relative outperformance (pure alpha $\alpha$).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
                
                {/* Long Altcoin Position */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-bold">1. Long High-Alpha Token (INR):</span>
                    <span className="text-emerald-700 font-black text-sm">{formatINR(longAssetINR, true)} (SOL/INR)</span>
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
                    <span className="text-slate-600 font-bold">2. Token Relative Beta ($\beta$ vs BTC):</span>
                    <span className="text-sky-700 font-black text-sm">{betaValue}x</span>
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
                    Beta &gt; 1 means token moves faster than BTC. To hedge, the firm shorts $\beta \times$ Position.
                  </p>
                </div>

                {/* Short BTC Hedge Output */}
                <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-900 font-bold">Required Short BTC Perpetual Hedge:</span>
                    <span className="text-purple-950 font-black text-sm">{formatINR(shortHedgeINR, true)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-purple-800">
                    <span>Portfolio Net Delta ($\Delta$):</span>
                    <span className="font-bold">0.00 (Market Neutral)</span>
                  </div>
                </div>

                {/* Scenario Outcome */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-900 block">Stress Test Scenario: If BTC Drops 15%</span>
                  <div className="flex justify-between text-rose-700">
                    <span>Loss on Altcoin (Beta {betaValue}x):</span>
                    <span>-{formatINR(longAssetINR * 0.15 * betaValue, true)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Gain on Short BTC Perp:</span>
                    <span>+{formatINR(shortHedgeINR * 0.15, true)}</span>
                  </div>
                  <div className="flex justify-between text-slate-950 font-black pt-1 border-t border-slate-100">
                    <span>Net Market Drawdown:</span>
                    <span className="text-emerald-700">₹0.00 Net Loss (100% Protected)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Trading Screen & Firm Management Details */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Live Institutional Desk Screen
              </span>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src="/trading-dashboard.png"
                  alt="Institutional Trading Dashboard"
                  width={650}
                  height={380}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time P&amp;L Attribution</span>
                </div>
                <p className="text-[11px] text-slate-500">
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
