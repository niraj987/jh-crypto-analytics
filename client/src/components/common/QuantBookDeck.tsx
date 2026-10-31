'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  BookOpen, 
  Presentation, 
  Sparkles, 
  Maximize2, 
  Layers, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  BarChart3,
  Cpu
} from 'lucide-react';

interface SlidePage {
  id: number;
  title: string;
  category: string;
  badge: string;
  image: string;
  subtitle: string;
  bulletPoints: string[];
  equation?: string;
  metrics: { label: string; value: string; color: string }[];
  quote: string;
}

const DECK_PAGES: SlidePage[] = [
  {
    id: 1,
    title: 'Macro Alpha & Dual-Factor Momentum Stream',
    category: 'Chapter 01: Quantitative Signal Formulation',
    badge: 'LIVE ALPHA DESK',
    image: '/photos/sajad-nori-XihAgOYNHn4-unsplash.jpg',
    subtitle: 'How our firm identifies high-probability trend continuation before retail order flow arrives.',
    bulletPoints: [
      'Multi-timeframe RSI(14) momentum convergence across 15m, 1h, and 1D candlesticks.',
      'Moving average dynamic ribbon analysis combining 20 EMA, 50 SMA, and 200 SMA baseline.',
      'Order block liquidity demand floor verification defending support bands with volume accumulation.',
    ],
    metrics: [
      { label: 'Signal Latency', value: '18ms', color: 'text-emerald-500' },
      { label: 'Trend Edge', value: '68.4%', color: 'text-sky-500' },
      { label: 'Coverage', value: '48 Assets', color: 'text-purple-500' },
    ],
    quote: '"Alpha is not found in lagging indicators; it is formulated at the exact confluence of mathematical momentum and structural support."',
  },
  {
    id: 2,
    title: 'Order Book Microstructure & Real-Time L2 Depth',
    category: 'Chapter 02: Market Liquidity & Spreads',
    badge: 'COINSWITCH PRO GATEWAY',
    image: '/photos/gettyimages-2112329817-612x612.jpg',
    subtitle: 'Deep liquidity scanning to detect hidden iceberg orders and optimize fill prices denominated in INR.',
    bulletPoints: [
      'Sub-second Level 2 order book inspection tracking real-time bid-to-ask depth imbalance ratios.',
      'Slippage mitigation routing ensuring large block tickets execute at or better than VWAP.',
      'Direct Ed25519 cryptographic handshake with CoinSwitchX high-frequency execution nodes.',
    ],
    metrics: [
      { label: 'Average Spread', value: '0.45%', color: 'text-amber-500' },
      { label: 'Bid Ratio', value: '88% Depth', color: 'text-emerald-500' },
      { label: 'Protocol', value: 'Ed25519', color: 'text-indigo-500' },
    ],
    quote: '"Large market orders move the book against you. Smart execution slices liquidity into imperceptible algorithmic fills."',
  },
  {
    id: 3,
    title: 'Stochastic Calculus, Brownian Motion & Kelly Sizing',
    category: 'Chapter 03: Mathematical Risk Calibration',
    badge: 'STOCHASTIC LAB',
    image: '/photos/pexels-thales13-39398846.jpg',
    subtitle: 'Replacing human emotional bias with verified mathematical probability distributions and geometric growth optimization.',
    equation: 'f* = (bp - q) / b  |  dS_t = μ S_t dt + σ S_t dW_t',
    bulletPoints: [
      'Fractional Kelly Criterion bounds stake sizing so that maximum drawdown never exceeds risk tolerance limits.',
      'Geometric Brownian Motion (GBM) with Monte Carlo 10,000 iterations projects price boundary corridors.',
      'Parametric Value-at-Risk (VaR 99%) enforces automatic hard stop-loss invalidation levels.',
    ],
    metrics: [
      { label: 'Half-Kelly Fraction', value: '3.5% Equity', color: 'text-purple-500' },
      { label: 'Sharpe Ratio', value: '2.42', color: 'text-emerald-500' },
      { label: 'VaR (99%)', value: '4.5% Cap', color: 'text-rose-500' },
    ],
    quote: '"In quantitative trading, survival is paramount. The Kelly Criterion guarantees that your portfolio grows at the maximum possible geometric rate without ruin."',
  },
  {
    id: 4,
    title: 'Our Firm\'s Execution Floor & Delta-Neutral Hedging',
    category: 'Chapter 04: Portfolio Preservation',
    badge: 'HEDGE FUND OPERATIONS',
    image: '/photos/quant-ambition-chess.jpg',
    subtitle: 'Eliminating directional market beta exposure to extract pure idiosyncratic risk-adjusted return.',
    bulletPoints: [
      'Simultaneous long exposure on high-alpha crypto tokens paired with systematic short index hedges.',
      'Dynamic beta rebalancing maintains total desk net exposure within 0.05 of true neutrality.',
      '24/7 algorithmic supervision protecting client funds from systemic flash crashes and cascade liquidations.',
    ],
    metrics: [
      { label: 'Net Beta', value: '0.00 Beta', color: 'text-sky-500' },
      { label: 'Floor Uptime', value: '99.98%', color: 'text-emerald-500' },
      { label: 'Currency Base', value: 'INR (₹)', color: 'text-amber-500' },
    ],
    quote: '"When the entire crypto market crashes 30%, a truly delta-neutral desk remains fully protected, collecting funding yield and relative spread."',
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
    }, 5500);
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
    <div className="w-full rounded-3xl bg-white dark:bg-[#121721] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl overflow-hidden space-y-6 transition-all duration-300">
      
      {/* Top Deck Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              DYNAMIC PRESENTATION DECK
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Interactive Financial Book
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            Our Firm&apos;s Quantitative Methodology Deck
          </h3>
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

      {/* Main Slide & Book Viewport with 3D Flip & Slide Animation */}
      <div 
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
          viewMode === 'book'
            ? 'border-2 border-amber-900/20 dark:border-amber-500/20 shadow-2xl bg-gradient-to-r from-amber-50/20 via-white to-amber-50/10 dark:from-slate-950 dark:via-[#10141d] dark:to-slate-950 p-2 sm:p-4'
            : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1118]'
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
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 transition-all duration-500 ${
            viewMode === 'book'
              ? 'animate-in fade-in zoom-in-95'
              : pageDirection === 'next'
                ? 'animate-in slide-in-from-right-8 duration-300'
                : 'animate-in slide-in-from-left-8 duration-300'
          }`}
        >
          {/* Left Column: Rich Presentation Typography */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {page.category}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold">
                {page.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {page.title}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              {page.subtitle}
            </p>

            {/* Mathematical Formula Banner if present */}
            {page.equation && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 font-mono text-xs font-bold text-amber-900 dark:text-amber-300 shadow-sm flex items-center justify-between">
                <span>{page.equation}</span>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 uppercase">Stochastic Theorem</span>
              </div>
            )}

            {/* Bullet Points */}
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              {page.bulletPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {page.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">{m.label}</span>
                  <span className={`text-sm sm:text-base font-black font-mono mt-0.5 block ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Institutional Quote */}
            <div className="p-3.5 rounded-2xl border-l-4 border-emerald-500 bg-slate-50/70 dark:bg-slate-900/60 text-xs italic text-slate-600 dark:text-slate-400">
              {page.quote}
            </div>
          </div>

          {/* Right Column: Visual Photo Card with Interactive Zoom */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-950 group">
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-auto object-cover rounded-2xl block transition-transform duration-700 group-hover:scale-105"
              style={{ maxHeight: '420px', aspectRatio: '16 / 11' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-2xl text-white text-xs font-mono flex items-center justify-between border border-slate-800">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {page.badge}
              </span>
              <span className="text-emerald-400 font-bold">Slide {currentPage + 1} of {DECK_PAGES.length}</span>
            </div>
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
            {currentPage + 1} / {DECK_PAGES.length}
          </span>
        </div>
      </div>

    </div>
  );
}

