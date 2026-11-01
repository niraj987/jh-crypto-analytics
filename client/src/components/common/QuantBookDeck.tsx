'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  BookOpen, 
  Presentation, 
  Layers, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  Activity,
  SlidersHorizontal,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface AnalysisPillar {
  title: string;
  explanation: string;
  icon: React.ElementType;
  accent: string;
  bg: string;
}

interface SlidePage {
  id: number;
  title: string;
  category: string;
  badge: string;
  subtitle: string;
  pillars: AnalysisPillar[];
  bulletPoints: string[];
  takeaway: string;
}

const DECK_PAGES: SlidePage[] = [
  {
    id: 1,
    title: 'Multi-Timeframe Trend & Momentum Formulation',
    category: 'Stage 01: Trend & Signal Formulation',
    badge: 'DIRECTIONAL ANALYSIS',
    subtitle: 'Our firm evaluates price behavior across multiple timeframes simultaneously to identify reliable momentum continuation before broader market movement occurs.',
    pillars: [
      {
        title: 'Cross-Timeframe Confluence',
        explanation: 'We compare short-term intraday price fluctuations against higher-timeframe daily trends to filter out random market noise and detect genuine trend momentum.',
        icon: TrendingUp,
        accent: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      },
      {
        title: 'Volume & Demand Validation',
        explanation: 'Momentum signals are only validated when supported by active buyer accumulation and substantial trading volume defending critical price support floors.',
        icon: Zap,
        accent: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      },
      {
        title: 'Clear Execution Targets',
        explanation: 'Once directional strength is confirmed, our systems calculate optimal entry corridors along with strategic target milestones and defensive stop levels.',
        icon: Compass,
        accent: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
      },
    ],
    bulletPoints: [
      'Simultaneous multi-timeframe evaluation verifies that short-term price momentum aligns with broader market trend direction.',
      'Moving average ribbon interactions confirm institutional accumulation zones without relying on lagging speculative guesswork.',
      'Clear, actionable trade recommendations are published with pre-calculated target zones and defined protective thresholds.',
    ],
    takeaway: 'High-conviction market signals are formulated only when multi-timeframe price momentum and verifiable trading volume align.',
  },
  {
    id: 2,
    title: 'Order Book Depth & Smart Liquidity Execution',
    category: 'Stage 02: Liquidity & Order Routing',
    badge: 'LIQUIDITY PROTECTION',
    subtitle: 'Our systems continuously scan real-time order books across major cryptocurrency venues to guarantee optimal fill prices and prevent adverse market impact.',
    pillars: [
      {
        title: 'Live Order Book Depth',
        explanation: 'Our algorithms inspect the real-time queue of active bids and asks, monitoring liquidity depth to determine how easily orders can be filled without slippage.',
        icon: Activity,
        accent: 'text-cyan-600 dark:text-cyan-400',
        bg: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800',
      },
      {
        title: 'Dynamic Order Slicing',
        explanation: 'Large trade tickets are systematically divided into smaller scheduled portions over time, preventing sudden price spikes and reducing execution friction.',
        icon: SlidersHorizontal,
        accent: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
      },
      {
        title: 'Optimal Venue Routing',
        explanation: 'Each order segment is dynamically routed to the exchange gateway offering the deepest liquidity and tightest spread at that specific millisecond.',
        icon: Layers,
        accent: 'text-teal-600 dark:text-teal-400',
        bg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
      },
    ],
    bulletPoints: [
      'Sub-second inspection of the bid-ask order book detects depth imbalances and reveals real market liquidity.',
      'Algorithmic order slicing ensures execution occurs at the most favorable average market price available.',
      'Direct exchange connections protect traders from predatory front-running and sudden spread widening.',
    ],
    takeaway: 'Intelligent order execution splits transaction volume across time and venues to ensure zero adverse market impact.',
  },
  {
    id: 3,
    title: 'Disciplined Capital Sizing & Risk Protection',
    category: 'Stage 03: Capital Protection & Sizing',
    badge: 'CAPITAL PRESERVATION',
    subtitle: 'Capital protection is our foremost priority, ensuring position sizing is strictly controlled relative to individual asset volatility to eliminate emotional trading bias.',
    pillars: [
      {
        title: 'Volatility-Adjusted Sizing',
        explanation: 'Each trade allocation is calculated dynamically based on current market volatility, reducing position sizes on volatile tokens to keep overall risk balanced.',
        icon: ShieldCheck,
        accent: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
      },
      {
        title: 'Pre-Defined Exit Boundaries',
        explanation: 'Protective invalidation levels are established before entering any trade, guaranteeing disciplined exits and removing emotional hesitation from risk control.',
        icon: Compass,
        accent: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
      },
      {
        title: 'Continuous Portfolio Guardrails',
        explanation: 'Real-time portfolio monitoring ensures cumulative market exposure stays safely within strict, conservative capital boundaries during severe market shocks.',
        icon: Zap,
        accent: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      },
    ],
    bulletPoints: [
      'Position size boundaries adapt to market conditions so that severe drawdown risk remains strictly prevented.',
      'Automated stop-loss guidance enforces disciplined capital preservation without speculative discretion.',
      'Systematic risk calibration ensures capital compounds reliably across both bull and bear market cycles.',
    ],
    takeaway: 'Disciplined capital protection ensures long-term portfolio growth by preventing catastrophic drawdown during sharp market corrections.',
  },
  {
    id: 4,
    title: 'Portfolio Diversification & Directional Stability',
    category: 'Stage 04: Portfolio Balance & Neutrality',
    badge: 'PORTFOLIO STABILITY',
    subtitle: 'Our firm balances market exposure across diverse digital assets to protect portfolio stability and deliver consistent results regardless of broad market direction.',
    pillars: [
      {
        title: 'Uncorrelated Asset Selection',
        explanation: 'We select assets with distinct fundamental and market dynamics, creating a diversified portfolio that is resilient against single-token downturns.',
        icon: Layers,
        accent: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
      },
      {
        title: 'Directional Market Hedging',
        explanation: 'High-conviction long positions are paired with defensive balancing strategies, buffering the portfolio when the broader cryptocurrency market drops.',
        icon: ShieldCheck,
        accent: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      },
      {
        title: 'Continuous Floor Oversight',
        explanation: 'Automated monitoring supervises open allocations around the clock, dynamically rebalancing positions to preserve gains and protect capital stability.',
        icon: Activity,
        accent: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
      },
    ],
    bulletPoints: [
      'Balanced asset allocation limits reliance on overall crypto market direction, providing stability during sharp corrections.',
      'Systematic rebalancing continuously locks in accumulated gains and realigns exposures with disciplined risk targets.',
      'Round-the-clock automated oversight guards client assets against sudden systemic market selloffs.',
    ],
    takeaway: 'Balanced positioning and disciplined hedging preserve portfolio value through both rapid market expansions and downturns.',
  },
];

