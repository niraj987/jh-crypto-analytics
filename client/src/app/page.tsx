'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ApiClient } from '@/lib/api';
import { CryptoAsset } from '@/lib/types';
import { formatINR, formatINRLarge, toINR } from '@/lib/currency';
import TickerMarquee from '@/components/common/TickerMarquee';
import MarketScene3D from '@/components/common/MarketScene3D';
import TradingFirmWorkflow from '@/components/terminal/TradingFirmWorkflow';
import { Activity, TrendingUp, Cpu, ShieldCheck, ArrowRight, Sparkles, BarChart2, Zap, Layers, CheckCircle2 } from 'lucide-react';

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

      {/* Spacious Hero Section with Warm Natural Tone & Three.js 3D Model */}
      <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand & Hero Copy */}
          <div ref={heroRef} className="lg:col-span-7 space-y-6">
            
            {/* Headline with Natural Warm & Green Tones */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Institutional Crypto Terminal Powered by{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-700 bg-clip-text text-transparent">
                Quantitative Intelligence
              </span>
            </h1>

            {/* Spacious Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Empowering professional crypto traders with sub-second Buy/Sell consensus calculations, Kelly Criterion position sizing, zero-impact smart order routing, and predictive market forecasting denominated in <strong>₹</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/signals"
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-black text-sm flex items-center gap-2.5 shadow-lg shadow-emerald-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Activity className="w-4 h-4" />
                <span>Launch Trading Signals Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/forecast"
                className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-mono font-bold text-sm flex items-center gap-2.5 border border-slate-200 shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Explore AI RAG Forecasting</span>
              </Link>
            </div>

            {/* Telemetry Highlights with Distinct Colored Background Tiles */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border border-emerald-200/90 shadow-sm hover:shadow-md transition-all">
                <span className="text-emerald-800 text-[10px] block font-bold uppercase">Currency</span>
                <span className="text-emerald-950 font-black text-sm">Real-Time (₹)</span>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-100/90 via-slate-50 to-white border border-slate-300/80 shadow-sm hover:shadow-md transition-all">
                <span className="text-slate-600 text-[10px] block font-bold uppercase">Token Catalog</span>
                <span className="text-slate-950 font-black text-sm">48+ Active Pairs</span>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/90 via-indigo-50/40 to-white border border-purple-200/90 shadow-sm hover:shadow-md transition-all">
                <span className="text-purple-800 text-[10px] block font-bold uppercase">Risk Engine</span>
                <span className="text-purple-950 font-black text-sm">Kelly Criterion</span>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50/90 via-blue-50/40 to-white border border-sky-200/90 shadow-sm hover:shadow-md transition-all">
                <span className="text-sky-800 text-[10px] block font-bold uppercase">Order Slicing</span>
                <span className="text-sky-950 font-black text-sm">TWAP &amp; VWAP</span>
              </div>
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Comprehensive 48-Asset Institutional Index
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Real-time prices across Majors, Layer-1s, Memes, DeFi protocols, and AI tokens
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/signals"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
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
                ? 'bg-gradient-to-br from-sky-50/80 via-blue-50/30 to-white border-sky-200/90 shadow-[0_10px_25px_-5px_rgba(2,132,199,0.06)]'
                : asset.category === 'Meme'
                  ? 'bg-gradient-to-br from-amber-50/80 via-orange-50/30 to-white border-amber-200/90 shadow-[0_10px_25px_-5px_rgba(245,158,11,0.06)]'
                  : asset.category === 'AI'
                    ? 'bg-gradient-to-br from-purple-50/80 via-indigo-50/30 to-white border-purple-200/90 shadow-[0_10px_25px_-5px_rgba(168,85,247,0.06)]'
                    : 'bg-gradient-to-br from-emerald-50/80 via-teal-50/30 to-white border-emerald-200/90 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.06)]';

            return (
              <div
                key={asset.symbol}
                className={`p-7 rounded-3xl border ${tileBg} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-black font-mono text-slate-800 text-sm shadow-sm">
                        {asset.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900">{asset.name}</h4>
                        <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">{asset.category}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
                        isUp 
                          ? 'text-emerald-800 bg-emerald-50 border-emerald-200 shadow-sm' 
                          : 'text-rose-800 bg-rose-50 border-rose-200 shadow-sm'
                      }`}
                    >
                      {isUp ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>

                  <div className="font-mono my-5">
                    <span className="text-3xl font-black text-slate-950 tracking-tight">
                      {formatINR(asset.currentPrice)}
                    </span>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      24h Vol: <span className="text-slate-900 font-bold">{formatINRLarge(asset.volume24h)}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <Link
                    href={`/signals?symbol=${asset.symbol}`}
                    className="text-xs font-mono text-emerald-800 hover:text-emerald-950 font-black flex items-center gap-1 transition-colors"
                  >
                    <span>Execute AI Calculation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/forecast?symbol=${asset.symbol}`}
                    className="text-xs font-mono text-purple-800 hover:text-purple-950 font-black transition-colors"
                  >
                    RAG Forecast →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Trading Firm Workflow Engine (How Firms Suggest, Buy, Sell, and Manage) */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <TradingFirmWorkflow />
      </section>

      {/* Institutional Visual Showcase: Real Multi-Monitor Trading Screens & Quantitative Mathematics */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Institutional Trading Floor &amp; Mathematical Research Lab
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Live multi-screen trading terminals, depth order flow monitors, and verified risk mathematical models
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Real Multi-Monitor Trader Screens */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50/80 via-blue-50/20 to-white border border-sky-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-sky-100 mb-4">
                <span className="text-xs font-mono font-bold text-sky-800 uppercase">Trading Desks In Action</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Active Live Floor</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1.5">
                Multi-Monitor Institutional Execution Terminals
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Proprietary traders, quant analysts, and risk officers monitoring tick-by-tick order flow, depth charts, and multi-asset price action in real time.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px]">
              <img
                src="/trading-screen.png"
                alt="Institutional Multi-Monitor Trader Screen"
                className="w-full h-auto object-cover rounded-xl block"
                style={{ maxHeight: '460px', aspectRatio: '16 / 9' }}
              />
            </div>
          </div>

          {/* Card 2: Quantitative Terminal Dashboard */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-teal-50/20 to-white border border-emerald-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase">Terminal Architecture</span>
                <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">Sub-Second Ticks</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1.5">
                Real-Time Quantitative Signal Dashboard
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Real-time algorithmic dashboard calculating RSI momentum, 50/200 SMA trend envelopes, and Kelly Criterion position sizing.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 flex items-center justify-center min-h-[260px]">
              <img
                src="/trading-dashboard.png"
                alt="Institutional Crypto Terminal Dashboard"
                className="w-full h-auto object-cover rounded-xl block"
                style={{ maxHeight: '460px', aspectRatio: '16 / 9' }}
              />
            </div>
          </div>

          {/* Card 3: Trading Floor Floorplan */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/80 via-indigo-50/20 to-white border border-purple-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-purple-100 mb-4">
                <span className="text-xs font-mono font-bold text-purple-800 uppercase">Trading Floor Blueprint</span>
                <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">Desk Collaboration</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1.5">
                Desk Operations: Macro, Quant &amp; Execution
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Multi-analyst desk layout showing the flow of market data through quant research, risk supervision, and algorithmic order routing.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 p-2 flex items-center justify-center min-h-[260px]">
              <img
                src="/quant-people-trading.svg"
                alt="Trading Floor Blueprint"
                className="w-full h-auto object-contain block"
                style={{ maxHeight: '460px', aspectRatio: '800 / 480' }}
              />
            </div>
          </div>

          {/* Card 4: Quantitative Math Formulas */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/80 via-orange-50/20 to-white border border-amber-200/90 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-4">
                <span className="text-xs font-mono font-bold text-amber-800 uppercase">Stochastic &amp; Risk Mathematics</span>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">Mathematical Calibration</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1.5">
                Kelly Sizing, Brownian Motion &amp; VWAP Math
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Every trade suggestion and order slice is backed by verified stochastic formulas: Fractional Kelly allocation, jump diffusion, and Sharpe ratio maximization.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 p-2 flex items-center justify-center min-h-[280px]">
              <img
                src="/quant-math.svg"
                alt="Quantitative Mathematics"
                className="w-full h-auto object-contain block"
                style={{ maxHeight: '460px', aspectRatio: '900 / 520' }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Multi-Agent Architecture Explainer Banner */}
      <section className="px-6 sm:px-8 lg:px-12 max-w-[1440px] mx-auto py-16">
        <div className="rounded-3xl bg-white border border-slate-200 p-10 md:p-14 shadow-lg shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono text-emerald-800 font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                Institutional Quantitative Consensus
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                How JH Crypto Analytics Formulates Real-Time Buy/Sell Signals
              </h3>
              <p className="text-slate-600 leading-relaxed font-normal text-base">
                At <strong>JH Crypto Analytics</strong>, our quantitative engine evaluates multiple market dimensions simultaneously: Multi-Timeframe Momentum, On-Chain Order Flow, Macro Historical Analogs, and Parametric Volatility Boundaries. Deliberations are weighted mathematically to produce audited Buy/Sell recommendations in real time.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Read Complete Architecture Whitepaper</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 font-mono text-xs">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50/30 to-white border border-sky-200/90 shadow-sm hover:shadow-md transition-all">
                <Zap className="w-6 h-6 text-sky-600 mb-3" />
                <h5 className="font-extrabold text-slate-900 text-sm mb-1.5">Technical Agent</h5>
                <p className="text-slate-600 text-xs leading-relaxed">RSI, MACD, BB, SMA 50/200 Golden Cross confluence</p>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white border border-emerald-200/90 shadow-sm hover:shadow-md transition-all">
                <BarChart2 className="w-6 h-6 text-emerald-600 mb-3" />
                <h5 className="font-extrabold text-slate-900 text-sm mb-1.5">On-Chain Flow</h5>
                <p className="text-slate-600 text-xs leading-relaxed">Order-book imbalance, exchange reserves, whale net-flow</p>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50/30 to-white border border-purple-200/90 shadow-sm hover:shadow-md transition-all">
                <Cpu className="w-6 h-6 text-purple-600 mb-3" />
                <h5 className="font-extrabold text-slate-900 text-sm mb-1.5">Macro Intelligence</h5>
                <p className="text-slate-600 text-xs leading-relaxed">Historical post-halving analogs &amp; macro liquidity vectors</p>
              </div>
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/30 to-white border border-amber-200/90 shadow-sm hover:shadow-md transition-all">
                <ShieldCheck className="w-6 h-6 text-amber-600 mb-3" />
                <h5 className="font-extrabold text-slate-900 text-sm mb-1.5">Supervisor Node</h5>
                <p className="text-slate-600 text-xs leading-relaxed">Resolves conflict, calculates entry, TP, and stop-loss</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
