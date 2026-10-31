'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ApiClient } from '@/lib/api';
import { CryptoAsset } from '@/lib/types';
import { formatINR, formatINRLarge, toINR } from '@/lib/currency';
import TickerMarquee from '@/components/common/TickerMarquee';
import TopGainersBar from '@/components/common/TopGainersBar';
import MarketScene3D from '@/components/common/MarketScene3D';
import TradingFirmWorkflow from '@/components/terminal/TradingFirmWorkflow';
import QuantBookDeck from '@/components/common/QuantBookDeck';
import { Activity, TrendingUp, Cpu, ShieldCheck, ArrowRight, Sparkles, BarChart2, Zap, Layers, CheckCircle2, Compass } from 'lucide-react';

export default function HomePage() {
  const [catalog, setCatalog] = useState<CryptoAsset[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const data = await ApiClient.getCatalog();
      setCatalog(data);
    }
    load();

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="w-full">
      {/* Live Marquee Ticker with Indian Rupee Prices */}
      <TickerMarquee assets={catalog} />

      {/* Real-Time CoinSwitch PRO Top Gainers Bar */}
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
              Delivering disciplined quantitative intelligence, precision risk management, and algorithmic market execution denominated in <strong className="text-amber-600 dark:text-amber-400 font-black">Indian Rupee (₹)</strong>.
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

          {/* Right Column: Three.js Interactive 3D Model with INR Price */}
          <div className="lg:col-span-5">
            <MarketScene3D symbol="BTC" price={toINR(67850)} />
          </div>

        </div>
      </section>

      {/* Spacious 48-Token Institutional Market Index */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
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
                    <span className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                      {formatINR(asset.currentPrice)}
                    </span>
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
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <QuantBookDeck />
      </section>

      {/* Institutional Trading Firm Workflow Engine (How Firms Suggest, Buy, Sell, and Manage) */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <TradingFirmWorkflow />
      </section>

      {/* Institutional Visual Showcase: Real Multi-Monitor Trading Screens & Quantitative Mathematics */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-400 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Our Firm&apos;s Trading Floor &amp; Mathematical Research Lab
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Ocean Turquoise & Cyan */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-cyan-50/90 via-sky-50/30 to-white dark:from-[#051722] dark:via-[#031018] dark:to-[#02080d] border border-cyan-300/90 dark:border-cyan-800/80 shadow-xl flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-cyan-100 dark:border-cyan-900/50 mb-4">
                <span className="text-xs font-mono font-bold text-cyan-800 dark:text-cyan-300 uppercase">Trading Desks In Action</span>
                <span className="text-xs font-mono font-bold text-cyan-900 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-700">Active Live Floor</span>
              </div>
              <h3 className="text-lg font-black mb-1.5">
                <span className="text-gradient-cyan">Multi-Monitor Execution Terminals</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Proprietary traders, quant analysts, and risk officers monitoring tick-by-tick order flow, depth charts, and multi-asset price action in real time.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-cyan-200 dark:border-cyan-900 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px] group">
              <img
                src="/photos/gettyimages-1309660543-612x612.jpg"
                alt="Institutional Multi-Monitor Trader Screen"
                className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
              />
            </div>
          </div>

          {/* Card 2: Spring Lime & Chartreuse Jade */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-lime-50/90 via-emerald-50/30 to-white dark:from-[#0c1f09] dark:via-[#071505] dark:to-[#030b02] border border-lime-300/90 dark:border-lime-800/80 shadow-xl flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-lime-100 dark:border-lime-900/50 mb-4">
                <span className="text-xs font-mono font-bold text-lime-800 dark:text-lime-300 uppercase">Terminal Architecture</span>
                <span className="text-xs font-mono font-bold text-lime-900 dark:text-lime-300 bg-lime-100 dark:bg-lime-950/80 px-2.5 py-0.5 rounded-full border border-lime-300 dark:border-lime-700">Sub-Second Ticks</span>
              </div>
              <h3 className="text-lg font-black mb-1.5">
                <span className="text-gradient-lime">Real-Time Quantitative Signal Dashboard</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Real-time algorithmic dashboard calculating RSI momentum, 50/200 SMA trend envelopes, and disciplined position sizing.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-lime-200 dark:border-lime-900 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px] group">
              <img
                src="/photos/behnam-norouzi-RDXcFY5g5O4-unsplash.jpg"
                alt="Institutional Crypto Candlestick Terminal"
                className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
              />
            </div>
          </div>

          {/* Card 3: Neon Fuchsia & Berry Magenta */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-fuchsia-50/90 via-pink-50/30 to-white dark:from-[#22071d] dark:via-[#170413] dark:to-[#0d020a] border border-fuchsia-300/90 dark:border-fuchsia-800/80 shadow-xl flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-fuchsia-100 dark:border-fuchsia-900/50 mb-4">
                <span className="text-xs font-mono font-bold text-fuchsia-800 dark:text-fuchsia-300 uppercase">Trading Floor Operations</span>
                <span className="text-xs font-mono font-bold text-fuchsia-900 dark:text-fuchsia-300 bg-fuchsia-100 dark:bg-fuchsia-950/80 px-2.5 py-0.5 rounded-full border border-fuchsia-300 dark:border-fuchsia-700">Macro &amp; Liquidity Hub</span>
              </div>
              <h3 className="text-lg font-black mb-1.5">
                <span className="text-gradient-berry">Multi-Asset Trading Floor Collaboration</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Multi-analyst desk layout showing the flow of market data through quant research, risk supervision, and algorithmic order routing.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-fuchsia-200 dark:border-fuchsia-900 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px] group">
              <img
                src="/photos/gettyimages-2112329817-612x612.jpg"
                alt="Institutional Trading Floor"
                className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
              />
            </div>
          </div>

          {/* Card 4: Sunset Tangerine & Honey Amber Gold */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-amber-50/90 via-orange-50/30 to-white dark:from-[#211204] dark:via-[#160b02] dark:to-[#0c0501] border border-amber-300/90 dark:border-amber-800/80 shadow-xl flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-100 dark:border-amber-900/50 mb-4">
                <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 uppercase">Stochastic &amp; Risk Mathematics</span>
                <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-700">Mathematical Calibration</span>
              </div>
              <h3 className="text-lg font-black mb-1.5">
                <span className="text-gradient-sunset">Systematic Capital Allocation &amp; Risk Mathematics</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Every trade suggestion and order slice is backed by verified stochastic models: dynamic capital sizing, volatility corridors, and risk-adjusted return optimization.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-amber-200 dark:border-amber-900 shadow-md bg-slate-950 flex items-center justify-center min-h-[280px] group">
              <img
                src="/photos/pexels-thales13-39398846.jpg"
                alt="Quantitative Mathematics Blackboard"
                className="w-full h-auto object-cover rounded-xl block transition-transform duration-500 group-hover:scale-105"
                style={{ maxHeight: '420px', aspectRatio: '16 / 10' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* High-Impact Typographic Ambition & Methodological Statement */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-20 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="space-y-12">
          {/* Eyebrow & Headline in Big/Small Dynamic Typographic Hierarchy */}
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase block">
              Proprietary Mathematical Discipline
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Our Ambition Is To Deliver{' '}
              <span className="text-gradient-gold">Precision Quantitative Alpha</span>{' '}
              Without Directional Bias.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl pt-2">
              At our firm, we formulate real-time Buy and Sell intelligence across 48 digital assets by synthesizing multi-timeframe price momentum, order book microstructure, macroeconomic analogs, and continuous capital risk boundaries denominated in Indian Rupee (₹).
            </p>
          </div>

          {/* Clean Open Minimalist Principles (No Rigid Clutter Boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            <div className="space-y-2 border-l-2 border-cyan-500/80 pl-4">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 block uppercase tracking-wider">01. Momentum Confluence</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">Multi-Timeframe Signals</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                RSI momentum envelopes and 50/200 moving averages evaluated tick-by-tick.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-emerald-500/80 pl-4">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider">02. Order Flow Depth</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">Microstructure Scanning</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                Bid-to-ask depth ratios and liquidity pressure verified before signal emission.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-purple-500/80 pl-4">
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 block uppercase tracking-wider">03. Scenario Modeling</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">Historical Analogs</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                Post-halving cycles and macro liquidity vectors cross-referenced continuously.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-amber-500/80 pl-4">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider">04. Capital Preservation</span>
              <h4 className="text-xl font-black text-slate-900 dark:text-white">Strict Risk Limits</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                Automated dynamic ATR targets, trailing stops, and controlled capital allocation.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/signals"
              className="px-7 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-mono font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              Open Live Signal Terminal →
            </Link>
            <Link
              href="/about"
              className="px-7 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-xs transition-all duration-200"
            >
              Read Architecture Methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
