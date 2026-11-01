'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ApiClient } from '@/lib/api';
import { CryptoAsset } from '@/lib/types';
import { formatINR, formatINRLarge, toINR, toUSD } from '@/lib/currency';
import TickerMarquee from '@/components/common/TickerMarquee';
import TopGainersBar from '@/components/common/TopGainersBar';
import MarketScene3D from '@/components/common/MarketScene3D';
import TradingFirmWorkflow from '@/components/terminal/TradingFirmWorkflow';
import QuantBookDeck from '@/components/common/QuantBookDeck';
import { Activity, TrendingUp, Cpu, ShieldCheck, ArrowRight, Sparkles, BarChart2, Zap, Layers, CheckCircle2, Compass } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const [catalog, setCatalog] = useState<CryptoAsset[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const data = await ApiClient.getCatalog();
      setCatalog(data);
    }
    load();

    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        // Hero entrance animation
        if (heroRef.current) {
          gsap.fromTo(
            heroRef.current.children,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
          );
        }

        // Scroll-triggered animations for sections and technique phases
        const scrollElements = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
        scrollElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="w-full relative">
      {/* Dynamic Multi-Color Ambient Mesh Glows (Warm Natural, Cyan, Emerald, Berry, Gold) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[8%] -left-[12%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-cyan-500/12 to-sky-400/0 blur-[130px]" />
        <div className="absolute top-[32%] -right-[12%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-500/10 to-teal-400/0 blur-[140px]" />
        <div className="absolute top-[58%] -left-[12%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fuchsia-500/10 to-purple-500/0 blur-[150px]" />
        <div className="absolute top-[82%] -right-[12%] w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-amber-500/12 to-orange-400/0 blur-[150px]" />
      </div>

      {/* Live Marquee Ticker with Calm Legible Speed */}
      <TickerMarquee assets={catalog} />

      {/* Real-Time CoinSwitch PRO Top Gainers Bar with USD/INR Exchange Rate */}
      <TopGainersBar />

      {/* Spacious Hero Section with Warm Natural Tone & Three.js 3D Model */}
      <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        {/* Subtle Institutional Trading Floor Background Texture */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden rounded-3xl opacity-[0.05] sm:opacity-[0.08] mix-blend-multiply dark:mix-blend-luminosity">
          <img
            src="/photos/gettyimages-2240153407-612x612.jpg"
            alt="Trading Desk Atmosphere"
            className="w-full h-full object-cover filter grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-[#070c18]/70 dark:to-[#070c18]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand & Hero Copy */}
          <div ref={heroRef} className="lg:col-span-7 space-y-6">
            
            {/* Headline with Prestigious Typography */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Our Firm&apos;s Crypto Terminal Powered by{' '}
              <span className="text-gradient-gold">
                Quantitative Intelligence
              </span>
            </h1>

            {/* Spacious Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              Delivering disciplined quantitative intelligence, precision risk management, and algorithmic market execution across global crypto markets.
            </p>

            {/* Action Buttons with Institutional Color Scheme */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/signals"
                className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-mono font-black text-sm flex items-center gap-2.5 shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Activity className="w-4 h-4 text-amber-400 dark:text-amber-600" />
                <span>Launch Trading Signals Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/forecast"
                className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm flex items-center gap-2.5 border border-slate-300 dark:border-slate-700 shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-gradient-cyan font-black">Explore AI RAG Forecasting</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Three.js Interactive 3D Model with Real-Time INR Price */}
          <div className="lg:col-span-5">
            <MarketScene3D symbol="BTC" price={toINR(catalog[0]?.currentPrice || 77635)} />
          </div>

        </div>
      </section>

      {/* Spacious 48-Token Institutional Market Index */}
      <section className="gsap-reveal px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shadow-sm">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Comprehensive 48-Asset Market Index
                </h2>
              </div>
            </div>
          </div>
          <Link
            href="/signals"
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-emerald-600 text-white font-mono text-xs font-bold hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors shadow-sm"
          >
            Open Live Trading Desk →
          </Link>
        </div>

        {/* 6 High-Impact Snapshot Cards with Rich Distinct Backgrounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalog.slice(0, 6).map((asset) => {
            const isUp = asset.change24h >= 0;
            const tileBg = 
              asset.category === 'Major'
                ? 'bg-gradient-to-br from-sky-50/90 via-blue-50/30 to-white dark:from-[#0c1626] dark:via-[#09101d] dark:to-[#070b14] border-sky-200/90 dark:border-slate-800 shadow-xl'
                : asset.category === 'Meme'
                  ? 'bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-white dark:from-[#1b1509] dark:via-[#140f06] dark:to-[#0d0a04] border-amber-200/90 dark:border-slate-800 shadow-xl'
                  : asset.category === 'AI'
                    ? 'bg-gradient-to-br from-purple-50/90 via-indigo-50/30 to-white dark:from-[#180d26] dark:via-[#11091b] dark:to-[#0b0512] border-purple-200/90 dark:border-slate-800 shadow-xl'
                    : 'bg-gradient-to-br from-emerald-50/90 via-teal-50/30 to-white dark:from-[#091b1a] dark:via-[#071314] dark:to-[#050e0f] border-emerald-200/90 dark:border-slate-800 shadow-xl';

            return (
              <div
                key={asset.symbol}
                className={`p-7 rounded-3xl border ${tileBg} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-black font-mono text-slate-800 dark:text-slate-200 text-sm shadow-sm">
                        {asset.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900 dark:text-white">{asset.name}</h4>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">{asset.category}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
                        isUp 
                          ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                          : 'text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 shadow-sm'
                      }`}
                    >
                      {isUp ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>

                  <div className="font-mono my-5">
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <span className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                        {formatINR(asset.currentPrice)}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                        (${toUSD(asset.currentPrice).toLocaleString('en-US')})
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                      24h Vol: <span className="text-slate-900 dark:text-slate-200 font-bold">{formatINRLarge(asset.volume24h)}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/signals?symbol=${asset.symbol}`}
                    className="text-xs font-mono text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 font-black flex items-center gap-1 transition-colors"
                  >
                    <span>Execute AI Calculation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/forecast?symbol=${asset.symbol}`}
                    className="text-xs font-mono text-purple-800 dark:text-purple-400 hover:text-purple-950 dark:hover:text-purple-300 font-black transition-colors"
                  >
                    RAG Forecast →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Financial Book & PPT Presentation Deck (Slide / Book-Turn Experience) */}
      <section className="gsap-reveal px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <QuantBookDeck />
      </section>

      {/* Institutional Trading Firm Workflow Engine (How Firms Suggest, Buy, Sell, and Manage) */}
      <section className="gsap-reveal px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <TradingFirmWorkflow />
      </section>

      {/* Institutional Visual Showcase: Real Multi-Monitor Trading Screens & Quantitative Mathematics (Unboxed Expansive Presentation) */}
      <section className="gsap-reveal w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28 border-t border-sky-200/80 dark:border-slate-800/80">
        
        {/* Full Webpage Breadth Header: Exactly 1 to 2 Lines with Clean Alignment */}
        <div className="w-full mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] w-full">
            Our Firm&apos;s Trading Floor &amp;{' '}
            <span className="text-gradient-cyan">Mathematical Research Lab</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed w-full">
            A comprehensive look into our physical and computational operations — from multi-monitor execution terminals and sub-second signal pipelines to round-the-clock trading floor collaboration and stochastic risk mathematics.
          </p>
        </div>

        {/* 4 Technique Architectural Rows (No Clutter Badges, Clean Typography, Full Width) */}
        <div className="space-y-24">

          {/* Section 1: Multi-Monitor Execution Terminals (Cyan / Sky Scheme) */}
          <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-cyan-500/20 pb-20">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                <span className="text-gradient-cyan">Multi-Monitor Execution Terminals</span>
              </h3>
              <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                Real-Time Order Flow Ingestion &amp; Sub-Millisecond Liquidity Queue Surveillance
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Across our firm&apos;s active execution desks, dedicated trading stations monitor tick-by-tick order flow and liquidity distribution across all 48 crypto pairs simultaneously. High-resolution multi-screen matrices track depth-of-market bid-ask queues, sudden wall cancellations, and institutional block allocations without visual compression.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-200 dark:border-cyan-900/60 group">
                <img
                  src="/photos/gettyimages-1309660543-612x612.jpg"
                  alt="Multi-Monitor Execution Terminals"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ maxHeight: '380px', aspectRatio: '16 / 10' }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Terminal Architecture (Emerald / Lime Scheme) */}
          <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-lime-500/20 pb-20">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-lime-200 dark:border-lime-900/60 group">
                <img
                  src="/photos/behnam-norouzi-RDXcFY5g5O4-unsplash.jpg"
                  alt="Terminal Architecture"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ maxHeight: '380px', aspectRatio: '16 / 10' }}
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                <span className="text-gradient-lime">Terminal Architecture</span>
              </h3>
              <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                Sub-Second Signal Formulation, Trend Envelopes &amp; Moving Average Ribbon Confluence
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                The terminal engine synthesizes multi-timeframe price momentum with microsecond efficiency. On every newly arriving tick, the engine recalculates 14-period RSI momentum bounds, dynamic 50-day and 200-day Simple Moving Average trend ribbons, and ATR volatility bands, only publishing high-conviction trade setups when mathematical confluence is reached.
              </p>
            </div>
          </div>

          {/* Section 3: Trading Floor Operations (Berry / Fuchsia Scheme) */}
          <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-fuchsia-500/20 pb-20">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                <span className="text-gradient-berry">Trading Floor Operations</span>
              </h3>
              <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                24/7 Desk Collaboration, Macro Ingestion &amp; Cross-Venue Liquidity Balancing
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Our trading floor maintains continuous 24/7 rotational desks where quantitative researchers, risk controllers, and order routing analysts collaborate side by side. Global liquidity flows, central bank rate decisions, and synthetic cross-exchange price spreads are synthesized into the desk workflow to safeguard capital across all market cycles.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-fuchsia-200 dark:border-fuchsia-900/60 group">
                <img
                  src="/photos/gettyimages-2112329817-612x612.jpg"
                  alt="Trading Floor Operations"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ maxHeight: '380px', aspectRatio: '16 / 10' }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Stochastic & Risk Mathematics (Sunset Tangerine / Amber Scheme) */}
          <div className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-8">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200 dark:border-amber-900/60 group">
                <img
                  src="/photos/pexels-thales13-39398846.jpg"
                  alt="Stochastic & Risk Mathematics"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ maxHeight: '380px', aspectRatio: '16 / 10' }}
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                <span className="text-gradient-sunset">Stochastic &amp; Risk Mathematics</span>
              </h3>
              <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                Continuous Capital Boundaries, Geometric Brownian Motion &amp; Value-at-Risk Constraints
              </p>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Every trade suggestion, position sizing calculation, and order slice is calibrated by verified stochastic mathematics. Dynamic Brownian motion volatility corridors govern trailing boundaries, while parametric Value-at-Risk (VaR 99%) enforces automated stop-loss invalidation floors to ensure long-term capital preservation without emotional bias.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* High-Impact Typographic Ambition Section (Full Webpage Breadth, Unconstrained, Massive Typography) */}
      <section className="gsap-reveal w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-24 lg:py-36 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-16">
          
          {/* Eyebrow & Full Webpage Headline */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Proprietary Ambition &amp; Quantitative Manifesto</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.04]">
              Our Ambition Is To Deliver{' '}
              <span className="text-gradient-gold">Precision Quantitative Alpha</span>{' '}
              Without Directional Bias.
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-200 font-normal leading-relaxed max-w-5xl pt-2">
              At our firm, we formulate real-time Buy and Sell intelligence across 48 digital assets by synthesizing multi-timeframe price momentum, order book microstructure, macroeconomic analogs, and continuous capital risk boundaries.
            </p>
          </div>

          {/* Full Webpage 4-Pillar Layout with Dynamic Monospace & Large Numbering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-6">
            
            <div className="space-y-3 border-l-2 border-cyan-500/80 pl-5">
              <span className="text-4xl font-black font-mono text-cyan-600/40 dark:text-cyan-400/30 block">01</span>
              <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-300 block uppercase tracking-wider">
                Momentum Confluence
              </span>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                Multi-Timeframe Signals
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                RSI momentum envelopes and 50/200 moving averages evaluated tick-by-tick across short and macro horizons.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-emerald-500/80 pl-5">
              <span className="text-4xl font-black font-mono text-emerald-600/40 dark:text-emerald-400/30 block">02</span>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 block uppercase tracking-wider">
                Order Flow Depth
              </span>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                Microstructure Scanning
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Sub-second bid-to-ask depth ratios and liquidity pressure verified before any signal is emitted to the desk.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-purple-500/80 pl-5">
              <span className="text-4xl font-black font-mono text-purple-600/40 dark:text-purple-400/30 block">03</span>
              <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 block uppercase tracking-wider">
                Scenario Modeling
              </span>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                Historical Analogs
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Post-halving supply cycles and global macroeconomic liquidity vectors cross-referenced continuously with AI RAG.
              </p>
            </div>

            <div className="space-y-3 border-l-2 border-amber-500/80 pl-5">
              <span className="text-4xl font-black font-mono text-amber-600/40 dark:text-amber-400/30 block">04</span>
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300 block uppercase tracking-wider">
                Capital Preservation
              </span>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                Strict Risk Limits
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Automated dynamic ATR targets, trailing stops, and controlled capital allocation to guarantee maximum drawdown survival.
              </p>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/signals"
              className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-mono font-black text-sm shadow-xl shadow-slate-900/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3"
            >
              <span>Launch Live Trading Signals Desk</span>
              <ArrowRight className="w-4 h-4 text-amber-400 dark:text-amber-600" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm transition-all duration-200"
            >
              Read Architecture Methodology
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
