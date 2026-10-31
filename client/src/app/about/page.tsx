'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Network, 
  Cpu, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Zap, 
  SlidersHorizontal,
  Activity,
  CheckCircle2,
  Sparkles,
  BarChart2,
  Compass
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
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

  const pillars = [
    {
      id: 'pillar-1',
      step: '01. SUGGEST // ALPHA FORMULATION',
      title: 'How Top Firms Suggest (Alpha Generation)',
      titleGradient: 'text-gradient-sunset',
      subtitle: 'Statistical Significance & Multi-Factor Scoring',
      image: '/photos/behnam-norouzi-hScr17JG74Q-unsplash.jpg',
      badge: 'Information Ratio > 1.5',
      badgeColor: 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700',
      icon: Zap,
      iconColor: 'text-amber-500',
      borderColor: 'border-amber-500/25',
      benchmark: 'Information Edge: α > +35 Consensus Score',
      description:
        'Our firm does not speculate on gut feeling. Statistical indicators (RSI divergence, volume momentum, moving average ribbon envelopes, and order block accumulation) are computed tick-by-tick. When composite alpha exceeds +35 with high statistical significance, the supervisor publishes an automated recommendation with mathematically calibrated targets.',
      metrics: ['Tick-by-Tick Evaluation', 'Multi-Factor Alpha Matrix', 'Zero Speculative Discretion'],
    },
    {
      id: 'pillar-2',
      step: '02. RISK // CAPITAL PRESERVATION',
      title: 'How Our Firm Manages Risk (Capital Sizing)',
      titleGradient: 'text-gradient-lime',
      subtitle: 'Dynamic Capital Sizing & Parametric VaR Limits',
      image: '/photos/gettyimages-2270333130-612x612.jpg',
      badge: 'Controlled Sizing (0.25x)',
      badgeColor: 'text-lime-500 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/80 border-lime-300 dark:border-lime-700',
      icon: ShieldCheck,
      iconColor: 'text-lime-500',
      borderColor: 'border-lime-500/25',
      benchmark: 'Risk Objective: Ruin Probability < 0.01%',
      description:
        'Capital preservation always takes precedence over returns. Our trading desk scales trade size conservatively using disciplined risk fraction boundaries to eliminate ruin risk during fat-tailed drawdowns. Dynamic ATR envelopes set automated stop-losses, and single-desk Value-at-Risk (VaR 99%) is strictly capped at 2% of total equity.',
      metrics: ['Parametric VaR (99.0%)', 'Dynamic ATR Trailing Stops', 'Quarter-Kelly Capital Sizing'],
    },
    {
      id: 'pillar-3',
      step: '03. BUY & SELL // SMART EXECUTION',
      title: 'How Our Firm Executes (Smart Order Routing)',
      titleGradient: 'text-gradient-cyan',
      subtitle: 'Algorithmic Slicing & Anti-MEV Icebergs',
      image: '/photos/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg',
      badge: 'Zero Slippage Routing',
      badgeColor: 'text-cyan-500 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-300 dark:border-cyan-700',
      icon: SlidersHorizontal,
      iconColor: 'text-cyan-500',
      borderColor: 'border-cyan-500/25',
      benchmark: 'Execution Objective: Slippage < 0.05%',
      description:
        'Large block tickets are never sent as raw market orders. Smart order routers decompose orders into micro child slices over 30 to 60-minute windows using proprietary TWAP/VWAP execution algorithms. Stealth iceberg orders mask cumulative book depth to prevent predatory front-running and MEV sandwich extraction.',
      metrics: ['TWAP / VWAP Slicing', 'Anti-MEV Iceberg Protection', 'Direct Exchange Gateways'],
    },
    {
      id: 'pillar-4',
      step: '04. MANAGE // PORTFOLIO PRESERVATION',
      title: 'How Our Firm Manages Portfolios (Hedging)',
      titleGradient: 'text-gradient-berry',
      subtitle: 'Beta Hedging & Cross-Asset Market Neutrality',
      image: '/photos/gettyimages-2112329817-612x612.jpg',
      badge: 'Market Beta ≈ 0.00',
      badgeColor: 'text-fuchsia-500 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/80 border-fuchsia-300 dark:border-fuchsia-700',
      icon: Layers,
      iconColor: 'text-fuchsia-500',
      borderColor: 'border-fuchsia-500/25',
      benchmark: 'Hedging Objective: Portfolio Beta ≈ 0.00',
      description:
        'Firms neutralize broader directional market volatility by maintaining a zero-beta portfolio. They hold high-conviction long positions in strong crypto assets while simultaneously shorting equivalent beta exposure on BTC/ETH perpetuals, unlocking uncorrelated returns regardless of whether the broader market rallies or drops.',
      metrics: ['Delta-Neutral Hedging', 'Uncorrelated Alpha Extraction', 'Continuous Beta Rebalancing'],
    },
  ];

  const agents = [
    {
      id: 'agent-1',
      title: 'Technical Indicator & Trend Specialist',
      titleGradient: 'text-gradient-cyan',
      role: 'Multi-Timeframe Confluence & Volatility Envelopes',
      image: '/photos/pexels-thales13-39589930.jpg',
      icon: Zap,
      accentText: 'text-cyan-600 dark:text-cyan-400',
      tag: '50/200 SMA · RSI(14) · ATR Volatility',
      borderColor: 'border-cyan-500/20',
      description:
        'Computes dynamic 50/200 SMA golden and death crosses, 20 EMA trailing support, RSI(14) divergence regimes, MACD signal line crossovers, Bollinger Band squeeze breakout states, and 14-period Average True Range (ATR) volatility envelopes in real time.',
      status: 'Active Tick Stream Contributor',
    },
    {
      id: 'agent-2',
      title: 'On-Chain & Liquidity Microstructure Specialist',
      titleGradient: 'text-gradient-lime',
      role: 'Order Book Depth, Whale Inflows & Exchange Reserves',
      image: '/photos/kanchanara-7cmA9ZL5dDk-unsplash.jpg',
      icon: Database,
      accentText: 'text-lime-600 dark:text-lime-400',
      tag: 'CEX Reserves · Net Inflows · Book Depth',
      borderColor: 'border-lime-500/20',
      description:
        'Monitors centralized exchange net deposit/withdrawal flows, 24-hour volume-to-market-cap velocity, perpetual funding rate overheating, open interest (OI) leverage clusters, and order book bid-ask liquidity absorption.',
      status: 'Live Microstructure Node',
    },
    {
      id: 'agent-3',
      title: 'Macro Narrative & RAG Analogs Specialist',
      titleGradient: 'text-gradient-berry',
      role: 'Vector Embeddings, Halving Cycles & Fed Liquidity',
      image: '/photos/behnam-norouzi-RDXcFY5g5O4-unsplash.jpg',
      icon: Network,
      accentText: 'text-fuchsia-600 dark:text-fuchsia-400',
      tag: 'Semantic RAG · Halving Supply · M2 Global',
      borderColor: 'border-fuchsia-500/20',
      description:
        'Queries an in-memory semantic vector store containing deep domain knowledge: 2016, 2020, and 2024 post-halving structural supply constriction, Global M2 expansion correlation, Fed interest rate easing cycles, and spot ETF liquidity absorption.',
      status: 'Semantic Vector Retrieval Active',
    },
    {
      id: 'agent-4',
      title: 'Predictive Horizon & Risk Boundary Specialist',
      titleGradient: 'text-gradient-sunset',
      role: 'Predictive Scenarios & Structural Invalidation Targets',
      image: '/photos/kanchanara-GnWfl_nnZro-unsplash.jpg',
      icon: TrendingUp,
      accentText: 'text-amber-600 dark:text-amber-400',
      tag: 'Bull/Base/Bear · 24h / 7d / 30d Horizons',
      borderColor: 'border-amber-500/20',
      description:
        'Synthesizes multi-horizon price envelopes for 24 hours, 7 days, and 30 days. Generates dynamic Bull, Base, and Bear scenarios with explicit probabilities, optimal entry targets, and structural invalidation stop-loss levels.',
      status: 'Horizon State Calculator',
    },
  ];

  return (
    <div className="w-full relative">
      {/* Dynamic Multi-Color Ambient Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[12%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/0 blur-[140px]" />
        <div className="absolute top-[42%] -right-[12%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-500/10 to-teal-500/0 blur-[140px]" />
        <div className="absolute top-[75%] -left-[12%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fuchsia-500/10 to-purple-500/0 blur-[150px]" />
      </div>

      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-20 space-y-28">
        
        {/* Full Webpage Breadth Header: Exactly 1 to 2 Lines with Multi-Color Mix */}
        <div className="gsap-reveal w-full space-y-6 pt-2">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-slate-100 dark:border-slate-800">
              <Image
                src="/jh-logo.png"
                alt="JH Logo"
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
              OUR FIRM &bull; QUANTITATIVE METHODOLOGY
            </span>
          </div>

          {/* 1 or 2 lines full width headline with vibrant multi-color gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] w-full">
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              How Top Trading Firms Operate
            </span>{' '}
            <span className="text-amber-500 dark:text-amber-400 font-light mx-1">
              &amp;
            </span>{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-500 dark:from-teal-300 dark:via-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">
              How Our Engine Executes
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-2xl leading-relaxed font-normal w-full max-w-5xl">
            <strong className="text-slate-900 dark:text-white font-black">Our firm</strong> delivers advanced quantitative capabilities to cryptocurrency traders: algorithmic multi-agent consensus, disciplined risk sizing, zero-impact order execution, and semantic scenario forecasting across 48 liquid crypto assets.
          </p>
        </div>

        {/* ----------------------------------------------------
            THE 4 PILLARS OF A QUANTITATIVE TRADING FIRM
            (Completely Unboxed Expansive Layout - No Card Boxes)
           ---------------------------------------------------- */}
        <section className="gsap-reveal space-y-16">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
                Our Firm&apos;s Quantitative Blueprint
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                The 4 Pillars of a Quantitative Trading Firm
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                How elite quantitative desks discover statistical alpha, control drawdown ruin, execute block orders without slippage, and maintain delta neutrality.
              </p>
            </div>

            <Link
              href="/signals"
              className="px-7 py-4 rounded-2xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-mono font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>Launch Live Signals Desk</span>
              <ArrowRight className="w-4 h-4 text-amber-400 dark:text-amber-600" />
            </Link>
          </div>

          {/* 4 Unboxed Expansive Architectural Rows */}
          <div className="space-y-24">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={p.id}
                  className={`gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b ${p.borderColor} pb-20`}
                >
                  {/* Text Column */}
                  <div className={`space-y-6 ${isEven ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                        {p.step}
                      </span>
                      <span className="w-10 h-px bg-slate-300 dark:bg-slate-700" />
                      <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border shadow-sm ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                      <span className={p.titleGradient}>{p.title}</span>
                    </h3>

                    <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {p.subtitle}
                    </p>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {p.description}
                    </p>

                    {/* Benchmark Strip */}
                    <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 font-mono text-xs flex flex-wrap items-center justify-between gap-3 shadow-inner">
                      <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        Quantitative Objective:
                      </span>
                      <span className="text-slate-950 dark:text-white font-black tracking-wide">
                        {p.benchmark}
                      </span>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {p.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`${isEven ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ maxHeight: '380px', aspectRatio: '16 / 10' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                        <span className="font-bold tracking-wide">{p.subtitle}</span>
                        <span className="text-emerald-400 font-bold">{p.badge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ----------------------------------------------------
            INSTITUTIONAL TRADING FLOOR & STOCHASTIC LAB
            (Unboxed Full Webpage Breadth Presentation)
           ---------------------------------------------------- */}
        <section className="gsap-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-b border-slate-200/80 dark:border-slate-800/80 pb-24">
          
          {/* Trading Floor Desk */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                  Live Operations
                </span>
                <span className="w-8 h-px bg-sky-500/30" />
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Latency: 18ms
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Multi-Screen Trading Floor &amp; Microstructure Desk
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Proprietary execution specialists monitor sub-second order book depth, cross-exchange liquidity imbalances, and tick-by-tick order fills across centralized and decentralized venues.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img
                src="/photos/gettyimages-2240153407-612x612.jpg"
                alt="Trading Floor in Action"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ maxHeight: '360px', aspectRatio: '16 / 10' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="font-bold">High-Frequency Order Router</span>
                <span className="text-emerald-400 font-bold">Cryptographically Verified</span>
              </div>
            </div>
          </div>

          {/* Stochastic Research Lab */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  Mathematical Verification
                </span>
                <span className="w-8 h-px bg-amber-500/30" />
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-0.5 rounded-full border border-purple-300 dark:border-purple-800">
                  GBM &amp; Jump Diffusion
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Stochastic Calculus &amp; Risk Research Lab
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Every buy/sell suggestion is bounded by verified mathematical mechanics: geometric Brownian motion for volatility corridors, Kelly optimal fractions for trade sizes, and conditional Value-at-Risk limits.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img
                src="/photos/pexels-thales13-39398847.jpg"
                alt="Stochastic Equations and Math Lab"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ maxHeight: '360px', aspectRatio: '16 / 10' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="font-bold">Risk Calibration Models</span>
                <span className="text-amber-300 font-bold">Sharpe Ratio &gt; 2.4</span>
              </div>
            </div>
          </div>

        </section>

        {/* ----------------------------------------------------
            THE 4 SPECIALIST QUANTITATIVE AGENTS
            (Completely Unboxed Expansive Layout - No Card Boxes)
           ---------------------------------------------------- */}
        <section className="gsap-reveal space-y-16">
          <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>Autonomous Deliberation Mesh</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              The 4 Specialist Quantitative Deliberation Agents
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-4xl">
              Independent agents deliberate concurrently on every market tick and publish verified quantitative insights to the unified consensus state matrix.
            </p>
          </div>

          {/* 4 Unboxed Agent Presentation Rows */}
          <div className="space-y-20">
            {agents.map((ag, idx) => {
              const Icon = ag.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={ag.id}
                  className={`gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b ${ag.borderColor} pb-16`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-4 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-950 group">
                      <img
                        src={ag.image}
                        alt={ag.title}
                        className="w-full h-auto object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                        style={{ maxHeight: '280px', aspectRatio: '16 / 10' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-slate-200">{ag.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`space-y-4 lg:col-span-8 ${isEven ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Icon className={`w-5 h-5 ${ag.accentText}`} />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
                          Agent 0{idx + 1}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black leading-tight">
                          <span className={ag.titleGradient}>{ag.title}</span>
                        </h4>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                      {ag.role}
                    </p>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {ag.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs font-mono">
                      <span className="text-emerald-700 dark:text-emerald-400 font-black flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {ag.status}
                      </span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500 font-bold">Sub-Second Refresh Rate</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA to Live Trading Desk */}
        <div className="gsap-reveal p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-700 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Launch the Live Trading Desk?
            </h3>
            <p className="text-emerald-100 text-base max-w-2xl font-normal leading-relaxed">
              Step onto our firm&apos;s execution floor with live ticking L2 order book, AI consensus matrix, and direct order tickets.
            </p>
          </div>
          <Link
            href="/signals"
            className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-mono font-black text-sm flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Launch Trading Signals Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