export default function QuantBookDeck() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'ppt' | 'book'>('ppt');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pageDirection, setPageDirection] = useState<'next' | 'prev'>('next');

  const page = DECK_PAGES[currentPage];

  // Auto-play slideshow logic
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setPageDirection('next');
      setCurrentPage((prev) => (prev + 1) % DECK_PAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setPageDirection('next');
    setCurrentPage((prev) => (prev + 1) % DECK_PAGES.length);
  };

  const handlePrev = () => {
    setPageDirection('prev');
    setCurrentPage((prev) => (prev - 1 + DECK_PAGES.length) % DECK_PAGES.length);
  };

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-[#121721] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl overflow-hidden space-y-8 transition-all duration-300">
      
      {/* Top Deck Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Our Firm&apos;s Quantitative Methodology Deck
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">
            An interactive walkthrough explaining how our quantitative research, risk boundaries, and execution models operate.
          </p>
        </div>

        {/* View Mode & Presentation Controls */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher: PPT vs Book */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setViewMode('ppt')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'ppt'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>PPT Slide</span>
            </button>
            <button
              onClick={() => setViewMode('book')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'book'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Book Turn</span>
            </button>
          </div>

          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2.5 rounded-2xl border transition-all ${
              isPlaying
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-300'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
            title={isPlaying ? 'Pause Auto-Play' : 'Auto-Play Presentation'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide & Book Viewport (Full Width Unboxed Presentation, No Photos) */}
      <div 
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
          viewMode === 'book'
            ? 'border-2 border-amber-900/20 dark:border-amber-500/20 shadow-2xl bg-gradient-to-r from-amber-50/20 via-white to-amber-50/10 dark:from-slate-950 dark:via-[#10141d] dark:to-slate-950 p-4 sm:p-8'
            : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1118] p-6 sm:p-10'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Book Spine Center Crease Visual (when in Book mode) */}
        {viewMode === 'book' && (
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/5 via-black/15 to-transparent pointer-events-none z-20 shadow-inner" />
        )}

        {/* Content Container */}
        <div 
          key={page.id}
          className={`space-y-8 transition-all duration-500 ${
            viewMode === 'book'
              ? 'animate-in fade-in zoom-in-95'
              : pageDirection === 'next'
                ? 'animate-in slide-in-from-right-8 duration-300'
                : 'animate-in slide-in-from-left-8 duration-300'
          }`}
        >
          {/* Header Row */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {page.category}
              </span>
              <span className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold border border-slate-200 dark:border-slate-700">
                {page.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {page.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-5xl">
              {page.subtitle}
            </p>
          </div>

          {/* 3 Core Analytical Dimensions (Explaining our process clearly) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {page.pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx} 
                  className={`p-6 rounded-2xl border ${pillar.bg} shadow-sm space-y-3 transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
                      <Icon className={`w-4 h-4 ${pillar.accent}`} />
                    </div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pillar.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Analytical Breakdown & Step-by-Step Logic */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Operational Methodology &amp; Workflow
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {page.bulletPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Takeaway Banner (No Formulas, Pure Practical Philosophy) */}
          <div className="p-5 rounded-2xl border-l-4 border-emerald-500 bg-slate-50/90 dark:bg-slate-900/80 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Analytical Principle:
            </span>
            {page.takeaway}
          </div>
        </div>
      </div>

      {/* Bottom Deck Navigation Bar: Arrows, Slide Thumbs & Page Index */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{viewMode === 'book' ? 'Previous Page' : 'Previous Slide'}</span>
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-600/20"
          >
            <span>{viewMode === 'book' ? 'Next Page' : 'Next Slide'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Indicator Dots / Thumbnails */}
        <div className="flex items-center gap-2">
          {DECK_PAGES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setPageDirection(idx > currentPage ? 'next' : 'prev');
                setCurrentPage(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? 'w-8 bg-emerald-600 dark:bg-emerald-400'
                  : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              }`}
              title={`Jump to ${p.title}`}
            />
          ))}
          <span className="ml-3 font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
            Slide {currentPage + 1} of {DECK_PAGES.length}
          </span>
        </div>
      </div>

    </div>
  );
}
